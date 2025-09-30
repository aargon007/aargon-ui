# Aargon Button

A highly customizable, animated button component for React Native with smooth animations and modern design.

[![npm version](https://badge.fury.io/js/@aargon-ui/button.svg)](https://www.npmjs.com/package/@aargon-ui/button)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **Multiple Variants** - Default, solid, outline, ghost, and link styles
- 📏 **Size Options** - Small, medium, and large sizes
- ⚡ **Smooth Animations** - Spring, timing, and bounce animations
- 🎯 **Accessibility** - Full accessibility support with proper ARIA attributes
- 🎨 **Customizable Themes** - Complete theming system with colors and styling
- 🔧 **Flexible API** - Easy to use with comprehensive props
- 📱 **React Native** - Built specifically for React Native with Reanimated
- 🎭 **Icon Support** - Customizable icons with multiple positions
- 🌟 **TypeScript** - Full TypeScript support with comprehensive types

## Installation

```bash
npm install @aargon-ui/button
# or
yarn add @aargon-ui/button
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react react-native react-native-reanimated @expo/vector-icons
```

## Quick Start

```tsx
import React from 'react';
import { View } from 'react-native';
import { AnimatedButton } from '@aargon-ui/button';

export default function App() {
    return (
        <View>
            <AnimatedButton onPress={() => console.log('Pressed!')}>Click Me</AnimatedButton>
        </View>
    );
}
```

## Basic Usage

### Simple Button

```tsx
<AnimatedButton onPress={() => console.log('Pressed!')}>Click Me</AnimatedButton>
```

### With Icon

```tsx
<AnimatedButton icon="heart" iconPosition="left" onPress={() => console.log('Liked!')}>
    Like
</AnimatedButton>
```

### Loading State

```tsx
<AnimatedButton loading={true} onPress={() => console.log('Loading...')}>
    Loading...
</AnimatedButton>
```

## Variants

### Default Variant

```tsx
<AnimatedButton variant="default">Default</AnimatedButton>
```

### Solid Variant

```tsx
<AnimatedButton variant="solid">Solid</AnimatedButton>
```

### Outline Variant

```tsx
<AnimatedButton variant="outline">Outline</AnimatedButton>
```

### Ghost Variant

```tsx
<AnimatedButton variant="ghost">Ghost</AnimatedButton>
```

### Link Variant

```tsx
<AnimatedButton variant="link">Link</AnimatedButton>
```

## Sizes

```tsx
<AnimatedButton size="sm">Small</AnimatedButton>
<AnimatedButton size="md">Medium</AnimatedButton>
<AnimatedButton size="lg">Large</AnimatedButton>
```

## Animation Types

### Spring Animation (Default)

```tsx
<AnimatedButton animationType="spring">Spring</AnimatedButton>
```

### Timing Animation

```tsx
<AnimatedButton animationType="timing" duration={500}>
    Timing
</AnimatedButton>
```

### Bounce Animation

```tsx
<AnimatedButton animationType="bounce">Bounce</AnimatedButton>
```

## Custom Styling

### Custom Theme

```tsx
const customTheme = {
    colors: {
        background: '#3B82F6',
        text: '#FFFFFF',
        border: '#1D4ED8',
    },
    borderRadius: 12,
};

<AnimatedButton theme={customTheme}>Custom Theme</AnimatedButton>;
```

### With Shadow

```tsx
<AnimatedButton shadow={true}>With Shadow</AnimatedButton>
```

## Advanced Usage

### Icon Positions

```tsx
<AnimatedButton icon="arrow-right" iconPosition="left">Left Icon</AnimatedButton>
<AnimatedButton icon="arrow-right" iconPosition="right">Right Icon</AnimatedButton>
```

### Disabled State

```tsx
<AnimatedButton disabled={true}>Disabled</AnimatedButton>
```

### Full Width

```tsx
<AnimatedButton fullWidth={true}>Full Width</AnimatedButton>
```

## API Reference

### Props

| Prop            | Type                                                     | Default     | Description                            |
| --------------- | -------------------------------------------------------- | ----------- | -------------------------------------- |
| `children`      | `React.ReactNode`                                        | -           | Content to display in the button       |
| `onPress`       | `() => void`                                             | -           | Function called when button is pressed |
| `variant`       | `"default" \| "solid" \| "outline" \| "ghost" \| "link"` | `"default"` | Visual variant                         |
| `size`          | `"sm" \| "md" \| "lg"`                                   | `"md"`      | Size of the button                     |
| `animationType` | `"timing" \| "spring" \| "bounce"`                       | `"spring"`  | Type of animation                      |
| `duration`      | `number`                                                 | `300`       | Animation duration in milliseconds     |
| `icon`          | `string`                                                 | -           | Icon name from @expo/vector-icons      |
| `iconPosition`  | `"left" \| "right"`                                      | `"left"`    | Position of the icon                   |
| `loading`       | `boolean`                                                | `false`     | Whether the button is in loading state |
| `disabled`      | `boolean`                                                | `false`     | Whether the button is disabled         |
| `fullWidth`     | `boolean`                                                | `false`     | Whether the button takes full width    |
| `theme`         | `ButtonTheme`                                            | -           | Custom theme object                    |
| `shadow`        | `boolean`                                                | `false`     | Whether to show shadow effect          |

### Types

```tsx
interface ButtonTheme {
    colors: {
        background: string;
        text: string;
        border: string;
        shadow: string;
    };
    borderRadius: number;
    fontFamily?: string;
}

type ButtonVariant = 'default' | 'solid' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';
type AnimationType = 'timing' | 'spring' | 'bounce';
```

## Accessibility

The button component includes full accessibility support:

- **ARIA attributes** - Proper `role` and `aria-label` attributes
- **Keyboard navigation** - Supports keyboard interaction
- **Screen reader support** - Announces state changes to screen readers
- **Focus management** - Proper focus handling for keyboard users

## Requirements

- React Native 0.81.0+
- React 19.0.0+
- react-native-reanimated 3.0.0+
- @expo/vector-icons 15.0.2+

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
