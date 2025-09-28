# Aargon UI - Unified Package

A unified package that provides access to all Aargon UI components in one place, while maintaining individual package functionality.

## Installation

```bash
npm install aargon-ui
# or
yarn add aargon-ui
```

## Usage

### Pattern 1: Import from unified package

```typescript
import {
    AnimatedButton,
    AnimatedAccordion,
    AnimatedCard,
    AnimatedInput,
    AnimatedModal,
    AnimatedDropdown,
    AnimatedCheckbox,
    AnimatedRadio,
    AnimatedSwitch,
    AnimatedSkeleton,
    AnimatedSnackbar,
    ToastApp,
} from 'aargon-ui';
```

### Pattern 2: Import individual components from unified package

```typescript
import { AnimatedButton } from 'aargon-ui/button';
import { AnimatedAccordion } from 'aargon-ui/accordion';
import { AnimatedCard } from 'aargon-ui/card';
import { AnimatedInput } from 'aargon-ui/input';
import { AnimatedModal } from 'aargon-ui/modal';
import { AnimatedDropdown } from 'aargon-ui/dropdown';
import { AnimatedCheckbox } from 'aargon-ui/checkbox';
import { AnimatedRadio } from 'aargon-ui/radio';
import { AnimatedSwitch } from 'aargon-ui/switch';
import { AnimatedSkeleton } from 'aargon-ui/skeleton';
import { AnimatedSnackbar } from 'aargon-ui/snackbar';
import { ToastApp } from 'aargon-ui/toast';
```

### Pattern 3: Import from individual packages (existing)

```typescript
import { AnimatedButton } from 'aargon-button';
import { AnimatedAccordion } from 'aargon-accordion';
import { AnimatedCard } from 'aargon-card';
// ... etc
```

## Available Components

- **AnimatedButton** - Animated button component
- **AnimatedAccordion** - Collapsible accordion component
- **AnimatedCard** - Card container component
- **AnimatedInput** - Input field component
- **AnimatedModal** - Modal dialog component
- **AnimatedDropdown** - Dropdown selection component
- **AnimatedCheckbox** - Checkbox input component
- **AnimatedRadio** - Radio button component
- **AnimatedSwitch** - Toggle switch component
- **AnimatedSkeleton** - Loading skeleton component
- **AnimatedSnackbar** - Snackbar notification component
- **ToastApp** - Toast notification system

## Type Exports

The unified package also exports all the types from individual packages with proper namespacing to avoid conflicts:

```typescript
import type {
    AnimatedButtonProps,
    ButtonVariant,
    ButtonSize,
    ButtonAnimationType,
    ButtonTheme,
    AnimatedAccordionProps,
    AccordionVariant,
    AccordionSize,
    AccordionAnimationType,
    AccordionTheme,
} from 'aargon-ui';
```

## Benefits

1. **Single Package**: Install one package to get all components
2. **Tree Shaking**: Individual component imports are supported for optimal bundle size
3. **Backward Compatibility**: Existing individual package imports continue to work
4. **Type Safety**: Full TypeScript support with proper type exports
5. **Consistent API**: All components follow the same design patterns

## Individual Packages

You can still use individual packages if you prefer:

- `aargon-button`
- `aargon-accordion`
- `aargon-card`
- `aargon-input`
- `aargon-modal`
- `aargon-dropdown`
- `aargon-checkbox`
- `aargon-radio`
- `aargon-switch`
- `aargon-skeleton`
- `aargon-snackbar`
- `aargon-toast`

## License

MIT
