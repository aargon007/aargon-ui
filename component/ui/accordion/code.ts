export const accordionCode = `
import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, type LayoutChangeEvent, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated';

const AnimatedAccordion = ({
    children,
    title = 'Click me',
    isExpanded = false,
    duration = 300,
    style,
}: {
    title?: string;
    isExpanded?: boolean;
    children: React.ReactNode;
    duration?: number;
    style?: any;
}) => {
    const contentHeight = useSharedValue(0);
    const expanded = useSharedValue(isExpanded);
    const [measured, setMeasured] = useState(false);
    const heightRef = useRef(0);

    const toggleAccordion = () => {
        expanded.value = !expanded.value;
        contentHeight.value = withTiming(
            expanded.value ? heightRef.current : 0,
            { duration }
        );
    };

    const onContentLayout = (event: LayoutChangeEvent) => {
        if (measured) return;
        const height = event.nativeEvent.layout.height;
        heightRef.current = height;

        // 💡 Apply initial open height based on prop
        contentHeight.value = withTiming(
            expanded.value ? height : 0,
            { duration }
        );
        setMeasured(true);
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: contentHeight.value,
        };
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={.7} style={styles.header} onPress={toggleAccordion}>
                <Text style={styles.headerText}>{title}</Text>
            </TouchableOpacity>

            <Animated.View style={[animatedStyle, styles.body, style]}>
                <View onLayout={onContentLayout}>
                    {children}
                </View>
            </Animated.View>
        </View>
    );
};

export default AnimatedAccordion;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 8,
    },
    header: {
        backgroundColor: '#4682B4',
        padding: 12,
        borderRadius: 8,
        width: '90%',
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    body: {
        overflow: 'hidden',
        width: '90%',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        marginTop: 4,
    },
});
`