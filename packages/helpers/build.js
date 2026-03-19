const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const entryPoints = fs.readdirSync(__dirname).filter(
  (f) => path.extname(f) === '.js' && f !== path.basename(__filename)
);

esbuild.build({
  entryPoints,
  outdir: 'dist',
  format: 'cjs',
  bundle: false,
  platform: 'neutral',
}).catch(() => process.exit(1));
