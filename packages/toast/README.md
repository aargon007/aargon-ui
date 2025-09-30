# Aargon Toast

A highly customizable, animated toast notification component for React Native with smooth animations and modern design.

[![npm version](https://badge.fury.io/js/@aargon-ui/toast.svg)](https://www.npmjs.com/package/@aargon-ui/toast)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **Multiple Variants** - Default, success, warning, and error styles
- 📏 **Size Options** - Small, medium, and large sizes
- ⚡ **Smooth Animations** - Spring, timing, and bounce animations
- 🎯 **Accessibility** - Full accessibility support with proper ARIA attributes
- 🎨 **Customizable Themes** - Complete theming system with colors and styling
- 🔧 **Flexible API** - Easy to use with comprehensive props
- 📱 **React Native** - Built specifically for React Native with Reanimated
- 🌟 **TypeScript** - Full TypeScript support with comprehensive types

## Installation

```bash
npm install @aargon-ui/toast
# or
yarn add @aargon-ui/toast
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react react-native react-native-reanimated
```

## Quick Start

```tsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { AnimatedToast } from '@aargon-ui/toast';

export default function App() {
    const [visible, setVisible] = useState(false);

    return (
        <View>
            <Button title="Show Toast" onPress={() => setVisible(true)} />
            <AnimatedToast visible={visible} onDismiss={() => setVisible(false)} message="This is a toast message" />
        </View>
    );
}
```

## Basic Usage

### Simple Toast

```tsx
const [visible, setVisible] = useState(false);

<AnimatedToast visible={visible} onDismiss={() => setVisible(false)} message="This is a toast message" />;
```

### With Icon

```tsx
<AnimatedToast visible={visible} onDismiss={() => setVisible(false)} message="Success message" icon="check-circle" variant="success" />
```

### Auto Dismiss

```tsx
<AnimatedToast visible={visible} onDismiss={() => setVisible(false)} message="Auto dismiss in 3 seconds" duration={3000} />
```

## Variants

### Default Variant

```tsx
<AnimatedToast variant="default" message="Default message" />
```

### Success Variant

```tsx
<AnimatedToast variant="success" message="Success message" />
```

### Warning Variant

```tsx
<AnimatedToast variant="warning" message="Warning message" />
```

### Error Variant

```tsx
<AnimatedToast variant="error" message="Error message" />
```

## Sizes

```tsx
<AnimatedToast size="sm" message="Small toast" />
<AnimatedToast size="md" message="Medium toast" />
<AnimatedToast size="lg" message="Large toast" />
```

## Animation Types

### Spring Animation (Default)

```tsx
<AnimatedToast animationType="spring" message="Spring animation" />
```

### Timing Animation

```tsx
<AnimatedToast animationType="timing" duration={500} message="Timing animation" />
```

### Bounce Animation

```tsx
<AnimatedToast animationType="bounce" message="Bounce animation" />
```

## Custom Styling

### Custom Theme

```tsx
const customTheme = {
    colors: {
        background: '#3B82F6',
        text: '#FFFFFF',
        icon: '#93C5FD',
    },
    borderRadius: 8,
};

<AnimatedToast theme={customTheme} message="Custom theme" />;
```

### With Shadow

```tsx
<AnimatedToast shadow={true} message="With shadow" />
```

## Advanced Usage

### Custom Position

```tsx
<AnimatedToast visible={visible} onDismiss={() => setVisible(false)} message="Top positioned" position="top" />
```

### Custom Duration

```tsx
<AnimatedToast visible={visible} onDismiss={() => setVisible(false)} message="Custom duration" duration={5000} />
```

### Disabled State

```tsx
<AnimatedToast disabled={true} message="Disabled" />
```

### Custom Icon

```tsx
<AnimatedToast visible={visible} onDismiss={() => setVisible(false)} message="Custom icon" icon="star" iconColor="#FFD700" />
```

## API Reference

### Props

| Prop            | Type                                             | Default     | Description                             |
| --------------- | ------------------------------------------------ | ----------- | --------------------------------------- |
| `visible`       | `boolean`                                        | `false`     | Whether the toast is visible            |
| `onDismiss`     | `() => void`                                     | -           | Function called when toast is dismissed |
| `message`       | `string`                                         | -           | Toast message text                      |
| `icon`          | `string`                                         | -           | Icon name from @expo/vector-icons       |
| `iconColor`     | `string`                                         | -           | Color of the icon                       |
| `variant`       | `"default" \| "success" \| "warning" \| "error"` | `"default"` | Visual variant                          |
| `size`          | `"sm" \| "md" \| "lg"`                           | `"md"`      | Size of the toast                       |
| `animationType` | `"timing" \| "spring" \| "bounce"`               | `"spring"`  | Type of animation                       |
| `duration`      | `number`                                         | `4000`      | Auto dismiss duration in milliseconds   |
| `position`      | `"top" \| "bottom"`                              | `"bottom"`  | Position of the toast                   |
| `disabled`      | `boolean`                                        | `false`     | Whether the toast is disabled           |
| `theme`         | `ToastTheme`                                     | -           | Custom theme object                     |
| `shadow`        | `boolean`                                        | `false`     | Whether to show shadow effect           |

### Types

```tsx
interface ToastTheme {
    colors: {
        background: string;
        text: string;
        icon: string;
        shadow: string;
    };
    borderRadius: number;
    fontFamily?: string;
}

type ToastVariant = 'default' | 'success' | 'warning' | 'error';
type ToastSize = 'sm' | 'md' | 'lg';
type AnimationType = 'timing' | 'spring' | 'bounce';
type ToastPosition = 'top' | 'bottom';
```

## Accessibility

The toast component includes full accessibility support:

- **ARIA attributes** - Proper `role="alert"` and `aria-live` attributes
- **Screen reader support** - Announces messages to screen readers
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
