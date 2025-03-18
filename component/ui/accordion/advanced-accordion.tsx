"use client"

import type React from "react"
import { useState, useRef } from "react"
import { View, Text, Pressable, StyleSheet, type LayoutChangeEvent } from "react-native"
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    Extrapolate,
} from "react-native-reanimated"
import { Feather } from "@expo/vector-icons"
import { Canvas, RoundedRect, Shadow, useValue } from "@shopify/react-native-skia"

interface AdvancedAccordionProps {
    title: string
    children: React.ReactNode
    initiallyExpanded?: boolean
    shadowEnabled?: boolean
    borderRadius?: number
    accentColor?: string
}

export const AdvancedAccordion = ({
    title,
    children,
    initiallyExpanded = false,
    shadowEnabled = true,
    borderRadius = 8,
    accentColor = "#6366F1",
}: AdvancedAccordionProps) => {
    const [expanded, setExpanded] = useState(initiallyExpanded)
    const [contentHeight, setContentHeight] = useState(0)
    const animation = useSharedValue(initiallyExpanded ? 1 : 0)
    const contentRef = useRef<View>(null)

    // Skia values for shadow animation
    const shadowOpacity = useValue(initiallyExpanded ? 0.15 : 0.05)
    const shadowOffsetY = useValue(initiallyExpanded ? 4 : 2)
    const shadowBlur = useValue(initiallyExpanded ? 12 : 6)

    const toggleAccordion = () => {
        const newExpandedState = !expanded
        setExpanded(newExpandedState)

        // Animate Reanimated values
        animation.value = withSpring(newExpandedState ? 1 : 0, {
            damping: 20,
            stiffness: 200,
        })

        // Animate Skia values
        shadowOpacity.current = newExpandedState ? 0.15 : 0.05
        shadowOffsetY.current = newExpandedState ? 4 : 2
        shadowBlur.current = newExpandedState ? 12 : 6
    }

    const onContentLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout
        setContentHeight(height)
    }

    const animatedContentStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(animation.value, [0, 1], [0, contentHeight], Extrapolate.CLAMP),
            opacity: interpolate(animation.value, [0, 0.5, 1], [0, 0.3, 1], Extrapolate.CLAMP),
        }
    })

    const animatedIconStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: `${interpolate(animation.value, [0, 1], [0, 180], Extrapolate.CLAMP)}deg`,
                },
            ],
        }
    })

    const animatedHeaderStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolate(animation.value, [0, 1], [0, 0.05], Extrapolate.CLAMP),
            borderBottomWidth: interpolate(animation.value, [0, 1], [0, 1], Extrapolate.CLAMP),
        }
    })

    return (
        <View style={styles.container}>
            {shadowEnabled && (
                <Canvas style={StyleSheet.absoluteFill}>
                    <RoundedRect
                        x={0}
                        y={0}
                        width={styles.container.width}
                        height={expanded ? contentHeight + 60 : 60}
                        r={borderRadius}
                    >
                        <Shadow dx={0} dy={shadowOffsetY} blur={shadowBlur} color="rgba(0, 0, 0, 0.25)" opacity={shadowOpacity} />
                    </RoundedRect>
                </Canvas>
            )}

            <View style={[styles.accordionContainer, { borderRadius }]}>
                <Animated.View style={[styles.header, animatedHeaderStyle, { borderRadius }]}>
                    <Pressable
                        onPress={toggleAccordion}
                        style={({ pressed }) => [styles.headerButton, pressed && styles.headerButtonPressed]}
                        accessibilityRole="button"
                        accessibilityState={{ expanded }}
                    >
                        <Text style={[styles.title, { color: accentColor }]}>{title}</Text>
                        <Animated.View style={animatedIconStyle}>
                            <Feather name="chevron-down" size={20} color={accentColor} />
                        </Animated.View>
                    </Pressable>
                </Animated.View>

                <Animated.View style={[styles.contentContainer, animatedContentStyle]}>
                    <View ref={contentRef} onLayout={onContentLayout} style={styles.content}>
                        {children}
                    </View>
                </Animated.View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginVertical: 8,
    },
    accordionContainer: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        overflow: "hidden",
    },
    header: {
        borderBottomColor: "#E5E7EB",
    },
    headerButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
    },
    headerButtonPressed: {
        opacity: 0.7,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
    },
    contentContainer: {
        overflow: "hidden",
    },
    content: {
        padding: 16,
    },
})

