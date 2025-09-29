# Aargon UI

A collection of animated UI components for React Native, built with TypeScript and React Native Reanimated.

## Features

- 🎨 **Animated Components**: Smooth animations powered by React Native Reanimated
- 📱 **React Native**: Built specifically for React Native applications
- 🎯 **TypeScript**: Full TypeScript support with comprehensive type definitions
- 🎨 **Customizable**: Extensive theming and styling options
- 🚀 **Performance**: Optimized for smooth 60fps animations
- 📦 **Tree-shakable**: Import only the components you need

## Installation

```bash
npm install aargon-ui
# or
yarn add aargon-ui
```

## Requirements

- React >= 18.0.0
- React Native >= 0.81.0
- React Native Reanimated >= 4.1.1

## Quick Start

```tsx
import React from 'react';
import { View } from 'react-native';
import { AnimatedButton, AnimatedCard, AnimatedInput, AnimatedAccordion } from 'aargon-ui';

export default function App() {
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <AnimatedCard>
                <AnimatedInput placeholder="Enter your name" />
                <AnimatedButton title="Submit" />
            </AnimatedCard>

            <AnimatedAccordion title="Settings">
                <Text>Accordion content here</Text>
            </AnimatedAccordion>
        </View>
    );
}
```

## Components

### Layout Components

- **AnimatedCard** - Animated card container
- **AnimatedAccordion** - Collapsible content sections
- **AnimatedModal** - Animated modal dialogs

### Form Components

- **AnimatedInput** - Animated text input
- **AnimatedButton** - Animated button component
- **AnimatedCheckbox** - Animated checkbox
- **AnimatedRadio** - Animated radio button
- **AnimatedSwitch** - Animated toggle switch
- **AnimatedSelect** - Animated dropdown select
- **AnimatedDropdown** - Animated dropdown menu

### Feedback Components

- **AnimatedToast** - Animated toast notifications
- **AnimatedSnackbar** - Animated snackbar messages
- **AnimatedBadge** - Animated badge component
- **AnimatedProgressBar** - Animated progress indicator
- **AnimatedSkeleton** - Animated loading skeleton

## Theming

All components support extensive theming options:

```tsx
import { AnimatedButton } from 'aargon-ui';

<AnimatedButton title="Themed Button" variant="primary" size="large" animation="bounce" />;
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## License

MIT © [Md Muhaiminul](https://github.com/aargon007)

## Links

- [GitHub Repository](https://github.com/aargon007/aargon-ui)
- [Documentation](https://github.com/aargon007/aargon-ui#readme)
- [Report Issues](https://github.com/aargon007/aargon-ui/issues)
