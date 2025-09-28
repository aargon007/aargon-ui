# Aargon UI 🎨✨

Aargon UI is a collection of headless, animated UI components for **React Native**, built using **Reanimated** and **Moti** for smooth and visually stunning UI effects. Each component is published as an individual package for maximum flexibility and tree-shaking.

[![npm version](https://badge.fury.io/js/aargon-accordion.svg)](https://www.npmjs.com/package/aargon-accordion)
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

## 📦 Packages

### Core Components

| Package                                     | Description                                      | npm                                                                                                       | Status         |
| ------------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | -------------- |
| [**aargon-button**](packages/aargon-button) | Animated button component with multiple variants | [![npm version](https://badge.fury.io/js/aargon-button.svg)](https://www.npmjs.com/package/aargon-button) | 🚧 Coming Soon |
| [**aargon-input**](packages/aargon-input)   | Animated input component with floating labels    | [![npm version](https://badge.fury.io/js/aargon-input.svg)](https://www.npmjs.com/package/aargon-input)   | 🚧 Coming Soon |
| [**aargon-modal**](packages/aargon-modal)   | Animated modal component with backdrop           | [![npm version](https://badge.fury.io/js/aargon-modal.svg)](https://www.npmjs.com/package/aargon-modal)   | 🚧 Coming Soon |
| [**aargon-card**](packages/aargon-card)     | Animated card component with shadows             | [![npm version](https://badge.fury.io/js/aargon-card.svg)](https://www.npmjs.com/package/aargon-card)     | 🚧 Coming Soon |
| [**aargon-switch**](packages/aargon-switch) | Animated switch component                        | [![npm version](https://badge.fury.io/js/aargon-switch.svg)](https://www.npmjs.com/package/aargon-switch) | 🚧 Coming Soon |

### Form Components

| Package                                         | Description                 | npm                                                                                                           | Status         |
| ----------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------- |
| [**aargon-checkbox**](packages/aargon-checkbox) | Animated checkbox component | [![npm version](https://badge.fury.io/js/aargon-checkbox.svg)](https://www.npmjs.com/package/aargon-checkbox) | 🚧 Coming Soon |
| [**aargon-radio**](packages/aargon-radio)       | Animated radio component    | [![npm version](https://badge.fury.io/js/aargon-radio.svg)](https://www.npmjs.com/package/aargon-radio)       | 🚧 Coming Soon |
| [**aargon-select**](packages/aargon-select)     | Animated select component   | [![npm version](https://badge.fury.io/js/aargon-select.svg)](https://www.npmjs.com/package/aargon-select)     | 🚧 Coming Soon |
| [**aargon-dropdown**](packages/aargon-dropdown) | Animated dropdown component | [![npm version](https://badge.fury.io/js/aargon-dropdown.svg)](https://www.npmjs.com/package/aargon-dropdown) | 🚧 Coming Soon |

### Layout Components

| Package                                           | Description                  | npm                                                                                                             | Status         |
| ------------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------- |
| [**aargon-accordion**](packages/aargon-accordion) | Animated accordion component | [![npm version](https://badge.fury.io/js/aargon-accordion.svg)](https://www.npmjs.com/package/aargon-accordion) | ✅ Published   |
| [**aargon-badge**](packages/aargon-badge)         | Animated badge component     | [![npm version](https://badge.fury.io/js/aargon-badge.svg)](https://www.npmjs.com/package/aargon-badge)         | 🚧 Coming Soon |
| [**aargon-progress**](packages/aargon-progress)   | Animated progress component  | [![npm version](https://badge.fury.io/js/aargon-progress.svg)](https://www.npmjs.com/package/aargon-progress)   | 🚧 Coming Soon |
| [**aargon-skeleton**](packages/aargon-skeleton)   | Animated skeleton component  | [![npm version](https://badge.fury.io/js/aargon-skeleton.svg)](https://www.npmjs.com/package/aargon-skeleton)   | 🚧 Coming Soon |

### Feedback Components

| Package                                         | Description                 | npm                                                                                                           | Status         |
| ----------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------- |
| [**aargon-snackbar**](packages/aargon-snackbar) | Animated snackbar component | [![npm version](https://badge.fury.io/js/aargon-snackbar.svg)](https://www.npmjs.com/package/aargon-snackbar) | 🚧 Coming Soon |
| [**aargon-toast**](packages/aargon-toast)       | Animated toast component    | [![npm version](https://badge.fury.io/js/aargon-toast.svg)](https://www.npmjs.com/package/aargon-toast)       | 🚧 Coming Soon |

### Status Legend

- ✅ **Published** - Available on npm
- 🚧 **Coming Soon** - In development
- 🔄 **In Progress** - Currently being worked on

## 🚀 Quick Start

### Installation

Install individual packages as needed:

```bash
# Install published packages
npm install aargon-accordion

# Or with yarn
yarn add aargon-accordion
```

### Basic Usage

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { AnimatedAccordion } from 'aargon-accordion';

export default function App() {
    return (
        <AnimatedAccordion title="Click to expand">
            <Text>This is the accordion content!</Text>
        </AnimatedAccordion>
    );
}
```

## 🛠️ Development

This is a Turbo monorepo with individual packages. Each package can be developed and published independently.

### Prerequisites

- Node.js 18+
- Yarn 1.22.22+
- React Native 0.81.4
- Expo ~54.0.10
- React Native Reanimated 4.1.1+

### Getting Started

```bash
# Clone the repository
git clone https://github.com/aargon007/aargon-ui.git
cd aargon-ui

# Install dependencies
yarn install

# Build all packages
yarn build

# Run example app (source mode - no build needed)
yarn dev:source

# Run example app (with package builds)
yarn dev:all

# Develop a specific package
yarn dev --filter=aargon-button
```

### Development Modes

#### Source Development (Recommended)

```bash
yarn dev:source
```

- Uses TypeScript source files directly
- Instant hot reload
- No compilation step needed
- Fastest development experience

#### Build Development

```bash
yarn dev:all
```

- Compiles packages to JavaScript
- Tests production-like behavior
- Slower but more accurate

### Package Structure

Each package follows this structure:

```
packages/aargon-[component]/
├── src/
│   ├── Animated[Component].tsx    # Main component
│   ├── index.ts                   # Exports
│   └── utils.ts                   # Utilities and types
├── lib/                          # Compiled output
├── package.json                  # Package configuration
├── tsconfig.json                 # TypeScript config
├── README.md                     # Package documentation
├── CHANGELOG.md                  # Version history
└── LICENSE                       # MIT License
```

### Available Scripts

```bash
# Development
yarn dev:source          # Run example with source files
yarn dev:all            # Run example with built packages
yarn dev:packages       # Build packages in watch mode
yarn dev:example        # Run example only

# Building
yarn build              # Build all packages
yarn build:watch        # Build packages in watch mode

# Publishing
yarn publish:packages   # Publish all packages
yarn release           # Build and publish

# Utilities
yarn lint              # Lint all packages
yarn type-check        # Type check all packages
yarn clean             # Clean all build outputs
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
