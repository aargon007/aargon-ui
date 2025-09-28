const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add the packages directory to watchFolders
config.watchFolders = [path.resolve(__dirname, '../../packages')];

// Add source extensions for TypeScript files
config.resolver.sourceExts = [...config.resolver.sourceExts, 'ts', 'tsx'];

// Configure path aliases
config.resolver.alias = {
    '@packages': path.resolve(__dirname, '../../packages'),
    // Support direct package imports
    'aargon-accordion': path.resolve(__dirname, '../../packages/aargon-accordion/src'),
    'aargon-badge': path.resolve(__dirname, '../../packages/aargon-badge/src'),
    'aargon-button': path.resolve(__dirname, '../../packages/aargon-button/src'),
    'aargon-card': path.resolve(__dirname, '../../packages/aargon-card/src'),
    'aargon-checkbox': path.resolve(__dirname, '../../packages/aargon-checkbox/src'),
    'aargon-dropdown': path.resolve(__dirname, '../../packages/aargon-dropdown/src'),
    'aargon-input': path.resolve(__dirname, '../../packages/aargon-input/src'),
    'aargon-modal': path.resolve(__dirname, '../../packages/aargon-modal/src'),
    'aargon-progress': path.resolve(__dirname, '../../packages/aargon-progress/src'),
    'aargon-radio': path.resolve(__dirname, '../../packages/aargon-radio/src'),
    'aargon-select': path.resolve(__dirname, '../../packages/aargon-select/src'),
    'aargon-skeleton': path.resolve(__dirname, '../../packages/aargon-skeleton/src'),
    'aargon-snackbar': path.resolve(__dirname, '../../packages/aargon-snackbar/src'),
    'aargon-switch': path.resolve(__dirname, '../../packages/aargon-switch/src'),
    'aargon-toast': path.resolve(__dirname, '../../packages/aargon-toast/src'),
};

module.exports = config;
