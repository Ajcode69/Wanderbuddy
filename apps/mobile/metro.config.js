// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// ─── Monorepo support ───────────────────────────────────────
// Watch the entire monorepo so Metro can resolve workspace packages
config.watchFolders = [monorepoRoot];

// Tell Metro where to find node_modules (hoisted in workspace root)
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Ensure Metro doesn't try to resolve packages from conflicting locations
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
