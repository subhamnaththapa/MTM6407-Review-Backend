#!/usr/bin/env node
/**
 * Start Strapi server and keep it running
 * Usage: node start-server.js
 */
const { spawn } = require('child_process');
const path = require('path');

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const cwd = path.join(__dirname);

console.log('[INFO] Starting Strapi development server...');
const proc = spawn(npmCmd, ['run', 'develop'], {
  cwd,
  stdio: 'inherit',
  shell: true
});

proc.on('exit', (code) => {
  console.error(`[ERROR] Strapi exited with code ${code}`);
  process.exit(code);
});

process.on('SIGINT', () => {
  console.log('[INFO] Stopping Strapi...');
  proc.kill('SIGINT');
});
