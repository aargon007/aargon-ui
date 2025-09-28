import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';

export type SwitchProps = {
    onPress: () => void;
    value: boolean;
    isDisabled?: boolean;
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
    };
};

const SWITCH_WIDTH = 60;
const SWITCH_HEIGHT = 32;
const SWITCH_PADDING = 4;

const AnimatedSwitch = ({
    onPress,
    value,
    isDisabled = false,
    duration = 200,
    trackColors = { on: "#0879CC", off: "#767577" },
    thumbColors = { on: "#FFFFFF", off: "#FFFFFF" },
    borderColors = { on: "#0879CC", off: "#767577" }
}: SwitchProps) => {
    const animatedValue = useSharedValue(value ? 1 : 0);

    // Calculate thumb travel distance
    const thumbSize = SWITCH_HEIGHT - (SWITCH_PADDING * 2);
    const thumbTravel = SWITCH_WIDTH - thumbSize - (SWITCH_PADDING * 2);

    const trackStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            animatedValue.value,
            [0, 1],
            [trackColors.off, trackColors.on]
        );

        const borderColor = interpolateColor(
            animatedValue.value,
            [0, 1],
            [borderColors.off, borderColors.on]
        );

        return {
            backgroundColor: withTiming(backgroundColor, { duration }),
            borderColor: withTiming(borderColor, { duration }),
            opacity: withTiming(isDisabled ? 0.3 : 1, { duration: duration / 2 }),
        };
    });

    const thumbStyle = useAnimatedStyle(() => {
        const translateX = interpolate(
            animatedValue.value,
            [0, 1],
            [0, thumbTravel]
        );

        const backgroundColor = interpolateColor(
            animatedValue.value,
            [0, 1],
            [thumbColors.off, thumbColors.on]
        );

        return {
            transform: [{ translateX: withTiming(translateX, { duration }) }],
            backgroundColor: withTiming(backgroundColor, { duration }),
        };
    });

    useEffect(() => {
        animatedValue.value = withTiming(value ? 1 : 0, { duration });
    }, [value]);

    const handlePress = () => {
        if (!isDisabled) {
            onPress();
        }
    };

    return (
        <Pressable onPress={handlePress} disabled={isDisabled}>
            <Animated.View style={[styles.track, trackStyle]}>
                <Animated.View style={[styles.thumb, thumbStyle]} />
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    track: {
        width: SWITCH_WIDTH,
        height: SWITCH_HEIGHT,
        borderRadius: SWITCH_HEIGHT / 2,
        borderWidth: 1.5,
        padding: SWITCH_PADDING,
        justifyContent: 'center',
    },
    thumb: {
        width: SWITCH_HEIGHT - (SWITCH_PADDING * 2),
        height: SWITCH_HEIGHT - (SWITCH_PADDING * 2),
        borderRadius: (SWITCH_HEIGHT - (SWITCH_PADDING * 2)) / 2,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
});

export default AnimatedSwitch;
