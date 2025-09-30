# Aargon Card

A highly customizable, animated card component for React Native with smooth animations and modern design.

[![npm version](https://badge.fury.io/js/@aargon-ui/card.svg)](https://www.npmjs.com/package/@aargon-ui/card)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **Multiple Variants** - Default, elevated, outlined, and filled styles
- 📏 **Size Options** - Small, medium, and large sizes
- ⚡ **Smooth Animations** - Spring, timing, and bounce animations
- 🎯 **Accessibility** - Full accessibility support with proper ARIA attributes
- 🎨 **Customizable Themes** - Complete theming system with colors and styling
- 🔧 **Flexible API** - Easy to use with comprehensive props
- 📱 **React Native** - Built specifically for React Native with Reanimated
- 🌟 **TypeScript** - Full TypeScript support with comprehensive types

## Installation

```bash
npm install @aargon-ui/card
# or
yarn add @aargon-ui/card
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react react-native react-native-reanimated
```

## Quick Start

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { AnimatedCard } from '@aargon-ui/card';

export default function App() {
    return (
        <AnimatedCard>
            <Text>Card Content</Text>
        </AnimatedCard>
    );
}
```

## Basic Usage

### Simple Card

```tsx
<AnimatedCard>
    <Text>Simple card content</Text>
</AnimatedCard>
```

### With Header and Footer

```tsx
<AnimatedCard header={<Text>Card Header</Text>} footer={<Text>Card Footer</Text>}>
    <Text>Card body content</Text>
</AnimatedCard>
```

### Pressable Card

```tsx
<AnimatedCard onPress={() => console.log('Card pressed!')}>
    <Text>Pressable card</Text>
</AnimatedCard>
```

## Variants

### Default Variant

```tsx
<AnimatedCard variant="default">Default Card</AnimatedCard>
```

### Elevated Variant

```tsx
<AnimatedCard variant="elevated">Elevated Card</AnimatedCard>
```

### Outlined Variant

```tsx
<AnimatedCard variant="outlined">Outlined Card</AnimatedCard>
```

### Filled Variant

```tsx
<AnimatedCard variant="filled">Filled Card</AnimatedCard>
```

## Sizes

```tsx
<AnimatedCard size="sm">Small Card</AnimatedCard>
<AnimatedCard size="md">Medium Card</AnimatedCard>
<AnimatedCard size="lg">Large Card</AnimatedCard>
```

## Animation Types

### Spring Animation (Default)

```tsx
<AnimatedCard animationType="spring">Spring Card</AnimatedCard>
```

### Timing Animation

```tsx
<AnimatedCard animationType="timing" duration={500}>
    Timing Card
</AnimatedCard>
```

### Bounce Animation

```tsx
<AnimatedCard animationType="bounce">Bounce Card</AnimatedCard>
```

## Custom Styling

### Custom Theme

```tsx
const customTheme = {
    colors: {
        background: '#FFFFFF',
        border: '#E5E7EB',
        shadow: '#000000',
    },
    borderRadius: 16,
};

<AnimatedCard theme={customTheme}>Custom Theme Card</AnimatedCard>;
```

### With Shadow

```tsx
<AnimatedCard shadow={true}>Card with Shadow</AnimatedCard>
```

## Advanced Usage

### Card with Image

```tsx
<AnimatedCard>
    <Image source={{ uri: 'https://example.com/image.jpg' }} />
    <Text>Card with image</Text>
</AnimatedCard>
```

### Disabled State

```tsx
<AnimatedCard disabled={true}>Disabled Card</AnimatedCard>
```

### Full Width

```tsx
<AnimatedCard fullWidth={true}>Full Width Card</AnimatedCard>
```

## API Reference

### Props

| Prop            | Type                                                | Default     | Description                          |
| --------------- | --------------------------------------------------- | ----------- | ------------------------------------ |
| `children`      | `React.ReactNode`                                   | -           | Content to display in the card body  |
| `header`        | `React.ReactNode`                                   | -           | Header content                       |
| `footer`        | `React.ReactNode`                                   | -           | Footer content                       |
| `onPress`       | `() => void`                                        | -           | Function called when card is pressed |
| `variant`       | `"default" \| "elevated" \| "outlined" \| "filled"` | `"default"` | Visual variant                       |
| `size`          | `"sm" \| "md" \| "lg"`                              | `"md"`      | Size of the card                     |
| `animationType` | `"timing" \| "spring" \| "bounce"`                  | `"spring"`  | Type of animation                    |
| `duration`      | `number`                                            | `300`       | Animation duration in milliseconds   |
| `disabled`      | `boolean`                                           | `false`     | Whether the card is disabled         |
| `fullWidth`     | `boolean`                                           | `false`     | Whether the card takes full width    |
| `theme`         | `CardTheme`                                         | -           | Custom theme object                  |
| `shadow`        | `boolean`                                           | `false`     | Whether to show shadow effect        |

### Types

```tsx
interface CardTheme {
    colors: {
        background: string;
        border: string;
        shadow: string;
    };
    borderRadius: number;
    fontFamily?: string;
}

type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';
type CardSize = 'sm' | 'md' | 'lg';
type AnimationType = 'timing' | 'spring' | 'bounce';
```

## Accessibility

The card component includes full accessibility support:

- **ARIA attributes** - Proper `role` and `aria-label` attributes
- **Keyboard navigation** - Supports keyboard interaction when pressable
- **Screen reader support** - Announces content to screen readers
- **Focus management** - Proper focus handling for keyboard users

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
