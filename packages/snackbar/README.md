# Aargon Snackbar

A highly customizable, animated snackbar component for React Native with smooth animations and modern design.

[![npm version](https://badge.fury.io/js/@aargon-ui/snackbar.svg)](https://www.npmjs.com/package/@aargon-ui/snackbar)
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
npm install @aargon-ui/snackbar
# or
yarn add @aargon-ui/snackbar
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
import { AnimatedSnackbar } from '@aargon-ui/snackbar';

export default function App() {
    const [visible, setVisible] = useState(false);

    return (
        <View>
            <Button title="Show Snackbar" onPress={() => setVisible(true)} />
            <AnimatedSnackbar visible={visible} onDismiss={() => setVisible(false)} message="This is a snackbar message" />
        </View>
    );
}
```

## Basic Usage

### Simple Snackbar

```tsx
const [visible, setVisible] = useState(false);

<AnimatedSnackbar visible={visible} onDismiss={() => setVisible(false)} message="This is a snackbar message" />;
```

### With Action

```tsx
<AnimatedSnackbar
    visible={visible}
    onDismiss={() => setVisible(false)}
    message="Item deleted"
    action={{
        label: 'Undo',
        onPress: () => console.log('Undo pressed'),
    }}
/>
```

### Auto Dismiss

```tsx
<AnimatedSnackbar visible={visible} onDismiss={() => setVisible(false)} message="Auto dismiss in 3 seconds" duration={3000} />
```

## Variants

### Default Variant

```tsx
<AnimatedSnackbar variant="default" message="Default message" />
```

### Success Variant

```tsx
<AnimatedSnackbar variant="success" message="Success message" />
```

### Warning Variant

```tsx
<AnimatedSnackbar variant="warning" message="Warning message" />
```

### Error Variant

```tsx
<AnimatedSnackbar variant="error" message="Error message" />
```

## Sizes

```tsx
<AnimatedSnackbar size="sm" message="Small snackbar" />
<AnimatedSnackbar size="md" message="Medium snackbar" />
<AnimatedSnackbar size="lg" message="Large snackbar" />
```

## Animation Types

### Spring Animation (Default)

```tsx
<AnimatedSnackbar animationType="spring" message="Spring animation" />
```

### Timing Animation

```tsx
<AnimatedSnackbar animationType="timing" duration={500} message="Timing animation" />
```

### Bounce Animation

```tsx
<AnimatedSnackbar animationType="bounce" message="Bounce animation" />
```

## Custom Styling

### Custom Theme

```tsx
const customTheme = {
    colors: {
        background: '#3B82F6',
        text: '#FFFFFF',
        action: '#93C5FD',
    },
    borderRadius: 8,
};

<AnimatedSnackbar theme={customTheme} message="Custom theme" />;
```

### With Shadow

```tsx
<AnimatedSnackbar shadow={true} message="With shadow" />
```

## Advanced Usage

### Custom Position

```tsx
<AnimatedSnackbar visible={visible} onDismiss={() => setVisible(false)} message="Top positioned" position="top" />
```

### Custom Duration

```tsx
<AnimatedSnackbar visible={visible} onDismiss={() => setVisible(false)} message="Custom duration" duration={5000} />
```

### Disabled State

```tsx
<AnimatedSnackbar disabled={true} message="Disabled" />
```

### Custom Action

```tsx
<AnimatedSnackbar
    visible={visible}
    onDismiss={() => setVisible(false)}
    message="Custom action"
    action={{
        label: 'Custom',
        onPress: () => console.log('Custom action'),
        style: { color: '#FF6B6B' },
    }}
/>
```

## API Reference

### Props

| Prop            | Type                                             | Default     | Description                                |
| --------------- | ------------------------------------------------ | ----------- | ------------------------------------------ |
| `visible`       | `boolean`                                        | `false`     | Whether the snackbar is visible            |
| `onDismiss`     | `() => void`                                     | -           | Function called when snackbar is dismissed |
| `message`       | `string`                                         | -           | Snackbar message text                      |
| `action`        | `SnackbarAction`                                 | -           | Action button configuration                |
| `variant`       | `"default" \| "success" \| "warning" \| "error"` | `"default"` | Visual variant                             |
| `size`          | `"sm" \| "md" \| "lg"`                           | `"md"`      | Size of the snackbar                       |
| `animationType` | `"timing" \| "spring" \| "bounce"`               | `"spring"`  | Type of animation                          |
| `duration`      | `number`                                         | `4000`      | Auto dismiss duration in milliseconds      |
| `position`      | `"top" \| "bottom"`                              | `"bottom"`  | Position of the snackbar                   |
| `disabled`      | `boolean`                                        | `false`     | Whether the snackbar is disabled           |
| `theme`         | `SnackbarTheme`                                  | -           | Custom theme object                        |
| `shadow`        | `boolean`                                        | `false`     | Whether to show shadow effect              |

### Types

```tsx
interface SnackbarAction {
    label: string;
    onPress: () => void;
    style?: TextStyle;
}

interface SnackbarTheme {
    colors: {
        background: string;
        text: string;
        action: string;
        shadow: string;
    };
    borderRadius: number;
    fontFamily?: string;
}

type SnackbarVariant = 'default' | 'success' | 'warning' | 'error';
type SnackbarSize = 'sm' | 'md' | 'lg';
type AnimationType = 'timing' | 'spring' | 'bounce';
type SnackbarPosition = 'top' | 'bottom';
```

## Accessibility

The snackbar component includes full accessibility support:

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
