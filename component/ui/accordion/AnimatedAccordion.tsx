import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, type LayoutChangeEvent, } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSpring, interpolate, runOnJS, Easing, } from 'react-native-reanimated'
import { getAccordionSizeStyles, getAccordionVariantStyles, type AccordionTheme, type AnimatedAccordionProps } from './utils'
import { Feather } from "@expo/vector-icons"

const defaultTheme: AccordionTheme = {
    colors: {
        background: "#FFFFFF",
        headerBackground: "#F8FAFC",
        headerBackgroundActive: "#F1F5F9",
        border: "#E2E8F0",
        text: "#334155",
        textActive: "#1E293B",
        icon: "#64748B",
        iconActive: "#475569",
        shadow: "#000000",
    },
    borderRadius: 8,
    fontFamily: undefined,
}

// Animation configurations
const springConfig = {
    damping: 20,
    stiffness: 300,
    mass: 0.8,
}

const bounceConfig = {
    damping: 12,
    stiffness: 400,
    mass: 0.6,
}

export const AnimatedAccordion = ({
    children,
    title,
    headerContent,
    defaultExpanded = false,
    expanded: controlledExpanded,
    onToggle,
    duration = 300,
    animationType = "spring",
    variant = "default",
    size = "md",
    disabled = false,
    collapsedIcon = "chevron-down",
    expandedIcon = "chevron-up",
    showIcon = true,
    iconPosition = "right",
    theme,
    style,
    headerStyle,
    headerTextStyle,
    bodyStyle,
    shadow = false,
    accessibilityLabel,
    testID,
    animateOnMount = true,
    easing = Easing.out(Easing.cubic),
}: AnimatedAccordionProps) => {
    // Merge theme with default
    const mergedTheme = { ...defaultTheme, ...theme }

    // State management
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
    const [contentHeight, setContentHeight] = useState(0)
    const [headerHeight, setHeaderHeight] = useState(0)
    const [measured, setMeasured] = useState(false)

    const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded

    // Animation values
    const animatedHeight = useSharedValue(0)
    const iconRotation = useSharedValue(isExpanded ? 180 : 0)
    const headerScale = useSharedValue(1)
    const headerOpacity = useSharedValue(1)
    const contentOpacity = useSharedValue(isExpanded ? 1 : 0)

    // Get styles
    const variantStyles = getAccordionVariantStyles(variant, mergedTheme)
    const sizeStyles = getAccordionSizeStyles(size)

    // Initialize animation values
    useEffect(() => {
        if (measured && animateOnMount) {
            animatedHeight.value = isExpanded ? contentHeight : 0
            iconRotation.value = isExpanded ? 180 : 0
            contentOpacity.value = isExpanded ? 1 : 0
        }
    }, [measured, animateOnMount]);

    // Handle toggle
    const toggleAccordion = () => {
        if (disabled) return

        const newExpanded = !isExpanded

        // Update internal state if not controlled
        if (controlledExpanded === undefined) {
            setInternalExpanded(newExpanded)
        }       

        // Animate
        animateToState(newExpanded)

        // Call callback
        if (onToggle) {
            runOnJS(onToggle)(newExpanded)
        }
    };

    // Animation function
    const animateToState = (expanded: boolean) => {
        const targetHeight = expanded ? contentHeight : 0
        const targetRotation = expanded ? 180 : 0
        const targetOpacity = expanded ? 1 : 0

        // Header press feedback
        headerScale.value = withSpring(0.98, { damping: 15, stiffness: 400 }, () => {
            headerScale.value = withSpring(1, springConfig)
        })

        // Height animation
        switch (animationType) {
            case "spring":
                animatedHeight.value = withSpring(targetHeight, springConfig)
                break
            case "bounce":
                animatedHeight.value = withSpring(targetHeight, bounceConfig)
                break
            case "timing":
            default:
                animatedHeight.value = withTiming(targetHeight, { duration, easing })
                break
        }

        // Icon rotation
        iconRotation.value = withSpring(targetRotation, springConfig)

        // Content opacity
        contentOpacity.value = withTiming(targetOpacity, {
            duration: duration * 0.6,
            easing: expanded ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
        })
    };

    // Handle header layout
    const onHeaderLayout = (event: LayoutChangeEvent) => {
        const height = event.nativeEvent.layout.height
        setHeaderHeight(height)
    };

    // Animated styles
    const animatedBodyStyle = useAnimatedStyle(() => {
        return {
            height: animatedHeight.value,
            opacity: interpolate(
                animatedHeight.value,
                [0, contentHeight * 0.3, contentHeight],
                [0, 0.5, 1],
                'clamp'
            ),
        };
    });

    const animatedIconStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${iconRotation.value}deg` }],
        }
    });

    const animatedHeaderStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolate(
            iconRotation.value,
            [0, 180],
            [0, 1],
            'clamp'
        )

        return {
            // transform: [{ scale: headerScale.value }],
            backgroundColor: backgroundColor > 0.5
                ? mergedTheme.colors.headerBackgroundActive
                : mergedTheme.colors.headerBackground,
        }
    });

    const animatedContentStyle = useAnimatedStyle(() => ({
        opacity: measured ? contentOpacity.value : 0,
    }));

    const currentIcon = isExpanded ? expandedIcon : collapsedIcon;
    const iconColor = isExpanded ? mergedTheme.colors.iconActive : mergedTheme.colors.icon;
    const textColor = isExpanded ? mergedTheme.colors.textActive : mergedTheme.colors.text;

    return (
        <View
            style={[
                styles.container,
                variantStyles.container,
                shadow && styles.shadow,
                style,
            ]}
            testID={testID}
        >
            {/* Header */}
            <TouchableOpacity
                activeOpacity={disabled ? 1 : 0.8}
                onPress={toggleAccordion}
                onLayout={onHeaderLayout}
                accessibilityLabel={accessibilityLabel || title}
                accessibilityRole="button"
                accessibilityState={{ expanded: isExpanded, disabled }}
                style={[styles.headerTouchable]}
            >
                <Animated.View
                    style={[
                        styles.header,
                        variantStyles.header,
                        sizeStyles.header,
                        {
                            borderRadius: mergedTheme.borderRadius,
                            opacity: disabled ? 0.5 : 1,
                        },
                        animatedHeaderStyle,
                        headerStyle,
                    ]}
                >
                    {/* Left Icon */}
                    {showIcon && iconPosition === "left" && (
                        <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
                            <Feather
                                name={currentIcon}
                                size={sizeStyles.iconSize}
                                color={iconColor}
                            />
                        </Animated.View>
                    )}

                    {/* Header Content */}
                    <View style={styles.headerContent}>
                        {headerContent || (
                            <Text
                                style={[
                                    styles.headerText,
                                    sizeStyles.text,
                                    {
                                        color: textColor,
                                        fontFamily: mergedTheme.fontFamily,
                                    },
                                    headerTextStyle,
                                ]}
                            >
                                {title}
                            </Text>
                        )}
                    </View>

                    {/* Right Icon */}
                    {showIcon && iconPosition === "right" && (
                        <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
                            <Feather
                                name={currentIcon}
                                size={sizeStyles.iconSize}
                                color={iconColor}
                            />
                        </Animated.View>
                    )}
                </Animated.View>
            </TouchableOpacity>

            {/* Body */}
            <Animated.View
                style={[
                    styles.body,
                    variantStyles.body,
                    {
                        borderRadius: mergedTheme.borderRadius,
                        marginTop: variant === "bordered" ? 0 : 4,
                    },
                    animatedBodyStyle,
                    bodyStyle,
                ]}
            >
                <Animated.View
                    style={[
                        styles.content,
                        sizeStyles.content,
                        animatedContentStyle,
                    ]}
                >
                    {measured && children}
                </Animated.View>
            </Animated.View>

            {/* Hidden measurement outside animation block */}
            {!measured && (
                <View
                    style={{
                        position: 'absolute',
                        opacity: 0,
                        left: 0,
                        right: 0,
                        top: 0,
                        zIndex: -1,
                    }}
                    pointerEvents="none"
                    onLayout={(event) => {
                        const height = event.nativeEvent.layout.height;
                        setContentHeight(height);
                        setMeasured(true);
                    }}
                >
                    <View style={[styles.content, sizeStyles.content]}>
                        {children}
                    </View>
                </View>
            )}

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 4,
    },
    headerTouchable: {
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    headerContent: {
        flex: 1,
        alignItems: 'flex-start',
    },
    headerText: {
        fontWeight: '600',
    },
    iconContainer: {
        marginLeft: 8,
    },
    body: {
        overflow: 'hidden',
        width: '100%',
    },
    content: {
        width: '100%',
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
})