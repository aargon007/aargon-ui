# Aargon Switch

A highly customizable, animated switch component for React Native with smooth animations and modern design.

[![npm version](https://badge.fury.io/js/@aargon-ui/switch.svg)](https://www.npmjs.com/package/@aargon-ui/switch)
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
npm install @aargon-ui/switch
# or
yarn add @aargon-ui/switch
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
import { AnimatedSwitch } from '@aargon-ui/switch';

export default function App() {
    const [enabled, setEnabled] = useState(false);

    return (
        <View>
            <AnimatedSwitch value={enabled} onValueChange={setEnabled} />
        </View>
    );
}
```

## Basic Usage

### Simple Switch

```tsx
const [enabled, setEnabled] = useState(false);

<AnimatedSwitch value={enabled} onValueChange={setEnabled} />;
```

### With Label

```tsx
<AnimatedSwitch value={enabled} onValueChange={setEnabled} label="Enable notifications" />
```

### Disabled Switch

```tsx
<AnimatedSwitch value={enabled} onValueChange={setEnabled} disabled={true} />
```

## Variants

### Default Variant

```tsx
<AnimatedSwitch variant="default" value={enabled} onValueChange={setEnabled} />
```

### Filled Variant

```tsx
<AnimatedSwitch variant="filled" value={enabled} onValueChange={setEnabled} />
```

### Outlined Variant

```tsx
<AnimatedSwitch variant="outlined" value={enabled} onValueChange={setEnabled} />
```

## Sizes

```tsx
<AnimatedSwitch size="sm" value={enabled} onValueChange={setEnabled} />
<AnimatedSwitch size="md" value={enabled} onValueChange={setEnabled} />
<AnimatedSwitch size="lg" value={enabled} onValueChange={setEnabled} />
```

## Animation Types

### Spring Animation (Default)

```tsx
<AnimatedSwitch animationType="spring" value={enabled} onValueChange={setEnabled} />
```

### Timing Animation

```tsx
<AnimatedSwitch animationType="timing" duration={500} value={enabled} onValueChange={setEnabled} />
```

### Bounce Animation

```tsx
<AnimatedSwitch animationType="bounce" value={enabled} onValueChange={setEnabled} />
```

## Custom Styling

### Custom Theme

```tsx
const customTheme = {
    colors: {
        background: '#E5E7EB',
        active: '#3B82F6',
        thumb: '#FFFFFF',
    },
    borderRadius: 16,
};

<AnimatedSwitch theme={customTheme} value={enabled} onValueChange={setEnabled} />;
```

### With Shadow

```tsx
<AnimatedSwitch shadow={true} value={enabled} onValueChange={setEnabled} />
```

## Advanced Usage

### Custom Colors

```tsx
<AnimatedSwitch value={enabled} onValueChange={setEnabled} activeColor="#10B981" inactiveColor="#E5E7EB" thumbColor="#FFFFFF" />
```

### Custom Thumb

```tsx
<AnimatedSwitch value={enabled} onValueChange={setEnabled} customThumb={<Text>{enabled ? 'ON' : 'OFF'}</Text>} />
```

### Switch Group

```tsx
const [settings, setSettings] = useState({
    notifications: false,
    darkMode: true,
    location: false,
});

<View>
    <AnimatedSwitch
        value={settings.notifications}
        onValueChange={value => setSettings(prev => ({ ...prev, notifications: value }))}
        label="Notifications"
    />
    <AnimatedSwitch
        value={settings.darkMode}
        onValueChange={value => setSettings(prev => ({ ...prev, darkMode: value }))}
        label="Dark Mode"
    />
    <AnimatedSwitch
        value={settings.location}
        onValueChange={value => setSettings(prev => ({ ...prev, location: value }))}
        label="Location"
    />
</View>;
```

## API Reference

### Props

| Prop            | Type                                  | Default     | Description                               |
| --------------- | ------------------------------------- | ----------- | ----------------------------------------- |
| `value`         | `boolean`                             | `false`     | Whether the switch is enabled             |
| `onValueChange` | `(value: boolean) => void`            | -           | Function called when switch value changes |
| `label`         | `string`                              | -           | Label text                                |
| `variant`       | `"default" \| "filled" \| "outlined"` | `"default"` | Visual variant                            |
| `size`          | `"sm" \| "md" \| "lg"`                | `"md"`      | Size of the switch                        |
| `animationType` | `"timing" \| "spring" \| "bounce"`    | `"spring"`  | Type of animation                         |
| `duration`      | `number`                              | `300`       | Animation duration in milliseconds        |
| `activeColor`   | `string`                              | -           | Color when switch is active               |
| `inactiveColor` | `string`                              | -           | Color when switch is inactive             |
| `thumbColor`    | `string`                              | -           | Color of the thumb                        |
| `disabled`      | `boolean`                             | `false`     | Whether the switch is disabled            |
| `customThumb`   | `React.ReactNode`                     | -           | Custom thumb element                      |
| `theme`         | `SwitchTheme`                         | -           | Custom theme object                       |
| `shadow`        | `boolean`                             | `false`     | Whether to show shadow effect             |

### Types

```tsx
interface SwitchTheme {
    colors: {
        background: string;
        active: string;
        inactive: string;
        thumb: string;
        shadow: string;
    };
    borderRadius: number;
    fontFamily?: string;
}

type SwitchVariant = 'default' | 'filled' | 'outlined';
type SwitchSize = 'sm' | 'md' | 'lg';
type AnimationType = 'timing' | 'spring' | 'bounce';
```

## Accessibility

The switch component includes full accessibility support:

- **ARIA attributes** - Proper `role="switch"` and `aria-checked` attributes
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
