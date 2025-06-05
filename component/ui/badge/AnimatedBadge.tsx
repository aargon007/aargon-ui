import { Text, StyleSheet } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, withSequence, withRepeat, runOnJS, Easing, } from "react-native-reanimated"
import { Feather } from "@expo/vector-icons"
import { useEffect } from "react"
import { getBadgeSizeStyles, getBadgeVariantStyles, type AnimatedBadgeProps, type BadgeTheme } from "./badgeUtils"

const defaultTheme: BadgeTheme = {
    colors: {
        default: {
            bg: "#F3F4F6",
            text: "#374151",
            border: "#E5E7EB"
        },
        primary: {
            bg: "#EEF2FF",
            text: "#4338CA",
            border: "#C7D2FE"
        },
        secondary: {
            bg: "#F8FAFC",
            text: "#475569",
            border: "#E2E8F0"
        },
        success: {
            bg: "#ECFDF5",
            text: "#047857",
            border: "#A7F3D0"
        },
        warning: {
            bg: "#FFFBEB",
            text: "#D97706",
            border: "#FDE68A"
        },
        error: {
            bg: "#FEF2F2",
            text: "#DC2626",
            border: "#FECACA"
        },
        info: {
            bg: "#EFF6FF",
            text: "#2563EB",
            border: "#BFDBFE"
        },
        outline: {
            bg: "transparent",
            text: "#374151",
            border: "#D1D5DB"
        },
    },
    borderRadius: {
        xs: 4,
        sm: 6,
        md: 8,
        lg: 12,
    },
    fontFamily: undefined,
}

// Smooth animation configurations
const smoothSpring = {
    damping: 20,
    stiffness: 300,
    mass: 0.8,
}

const bounceSpring = {
    damping: 12,
    stiffness: 400,
    mass: 0.6,
}

