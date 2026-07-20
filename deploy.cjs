const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const TOKEN = process.argv[2];
const PROJECT_ID = 'prj_6YcXHukE05GHBm7qghQeJKdpoG84';
const DIST_DIR = path.join(__dirname, 'dist');

if (!TOKEN) { console.error('Usage: node deploy.cjs <TOKEN>'); process.exit(1); }

function apiRequest(method, endpoint, body, token, extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    const data = body instanceof Buffer ? body : (body ? JSON.stringify(body) : null);
    const isBuffer = body instanceof Buffer;
    const options = {
      hostname: 'api.vercel.com',
      path: endpoint,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': isBuffer ? 'application/octet-stream' : 'application/json',
        ...(data ? { 'Content-Length': data.length } : {}),
        ...extraHeaders,
      },
    };
    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        try { resolve({ status: res.statusCode, body: JSON.parse(buf.toString()) }); }
        catch { resolve({ status: res.statusCode, body: buf.toString() }); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function getAllFiles(dir, baseDir = dir) {
  const results = [];
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      results.push(...getAllFiles(full, baseDir));
    } else {
      results.push({ full, rel: full.replace(baseDir + path.sep, '').replace(/\\/g, '/') });
    }
  }
  return results;
}

async function deploy() {
  const files = getAllFiles(DIST_DIR);
  console.log(`📁 Found ${files.length} files\n`);

  // Step 1: Upload each file
  const fileRefs = [];
  for (const f of files) {
    const content = fs.readFileSync(f.full);
    const sha = crypto.createHash('sha1').update(content).digest('hex');
    process.stdout.write(`⬆️  Uploading ${f.rel}...`);
    
    const res = await apiRequest('POST', '/v2/files', content, TOKEN, { 'x-vercel-digest': sha });
    if (res.status === 200 || res.status === 409) {
      // 409 = already uploaded (dedup), also fine
      fileRefs.push({ file: f.rel, sha, size: content.length });
      console.log(` ✓`);
    } else {
      console.log(` ❌ ${res.status}: ${JSON.stringify(res.body)}`);
    }
  }

  // Step 2: Create deployment referencing uploaded files
  console.log('\n🚀 Creating deployment...');
  const deployRes = await apiRequest('POST', `/v13/deployments?forceNew=1&projectId=${PROJECT_ID}`, {
    name: 'levelup-app',
    target: 'production',
    files: fileRefs,
    projectSettings: {
      framework: null,
      buildCommand: '',
      installCommand: '',
      outputDirectory: '',
      devCommand: '',
    },
    routes: [
      { src: '/assets/(.*)', dest: '/assets/$1' },
      { src: '/images/(.*)', dest: '/images/$1' },
      { src: '/favicon\\.svg', dest: '/favicon.svg' },
      { src: '/icons\\.svg', dest: '/icons.svg' },
      { src: '/(.*)\\.(?:js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp)', dest: '/$1.$2' },
      { src: '/(.*)', dest: '/index.html' },
    ],
  }, TOKEN);

  if (deployRes.status >= 400) {
    console.error('❌ Deploy failed:', JSON.stringify(deployRes.body, null, 2));
    process.exit(1);
  }

  const { url, id } = deployRes.body;
  console.log(`✅ Deployment created — ID: ${id}`);
  console.log(`⏳ Polling status...`);

  // Step 3: Poll until READY
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 3000));
    const s = await apiRequest('GET', `/v13/deployments/${id}`, null, TOKEN);
    const state = s.body.readyState || s.body.status;
    process.stdout.write(`\r   ${state}...         `);
    if (state === 'READY') {
      console.log(`\n\n🎉 LIVE: https://${s.body.url || url}`);
      return;
    }
    if (state === 'ERROR' || state === 'CANCELED') {
      console.error(`\n❌ Failed: ${state}`);
      console.error(JSON.stringify(s.body.errorMessage || s.body.error, null, 2));
      return;
    }
  }
}

deploy().catch(e => { console.error('Error:', e.message); process.exit(1); });
