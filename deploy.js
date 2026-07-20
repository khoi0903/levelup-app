/**
 * Deploy dist/ folder to Vercel via REST API
 * Usage: node deploy.js <ACCESS_TOKEN>
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const TOKEN = process.argv[2];
const PROJECT_ID = 'prj_6YcXHukE05GHBm7qghQeJKdpoG84';
const DIST_DIR = path.join(__dirname, 'dist');

if (!TOKEN) {
  console.error('❌ Usage: node deploy.js <VERCEL_ACCESS_TOKEN>');
  process.exit(1);
}

// Collect all files from dist/
function getAllFiles(dir, baseDir = dir) {
  const results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...getAllFiles(fullPath, baseDir));
    } else {
      results.push({
        fullPath,
        relativePath: fullPath.replace(baseDir + path.sep, '').replace(/\\/g, '/'),
      });
    }
  }
  return results;
}

function apiRequest(method, endpoint, body, token) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'api.vercel.com',
      path: endpoint,
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
      },
    };
    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(responseData) }); }
        catch { resolve({ status: res.statusCode, body: responseData }); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function deploy() {
  console.log('🔍 Reading dist/ files...');
  const files = getAllFiles(DIST_DIR);
  console.log(`📁 Found ${files.length} files`);

  // Build file list for Vercel API
  const vercelFiles = files.map(f => {
    const content = fs.readFileSync(f.fullPath);
    const encoding = /\.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/.test(f.relativePath)
      ? 'base64' : 'utf-8';
    return {
      file: f.relativePath,
      data: content.toString(encoding),
      encoding,
    };
  });

  console.log('🚀 Creating deployment...');
  const deployRes = await apiRequest('POST', '/v13/deployments', {
    name: 'levelup-app',
    projectId: PROJECT_ID,
    target: 'production',
    files: vercelFiles,
    projectSettings: {
      framework: null,
      buildCommand: null,
      outputDirectory: null,
    },
    routes: [
      { src: '/assets/(.*)', dest: '/assets/$1' },
      { src: '/(.*)', dest: '/index.html' },
    ],
  }, TOKEN);

  if (deployRes.status >= 400) {
    console.error('❌ Deploy failed:', JSON.stringify(deployRes.body, null, 2));
    process.exit(1);
  }

  const { url, id, readyState } = deployRes.body;
  console.log(`\n✅ Deployment created!`);
  console.log(`   ID: ${id}`);
  console.log(`   State: ${readyState}`);
  console.log(`   URL: https://${url}`);
  console.log('\n⏳ Waiting for deployment to be ready...');

  // Poll until ready
  let attempts = 0;
  while (attempts < 30) {
    await new Promise(r => setTimeout(r, 3000));
    const statusRes = await apiRequest('GET', `/v13/deployments/${id}`, null, TOKEN);
    const state = statusRes.body.readyState || statusRes.body.status;
    process.stdout.write(`\r   Status: ${state}          `);
    if (state === 'READY') {
      console.log(`\n\n🎉 DEPLOYED SUCCESSFULLY!`);
      console.log(`🌐 Live URL: https://${statusRes.body.url}`);
      break;
    }
    if (state === 'ERROR' || state === 'CANCELED') {
      console.error(`\n❌ Deployment failed with state: ${state}`);
      break;
    }
    attempts++;
  }
}

deploy().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
