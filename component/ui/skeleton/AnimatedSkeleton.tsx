import React, { useEffect } from 'react';
import { StyleSheet, type ViewStyle, type StyleProp, PixelRatio } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    cancelAnimation,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';

// Types
export type SkeletonShape = 'rectangle' | 'circle';
export type SkeletonAnimation = 'shimmer' | 'pulse' | 'none';
export type SkeletonSpeed = 'slow' | 'medium' | 'fast';
export type SkeletonSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface SkeletonProps {
    /**
     * Shape of the skeleton
     * @default 'rectangle'
     */
    shape?: SkeletonShape;

    /**
     * Animation type
     * @default 'shimmer'
     */
    animation?: SkeletonAnimation;

    /**
     * Animation speed
     * @default 'medium'
     */
    speed?: SkeletonSpeed;

    /**
     * Width of the skeleton
     * For circle, this will be the diameter
     */
    width?: number | string;

    /**
     * Height of the skeleton
     * For circle, this will be ignored (uses width as diameter)
     */
    height?: number | string;

    /**
     * Predefined size
     * @default 'medium'
     */
    size?: SkeletonSize;

    /**
     * Border radius for rectangle shape
     * @default 4
     */
    borderRadius?: number;

    /**
     * Base color of the skeleton
     * @default '#E1E9EE'
     */
    color?: string;

    /**
     * Highlight color for shimmer effect
     * @default '#F2F8FC'
     */
    highlightColor?: string;

    /**
     * Additional styles for the skeleton container
     */
    style?: StyleProp<ViewStyle>;

    /**
     * Children to render inside the skeleton
     * Useful for creating complex skeleton layouts
     */
    children?: React.ReactNode;

    /**
     * Test ID for testing
     */
    testID?: string;
}

/**
 * A simplified yet powerful skeleton component with smooth animations
 */
export const AnimatedSkeleton: React.FC<SkeletonProps> = ({
    shape = 'rectangle',
    animation = 'shimmer',
    speed = 'medium',
    width,
    height,
    size = 'medium',
    borderRadius = 4,
    color = '#E1E9EE',
    highlightColor = '#F2F8FC',
    style,
    children,
    testID,
}) => {
    // Animation shared values
    const shimmerValue = useSharedValue(0);
    const pulseValue = useSharedValue(0);

    // Get animation duration based on speed
    const getAnimationDuration = () => {
        switch (speed) {
            case 'slow': return 2000;
            case 'fast': return 800;
            case 'medium':
            default: return 1200;
        }
    };

    // Get size dimensions
    const getSizeDimensions = () => {
        switch (size) {
            case 'small': return { width: 60, height: 12 };
            case 'large': return { width: 240, height: 24 };
            case 'xlarge': return { width: 300, height: 36 };
            case 'medium':
            default: return { width: 120, height: 18 };
        }
    };

    // Start animations
    useEffect(() => {
        const duration = getAnimationDuration();

        if (animation === 'shimmer') {
            shimmerValue.value = withRepeat(
                withTiming(1, { duration }),
                -1, // Infinite repeat
                false // No reverse
            );
        } else if (animation === 'pulse') {
            pulseValue.value = withRepeat(
                withSequence(
                    withTiming(1, { duration: duration / 2 }),
                    withTiming(0, { duration: duration / 2 })
                ),
                -1, // Infinite repeat
                false // No reverse
            );
        }

        // Cleanup animations on unmount
        return () => {
            cancelAnimation(shimmerValue);
            cancelAnimation(pulseValue);
        };
    }, [animation, speed]);

    // Shimmer animated style
    const shimmerAnimatedStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: highlightColor,
            opacity: 0.7,
            transform: [
                {
                    translateX: interpolate(
                        shimmerValue.value,
                        [0, 1],
                        [-100, 100],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });

    // Pulse animated style
    const pulseAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                pulseValue.value,
                [0, 1],
                [0.4, 0.8],
                Extrapolation.CLAMP
            ),
        };
    });

    // Determine dimensions
    const sizeDimensions = getSizeDimensions();
    const finalWidth = PixelRatio.roundToNearestPixel(Number(width) || sizeDimensions.width);
    const finalHeight = PixelRatio.roundToNearestPixel(shape === 'circle' ? finalWidth : (Number(height) || sizeDimensions.height));
    // Determine border radius
    const finalBorderRadius = shape === 'circle' ? 9999 : borderRadius;

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    width: finalWidth,
                    height: finalHeight,
                    borderRadius: finalBorderRadius,
                    backgroundColor: color,
                },
                animation === 'pulse' && pulseAnimatedStyle,
                style,
            ]}
            testID={testID}
            accessibilityRole="none"
            accessibilityLabel="Loading content"
        >
            {animation === 'shimmer' && (
                <Animated.View style={shimmerAnimatedStyle} />
            )}
            {children}
        </Animated.View>
    );
};

// Convenience components for common use cases
export const SkeletonRect: React.FC<Omit<SkeletonProps, 'shape'>> = (props) => (
    <AnimatedSkeleton shape="rectangle" {...props} />
);

export const SkeletonCircle: React.FC<Omit<SkeletonProps, 'shape'>> = (props) => (
    <AnimatedSkeleton shape="circle" {...props} />
);

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
});

export default AnimatedSkeleton;