const { execSync } = require('child_process');

const base = process.env.VERCEL_GIT_PREVIOUS_SHA || 'origin/main';
const head = process.env.VERCEL_GIT_COMMIT_SHA;

let changedFiles = '';

try {
  changedFiles = execSync(`git diff --name-only ${base} ${head}`).toString();
} catch (e) {
  console.error('❌ Error getting git diff:', e);
  process.exit(1); // Continue with build if diff fails
}

const changes = changedFiles.split('\n').filter(Boolean);

// Skip build only if ALL changed files are inside `app/test/`
const onlyTestFolderChanged = changes.length > 0 && changes.every((file) =>
  file.startsWith('app/test/')
);

if (onlyTestFolderChanged) {
  console.log('✅ Only app/test/ changed — skipping build');
  process.exit(0); // Skip build
}

console.log('📦 Other files changed — building');
process.exit(1); // Proceed with build
