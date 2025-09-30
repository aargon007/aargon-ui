# Aargon Progress

A highly customizable, animated progress component for React Native with smooth animations and modern design.

[![npm version](https://badge.fury.io/js/@aargon-ui/progress.svg)](https://www.npmjs.com/package/@aargon-ui/progress)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **Multiple Variants** - Linear, circular, and step progress styles
- 📏 **Size Options** - Small, medium, and large sizes
- ⚡ **Smooth Animations** - Spring, timing, and bounce animations
- 🎯 **Accessibility** - Full accessibility support with proper ARIA attributes
- 🎨 **Customizable Themes** - Complete theming system with colors and styling
- 🔧 **Flexible API** - Easy to use with comprehensive props
- 📱 **React Native** - Built specifically for React Native with Reanimated
- 🌟 **TypeScript** - Full TypeScript support with comprehensive types

## Installation

```bash
npm install @aargon-ui/progress
# or
yarn add @aargon-ui/progress
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react react-native react-native-reanimated
```

## Quick Start

```tsx
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { AnimatedProgress } from '@aargon-ui/progress';

export default function App() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => (prev >= 100 ? 0 : prev + 10));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <View>
            <AnimatedProgress progress={progress} variant="linear" />
        </View>
    );
}
```

## Basic Usage

### Linear Progress

```tsx
<AnimatedProgress progress={50} variant="linear" />
```

### Circular Progress

```tsx
<AnimatedProgress progress={75} variant="circular" />
```

### Step Progress

```tsx
<AnimatedProgress progress={3} totalSteps={5} variant="step" />
```

## Variants

### Linear Variant

```tsx
<AnimatedProgress variant="linear" progress={50} />
```

### Circular Variant

```tsx
<AnimatedProgress variant="circular" progress={75} />
```

### Step Variant

```tsx
<AnimatedProgress variant="step" progress={2} totalSteps={4} />
```

## Sizes

```tsx
<AnimatedProgress size="sm" progress={50} />
<AnimatedProgress size="md" progress={50} />
<AnimatedProgress size="lg" progress={50} />
```

## Animation Types

### Spring Animation (Default)

```tsx
<AnimatedProgress animationType="spring" progress={50} />
```

### Timing Animation

```tsx
<AnimatedProgress animationType="timing" duration={500} progress={50} />
```

### Bounce Animation

```tsx
<AnimatedProgress animationType="bounce" progress={50} />
```

## Custom Styling

### Custom Theme

```tsx
const customTheme = {
    colors: {
        background: '#E5E7EB',
        progress: '#3B82F6',
        text: '#374151',
    },
    borderRadius: 4,
};

<AnimatedProgress theme={customTheme} progress={50} />;
```

### With Shadow

```tsx
<AnimatedProgress shadow={true} progress={50} />
```

## Advanced Usage

### With Label

```tsx
<AnimatedProgress progress={50} label="Loading..." showPercentage={true} />
```

### Indeterminate Progress

```tsx
<AnimatedProgress indeterminate={true} variant="linear" />
```

### Custom Colors

```tsx
<AnimatedProgress progress={50} progressColor="#10B981" backgroundColor="#D1FAE5" />
```

### Disabled State

```tsx
<AnimatedProgress disabled={true} progress={50} />
```

## API Reference

### Props

| Prop              | Type                               | Default    | Description                              |
| ----------------- | ---------------------------------- | ---------- | ---------------------------------------- |
| `progress`        | `number`                           | `0`        | Progress value (0-100)                   |
| `variant`         | `"linear" \| "circular" \| "step"` | `"linear"` | Visual variant                           |
| `size`            | `"sm" \| "md" \| "lg"`             | `"md"`     | Size of the progress                     |
| `animationType`   | `"timing" \| "spring" \| "bounce"` | `"spring"` | Type of animation                        |
| `duration`        | `number`                           | `300`      | Animation duration in milliseconds       |
| `totalSteps`      | `number`                           | -          | Total number of steps (for step variant) |
| `label`           | `string`                           | -          | Label text                               |
| `showPercentage`  | `boolean`                          | `false`    | Whether to show percentage               |
| `indeterminate`   | `boolean`                          | `false`    | Whether the progress is indeterminate    |
| `progressColor`   | `string`                           | -          | Custom progress color                    |
| `backgroundColor` | `string`                           | -          | Custom background color                  |
| `disabled`        | `boolean`                          | `false`    | Whether the progress is disabled         |
| `theme`           | `ProgressTheme`                    | -          | Custom theme object                      |
| `shadow`          | `boolean`                          | `false`    | Whether to show shadow effect            |

### Types

```tsx
interface ProgressTheme {
    colors: {
        background: string;
        progress: string;
        text: string;
        shadow: string;
    };
    borderRadius: number;
    fontFamily?: string;
}

type ProgressVariant = 'linear' | 'circular' | 'step';
type ProgressSize = 'sm' | 'md' | 'lg';
type AnimationType = 'timing' | 'spring' | 'bounce';
```

## Accessibility

The progress component includes full accessibility support:

- **ARIA attributes** - Proper `role="progressbar"` and `aria-valuenow` attributes
- **Screen reader support** - Announces progress changes to screen readers
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
