# Aargon Input

A highly customizable, animated input component for React Native with smooth animations and modern design.

[![npm version](https://badge.fury.io/js/@aargon-ui/input.svg)](https://www.npmjs.com/package/@aargon-ui/input)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **Multiple Variants** - Default, filled, and outlined styles
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
npm install @aargon-ui/input
# or
yarn add @aargon-ui/input
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react react-native react-native-reanimated @expo/vector-icons
```

## Quick Start

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { AnimatedInput } from '@aargon-ui/input';

export default function App() {
    const [value, setValue] = useState('');

    return (
        <View>
            <AnimatedInput value={value} onChangeText={setValue} placeholder="Enter text..." />
        </View>
    );
}
```

## Basic Usage

### Simple Input

```tsx
const [value, setValue] = useState('');

<AnimatedInput value={value} onChangeText={setValue} placeholder="Enter text..." />;
```

### With Label

```tsx
<AnimatedInput label="Email" value={value} onChangeText={setValue} placeholder="Enter your email" />
```

### Password Input

```tsx
<AnimatedInput label="Password" value={value} onChangeText={setValue} placeholder="Enter password" secureTextEntry={true} />
```

## Variants

### Default Variant

```tsx
<AnimatedInput variant="default">Default</AnimatedInput>
```

### Filled Variant

```tsx
<AnimatedInput variant="filled">Filled</AnimatedInput>
```

### Outlined Variant

```tsx
<AnimatedInput variant="outlined">Outlined</AnimatedInput>
```

## Sizes

```tsx
<AnimatedInput size="sm">Small</AnimatedInput>
<AnimatedInput size="md">Medium</AnimatedInput>
<AnimatedInput size="lg">Large</AnimatedInput>
```

## Animation Types

### Spring Animation (Default)

```tsx
<AnimatedInput animationType="spring">Spring</AnimatedInput>
```

### Timing Animation

```tsx
<AnimatedInput animationType="timing" duration={500}>
    Timing
</AnimatedInput>
```

### Bounce Animation

```tsx
<AnimatedInput animationType="bounce">Bounce</AnimatedInput>
```

## Custom Styling

### Custom Theme

```tsx
const customTheme = {
    colors: {
        background: '#FFFFFF',
        border: '#E5E7EB',
        text: '#374151',
        placeholder: '#9CA3AF',
    },
    borderRadius: 8,
};

<AnimatedInput theme={customTheme}>Custom Theme</AnimatedInput>;
```

### With Shadow

```tsx
<AnimatedInput shadow={true}>With Shadow</AnimatedInput>
```

## Advanced Usage

### With Icon

```tsx
<AnimatedInput icon="search" iconPosition="left" value={value} onChangeText={setValue} placeholder="Search..." />
```

### With Error State

```tsx
<AnimatedInput value={value} onChangeText={setValue} placeholder="Enter email" error="Invalid email format" />
```

### Disabled State

```tsx
<AnimatedInput disabled={true}>Disabled</AnimatedInput>
```

### Multiline Input

```tsx
<AnimatedInput multiline={true} numberOfLines={4} value={value} onChangeText={setValue} placeholder="Enter message..." />
```

## API Reference

### Props

| Prop              | Type                                  | Default     | Description                         |
| ----------------- | ------------------------------------- | ----------- | ----------------------------------- |
| `value`           | `string`                              | -           | Input value                         |
| `onChangeText`    | `(text: string) => void`              | -           | Function called when text changes   |
| `placeholder`     | `string`                              | -           | Placeholder text                    |
| `label`           | `string`                              | -           | Label text                          |
| `variant`         | `"default" \| "filled" \| "outlined"` | `"default"` | Visual variant                      |
| `size`            | `"sm" \| "md" \| "lg"`                | `"md"`      | Size of the input                   |
| `animationType`   | `"timing" \| "spring" \| "bounce"`    | `"spring"`  | Type of animation                   |
| `duration`        | `number`                              | `300`       | Animation duration in milliseconds  |
| `icon`            | `string`                              | -           | Icon name from @expo/vector-icons   |
| `iconPosition`    | `"left" \| "right"`                   | `"left"`    | Position of the icon                |
| `secureTextEntry` | `boolean`                             | `false`     | Whether the input is for passwords  |
| `multiline`       | `boolean`                             | `false`     | Whether the input is multiline      |
| `numberOfLines`   | `number`                              | `1`         | Number of lines for multiline input |
| `disabled`        | `boolean`                             | `false`     | Whether the input is disabled       |
| `error`           | `string`                              | -           | Error message to display            |
| `theme`           | `InputTheme`                          | -           | Custom theme object                 |
| `shadow`          | `boolean`                             | `false`     | Whether to show shadow effect       |

### Types

```tsx
interface InputTheme {
    colors: {
        background: string;
        border: string;
        text: string;
        placeholder: string;
        error: string;
    };
    borderRadius: number;
    fontFamily?: string;
}

type InputVariant = 'default' | 'filled' | 'outlined';
type InputSize = 'sm' | 'md' | 'lg';
type AnimationType = 'timing' | 'spring' | 'bounce';
```

## Accessibility

The input component includes full accessibility support:

- **ARIA attributes** - Proper `role` and `aria-label` attributes
- **Keyboard navigation** - Supports keyboard interaction
- **Screen reader support** - Announces value changes to screen readers
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