export const AnimatedBadge = ({
    children,
    variant = "default",
    size = "md",
    animation = "none",
    rounded = false,
    leftIcon,
    rightIcon,
    dot = false,
    dotColor,
    removable = false,
    onRemove,
    clickable = false,
    onPress,
    theme,
    style,
    textStyle,
    animationDuration = 1000,
    repeatAnimation = false,
    accessibilityLabel,
    testID,
    shadow = false,
    borderRadius,
}: AnimatedBadgeProps) => {
    // Merge theme with default
    const mergedTheme = { ...defaultTheme, ...theme }

    // Animation values
    const scale = useSharedValue(1)
    const opacity = useSharedValue(1)
    const rotation = useSharedValue(0)
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    const glowOpacity = useSharedValue(0)
    const removeScale = useSharedValue(1)

    // Get styles
    const variantStyles = getBadgeVariantStyles(variant, mergedTheme);
    const sizeStyles = getBadgeSizeStyles(size);

    // Animation effects
    useEffect(() => {
        if (animation === "none") return

        startAnimation()
    }, [animation, animationDuration, repeatAnimation])

    const startAnimation = () => {
        switch (animation) {
            case "pulse":
                scale.value = withRepeat(
                    withSequence(
                        withTiming(1.05, {
                            duration: animationDuration / 2,
                            easing: Easing.inOut(Easing.cubic)
                        }),
                        withTiming(1, {
                            duration: animationDuration / 2,
                            easing: Easing.inOut(Easing.cubic)
                        })
                    ),
                    repeatAnimation ? -1 : 1,
                    false
                )
                break

            case "bounce":
                scale.value = withRepeat(
                    withSequence(
                        withSpring(0.9, bounceSpring),
                        withSpring(1.1, bounceSpring),
                        withSpring(1, smoothSpring)
                    ),
                    repeatAnimation ? -1 : 1,
                    false
                )
                break

            case "shake":
                translateX.value = withRepeat(
                    withSequence(
                        withTiming(-3, { duration: 50 }),
                        withTiming(3, { duration: 50 }),
                        withTiming(-2, { duration: 50 }),
                        withTiming(2, { duration: 50 }),
                        withTiming(0, { duration: 50 })
                    ),
                    repeatAnimation ? -1 : 1,
                    false
                )
                break

            case "glow":
                glowOpacity.value = withRepeat(
                    withSequence(
                        withTiming(0.8, {
                            duration: animationDuration / 2,
                            easing: Easing.inOut(Easing.sin)
                        }),
                        withTiming(0, {
                            duration: animationDuration / 2,
                            easing: Easing.inOut(Easing.sin)
                        })
                    ),
                    repeatAnimation ? -1 : 1,
                    false
                )
                break

            case "heartbeat":
                scale.value = withRepeat(
                    withSequence(
                        withTiming(1.1, { duration: 100 }),
                        withTiming(1, { duration: 100 }),
                        withTiming(1.1, { duration: 100 }),
                        withTiming(1, { duration: 700 })
                    ),
                    repeatAnimation ? -1 : 1,
                    false
                )
                break

            case "wiggle":
                rotation.value = withRepeat(
                    withSequence(
                        withTiming(-5, { duration: 100 }),
                        withTiming(5, { duration: 100 }),
                        withTiming(-3, { duration: 100 }),
                        withTiming(3, { duration: 100 }),
                        withTiming(0, { duration: 100 })
                    ),
                    repeatAnimation ? -1 : 1,
                    false
                )
                break

            case "scale":
                scale.value = withRepeat(
                    withSequence(
                        withSpring(1.15, bounceSpring),
                        withSpring(1, smoothSpring)
                    ),
                    repeatAnimation ? -1 : 1,
                    false
                )
                break
        }
    }
    
    // Handle press
    const handlePress = () => {
        if (!clickable || !onPress) return

        // Press feedback animation
        scale.value = withSequence(
            withSpring(0.95, { damping: 15, stiffness: 400 }),
            withSpring(1, smoothSpring)
        )

        if (onPress) {
            runOnJS(onPress)()
        }
    }

    // Handle remove
    const handleRemove = () => {
        if (!onRemove) return

        // Remove animation
        removeScale.value = withSequence(
            withSpring(1.1, { damping: 15, stiffness: 400 }),
            withTiming(0, { duration: 200, easing: Easing.in(Easing.cubic) }, () => {
                runOnJS(onRemove)()
            })
        )
    }

    // Animated styles
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: scale.value * removeScale.value },
                { rotate: `${rotation.value}deg` },
                { translateX: translateX.value },
                { translateY: translateY.value }
            ],
            opacity: opacity.value,
        }
    })

    // Glow effect style
    const glowStyle = useAnimatedStyle(() => {
        return {
            opacity: glowOpacity.value,
            transform: [{ scale: 1 + glowOpacity.value * 0.1 }],
        }
    })

    const badgeRadius = rounded
        ? 50
        : (borderRadius ?? mergedTheme.borderRadius[size])

    const dotColorFinal = dotColor || variantStyles.text.color

    return (
        <Animated.View
            style={[
                styles.container,
                animatedStyle,
                clickable && styles.clickable,
            ]}
            testID={testID}
            accessibilityLabel={accessibilityLabel}
            accessibilityRole={clickable ? "button" : "text"}
        >
            {/* Glow effect background */}
            {animation === "glow" && (
                <Animated.View
                    style={[
                        StyleSheet.absoluteFillObject,
                        styles.glowBackground,
                        {
                            backgroundColor: variantStyles.bg,
                            borderRadius: badgeRadius,
                        },
                        glowStyle,
                    ]}
                />
            )}

            <Animated.View
                style={[
                    styles.badge,
                    variantStyles.container,
                    sizeStyles.container,
                    {
                        borderRadius: badgeRadius,
                    },
                    shadow && styles.shadow,
                    style,
                ]}
                onTouchEnd={clickable ? handlePress : undefined}
            >
                {/* Dot indicator */}
                {dot && (
                    <Animated.View
                        style={[
                            styles.dot,
                            sizeStyles.dot,
                            { backgroundColor: dotColorFinal },
                        ]}
                    />
                )}

                {/* Left icon */}
                {leftIcon && (
                    <Feather
                        name={leftIcon}
                        size={sizeStyles.iconSize}
                        color={variantStyles.text.color}
                        style={styles.leftIcon}
                    />
                )}

                {/* Content */}
                {children && (
                    <Text
                        style={[
                            styles.text,
                            variantStyles.text,
                            sizeStyles.text,
                            { fontFamily: mergedTheme.fontFamily },
                            textStyle,
                        ]}
                    >
                        {children}
                    </Text>
                )}

                {/* Right icon */}
                {rightIcon && (
                    <Feather
                        name={rightIcon}
                        size={sizeStyles.iconSize}
                        color={variantStyles.text.color}
                        style={styles.rightIcon}
                    />
                )}

                {/* Remove button */}
                {removable && (
                    <Animated.View
                        style={[styles.removeButton, sizeStyles.removeButton]}
                        onTouchEnd={handleRemove}
                    >
                        <Feather
                            name="x"
                            size={sizeStyles.removeIconSize}
                            color={variantStyles.text.color}
                        />
                    </Animated.View>
                )}
            </Animated.View>
        </Animated.View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
    },
    clickable: {
        // Add any clickable-specific styles here
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    text: {
        fontWeight: '500',
        textAlign: 'center',
    },
    dot: {
        borderRadius: 50,
        marginRight: 6,
    },
    leftIcon: {
        marginRight: 4,
    },
    rightIcon: {
        marginLeft: 4,
    },
    removeButton: {
        borderRadius: 50,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    glowBackground: {
        borderWidth: 1,
        borderColor: 'transparent',
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
})