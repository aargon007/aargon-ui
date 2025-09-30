# Aargon Skeleton

A highly customizable, animated skeleton loading component for React Native with smooth animations and modern design.

[![npm version](https://badge.fury.io/js/@aargon-ui/skeleton.svg)](https://www.npmjs.com/package/@aargon-ui/skeleton)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **Multiple Variants** - Text, rectangular, circular, and custom shapes
- 📏 **Size Options** - Small, medium, and large sizes
- ⚡ **Smooth Animations** - Spring, timing, and bounce animations
- 🎯 **Accessibility** - Full accessibility support with proper ARIA attributes
- 🎨 **Customizable Themes** - Complete theming system with colors and styling
- 🔧 **Flexible API** - Easy to use with comprehensive props
- 📱 **React Native** - Built specifically for React Native with Reanimated
- 🌟 **TypeScript** - Full TypeScript support with comprehensive types

## Installation

```bash
npm install @aargon-ui/skeleton
# or
yarn add @aargon-ui/skeleton
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react react-native react-native-reanimated
```

## Quick Start

```tsx
import React from 'react';
import { View } from 'react-native';
import { AnimatedSkeleton } from '@aargon-ui/skeleton';

export default function App() {
    return (
        <View>
            <AnimatedSkeleton variant="text" />
        </View>
    );
}
```

## Basic Usage

### Text Skeleton

```tsx
<AnimatedSkeleton variant="text" />
```

### Rectangular Skeleton

```tsx
<AnimatedSkeleton variant="rect" width={200} height={100} />
```

### Circular Skeleton

```tsx
<AnimatedSkeleton variant="circle" size={50} />
```

### Custom Skeleton

```tsx
<AnimatedSkeleton variant="custom">
    <View style={{ width: 100, height: 20, backgroundColor: 'transparent' }} />
</AnimatedSkeleton>
```

## Variants

### Text Variant

```tsx
<AnimatedSkeleton variant="text" />
```

### Rectangular Variant

```tsx
<AnimatedSkeleton variant="rect" width={200} height={100} />
```

### Circular Variant

```tsx
<AnimatedSkeleton variant="circle" size={50} />
```

### Custom Variant

```tsx
<AnimatedSkeleton variant="custom">
    <View style={{ width: 100, height: 20 }} />
</AnimatedSkeleton>
```

## Sizes

```tsx
<AnimatedSkeleton size="sm" variant="text" />
<AnimatedSkeleton size="md" variant="text" />
<AnimatedSkeleton size="lg" variant="text" />
```

## Animation Types

### Spring Animation (Default)

```tsx
<AnimatedSkeleton animationType="spring" variant="text" />
```

### Timing Animation

```tsx
<AnimatedSkeleton animationType="timing" duration={500} variant="text" />
```

### Bounce Animation

```tsx
<AnimatedSkeleton animationType="bounce" variant="text" />
```

## Custom Styling

### Custom Theme

```tsx
const customTheme = {
    colors: {
        background: '#E5E7EB',
        highlight: '#F3F4F6',
    },
    borderRadius: 4,
};

<AnimatedSkeleton theme={customTheme} variant="text" />;
```

### With Shadow

```tsx
<AnimatedSkeleton shadow={true} variant="text" />
```

## Advanced Usage

### Multiple Lines

```tsx
<View>
    <AnimatedSkeleton variant="text" width="80%" />
    <AnimatedSkeleton variant="text" width="60%" />
    <AnimatedSkeleton variant="text" width="90%" />
</View>
```

### Card Skeleton

```tsx
<View style={{ padding: 16, backgroundColor: 'white', borderRadius: 8 }}>
    <AnimatedSkeleton variant="circle" size={40} />
    <AnimatedSkeleton variant="text" width="70%" />
    <AnimatedSkeleton variant="rect" width="100%" height={100} />
</View>
```

### Disabled State

```tsx
<AnimatedSkeleton disabled={true} variant="text" />
```

### Custom Animation

```tsx
<AnimatedSkeleton animationType="timing" duration={1000} easing="ease-in-out" variant="text" />
```

## API Reference

### Props

| Prop            | Type                                       | Default    | Description                         |
| --------------- | ------------------------------------------ | ---------- | ----------------------------------- |
| `variant`       | `"text" \| "rect" \| "circle" \| "custom"` | `"text"`   | Visual variant                      |
| `size`          | `"sm" \| "md" \| "lg"`                     | `"md"`     | Size of the skeleton                |
| `width`         | `number \| string`                         | -          | Width of the skeleton               |
| `height`        | `number \| string`                         | -          | Height of the skeleton              |
| `animationType` | `"timing" \| "spring" \| "bounce"`         | `"spring"` | Type of animation                   |
| `duration`      | `number`                                   | `300`      | Animation duration in milliseconds  |
| `disabled`      | `boolean`                                  | `false`    | Whether the skeleton is disabled    |
| `theme`         | `SkeletonTheme`                            | -          | Custom theme object                 |
| `shadow`        | `boolean`                                  | `false`    | Whether to show shadow effect       |
| `children`      | `React.ReactNode`                          | -          | Custom content (for custom variant) |

### Types

```tsx
interface SkeletonTheme {
    colors: {
        background: string;
        highlight: string;
        shadow: string;
    };
    borderRadius: number;
    fontFamily?: string;
}

type SkeletonVariant = 'text' | 'rect' | 'circle' | 'custom';
type SkeletonSize = 'sm' | 'md' | 'lg';
type AnimationType = 'timing' | 'spring' | 'bounce';
```

## Accessibility

The skeleton component includes full accessibility support:

- **ARIA attributes** - Proper `role="progressbar"` and `aria-label` attributes
- **Screen reader support** - Announces loading state to screen readers
- **High contrast support** - Works well with system accessibility settings

## Requirements

- React Native 0.81.0+
- React 19.0.0+
- react-native-reanimated 3.0.0+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please:

1. Check the [documentation](https://github.com/aargon007/aargon-ui#readme)
2. Search [existing issues](https://github.com/aargon007/aargon-ui/issues)
3. Create a [new issue](https://github.com/aargon007/aargon-ui/issues/new)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

---

Made with ❤️ by [Aargon](https://github.com/aargon007)
