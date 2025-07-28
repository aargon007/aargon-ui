export const switchCode = `import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type Props = {
    onPress: any;
    value: boolean;
    isDisabled: boolean;
    duration?: number;
    trackColors?: {
        on: string;
        off: string;
    };
    thumbColors?: {
        on: string;
        off: string;
    };
    borderColors?: {
        on: string;
        off: string;
    }
};

const AnimatedSwitch = ({
    onPress,
    value,
    isDisabled,
    duration = 150,
    trackColors = { on: "#0879CC", off: "#111111" },
    thumbColors = { on: "#FFFFFF", off: "#A3A3A8" },
    borderColors = { on: "#0879CC", off: "#111111" }
}: Props) => {
    const height = useSharedValue(0);
    const width = useSharedValue(0);
    const reanimatedValue = useSharedValue(value);

    const trackAnimatedStyle = useAnimatedStyle(() => {
        const baseValue = Number(reanimatedValue.value);

        const color = interpolateColor(baseValue, [0, 1], [trackColors.off, trackColors.on]);
        const borderColor = interpolateColor(baseValue, [0, 1], [borderColors.off, borderColors.on]);
        const opacity = interpolate(Number(isDisabled), [0, 1], [1, .3]);

        const colorValue = withTiming(color, { duration });
        const borderColorValue = withTiming(borderColor, { duration });
        const opacityValue = withTiming(opacity, { duration });

        return {
            backgroundColor: colorValue,
            borderRadius: height.value / 2,
            borderColor: borderColorValue,
            opacity: opacityValue,
        };
    });

    const thumbAnimatedStyle = useAnimatedStyle(() => {
        const baseValue = Number(reanimatedValue.value);

        const moveValue = interpolate(baseValue, [0, 1], [0, width.value - height.value]);
        const color = interpolateColor(baseValue, [0, 1], [thumbColors.off, thumbColors.on]);

        const colorValue = withTiming(color, { duration });
        const translateValue = withTiming(moveValue, { duration });

        return {
            transform: [{ translateX: translateValue }],
            backgroundColor: colorValue,
            borderRadius: height.value / 2,
        };
    });

    useEffect(() => {
        reanimatedValue.value = value;
    }, [value]);

    return (
        <Pressable onPress={onPress} disabled={isDisabled}>
            <Animated.View
                onLayout={(e) => {
                    height.value = e.nativeEvent.layout.height;
                    width.value = e.nativeEvent.layout.width;
                }}
                style={[styles.switch, trackAnimatedStyle]}
            >
                <Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
            </Animated.View>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    thumb: {
        height: '100%',
        aspectRatio: 1,
    },
    switch: {
        width: 60,
        height: 32,
        padding: 5,
        borderWidth: 1.5,
    },
});

export default AnimatedSwitch;`