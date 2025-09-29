import React, { forwardRef, useCallback, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    type ViewStyle,
    type TextStyle,
    type StyleProp,
    Platform,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolateColor,
} from 'react-native-reanimated';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';
export type CardSize = 'sm' | 'md' | 'lg' | 'xl';
export type CardColorScheme = 'default' | 'primary' | 'secondary' | 'success' | 'error';
export type CardAnimationType = 'none' | 'scale' | 'lift' | 'bounce';

export interface AnimatedCardProps {
    /** Card title */
    title?: string;
    /** Card subtitle */
    subtitle?: string;
    /** Card content */
    children?: React.ReactNode;
    /** Card variant */
    variant?: CardVariant;
    /** Card size */
    size?: CardSize;
    /** Card color scheme */
    colorScheme?: CardColorScheme;
    /** Animation type */
    animationType?: CardAnimationType;
    /** Whether the card is pressable */
    pressable?: boolean;
    /** Whether the card is disabled */
    disabled?: boolean;
    /** Whether the card takes full width */
    fullWidth?: boolean;
    /** Whether to show a divider between header and content */
    showDivider?: boolean;
    /** Whether to use a custom border radius */
    borderRadius?: number;
    /** Whether to show a footer */
    footer?: React.ReactNode;
    /** Callback when card is pressed */
    onPress?: () => void;
    /** Callback when card is long pressed */
    onLongPress?: () => void;
    /** Additional styles for the card container */
    style?: StyleProp<ViewStyle>;
    /** Additional styles for the card title */
    titleStyle?: StyleProp<TextStyle>;
    /** Additional styles for the card subtitle */
    subtitleStyle?: StyleProp<TextStyle>;
    /** Additional styles for the card content */
    contentStyle?: StyleProp<ViewStyle>;
    /** Additional styles for the card footer */
    footerStyle?: StyleProp<ViewStyle>;
    /** Test ID for testing */
    testID?: string;
    /** Accessibility label */
    accessibilityLabel?: string;
}

const getVariantStyles = (variant: CardVariant, colorScheme: CardColorScheme): ViewStyle => {
    const colors = {
        default: { background: '#FFFFFF', border: '#E2E8F0', text: '#1A202C' },
        primary: { background: '#EBF8FF', border: '#90CDF4', text: '#2B6CB0' },
        secondary: { background: '#FAF5FF', border: '#D6BCFA', text: '#6B46C1' },
        success: { background: '#F0FFF4', border: '#9AE6B4', text: '#276749' },
        error: { background: '#FFF5F5', border: '#FEB2B2', text: '#C53030' },
    };

    const color = colors[colorScheme];

    switch (variant) {
        case 'elevated':
            return {
                backgroundColor: color.background,
                borderWidth: 0,
                shadowColor: color.text,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
            };
        case 'outlined':
            return {
                backgroundColor: color.background,
                borderWidth: 1,
                borderColor: color.border,
            };
        case 'filled':
            return {
                backgroundColor: colorScheme === 'default' ? '#F7FAFC' : color.background,
                borderWidth: 0,
            };
        default:
            return {
                backgroundColor: color.background,
                borderWidth: 1,
                borderColor: color.border,
            };
    }
};

const getSizeStyles = (size: CardSize): ViewStyle => {
    switch (size) {
        case 'sm':
            return { padding: 12, borderRadius: 8 };
        case 'lg':
            return { padding: 20, borderRadius: 12 };
        case 'xl':
            return { padding: 24, borderRadius: 16 };
        case 'md':
        default:
            return { padding: 16, borderRadius: 10 };
    }
};

const getTextStyles = (size: CardSize, colorScheme: CardColorScheme): TextStyle => {
    const colors = {
        default: '#1A202C',
        primary: '#2B6CB0',
        secondary: '#6B46C1',
        success: '#276749',
        error: '#C53030',
    };

    const baseStyle: TextStyle = {
        color: colors[colorScheme],
        marginBottom: 8,
    };

    switch (size) {
        case 'sm':
            return { ...baseStyle, fontSize: 16, fontWeight: '600' };
        case 'lg':
            return { ...baseStyle, fontSize: 20, fontWeight: '700' };
        case 'xl':
            return { ...baseStyle, fontSize: 24, fontWeight: '700' };
        case 'md':
        default:
            return { ...baseStyle, fontSize: 18, fontWeight: '600' };
    }
};

const getAnimationConfig = (type: CardAnimationType) => {
    const baseConfig = { damping: 15, mass: 1, stiffness: 150 };
    
    switch (type) {
        case 'bounce':
            return { ...baseConfig, damping: 10, stiffness: 200 };
        case 'lift':
            return { ...baseConfig, damping: 18, stiffness: 160 };
        default:
            return baseConfig;
    }
};

const getAnimatedStyles = (
    animationType: CardAnimationType,
    pressed: any,
    variant: CardVariant
) => {
    switch (animationType) {
        case 'scale':
            return {
                transform: [{ scale: pressed.value === 1 ? 0.96 : 1 }],
            };
        case 'lift':
            return {
                transform: [
                    { translateY: pressed.value === 1 ? -8 : 0 },
                    { scale: pressed.value === 1 ? 1.02 : 1 },
                ],
                shadowOpacity: pressed.value === 1 ? 0.2 : variant === 'elevated' ? 0.1 : 0,
                shadowRadius: pressed.value === 1 ? 8 : variant === 'elevated' ? 4 : 0,
            };
        case 'bounce':
            return {
                transform: [{ scale: pressed.value === 1 ? 0.92 : 1 }],
            };
        default:
            return {};
    }
};

