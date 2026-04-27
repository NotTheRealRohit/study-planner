const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

config.watchFolders = [];

config.resolver.blockList = [
  /\.opencode\/.*/,
];

config.resolver.extraNodeModules = {
  'better-sqlite3': require.resolve('./better-sqlite3-shim.js'),
};

module.exports = config;