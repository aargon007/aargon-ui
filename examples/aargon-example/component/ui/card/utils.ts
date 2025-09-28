import { Dimensions, Platform } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

// Types
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled' | 'glass' | 'gradient';
export type CardSize = 'sm' | 'md' | 'lg' | 'xl';
export type CardColorScheme = 'default' | 'primary' | 'secondary' | 'success' | 'error';
export type CardAnimationType = 'none' | 'scale' | 'lift' | 'tilt' | 'glow' | 'bounce' | 'flip' | 'slide';

export interface CardColors {
    background: string;
    border: string;
    text: string;
    shadow: string;
}

export interface CardShadow {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
}

// Constants
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const IS_WEB = Platform.OS === 'web';
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

// Color schemes
export const COLOR_SCHEMES: Record<CardColorScheme, CardColors> = {
    default: {
        background: '#FFFFFF',
        border: '#E2E8F0',
        text: '#1A202C',
        shadow: '#000000',
    },
    primary: {
        background: '#EBF8FF',
        border: '#90CDF4',
        text: '#2B6CB0',
        shadow: '#2B6CB0',
    },
    secondary: {
        background: '#FAF5FF',
        border: '#D6BCFA',
        text: '#6B46C1',
        shadow: '#6B46C1',
    },
    success: {
        background: '#F0FFF4',
        border: '#9AE6B4',
        text: '#276749',
        shadow: '#276749',
    },
    error: {
        background: '#FFF5F5',
        border: '#FEB2B2',
        text: '#C53030',
        shadow: '#C53030',
    },
};

// Variant styles
export const getVariantStyles = (
    variant: CardVariant,
    colorScheme: CardColorScheme
): ViewStyle => {
    const colors = COLOR_SCHEMES[colorScheme];

    switch (variant) {
        case 'elevated':
            return {
                backgroundColor: colors.background,
                borderWidth: 0,
                ...getShadow(2, colors.shadow),
            };
        case 'outlined':
            return {
                backgroundColor: colors.background,
                borderWidth: 1,
                borderColor: colors.border,
            };
        case 'filled':
            return {
                backgroundColor: colorScheme === 'default' ? '#F7FAFC' : colors.background,
                borderWidth: 0,
            };
        case 'glass':
            return {
                backgroundColor: colorScheme === 'default'
                    ? 'rgba(255, 255, 255, 0.8)'
                    : `${colors.background}CC`, // 80% opacity
                borderWidth: 1,
                borderColor: `${colors.border}80`, // 50% opacity
                ...(IS_IOS && { backdropFilter: 'blur(10px)' }),
            };
        case 'gradient':
            // Gradient is handled separately in the component
            return {
                backgroundColor: 'transparent',
                borderWidth: 0,
            };
        default:
            return {
                backgroundColor: colors.background,
                borderWidth: 1,
                borderColor: colors.border,
            };
    }
};

// Size styles
export const getSizeStyles = (size: CardSize): ViewStyle => {
    switch (size) {
        case 'sm':
            return {
                padding: 12,
                borderRadius: 8,
            };
        case 'lg':
            return {
                padding: 20,
                borderRadius: 12,
            };
        case 'xl':
            return {
                padding: 24,
                borderRadius: 16,
            };
        case 'md':
        default:
            return {
                padding: 16,
                borderRadius: 10,
            };
    }
};

// Text styles
export const getTextStyles = (size: CardSize, colorScheme: CardColorScheme): TextStyle => {
    const colors = COLOR_SCHEMES[colorScheme];

    const baseStyle: TextStyle = {
        color: colors.text,
        marginBottom: 8,
    };

    switch (size) {
        case 'sm':
            return {
                ...baseStyle,
                fontSize: 16,
                fontWeight: '600',
            };
        case 'lg':
            return {
                ...baseStyle,
                fontSize: 20,
                fontWeight: '700',
            };
        case 'xl':
            return {
                ...baseStyle,
                fontSize: 24,
                fontWeight: '700',
            };
        case 'md':
        default:
            return {
                ...baseStyle,
                fontSize: 18,
                fontWeight: '600',
            };
    }
};

