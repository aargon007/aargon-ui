# Aargon UI 🎨✨

Aargon UI is a collection of headless, animated UI components for **React Native**, built using **Reanimated** and **Moti** for smooth and visually stunning UI effects. Each component is published as an individual package for maximum flexibility and tree-shaking.

> 🚀 **Beta Available!** The unified `aargon-ui` package is now available in beta with all components bundled together for easier installation and usage.

[![npm version](https://badge.fury.io/js/aargon-ui.svg)](https://www.npmjs.com/package/aargon-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## 🚀 Features

- **Headless UI components** - Style them however you want
- **Individual packages** - Install only what you need
- **Turbo monorepo** - Fast builds and development
- **TypeScript support** - Full type safety
- **React Native 0.81.4** - Latest stable version
- **Expo compatible** - Works with Expo ~54.0.10
- **Optimized performance** - Built with Reanimated 4
- **Accessibility** - Full accessibility support with ARIA attributes
- **Customizable** - Complete theming and styling system

## 📦 Installation Options

### Option 1: Unified Package (Beta) 🚀

Install all components at once with the unified package:

```bash
# Install beta version
npm install aargon-ui@beta

# Or with yarn
yarn add aargon-ui@beta
```

**Benefits:**

- ✅ Single package installation
- ✅ All components included
- ✅ Simplified imports
- ✅ Consistent versioning

### Option 2: Individual Packages 📦

Install only the components you need:

```bash
# Install specific components
npm install @aargon-ui/accordion @aargon-ui/button @aargon-ui/input

# Or with yarn
yarn add @aargon-ui/accordion @aargon-ui/button @aargon-ui/input
```

**Benefits:**

- ✅ Smaller bundle size
- ✅ Tree-shaking friendly
- ✅ Granular control
- ✅ Independent versioning

## Package Versions

| Name                                       | Latest Version                                                                                                            |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| [@aargon-ui/accordion](packages/accordion) | [![npm version](https://badge.fury.io/js/@aargon-ui%2Faccordion.svg)](https://www.npmjs.com/package/@aargon-ui/accordion) |
| [@aargon-ui/badge](packages/badge)         | [![npm version](https://badge.fury.io/js/@aargon-ui%2Fbadge.svg)](https://www.npmjs.com/package/@aargon-ui/badge)         |
| [@aargon-ui/button](packages/button)       | [![npm version](https://badge.fury.io/js/@aargon-ui%2Fbutton.svg)](https://www.npmjs.com/package/@aargon-ui/button)       |
| [@aargon-ui/card](packages/card)           | [![npm version](https://badge.fury.io/js/@aargon-ui%2Fcard.svg)](https://www.npmjs.com/package/@aargon-ui/card)           |
| [@aargon-ui/checkbox](packages/checkbox)   | [![npm version](https://badge.fury.io/js/@aargon-ui%2Fcheckbox.svg)](https://www.npmjs.com/package/@aargon-ui/checkbox)   |
| [@aargon-ui/dropdown](packages/dropdown)   | [![npm version](https://badge.fury.io/js/@aargon-ui%2Fdropdown.svg)](https://www.npmjs.com/package/@aargon-ui/dropdown)   |
| [@aargon-ui/input](packages/input)         | [![npm version](https://badge.fury.io/js/@aargon-ui%2Finput.svg)](https://www.npmjs.com/package/@aargon-ui/input)         |
| [@aargon-ui/modal](packages/modal)         | [![npm version](https://badge.fury.io/js/@aargon-ui%2Fmodal.svg)](https://www.npmjs.com/package/@aargon-ui/modal)         |
| [@aargon-ui/progress](packages/progress)   | [![npm version](https://badge.fury.io/js/@aargon-ui%2Fprogress.svg)](https://www.npmjs.com/package/@aargon-ui/progress)   |
| [@aargon-ui/radio](packages/radio)         | [![npm version](https://badge.fury.io/js/@aargon-ui%2Fradio.svg)](https://www.npmjs.com/package/@aargon-ui/radio)         |
| [@aargon-ui/select](packages/select)       | [![npm version](https://badge.fury.io/js/@aargon-ui%2Fselect.svg)](https://www.npmjs.com/package/@aargon-ui/select)       |
| [@aargon-ui/skeleton](packages/skeleton)   | [![npm version](https://badge.fury.io/js/@aargon-ui%2Fskeleton.svg)](https://www.npmjs.com/package/@aargon-ui/skeleton)   |
| [@aargon-ui/snackbar](packages/snackbar)   | [![npm version](https://badge.fury.io/js/@aargon-ui%2Fsnackbar.svg)](https://www.npmjs.com/package/@aargon-ui/snackbar)   |
| [@aargon-ui/switch](packages/switch)       | [![npm version](https://badge.fury.io/js/@aargon-ui%2Fswitch.svg)](https://www.npmjs.com/package/@aargon-ui/switch)       |
| [@aargon-ui/toast](packages/toast)         | [![npm version](https://badge.fury.io/js/@aargon-ui%2Ftoast.svg)](https://www.npmjs.com/package/@aargon-ui/toast)         |
| [aargon-ui](packages/aargon-ui)            | [![npm version](https://badge.fury.io/js/aargon-ui.svg)](https://www.npmjs.com/package/aargon-ui)                         |

## 🚀 Quick Start

### Using the Unified Package (Beta)

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { AnimatedAccordion, AnimatedButton } from 'aargon-ui';

export default function App() {
    return (
        <View>
            <AnimatedAccordion title="Click to expand">
                <Text>This is the accordion content!</Text>
            </AnimatedAccordion>

            <AnimatedButton onPress={() => console.log('Pressed!')}>Click me!</AnimatedButton>
        </View>
    );
}
```

### Using Individual Packages

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { AnimatedAccordion } from '@aargon-ui/accordion';

export default function App() {
    return (
        <AnimatedAccordion title="Click to expand">
            <Text>This is the accordion content!</Text>
        </AnimatedAccordion>
    );
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for detailed information on how to contribute to this project.

### Quick Start for Contributors

1. **Fork and clone** the repository
2. **Install dependencies** with `yarn install`
3. **Start development** with `yarn dev:source`
4. **Create a feature branch** and make your changes
5. **Submit a pull request** following our guidelines

For more detailed information, please read our [Contributing Guidelines](CONTRIBUTING.md).

## 📖 Documentation

- **Package Documentation** - Each package has its own README
- **API Reference** - Comprehensive prop and type documentation
- **Examples** - Live examples in the example app
- **Changelog** - Version history and breaking changes

## 🏗️ Architecture

- **Monorepo**: Managed with Turbo for fast builds
- **Individual packages**: Each component is a separate npm package
- **Shared configuration**: Common TypeScript and build configs
- **Example app**: Demonstrates all components in `examples/`
- **TypeScript**: Full type safety across all packages
- **Hot reload**: Instant development with source files

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Native Reanimated** - For smooth animations
- **Lucide React Native** - For beautiful icons
- **Expo** - For the amazing development platform
- **Turbo** - For fast monorepo builds
- **All contributors** - Thank you for making this project better!

---

Made with ❤️ by [Aargon](https://github.com/aargon007)
