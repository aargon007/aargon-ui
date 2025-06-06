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
    runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import {
    type CardVariant,
    type CardSize,
    type CardColorScheme,
    type CardAnimationType,
    getVariantStyles,
    getSizeStyles,
    getTextStyles,
    getAnimationConfig,
    getAnimatedStyles,
    getGradientColors,
    IS_WEB,
} from './utils';

// Types
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

/**
 * AnimatedCard - A reusable animated card component with various styles and animations
 */
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
        if (IS_WEB && !disabled) {
            setIsHovered(true);
        }
    }, [disabled]);

    const handleHoverOut = useCallback(() => {
        if (IS_WEB && !disabled) {
            setIsHovered(false);
        }
    }, [disabled]);

    // Animated styles
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: disabled ? 0.6 : 1,
            ...getAnimatedStyles(animationType, pressed, variant, colorScheme),
        };
    });

    // Border color animation for outlined variant
    const animatedBorderStyle = useAnimatedStyle(() => {
        if (variant !== 'outlined') return {};

        const colors = {
            default: ['#E2E8F0', '#94A3B8'],
            primary: ['#90CDF4', '#3182CE'],
            secondary: ['#D6BCFA', '#805AD5'],
            success: ['#9AE6B4', '#38A169'],
            error: ['#FEB2B2', '#E53E3E'],
        };

        return {
            borderColor: interpolateColor(
                pressed.value,
                [0, 1],
                [colors[colorScheme][0], colors[colorScheme][1]]
            ),
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
        <Animated.View
            style={[styles.contentContainer, animatedStyle, animatedBorderStyle]}
        >
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

    // Render gradient background if variant is gradient
    if (variant === 'gradient') {
        const gradientColors = getGradientColors(colorScheme);

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
                {...(IS_WEB && {
                    onMouseEnter: handleHoverIn,
                    onMouseLeave: handleHoverOut,
                })}
            >
                <LinearGradient
                    colors={gradientColors as any}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.gradient, sizeStyle]}
                >
                    {renderContent()}
                </LinearGradient>
            </Pressable>
        );
    }

    // Render regular card
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
            {...(IS_WEB && {
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
    gradient: {
        flex: 1,
        overflow: 'hidden',
    },
});

export default AnimatedCard;