const AnimatedCard = forwardRef<View, AnimatedCardProps>((props, ref) => {
    const {
        title,
        subtitle,
        children,
        variant = 'default',
        size = 'md',
        colorScheme = 'default',
        animationType = 'scale',
        pressable = true,
        disabled = false,
        fullWidth = false,
        showDivider = false,
        borderRadius,
        footer,
        onPress,
        onLongPress,
        style,
        titleStyle,
        subtitleStyle,
        contentStyle,
        footerStyle,
        testID,
        accessibilityLabel,
    } = props;

    // Animation shared values
    const pressed = useSharedValue(0);
    const [isHovered, setIsHovered] = useState(false);

    // Get base styles
    const variantStyle = getVariantStyles(variant, colorScheme);
    const sizeStyle = getSizeStyles(size);
    const titleTextStyle = getTextStyles(size, colorScheme);
    const subtitleTextStyle = {
        ...getTextStyles(size, colorScheme),
        fontSize: titleTextStyle.fontSize ? titleTextStyle.fontSize * 0.8 : 16,
        fontWeight: '400' as any,
        opacity: 0.8,
        marginTop: -4,
    };

    // Handle press in
    const handlePressIn = useCallback(() => {
        if (disabled) return;
        pressed.value = withSpring(1, getAnimationConfig(animationType));
    }, [disabled, pressed, animationType]);

    // Handle press out
    const handlePressOut = useCallback(() => {
        if (disabled) return;
        pressed.value = withSpring(0, getAnimationConfig(animationType));
    }, [disabled, pressed, animationType]);

    // Handle press
    const handlePress = useCallback(() => {
        if (disabled || !onPress) return;
        onPress();
    }, [disabled, onPress]);

    // Handle long press
    const handleLongPress = useCallback(() => {
        if (disabled || !onLongPress) return;
        onLongPress();
    }, [disabled, onLongPress]);

    // Web-specific hover handlers
    const handleHoverIn = useCallback(() => {
        if (Platform.OS === 'web' && !disabled) {
            setIsHovered(true);
        }
    }, [disabled]);

    const handleHoverOut = useCallback(() => {
        if (Platform.OS === 'web' && !disabled) {
            setIsHovered(false);
        }
    }, [disabled]);

    // Animated styles
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: disabled ? 0.6 : 1,
            ...getAnimatedStyles(animationType, pressed, variant),
        };
    });

    // Combine all styles
    const containerStyle = [
        styles.container,
        variantStyle,
        sizeStyle,
        fullWidth && styles.fullWidth,
        borderRadius !== undefined && { borderRadius },
        disabled && styles.disabled,
        style,
    ];

    // Render card content
    const renderContent = () => (
        <Animated.View style={[styles.contentContainer, animatedStyle]}>
            {/* Card Header */}
            {(title || subtitle) && (
                <View style={styles.header}>
                    {title && (
                        <Text style={[titleTextStyle, titleStyle]} numberOfLines={2}>
                            {title}
                        </Text>
                    )}
                    {subtitle && (
                        <Text style={[subtitleTextStyle, subtitleStyle]} numberOfLines={3}>
                            {subtitle}
                        </Text>
                    )}
                </View>
            )}

            {/* Divider */}
            {showDivider && (title || subtitle) && children && (
                <View style={[styles.divider, { backgroundColor: variantStyle.borderColor || '#E2E8F0' }]} />
            )}

            {/* Card Content */}
            {children && (
                <View style={[styles.content, contentStyle]}>
                    {children}
                </View>
            )}

            {/* Card Footer */}
            {footer && (
                <>
                    {(title || subtitle || children) && (
                        <View style={[styles.divider, { backgroundColor: variantStyle.borderColor || '#E2E8F0' }]} />
                    )}
                    <View style={[styles.footer, footerStyle]}>
                        {footer}
                    </View>
                </>
            )}
        </Animated.View>
    );

    return (
        <Pressable
            ref={ref}
            onPressIn={pressable ? handlePressIn : undefined}
            onPressOut={pressable ? handlePressOut : undefined}
            onPress={pressable ? handlePress : undefined}
            onLongPress={pressable ? handleLongPress : undefined}
            disabled={!pressable || disabled}
            style={containerStyle}
            testID={testID}
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="button"
            accessibilityState={{ disabled }}
            {...(Platform.OS === 'web' && {
                onMouseEnter: handleHoverIn,
                onMouseLeave: handleHoverOut,
            })}
        >
            {renderContent()}
        </Pressable>
    );
});

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        margin: 8,
    },
    contentContainer: {
        overflow: 'hidden',
        flex: 1,
    },
    fullWidth: {
        alignSelf: 'stretch',
        width: '100%',
        margin: 0,
        marginVertical: 8,
    },
    disabled: {
        opacity: 0.6,
    },
    header: {
        marginBottom: 8,
    },
    content: {
        flex: 1,
    },
    footer: {
        marginTop: 8,
    },
    divider: {
        height: 1,
        width: '100%',
        marginVertical: 12,
        backgroundColor: '#E2E8F0',
    },
});

export default AnimatedCard;
