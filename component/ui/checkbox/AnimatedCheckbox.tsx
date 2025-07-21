"use client"

import type React from "react"
import { useEffect } from "react"
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Platform,
    AccessibilityInfo,
    type ViewStyle,
    type TextStyle,
} from "react-native"
import * as Haptics from "expo-haptics"
import { Feather } from "@expo/vector-icons"
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    interpolateColor,
    runOnJS,
} from "react-native-reanimated"

export interface CustomCheckboxProps {
    checked: boolean
    onPress: () => void
    // Color customization props
    color?: string
    borderColor?: string
    iconColor?: string
    // Label props
    label?: string
    labelStyle?: TextStyle
    labelPosition?: "left" | "right"
    // Existing props
    containerStyle?: ViewStyle
    checkboxStyle?: ViewStyle
    iconSize?: number
    size?: "small" | "medium" | "large"
    variant?: "square" | "rounded" | "circle"
    disabled?: boolean
    indeterminate?: boolean
    testID?: string
    accessibilityLabel?: string
    accessibilityHint?: string
    hapticFeedback?: boolean
    animationDuration?: number
    customIcon?: string
    rippleColor?: string
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    checked,
    onPress,
    color = "#FF5308",
    borderColor,
    iconColor = "#FFFFFF",
    label,
    labelStyle,
    labelPosition = "right",
    containerStyle,
    checkboxStyle,
    iconSize,
    size = "medium",
    variant = "rounded",
    disabled = false,
    indeterminate = false,
    testID = "custom-checkbox",
    accessibilityLabel,
    accessibilityHint,
    hapticFeedback = true,
    animationDuration = 150,
    customIcon = "check",
    rippleColor,
}) => {
    // Shared values for animations
    const scale = useSharedValue(checked ? 1 : 0)
    const opacity = useSharedValue(checked ? 1 : 0)
    const progress = useSharedValue(checked ? 1 : 0)

    // Size configurations
    const sizeConfig = {
        small: { size: 20, iconSize: 12, borderRadius: 4, labelSpacing: 8, fontSize: 14 },
        medium: { size: 24, iconSize: 14, borderRadius: 4, labelSpacing: 10, fontSize: 16 },
        large: { size: 28, iconSize: 16, borderRadius: 4, labelSpacing: 12, fontSize: 18 },
    }

    const currentSize = sizeConfig[size]
    const finalIconSize = iconSize || currentSize.iconSize

    // Variant configurations
    const getBorderRadius = () => {
        switch (variant) {
            case "circle":
                return currentSize.size / 2
            case "square":
                return 2
            case "rounded":
            default:
                return currentSize.borderRadius
        }
    }

    // Enhanced animation logic with pulse
    useEffect(() => {
        const toValue = checked || indeterminate ? 1 : 0

        // Faster, smoother spring animation for scale
        scale.value = withSpring(toValue, {
            damping: 12,
            stiffness: 200,
            mass: 0.8,
            overshootClamping: false,
            restSpeedThreshold: 0.01,
            restDisplacementThreshold: 0.01,
        })

        // Faster timing animation for opacity
        opacity.value = withTiming(toValue, {
            duration: animationDuration,
        })

        // Faster color transition
        progress.value = withTiming(toValue, {
            duration: animationDuration,
        })
    }, [checked, indeterminate, animationDuration])

    const triggerHapticFeedback = async () => {
        if (!hapticFeedback) return
        try {
            await Haptics.selectionAsync()
        } catch (error) {
            console.warn("Haptic feedback not available:", error)
        }
    }

    const announceAccessibility = () => {
        if (Platform.OS === "ios") {
            const labelText = label || accessibilityLabel || "Checkbox"
            const stateText = checked ? "checked" : "unchecked"
            AccessibilityInfo.announceForAccessibility(`${labelText} ${stateText}`)
        }
    }

    const handlePress = async () => {
        if (disabled) return

        await triggerHapticFeedback()
        runOnJS(announceAccessibility)()
        onPress()
    }

    // Animated styles
    const animatedCheckboxStyle = useAnimatedStyle(() => {
        const animatedBorderColor = interpolateColor(progress.value, [0, 1], [borderColor || "#CCCCCC", "transparent"])
        const animatedBackgroundColor = interpolateColor(progress.value, [0, 1], ["transparent", color])

        return {
            borderColor: animatedBorderColor,
            backgroundColor: animatedBackgroundColor,
        }
    })

    const animatedIconStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ scale: scale.value }],
        }
    })

    const getIconName = () => {
        if (indeterminate) return "minus"
        return customIcon
    }

    // Render checkbox component
    const renderCheckbox = () => (
        <Animated.View
            style={[
                styles.checkbox,
                {
                    width: currentSize.size,
                    height: currentSize.size,
                    borderRadius: getBorderRadius(),
                    borderWidth: 1,
                },
                disabled && styles.checkboxDisabled,
                checkboxStyle,
                animatedCheckboxStyle,
            ]}
        >
            <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
                <Feather name={getIconName() as any} color={iconColor} size={finalIconSize} style={styles.icon} />
            </Animated.View>
        </Animated.View>
    )

    // Render label component
    const renderLabel = () => {
        if (!label) return null

        return (
            <Text
                style={[
                    styles.label,
                    {
                        fontSize: currentSize.fontSize,
                        marginLeft: labelPosition === "right" ? currentSize.labelSpacing : 0,
                        marginRight: labelPosition === "left" ? currentSize.labelSpacing : 0,
                    },
                    disabled && styles.labelDisabled,
                    labelStyle,
                ]}
            >
                {label}
            </Text>
        )
    }

    return (
        <TouchableOpacity
            activeOpacity={disabled ? 1 : 0.7}
            onPress={handlePress}
            style={[styles.checkboxContainer, disabled && styles.disabled, containerStyle]}
            testID={testID}
            accessibilityRole="checkbox"
            accessibilityState={{
                checked: indeterminate ? "mixed" : checked,
                disabled,
            }}
            accessibilityLabel={accessibilityLabel || label}
            accessibilityHint={accessibilityHint}
            disabled={disabled}
        >
            {labelPosition === "left" && renderLabel()}
            {renderCheckbox()}
            {labelPosition === "right" && renderLabel()}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
    },
    checkboxDisabled: {
        opacity: 0.5,
        elevation: 0,
        shadowOpacity: 0,
    },
    disabled: {
        opacity: 0.6,
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        fontWeight: "bold",
    },
    label: {
        color: "#333333",
        fontWeight: "400",
    },
    labelDisabled: {
        color: "#999999",
    },
})

export default CustomCheckbox
