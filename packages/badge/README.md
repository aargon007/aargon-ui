# Aargon Badge

A highly customizable, animated badge component for React Native with smooth animations and modern design.

[![npm version](https://badge.fury.io/js/@aargon-ui/badge.svg)](https://www.npmjs.com/package/@aargon-ui/badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **Multiple Variants** - Default, solid, outline, and ghost styles
- 📏 **Size Options** - Small, medium, and large sizes
- ⚡ **Smooth Animations** - Spring, timing, and bounce animations
- 🎯 **Accessibility** - Full accessibility support with proper ARIA attributes
- 🎨 **Customizable Themes** - Complete theming system with colors and styling
- 🔧 **Flexible API** - Easy to use with comprehensive props
- 📱 **React Native** - Built specifically for React Native with Reanimated
- 🌟 **TypeScript** - Full TypeScript support with comprehensive types

## Installation

```bash
npm install @aargon-ui/badge
# or
yarn add @aargon-ui/badge
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
import { AnimatedBadge } from '@aargon-ui/badge';

export default function App() {
    return (
        <View>
            <AnimatedBadge>New</AnimatedBadge>
        </View>
    );
}
```

## Basic Usage

### Simple Badge

```tsx
<AnimatedBadge>New</AnimatedBadge>
```

### With Count

```tsx
<AnimatedBadge count={5}>Messages</AnimatedBadge>
```

### Custom Content

```tsx
<AnimatedBadge>
    <Text>Custom</Text>
</AnimatedBadge>
```

## Variants

### Default Variant

```tsx
<AnimatedBadge variant="default">Default</AnimatedBadge>
```

### Solid Variant

```tsx
<AnimatedBadge variant="solid">Solid</AnimatedBadge>
```

### Outline Variant

```tsx
<AnimatedBadge variant="outline">Outline</AnimatedBadge>
```

### Ghost Variant

```tsx
<AnimatedBadge variant="ghost">Ghost</AnimatedBadge>
```

## Sizes

```tsx
<AnimatedBadge size="sm">Small</AnimatedBadge>
<AnimatedBadge size="md">Medium</AnimatedBadge>
<AnimatedBadge size="lg">Large</AnimatedBadge>
```

## Animation Types

### Spring Animation (Default)

```tsx
<AnimatedBadge animationType="spring">Spring</AnimatedBadge>
```

### Timing Animation

```tsx
<AnimatedBadge animationType="timing" duration={500}>
    Timing
</AnimatedBadge>
```

### Bounce Animation

```tsx
<AnimatedBadge animationType="bounce">Bounce</AnimatedBadge>
```

## Custom Styling

### Custom Theme

```tsx
const customTheme = {
    colors: {
        background: '#F0F9FF',
        text: '#0369A1',
        border: '#7DD3FC',
    },
    borderRadius: 12,
};

<AnimatedBadge theme={customTheme}>Custom Theme</AnimatedBadge>;
```

### With Shadow

```tsx
<AnimatedBadge shadow={true}>With Shadow</AnimatedBadge>
```

## Advanced Usage

### Animated Count

```tsx
const [count, setCount] = useState(0);

<AnimatedBadge count={count} animated={true}>
    Notifications
</AnimatedBadge>;
```

### Custom Position

```tsx
<AnimatedBadge position="top-right">Top Right</AnimatedBadge>
<AnimatedBadge position="bottom-left">Bottom Left</AnimatedBadge>
```

### Disabled State

```tsx
<AnimatedBadge disabled={true}>Disabled</AnimatedBadge>
```

## API Reference

### Props

| Prop            | Type                                                           | Default       | Description                        |
| --------------- | -------------------------------------------------------------- | ------------- | ---------------------------------- |
| `children`      | `React.ReactNode`                                              | -             | Content to display in the badge    |
| `count`         | `number`                                                       | -             | Numeric count to display           |
| `variant`       | `"default" \| "solid" \| "outline" \| "ghost"`                 | `"default"`   | Visual variant                     |
| `size`          | `"sm" \| "md" \| "lg"`                                         | `"md"`        | Size of the badge                  |
| `animationType` | `"timing" \| "spring" \| "bounce"`                             | `"spring"`    | Type of animation                  |
| `duration`      | `number`                                                       | `300`         | Animation duration in milliseconds |
| `position`      | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left"` | `"top-right"` | Position of the badge              |
| `disabled`      | `boolean`                                                      | `false`       | Whether the badge is disabled      |
| `animated`      | `boolean`                                                      | `false`       | Whether to animate count changes   |
| `theme`         | `BadgeTheme`                                                   | -             | Custom theme object                |
| `shadow`        | `boolean`                                                      | `false`       | Whether to show shadow effect      |

### Types

```tsx
interface BadgeTheme {
    colors: {
        background: string;
        text: string;
        border: string;
        shadow: string;
    };
    borderRadius: number;
    fontFamily?: string;
}

type BadgeVariant = 'default' | 'solid' | 'outline' | 'ghost';
type BadgeSize = 'sm' | 'md' | 'lg';
type AnimationType = 'timing' | 'spring' | 'bounce';
type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
```

## Accessibility

The badge component includes full accessibility support:

- **ARIA attributes** - Proper `aria-label` and `role` attributes
- **Screen reader support** - Announces count changes to screen readers
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