// Shadow utilities
export const getShadow = (level: number, shadowColor: string = '#000000'): CardShadow => {
    const iosShadows: Record<number, CardShadow> = {
        0: {
            shadowColor,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
        },
        1: {
            shadowColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
        },
        2: {
            shadowColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 4,
        },
        3: {
            shadowColor,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 8,
        },
        4: {
            shadowColor,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.25,
            shadowRadius: 12,
            elevation: 12,
        },
        5: {
            shadowColor,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 16,
        },
    };

    return iosShadows[level] || iosShadows[1];
};

// Animation utilities
export const getAnimationConfig = (type: CardAnimationType) => {
    // Base spring config for smooth animations
    const baseSpringConfig = {
        damping: 15,
        mass: 1,
        stiffness: 150,
        overshootClamping: false,
        restDisplacementThreshold: 0.001,
        restSpeedThreshold: 0.001,
    };

    // Specific configs for different animation types
    switch (type) {
        case 'bounce':
            return {
                ...baseSpringConfig,
                damping: 10,
                stiffness: 200,
            };
        case 'glow':
            return {
                ...baseSpringConfig,
                damping: 20,
                stiffness: 120,
            };
        case 'flip':
            return {
                ...baseSpringConfig,
                damping: 12,
                stiffness: 180,
            };
        case 'slide':
            return {
                ...baseSpringConfig,
                damping: 18,
                stiffness: 160,
            };
        case 'lift':
        case 'scale':
        default:
            return baseSpringConfig;
    }
};

// Get animated styles based on animation type and pressed state
export const getAnimatedStyles = (
    animationType: CardAnimationType,
    pressed: SharedValue<number>,
    variant: CardVariant,
    colorScheme: CardColorScheme
) => {
    const colors = COLOR_SCHEMES[colorScheme];

    switch (animationType) {
        case 'scale':
            return {
                transform: [
                    { scale: pressed.value === 1 ? 0.96 : 1 },
                ],
            };
        case 'lift':
            return {
                transform: [
                    { translateY: pressed.value === 1 ? -8 : 0 },
                    { scale: pressed.value === 1 ? 1.02 : 1 },
                ],
                ...getShadow(pressed.value === 1 ? 4 : variant === 'elevated' ? 2 : 0, colors.shadow),
            };
        case 'tilt':
            return {
                transform: [
                    { perspective: 1000 },
                    { rotateX: `${pressed.value === 1 ? -5 : 0}deg` },
                    { rotateY: `${pressed.value === 1 ? 5 : 0}deg` },
                ],
            };
        case 'glow':
            return {
                ...getShadow(pressed.value === 1 ? 4 : variant === 'elevated' ? 2 : 0, colors.shadow),
                shadowOpacity: pressed.value === 1 ? 0.3 : variant === 'elevated' ? 0.15 : 0,
                shadowRadius: pressed.value === 1 ? 12 : variant === 'elevated' ? 6 : 0,
            };
        case 'bounce':
            return {
                transform: [
                    { scale: pressed.value === 1 ? 0.92 : 1 },
                ],
            };
        case 'flip':
            return {
                transform: [
                    { perspective: 1000 },
                    { rotateY: `${pressed.value === 1 ? 180 : 0}deg` },
                ],
                // backfaceVisibility: 'hidden',
            };
        case 'slide':
            return {
                transform: [
                    { translateX: pressed.value === 1 ? 10 : 0 },
                ],
            };
        case 'none':
        default:
            return {};
    }
};

// Get gradient colors based on color scheme
export const getGradientColors = (colorScheme: CardColorScheme): string[] => {
    switch (colorScheme) {
        case 'primary':
            return ['#4299E1', '#2B6CB0'];
        case 'secondary':
            return ['#9F7AEA', '#6B46C1'];
        case 'success':
            return ['#48BB78', '#276749'];
        case 'error':
            return ['#F56565', '#C53030'];
        default:
            return ['#F7FAFC', '#E2E8F0'];
    }
};