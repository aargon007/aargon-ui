# Aargon Checkbox

A highly customizable, animated checkbox component for React Native with smooth animations and modern design.

[![npm version](https://badge.fury.io/js/@aargon-ui/checkbox.svg)](https://www.npmjs.com/package/@aargon-ui/checkbox)
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
npm install @aargon-ui/checkbox
# or
yarn add @aargon-ui/checkbox
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
import { AnimatedCheckbox } from '@aargon-ui/checkbox';

export default function App() {
    const [checked, setChecked] = useState(false);

    return (
        <View>
            <AnimatedCheckbox checked={checked} onPress={() => setChecked(!checked)}>
                <Text>Check me</Text>
            </AnimatedCheckbox>
        </View>
    );
}
```

## Basic Usage

### Simple Checkbox

```tsx
const [checked, setChecked] = useState(false);

<AnimatedCheckbox checked={checked} onPress={() => setChecked(!checked)}>
    <Text>Check me</Text>
</AnimatedCheckbox>;
```

### Without Label

```tsx
<AnimatedCheckbox checked={checked} onPress={() => setChecked(!checked)} />
```

### Indeterminate State

```tsx
<AnimatedCheckbox checked={checked} indeterminate={true} onPress={() => setChecked(!checked)}>
    <Text>Indeterminate</Text>
</AnimatedCheckbox>
```

## Variants

### Default Variant

```tsx
<AnimatedCheckbox variant="default">Default</AnimatedCheckbox>
```

### Filled Variant

```tsx
<AnimatedCheckbox variant="filled">Filled</AnimatedCheckbox>
```

### Outlined Variant

```tsx
<AnimatedCheckbox variant="outlined">Outlined</AnimatedCheckbox>
```

## Sizes

```tsx
<AnimatedCheckbox size="sm">Small</AnimatedCheckbox>
<AnimatedCheckbox size="md">Medium</AnimatedCheckbox>
<AnimatedCheckbox size="lg">Large</AnimatedCheckbox>
```

## Animation Types

### Spring Animation (Default)

```tsx
<AnimatedCheckbox animationType="spring">Spring</AnimatedCheckbox>
```

### Timing Animation

```tsx
<AnimatedCheckbox animationType="timing" duration={500}>
    Timing
</AnimatedCheckbox>
```

### Bounce Animation

```tsx
<AnimatedCheckbox animationType="bounce">Bounce</AnimatedCheckbox>
```

## Custom Styling

### Custom Theme

```tsx
const customTheme = {
    colors: {
        background: '#3B82F6',
        border: '#1D4ED8',
        checkmark: '#FFFFFF',
    },
    borderRadius: 4,
};

<AnimatedCheckbox theme={customTheme}>Custom Theme</AnimatedCheckbox>;
```

### With Shadow

```tsx
<AnimatedCheckbox shadow={true}>With Shadow</AnimatedCheckbox>
```

## Advanced Usage

### Disabled State

```tsx
<AnimatedCheckbox disabled={true}>Disabled</AnimatedCheckbox>
```

### Custom Checkmark

```tsx
<AnimatedCheckbox customCheckmark={<Text>✓</Text>} checked={checked} onPress={() => setChecked(!checked)}>
    Custom Checkmark
</AnimatedCheckbox>
```

### Checkbox Group

```tsx
const [values, setValues] = useState(['option1']);

<View>
    <AnimatedCheckbox
        checked={values.includes('option1')}
        onPress={() => {
            if (values.includes('option1')) {
                setValues(values.filter(v => v !== 'option1'));
            } else {
                setValues([...values, 'option1']);
            }
        }}>
        Option 1
    </AnimatedCheckbox>
    <AnimatedCheckbox
        checked={values.includes('option2')}
        onPress={() => {
            if (values.includes('option2')) {
                setValues(values.filter(v => v !== 'option2'));
            } else {
                setValues([...values, 'option2']);
            }
        }}>
        Option 2
    </AnimatedCheckbox>
</View>;
```

## API Reference

### Props

| Prop              | Type                                  | Default     | Description                                    |
| ----------------- | ------------------------------------- | ----------- | ---------------------------------------------- |
| `children`        | `React.ReactNode`                     | -           | Label content                                  |
| `checked`         | `boolean`                             | `false`     | Whether the checkbox is checked                |
| `onPress`         | `() => void`                          | -           | Function called when checkbox is pressed       |
| `variant`         | `"default" \| "filled" \| "outlined"` | `"default"` | Visual variant                                 |
| `size`            | `"sm" \| "md" \| "lg"`                | `"md"`      | Size of the checkbox                           |
| `animationType`   | `"timing" \| "spring" \| "bounce"`    | `"spring"`  | Type of animation                              |
| `duration`        | `number`                              | `300`       | Animation duration in milliseconds             |
| `indeterminate`   | `boolean`                             | `false`     | Whether the checkbox is in indeterminate state |
| `disabled`        | `boolean`                             | `false`     | Whether the checkbox is disabled               |
| `customCheckmark` | `React.ReactNode`                     | -           | Custom checkmark element                       |
| `theme`           | `CheckboxTheme`                       | -           | Custom theme object                            |
| `shadow`          | `boolean`                             | `false`     | Whether to show shadow effect                  |

### Types

```tsx
interface CheckboxTheme {
    colors: {
        background: string;
        border: string;
        checkmark: string;
        shadow: string;
    };
    borderRadius: number;
    fontFamily?: string;
}

type CheckboxVariant = 'default' | 'filled' | 'outlined';
type CheckboxSize = 'sm' | 'md' | 'lg';
type AnimationType = 'timing' | 'spring' | 'bounce';
```

## Accessibility

The checkbox component includes full accessibility support:

- **ARIA attributes** - Proper `role="checkbox"` and `aria-checked` attributes
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
