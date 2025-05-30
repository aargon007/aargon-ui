export const switchCode = `import { Pressable, StyleSheet } from "react-native"
import Animated, { useAnimatedStyle, withTiming, interpolate, interpolateColor, type SharedValue, useSharedValue, } from "react-native-reanimated"

type Props = {
    onPress: any
    value: SharedValue<boolean>
    isDisabled: boolean
    duration?: number
    trackColors?: {
        on: string
        off: string
    }
    thumbColors?: {
        on: string
        off: string
    }
};

const AnimatedSwitch = ({
    onPress,
    value,
    isDisabled,
    duration = 300,
    trackColors = { on: "#0879CC", off: "#111111" },
    thumbColors = { on: "#FFFFFF", off: "#A3A3A8" },
}: Props) => {
    const height = useSharedValue(0)
    const width = useSharedValue(0)

    const trackAnimatedStyle = useAnimatedStyle(() => {
        const baseValue = Number(value.value)

        const color = interpolateColor(baseValue, [0, 1], [trackColors.off, trackColors.on])
        const borderColor = interpolateColor(baseValue, [0, 1], ["#A3A3A8", "#0879CC"])
        const opacity = interpolate(Number(isDisabled), [0, 1], [1, 0.3])

        const colorValue = withTiming(color, { duration })
        const borderColorValue = withTiming(borderColor, { duration })
        const opacityValue = withTiming(opacity, { duration })

        return {
            backgroundColor: colorValue,
            borderRadius: height.value / 2,
            borderColor: borderColorValue,
            opacity: opacityValue,
        }
    })

    const thumbAnimatedStyle = useAnimatedStyle(() => {
        const baseValue = Number(value.value)

        const moveValue = interpolate(baseValue, [0, 1], [0, width.value - height.value])
        const color = interpolateColor(baseValue, [0, 1], [thumbColors.off, thumbColors.on])

        const colorValue = withTiming(color, { duration })
        const translateValue = withTiming(moveValue, { duration })

        return {
            transform: [{ translateX: translateValue }],
            backgroundColor: colorValue,
            borderRadius: height.value / 2,
        }
    })

    return (
        <Pressable onPress={onPress} disabled={isDisabled}>
            <Animated.View
                onLayout={(e) => {
                    height.value = e.nativeEvent.layout.height
                    width.value = e.nativeEvent.layout.width
                }}
                style={[styles.track, styles.switch, trackAnimatedStyle]}
            >
                <Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    thumb: {
        height: "100%",
        maxHeight: 45,
        aspectRatio: 1,
    },
    track: {
        alignItems: 'flex-start',
        // width: 100,
        // height: 40,
        padding: 5,
    },
    switch: {
        width: 60,
        height: 32,
        padding: 5,
        borderWidth: 1.5,
    },
})

export default AnimatedSwitch`