# Aargon Modal

A highly customizable, animated modal component for React Native with smooth animations and modern design.

[![npm version](https://badge.fury.io/js/@aargon-ui/modal.svg)](https://www.npmjs.com/package/@aargon-ui/modal)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **Multiple Variants** - Default, fullscreen, and bottom sheet styles
- 📏 **Size Options** - Small, medium, and large sizes
- ⚡ **Smooth Animations** - Spring, timing, and bounce animations
- 🎯 **Accessibility** - Full accessibility support with proper ARIA attributes
- 🎨 **Customizable Themes** - Complete theming system with colors and styling
- 🔧 **Flexible API** - Easy to use with comprehensive props
- 📱 **React Native** - Built specifically for React Native with Reanimated
- 🌟 **TypeScript** - Full TypeScript support with comprehensive types

## Installation

```bash
npm install @aargon-ui/modal
# or
yarn add @aargon-ui/modal
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react react-native react-native-reanimated react-native-safe-area-context react-native-gesture-handler
```

## Quick Start

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { AnimatedModal } from '@aargon-ui/modal';

export default function App() {
    const [visible, setVisible] = useState(false);

    return (
        <View>
            <Button title="Open Modal" onPress={() => setVisible(true)} />
            <AnimatedModal visible={visible} onClose={() => setVisible(false)}>
                <Text>Modal Content</Text>
            </AnimatedModal>
        </View>
    );
}
```

## Basic Usage

### Simple Modal

```tsx
const [visible, setVisible] = useState(false);

<AnimatedModal visible={visible} onClose={() => setVisible(false)}>
    <Text>Modal Content</Text>
</AnimatedModal>;
```

### With Header and Footer

```tsx
<AnimatedModal visible={visible} onClose={() => setVisible(false)} header={<Text>Modal Header</Text>} footer={<Text>Modal Footer</Text>}>
    <Text>Modal body content</Text>
</AnimatedModal>
```

### Dismissible Modal

```tsx
<AnimatedModal visible={visible} onClose={() => setVisible(false)} dismissible={true}>
    <Text>Tap outside to close</Text>
</AnimatedModal>
```

## Variants

### Default Variant

```tsx
<AnimatedModal variant="default">Default</AnimatedModal>
```

### Fullscreen Variant

```tsx
<AnimatedModal variant="fullscreen">Fullscreen</AnimatedModal>
```

### Bottom Sheet Variant

```tsx
<AnimatedModal variant="bottomSheet">Bottom Sheet</AnimatedModal>
```

## Sizes

```tsx
<AnimatedModal size="sm">Small</AnimatedModal>
<AnimatedModal size="md">Medium</AnimatedModal>
<AnimatedModal size="lg">Large</AnimatedModal>
```

## Animation Types

### Spring Animation (Default)

```tsx
<AnimatedModal animationType="spring">Spring</AnimatedModal>
```

### Timing Animation

```tsx
<AnimatedModal animationType="timing" duration={500}>
    Timing
</AnimatedModal>
```

### Bounce Animation

```tsx
<AnimatedModal animationType="bounce">Bounce</AnimatedModal>
```

## Custom Styling

### Custom Theme

```tsx
const customTheme = {
    colors: {
        background: '#FFFFFF',
        overlay: 'rgba(0, 0, 0, 0.5)',
        text: '#374151',
    },
    borderRadius: 16,
};

<AnimatedModal theme={customTheme}>Custom Theme</AnimatedModal>;
```

### With Shadow

```tsx
<AnimatedModal shadow={true}>With Shadow</AnimatedModal>
```

## Advanced Usage

### Custom Overlay

```tsx
<AnimatedModal visible={visible} onClose={() => setVisible(false)} overlayStyle={{ backgroundColor: 'rgba(255, 0, 0, 0.3)' }}>
    <Text>Custom overlay</Text>
</AnimatedModal>
```

### Disabled State

```tsx
<AnimatedModal disabled={true}>Disabled</AnimatedModal>
```

### Custom Animation

```tsx
<AnimatedModal visible={visible} onClose={() => setVisible(false)} animationType="timing" duration={1000} easing="ease-in-out">
    <Text>Custom animation</Text>
</AnimatedModal>
```

## API Reference

### Props

| Prop            | Type                                         | Default     | Description                                           |
| --------------- | -------------------------------------------- | ----------- | ----------------------------------------------------- |
| `visible`       | `boolean`                                    | `false`     | Whether the modal is visible                          |
| `onClose`       | `() => void`                                 | -           | Function called when modal is closed                  |
| `children`      | `React.ReactNode`                            | -           | Modal content                                         |
| `header`        | `React.ReactNode`                            | -           | Header content                                        |
| `footer`        | `React.ReactNode`                            | -           | Footer content                                        |
| `variant`       | `"default" \| "fullscreen" \| "bottomSheet"` | `"default"` | Visual variant                                        |
| `size`          | `"sm" \| "md" \| "lg"`                       | `"md"`      | Size of the modal                                     |
| `animationType` | `"timing" \| "spring" \| "bounce"`           | `"spring"`  | Type of animation                                     |
| `duration`      | `number`                                     | `300`       | Animation duration in milliseconds                    |
| `dismissible`   | `boolean`                                    | `false`     | Whether the modal can be dismissed by tapping overlay |
| `disabled`      | `boolean`                                    | `false`     | Whether the modal is disabled                         |
| `overlayStyle`  | `ViewStyle`                                  | -           | Custom overlay styles                                 |
| `theme`         | `ModalTheme`                                 | -           | Custom theme object                                   |
| `shadow`        | `boolean`                                    | `false`     | Whether to show shadow effect                         |

### Types

```tsx
interface ModalTheme {
    colors: {
        background: string;
        overlay: string;
        text: string;
        shadow: string;
    };
    borderRadius: number;
    fontFamily?: string;
}

type ModalVariant = 'default' | 'fullscreen' | 'bottomSheet';
type ModalSize = 'sm' | 'md' | 'lg';
type AnimationType = 'timing' | 'spring' | 'bounce';
```

## Accessibility

The modal component includes full accessibility support:

- **ARIA attributes** - Proper `role="dialog"` and `aria-modal` attributes
- **Keyboard navigation** - Supports keyboard interaction
- **Screen reader support** - Announces modal state to screen readers
- **Focus management** - Proper focus handling for keyboard users

## Requirements

- React Native 0.81.0+
- React 19.0.0+
- react-native-reanimated 3.0.0+
- react-native-safe-area-context 5.6.0+
- react-native-gesture-handler 2.28.0+

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
