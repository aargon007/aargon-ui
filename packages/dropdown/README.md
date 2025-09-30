# Aargon Dropdown

A highly customizable, animated dropdown component for React Native with smooth animations and modern design.

[![npm version](https://badge.fury.io/js/@aargon-ui/dropdown.svg)](https://www.npmjs.com/package/@aargon-ui/dropdown)
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
npm install @aargon-ui/dropdown
# or
yarn add @aargon-ui/dropdown
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
import { AnimatedDropdown } from '@aargon-ui/dropdown';

const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
];

export default function App() {
    const [selectedValue, setSelectedValue] = useState('');

    return (
        <View>
            <AnimatedDropdown options={options} selectedValue={selectedValue} onSelect={setSelectedValue} placeholder="Select an option" />
        </View>
    );
}
```

## Basic Usage

### Simple Dropdown

```tsx
const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
];

<AnimatedDropdown options={options} selectedValue={selectedValue} onSelect={setSelectedValue} placeholder="Choose a fruit" />;
```

### With Custom Renderer

```tsx
<AnimatedDropdown
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
<AnimatedDropdown
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
<AnimatedDropdown variant="default">Default</AnimatedDropdown>
```

### Filled Variant

```tsx
<AnimatedDropdown variant="filled">Filled</AnimatedDropdown>
```

### Outlined Variant

```tsx
<AnimatedDropdown variant="outlined">Outlined</AnimatedDropdown>
```

## Sizes

```tsx
<AnimatedDropdown size="sm">Small</AnimatedDropdown>
<AnimatedDropdown size="md">Medium</AnimatedDropdown>
<AnimatedDropdown size="lg">Large</AnimatedDropdown>
```

## Animation Types

### Spring Animation (Default)

```tsx
<AnimatedDropdown animationType="spring">Spring</AnimatedDropdown>
```

### Timing Animation

```tsx
<AnimatedDropdown animationType="timing" duration={500}>
    Timing
</AnimatedDropdown>
```

### Bounce Animation

```tsx
<AnimatedDropdown animationType="bounce">Bounce</AnimatedDropdown>
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

<AnimatedDropdown theme={customTheme}>Custom Theme</AnimatedDropdown>;
```

### With Shadow

```tsx
<AnimatedDropdown shadow={true}>With Shadow</AnimatedDropdown>
```

## Advanced Usage

### Disabled State

```tsx
<AnimatedDropdown disabled={true}>Disabled</AnimatedDropdown>
```

### Searchable Dropdown

```tsx
<AnimatedDropdown
    options={options}
    selectedValue={selectedValue}
    onSelect={setSelectedValue}
    searchable={true}
    searchPlaceholder="Search options..."
/>
```

### Custom Header

```tsx
<AnimatedDropdown options={options} selectedValue={selectedValue} onSelect={setSelectedValue} header={<Text>Custom Header</Text>} />
```

## API Reference

### Props

| Prop            | Type                                        | Default     | Description                             |
| --------------- | ------------------------------------------- | ----------- | --------------------------------------- |
| `options`       | `DropdownOption[]`                          | -           | Array of dropdown options               |
| `selectedValue` | `string \| string[]`                        | -           | Currently selected value(s)             |
| `onSelect`      | `(value: string \| string[]) => void`       | -           | Function called when option is selected |
| `placeholder`   | `string`                                    | -           | Placeholder text                        |
| `variant`       | `"default" \| "filled" \| "outlined"`       | `"default"` | Visual variant                          |
| `size`          | `"sm" \| "md" \| "lg"`                      | `"md"`      | Size of the dropdown                    |
| `animationType` | `"timing" \| "spring" \| "bounce"`          | `"spring"`  | Type of animation                       |
| `duration`      | `number`                                    | `300`       | Animation duration in milliseconds      |
| `multiSelect`   | `boolean`                                   | `false`     | Whether multiple selection is allowed   |
| `searchable`    | `boolean`                                   | `false`     | Whether the dropdown is searchable      |
| `disabled`      | `boolean`                                   | `false`     | Whether the dropdown is disabled        |
| `renderItem`    | `(item: DropdownOption) => React.ReactNode` | -           | Custom item renderer                    |
| `header`        | `React.ReactNode`                           | -           | Custom header content                   |
| `theme`         | `DropdownTheme`                             | -           | Custom theme object                     |
| `shadow`        | `boolean`                                   | `false`     | Whether to show shadow effect           |

### Types

```tsx
interface DropdownOption {
    label: string;
    value: string;
    disabled?: boolean;
}

interface DropdownTheme {
    colors: {
        background: string;
        border: string;
        text: string;
        placeholder: string;
    };
    borderRadius: number;
    fontFamily?: string;
}

type DropdownVariant = 'default' | 'filled' | 'outlined';
type DropdownSize = 'sm' | 'md' | 'lg';
type AnimationType = 'timing' | 'spring' | 'bounce';
```

## Accessibility

The dropdown component includes full accessibility support:

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
