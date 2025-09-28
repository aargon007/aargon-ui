# Aargon UI 🎨✨

Aargon UI is a collection of headless, animated UI components for **React Native**, built using **Reanimated** and **Moti** for smooth and visually stunning UI effects. Each component is published as an individual package for maximum flexibility and tree-shaking.

## 🚀 Features

- **Headless UI components** - Style them however you want
- **Individual packages** - Install only what you need
- **Turbo monorepo** - Fast builds and development
- **TypeScript support** - Full type safety
- **React Native 0.81.4** - Latest stable version
- **Expo compatible** - Works with Expo ~54.0.10
- **Optimized performance** - Built with Reanimated 4

## 📦 Packages

### Core Components

- `aargon-button` - Animated button component
- `aargon-input` - Animated input component
- `aargon-modal` - Animated modal component
- `aargon-card` - Animated card component
- `aargon-switch` - Animated switch component

### Form Components

- `aargon-checkbox` - Animated checkbox component
- `aargon-radio` - Animated radio component
- `aargon-select` - Animated select component
- `aargon-dropdown` - Animated dropdown component

### Layout Components

- `aargon-accordion` - Animated accordion component
- `aargon-badge` - Animated badge component
- `aargon-progress` - Animated progress component
- `aargon-skeleton` - Animated skeleton component

### Feedback Components

- `aargon-snackbar` - Animated snackbar component
- `aargon-toast` - Animated toast component

## 🛠️ Development

This is a Turbo monorepo with individual packages. Each package can be developed and published independently.

### Prerequisites

- Node.js 18+
- Yarn or npm
- React Native 0.81.4
- Expo ~54.0.10

### Getting Started

```bash
# Install dependencies
yarn install

# Build all packages
yarn build

# Run example app
cd examples/aargon-example
yarn start

# Develop a specific package
yarn dev --filter=aargon-button
```

### Package Development

Each package has its own:

- `package.json` with proper dependencies
- `tsconfig.json` for TypeScript configuration
- `src/` directory with source code
- `lib/` directory for built output

### Publishing

```bash
# Create a changeset
yarn changeset

# Version packages
yarn version-packages

# Publish packages
yarn release
```

## 📖 Usage

Install individual packages:

```bash
yarn add aargon-button aargon-input
```

```tsx
import { AnimatedButton } from 'aargon-button';
import { AnimatedInput } from 'aargon-input';

// Use the components
<AnimatedButton title="Click me" onPress={() => {}} />
<AnimatedInput placeholder="Enter text" />
```

## 🏗️ Architecture

- **Monorepo**: Managed with Turbo for fast builds
- **Individual packages**: Each component is a separate npm package
- **Shared configuration**: Common TypeScript and build configs
- **Example app**: Demonstrates all components in `examples/`
- **TypeScript**: Full type safety across all packages
