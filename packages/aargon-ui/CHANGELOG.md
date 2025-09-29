# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-beta.1] - 2025-01-27

### Added

- 🎉 **Beta Release** - First beta release of Aargon UI
- ✨ **Complete Component Library** - 15+ animated React Native components
- 🎨 **Comprehensive Theming** - Extensive customization and theming options
- 📱 **React Native Optimized** - Built specifically for React Native with Reanimated
- 🎯 **TypeScript Support** - Full TypeScript definitions and type safety
- 🚀 **Performance Optimized** - Smooth 60fps animations with React Native Reanimated
- 📦 **Tree-shakable** - Import only the components you need

### Components

#### Layout Components

- **AnimatedCard** - Animated card container with multiple variants
- **AnimatedAccordion** - Collapsible content sections with smooth animations
- **AnimatedModal** - Animated modal dialogs with backdrop support

#### Form Components

- **AnimatedInput** - Animated text input with floating labels
- **AnimatedButton** - Animated button with multiple variants and sizes
- **AnimatedCheckbox** - Animated checkbox with custom styling
- **AnimatedRadio** - Animated radio button group
- **AnimatedSwitch** - Animated toggle switch
- **AnimatedSelect** - Animated dropdown select component
- **AnimatedDropdown** - Advanced animated dropdown with search

#### Feedback Components

- **AnimatedToast** - Animated toast notifications with stacking
- **AnimatedSnackbar** - Animated snackbar messages
- **AnimatedBadge** - Animated badge component
- **AnimatedProgressBar** - Animated progress indicator
- **AnimatedSkeleton** - Animated loading skeleton

### Features

- **Smooth Animations**: Spring-based animations with customizable duration and easing
- **Multiple Variants**: Each component supports multiple visual variants
- **Size Options**: Small, medium, large, and extra-large size options
- **Color Schemes**: Primary, secondary, success, warning, error, and neutral themes
- **Accessibility**: Full ARIA attributes and keyboard navigation support
- **Customization**: Extensive theming system with colors and styling options
- **TypeScript**: Complete type definitions for all components and props

### Technical Details

- **Dependencies**:
    - `react-native-reanimated` ~4.1.1 for smooth animations
    - `@expo/vector-icons` ^15.0.2 for icons
    - `react-native-svg` ^15.12.1 for icon rendering
    - `react-native-safe-area-context` ~5.6.0 for safe area handling
    - `react-native-gesture-handler` ~2.28.0 for gesture support
- **Peer Dependencies**:
    - `react` >=19.0.0
    - `react-native` >=0.81.0
- **TypeScript**: Full type definitions with comprehensive interfaces
- **Performance**: Optimized with React Native Reanimated for 60fps animations
- **Bundle Size**: Lightweight with minimal dependencies

### Installation

```bash
npm install aargon-ui@beta
# or
yarn add aargon-ui@beta
```

### Usage

```tsx
import { AnimatedButton, AnimatedCard, AnimatedInput } from 'aargon-ui';

export default function App() {
    return (
        <AnimatedCard>
            <AnimatedInput placeholder="Enter your name" />
            <AnimatedButton title="Submit" />
        </AnimatedCard>
    );
}
```

### Documentation

- Complete README with installation instructions
- Usage examples for all components
- API reference with prop descriptions
- TypeScript type definitions
- Accessibility guidelines
- Contributing guidelines

### Support

For questions, issues, or contributions:

- 📖 [Documentation](https://github.com/aargon007/aargon-ui#readme)
- 🐛 [Report Issues](https://github.com/aargon007/aargon-ui/issues)
- 💬 [Discussions](https://github.com/aargon007/aargon-ui/discussions)
- 📧 [Contact](https://github.com/aargon007)

---

**Full Changelog**: [1.0.0-beta.1](https://github.com/aargon007/aargon-ui/compare/v1.0.0-beta.1...v1.0.0-beta.1)
