# Aargon Radio

A highly customizable, animated radio button component for React Native with smooth animations and modern design.

[![npm version](https://badge.fury.io/js/@aargon-ui/radio.svg)](https://www.npmjs.com/package/@aargon-ui/radio)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **Multiple Variants** - Default, filled, and outlined styles
- 📏 **Size Options** - Small, medium, and large sizes
- ⚡ **Smooth Animations** - Spring, timing, and bounce animations
- 🎯 **Accessibility** - Full accessibility support with proper ARIA attributes
- 🎨 **Customizable Themes** - Complete theming system with colors and styling
- 🔧 **Flexible API** - Easy to use with comprehensive props
- 📱 **React Native** - Built specifically for React Native with Reanimated
- 🌟 **TypeScript** - Full TypeScript support with comprehensive types

## Installation

```bash
npm install @aargon-ui/radio
# or
yarn add @aargon-ui/radio
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react react-native react-native-reanimated
```

## Quick Start

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { AnimatedRadio } from '@aargon-ui/radio';

export default function App() {
    const [selectedValue, setSelectedValue] = useState('');

    return (
        <View>
            <AnimatedRadio value="option1" selectedValue={selectedValue} onPress={() => setSelectedValue('option1')}>
                <Text>Option 1</Text>
            </AnimatedRadio>
        </View>
    );
}
```

## Basic Usage

### Simple Radio Button

```tsx
const [selectedValue, setSelectedValue] = useState('');

<AnimatedRadio value="option1" selectedValue={selectedValue} onPress={() => setSelectedValue('option1')}>
    <Text>Option 1</Text>
</AnimatedRadio>;
```

### Without Label

```tsx
<AnimatedRadio value="option1" selectedValue={selectedValue} onPress={() => setSelectedValue('option1')} />
```

### Radio Group

```tsx
const [selectedValue, setSelectedValue] = useState('');

<View>
    <AnimatedRadio value="option1" selectedValue={selectedValue} onPress={() => setSelectedValue('option1')}>
        <Text>Option 1</Text>
    </AnimatedRadio>
    <AnimatedRadio value="option2" selectedValue={selectedValue} onPress={() => setSelectedValue('option2')}>
        <Text>Option 2</Text>
    </AnimatedRadio>
</View>;
```

## Variants

### Default Variant

```tsx
<AnimatedRadio variant="default">Default</AnimatedRadio>
```

### Filled Variant

```tsx
<AnimatedRadio variant="filled">Filled</AnimatedRadio>
```

### Outlined Variant

```tsx
<AnimatedRadio variant="outlined">Outlined</AnimatedRadio>
```

## Sizes

```tsx
<AnimatedRadio size="sm">Small</AnimatedRadio>
<AnimatedRadio size="md">Medium</AnimatedRadio>
<AnimatedRadio size="lg">Large</AnimatedRadio>
```

## Animation Types

### Spring Animation (Default)

```tsx
<AnimatedRadio animationType="spring">Spring</AnimatedRadio>
```

### Timing Animation

```tsx
<AnimatedRadio animationType="timing" duration={500}>
    Timing
</AnimatedRadio>
```

### Bounce Animation

```tsx
<AnimatedRadio animationType="bounce">Bounce</AnimatedRadio>
```

## Custom Styling

### Custom Theme

```tsx
const customTheme = {
    colors: {
        background: '#3B82F6',
        border: '#1D4ED8',
        selected: '#FFFFFF',
    },
    borderRadius: 12,
};

<AnimatedRadio theme={customTheme}>Custom Theme</AnimatedRadio>;
```

### With Shadow

```tsx
<AnimatedRadio shadow={true}>With Shadow</AnimatedRadio>
```

## Advanced Usage

### Disabled State

```tsx
<AnimatedRadio disabled={true}>Disabled</AnimatedRadio>
```

### Custom Selected Indicator

```tsx
<AnimatedRadio
    customSelectedIndicator={<Text>✓</Text>}
    value="option1"
    selectedValue={selectedValue}
    onPress={() => setSelectedValue('option1')}>
    Custom Indicator
</AnimatedRadio>
```

### Radio Group with Array

```tsx
const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
];

const [selectedValue, setSelectedValue] = useState('');

{
    options.map(option => (
        <AnimatedRadio key={option.value} value={option.value} selectedValue={selectedValue} onPress={() => setSelectedValue(option.value)}>
            <Text>{option.label}</Text>
        </AnimatedRadio>
    ));
}
```

## API Reference

### Props

| Prop                      | Type                                  | Default     | Description                           |
| ------------------------- | ------------------------------------- | ----------- | ------------------------------------- |
| `children`                | `React.ReactNode`                     | -           | Label content                         |
| `value`                   | `string`                              | -           | Value of the radio button             |
| `selectedValue`           | `string`                              | -           | Currently selected value              |
| `onPress`                 | `() => void`                          | -           | Function called when radio is pressed |
| `variant`                 | `"default" \| "filled" \| "outlined"` | `"default"` | Visual variant                        |
| `size`                    | `"sm" \| "md" \| "lg"`                | `"md"`      | Size of the radio button              |
| `animationType`           | `"timing" \| "spring" \| "bounce"`    | `"spring"`  | Type of animation                     |
| `duration`                | `number`                              | `300`       | Animation duration in milliseconds    |
| `disabled`                | `boolean`                             | `false`     | Whether the radio is disabled         |
| `customSelectedIndicator` | `React.ReactNode`                     | -           | Custom selected indicator element     |
| `theme`                   | `RadioTheme`                          | -           | Custom theme object                   |
| `shadow`                  | `boolean`                             | `false`     | Whether to show shadow effect         |

### Types

```tsx
interface RadioTheme {
    colors: {
        background: string;
        border: string;
        selected: string;
        shadow: string;
    };
    borderRadius: number;
    fontFamily?: string;
}

type RadioVariant = 'default' | 'filled' | 'outlined';
type RadioSize = 'sm' | 'md' | 'lg';
type AnimationType = 'timing' | 'spring' | 'bounce';
```

## Accessibility

The radio component includes full accessibility support:

- **ARIA attributes** - Proper `role="radio"` and `aria-checked` attributes
- **Keyboard navigation** - Supports keyboard interaction
- **Screen reader support** - Announces state changes to screen readers
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
