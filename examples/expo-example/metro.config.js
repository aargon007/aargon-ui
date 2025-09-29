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
    'aargon-accordion': path.resolve(__dirname, '../../packages/accordion/src'),
    'aargon-badge': path.resolve(__dirname, '../../packages/badge/src'),
    'aargon-button': path.resolve(__dirname, '../../packages/button/src'),
    'aargon-card': path.resolve(__dirname, '../../packages/card/src'),
    'aargon-checkbox': path.resolve(__dirname, '../../packages/checkbox/src'),
    'aargon-dropdown': path.resolve(__dirname, '../../packages/dropdown/src'),
    'aargon-input': path.resolve(__dirname, '../../packages/input/src'),
    'aargon-modal': path.resolve(__dirname, '../../packages/modal/src'),
    'aargon-progress': path.resolve(__dirname, '../../packages/progress/src'),
    'aargon-radio': path.resolve(__dirname, '../../packages/radio/src'),
    'aargon-select': path.resolve(__dirname, '../../packages/select/src'),
    'aargon-skeleton': path.resolve(__dirname, '../../packages/skeleton/src'),
    'aargon-snackbar': path.resolve(__dirname, '../../packages/snackbar/src'),
    'aargon-switch': path.resolve(__dirname, '../../packages/switch/src'),
    'aargon-toast': path.resolve(__dirname, '../../packages/toast/src'),
};

module.exports = config;
