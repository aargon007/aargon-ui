# @aargon-ui/accordion

A highly customizable, animated accordion component for React Native with smooth animations and modern design.

[![npm version](https://badge.fury.io/js/@aargon-ui%2Faccordion.svg)](https://www.npmjs.com/package/@aargon-ui/accordion)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **Multiple Variants** - Default, bordered, filled, and ghost styles
- 📏 **Size Options** - Small, medium, and large sizes
- ⚡ **Smooth Animations** - Spring, timing, and bounce animations
- 🎯 **Accessibility** - Full accessibility support with proper ARIA attributes
- 🎨 **Customizable Themes** - Complete theming system with colors and styling
- 🔧 **Flexible API** - Controlled and uncontrolled modes
- 📱 **React Native** - Built specifically for React Native with Reanimated
- 🎭 **Icon Support** - Customizable icons with multiple positions
- 🌟 **TypeScript** - Full TypeScript support with comprehensive types

## Installation

```bash
npm install @aargon-ui/accordion
# or
yarn add @aargon-ui/accordion
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react react-native react-native-reanimated @expo/vector-icons
```

## Quick Start

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { AnimatedAccordion } from '@aargon-ui/accordion';

export default function App() {
    return (
        <AnimatedAccordion title="Click to expand">
            <Text>This is the accordion content!</Text>
        </AnimatedAccordion>
    );
}
```

## Basic Usage

### Simple Accordion

```tsx
<AnimatedAccordion title="Simple Accordion">
    <Text>Your content here</Text>
</AnimatedAccordion>
```

### Controlled Accordion

```tsx
const [expanded, setExpanded] = useState(false);

<AnimatedAccordion title="Controlled Accordion" expanded={expanded} onToggle={setExpanded}>
    <Text>Controlled content</Text>
</AnimatedAccordion>;
```

### Initially Expanded

```tsx
<AnimatedAccordion title="Pre-expanded" defaultExpanded={true}>
    <Text>This starts expanded</Text>
</AnimatedAccordion>
```

## Variants

### Default Variant

```tsx
<AnimatedAccordion variant="default" title="Default">
    <Text>Default styling</Text>
</AnimatedAccordion>
```

### Bordered Variant

```tsx
<AnimatedAccordion variant="bordered" title="Bordered">
    <Text>With border styling</Text>
</AnimatedAccordion>
```

### Filled Variant

```tsx
<AnimatedAccordion variant="filled" title="Filled">
    <Text>With filled background</Text>
</AnimatedAccordion>
```

### Ghost Variant

```tsx
<AnimatedAccordion variant="ghost" title="Ghost">
    <Text>Minimal styling</Text>
</AnimatedAccordion>
```

## Sizes

```tsx
<AnimatedAccordion size="sm" title="Small">Small content</AnimatedAccordion>
<AnimatedAccordion size="md" title="Medium">Medium content</AnimatedAccordion>
<AnimatedAccordion size="lg" title="Large">Large content</AnimatedAccordion>
```

## Animation Types

### Spring Animation (Default)

```tsx
<AnimatedAccordion animationType="spring" title="Spring">
    <Text>Smooth spring animation</Text>
</AnimatedAccordion>
```

### Timing Animation

```tsx
<AnimatedAccordion animationType="timing" duration={500} title="Timing">
    <Text>Custom duration timing</Text>
</AnimatedAccordion>
```

### Bounce Animation

```tsx
<AnimatedAccordion animationType="bounce" title="Bounce">
    <Text>Bouncy animation</Text>
</AnimatedAccordion>
```

## Custom Styling

### Custom Theme

```tsx
const customTheme = {
    colors: {
        headerBackground: '#F0F9FF',
        headerBackgroundActive: '#E0F2FE',
        text: '#0369A1',
        textActive: '#0C4A6E',
        border: '#7DD3FC',
    },
    borderRadius: 12,
};

<AnimatedAccordion theme={customTheme} title="Custom Theme">
    <Text>Custom styled accordion</Text>
</AnimatedAccordion>;
```

### With Shadow

```tsx
<AnimatedAccordion shadow={true} title="With Shadow">
    <Text>Accordion with shadow effect</Text>
</AnimatedAccordion>
```

## Icon Customization

### Icon Position

```tsx
<AnimatedAccordion iconPosition="left" title="Left Icon">
  <Text>Icon on the left</Text>
</AnimatedAccordion>

<AnimatedAccordion iconPosition="right" title="Right Icon">
  <Text>Icon on the right (default)</Text>
</AnimatedAccordion>
```

### Hide Icon

```tsx
<AnimatedAccordion showIcon={false} title="No Icon">
    <Text>No expand/collapse icon</Text>
</AnimatedAccordion>
```

## Advanced Usage

### Custom Header Content

```tsx
<AnimatedAccordion
    headerContent={
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Custom Header</Text>
            <Badge>New</Badge>
        </View>
    }>
    <Text>Custom header content</Text>
</AnimatedAccordion>
```

### Disabled State

```tsx
<AnimatedAccordion disabled={true} title="Disabled">
    <Text>This accordion is disabled</Text>
</AnimatedAccordion>
```

### Nested Accordions

```tsx
<AnimatedAccordion title="Parent Accordion">
    <View>
        <Text>Parent content</Text>
        <AnimatedAccordion title="Nested Accordion" size="sm">
            <Text>Nested content</Text>
        </AnimatedAccordion>
    </View>
</AnimatedAccordion>
```

## API Reference

### Props

| Prop              | Type                                             | Default     | Description                                  |
| ----------------- | ------------------------------------------------ | ----------- | -------------------------------------------- |
| `children`        | `React.ReactNode`                                | -           | Content to display in the accordion body     |
| `title`           | `string`                                         | -           | Title text for the accordion header          |
| `headerContent`   | `React.ReactNode`                                | -           | Custom header content                        |
| `defaultExpanded` | `boolean`                                        | `false`     | Whether the accordion is expanded by default |
| `expanded`        | `boolean`                                        | -           | Controlled expanded state                    |
| `onToggle`        | `(expanded: boolean) => void`                    | -           | Callback when accordion is toggled           |
| `duration`        | `number`                                         | `300`       | Animation duration in milliseconds           |
| `animationType`   | `"timing" \| "spring" \| "bounce"`               | `"spring"`  | Type of animation                            |
| `variant`         | `"default" \| "bordered" \| "filled" \| "ghost"` | `"default"` | Visual variant                               |
| `size`            | `"sm" \| "md" \| "lg"`                           | `"md"`      | Size of the accordion                        |
| `disabled`        | `boolean`                                        | `false`     | Whether the accordion is disabled            |
| `showIcon`        | `boolean`                                        | `true`      | Whether to show the expand/collapse icon     |
| `iconPosition`    | `"left" \| "right"`                              | `"right"`   | Position of the icon                         |
| `theme`           | `AccordionTheme`                                 | -           | Custom theme object                          |
| `shadow`          | `boolean`                                        | `false`     | Whether to show shadow effect                |

### Types

```tsx
interface AccordionTheme {
    colors: {
        background: string;
        headerBackground: string;
        headerBackgroundActive: string;
        border: string;
        text: string;
        textActive: string;
        icon: string;
        iconActive: string;
        shadow: string;
    };
    borderRadius: number;
    fontFamily?: string;
}

type AccordionVariant = 'default' | 'bordered' | 'filled' | 'ghost';
type AccordionSize = 'sm' | 'md' | 'lg';
type AnimationType = 'timing' | 'spring' | 'bounce';
```

## Accessibility

The accordion component includes full accessibility support:

- **ARIA attributes** - Proper `aria-expanded` and `aria-controls` attributes
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
