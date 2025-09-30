# Aargon Select

A highly customizable, animated select component for React Native with smooth animations and modern design.

[![npm version](https://badge.fury.io/js/@aargon-ui/select.svg)](https://www.npmjs.com/package/@aargon-ui/select)
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
npm install @aargon-ui/select
# or
yarn add @aargon-ui/select
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
import { AnimatedSelect } from '@aargon-ui/select';

const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
];

export default function App() {
    const [selectedValue, setSelectedValue] = useState('');

    return (
        <View>
            <AnimatedSelect options={options} selectedValue={selectedValue} onSelect={setSelectedValue} placeholder="Select an option" />
        </View>
    );
}
```

## Basic Usage

### Simple Select

```tsx
const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
];

<AnimatedSelect options={options} selectedValue={selectedValue} onSelect={setSelectedValue} placeholder="Choose a fruit" />;
```

### With Custom Renderer

```tsx
<AnimatedSelect
    options={options}
    selectedValue={selectedValue}
    onSelect={setSelectedValue}
    renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
            <Text>{item.label}</Text>
        </View>
    )}
/>
```

### Multi-Select

```tsx
<AnimatedSelect
    options={options}
    selectedValue={selectedValues}
    onSelect={setSelectedValues}
    multiSelect={true}
    placeholder="Choose multiple options"
/>
```

## Variants

### Default Variant

```tsx
<AnimatedSelect variant="default">Default</AnimatedSelect>
```

### Filled Variant

```tsx
<AnimatedSelect variant="filled">Filled</AnimatedSelect>
```

### Outlined Variant

```tsx
<AnimatedSelect variant="outlined">Outlined</AnimatedSelect>
```

## Sizes

```tsx
<AnimatedSelect size="sm">Small</AnimatedSelect>
<AnimatedSelect size="md">Medium</AnimatedSelect>
<AnimatedSelect size="lg">Large</AnimatedSelect>
```

## Animation Types

### Spring Animation (Default)

```tsx
<AnimatedSelect animationType="spring">Spring</AnimatedSelect>
```

### Timing Animation

```tsx
<AnimatedSelect animationType="timing" duration={500}>
    Timing
</AnimatedSelect>
```

### Bounce Animation

```tsx
<AnimatedSelect animationType="bounce">Bounce</AnimatedSelect>
```

## Custom Styling

### Custom Theme

```tsx
const customTheme = {
    colors: {
        background: '#FFFFFF',
        border: '#E5E7EB',
        text: '#374151',
    },
    borderRadius: 8,
};

<AnimatedSelect theme={customTheme}>Custom Theme</AnimatedSelect>;
```

### With Shadow

```tsx
<AnimatedSelect shadow={true}>With Shadow</AnimatedSelect>
```

## Advanced Usage

### Disabled State

```tsx
<AnimatedSelect disabled={true}>Disabled</AnimatedSelect>
```

### Searchable Select

```tsx
<AnimatedSelect
    options={options}
    selectedValue={selectedValue}
    onSelect={setSelectedValue}
    searchable={true}
    searchPlaceholder="Search options..."
/>
```

### Custom Header

```tsx
<AnimatedSelect options={options} selectedValue={selectedValue} onSelect={setSelectedValue} header={<Text>Custom Header</Text>} />
```

## API Reference

### Props

| Prop            | Type                                      | Default     | Description                             |
| --------------- | ----------------------------------------- | ----------- | --------------------------------------- |
| `options`       | `SelectOption[]`                          | -           | Array of select options                 |
| `selectedValue` | `string \| string[]`                      | -           | Currently selected value(s)             |
| `onSelect`      | `(value: string \| string[]) => void`     | -           | Function called when option is selected |
| `placeholder`   | `string`                                  | -           | Placeholder text                        |
| `variant`       | `"default" \| "filled" \| "outlined"`     | `"default"` | Visual variant                          |
| `size`          | `"sm" \| "md" \| "lg"`                    | `"md"`      | Size of the select                      |
| `animationType` | `"timing" \| "spring" \| "bounce"`        | `"spring"`  | Type of animation                       |
| `duration`      | `number`                                  | `300`       | Animation duration in milliseconds      |
| `multiSelect`   | `boolean`                                 | `false`     | Whether multiple selection is allowed   |
| `searchable`    | `boolean`                                 | `false`     | Whether the select is searchable        |
| `disabled`      | `boolean`                                 | `false`     | Whether the select is disabled          |
| `renderItem`    | `(item: SelectOption) => React.ReactNode` | -           | Custom item renderer                    |
| `header`        | `React.ReactNode`                         | -           | Custom header content                   |
| `theme`         | `SelectTheme`                             | -           | Custom theme object                     |
| `shadow`        | `boolean`                                 | `false`     | Whether to show shadow effect           |

### Types

```tsx
interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}

interface SelectTheme {
    colors: {
        background: string;
        border: string;
        text: string;
        placeholder: string;
    };
    borderRadius: number;
    fontFamily?: string;
}

type SelectVariant = 'default' | 'filled' | 'outlined';
type SelectSize = 'sm' | 'md' | 'lg';
type AnimationType = 'timing' | 'spring' | 'bounce';
```

## Accessibility

The select component includes full accessibility support:

- **ARIA attributes** - Proper `role="combobox"` and `aria-expanded` attributes
- **Keyboard navigation** - Supports keyboard interaction
- **Screen reader support** - Announces options and selections to screen readers
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
