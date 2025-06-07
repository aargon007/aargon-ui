import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    interpolateColor,
} from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons'
import type { SelectOption, SelectColors, SelectSizes } from './utils'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

interface SelectOptionProps {
    option: SelectOption
    isSelected: boolean
    colors: SelectColors
    sizes: SelectSizes
    onPress: (option: SelectOption) => void
    searchQuery?: string
}

export const SelectOptionComponent: React.FC<SelectOptionProps> = ({
    option,
    isSelected,
    colors,
    sizes,
    onPress,
    searchQuery,
}) => {
    const pressAnimation = useSharedValue(0)
    const selectionAnimation = useSharedValue(isSelected ? 1 : 0)

    React.useEffect(() => {
        selectionAnimation.value = withSpring(isSelected ? 1 : 0, {
            damping: 20,
            stiffness: 300,
        })
    }, [isSelected])

    const handlePressIn = () => {
        pressAnimation.value = withSpring(1, { damping: 15, stiffness: 300 })
    }

    const handlePressOut = () => {
        pressAnimation.value = withSpring(0, { damping: 15, stiffness: 300 })
    }

    const handlePress = () => {
        if (!option.disabled) {
            onPress(option)
        }
    }

    const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            selectionAnimation.value,
            [0, 1],
            [colors.optionBackground, colors.selectedBackground]
        )

        const scale = 1 - pressAnimation.value * 0.02

        return {
            backgroundColor,
            transform: [{ scale }],
        }
    })

    const textAnimatedStyle = useAnimatedStyle(() => {
        const color = interpolateColor(
            selectionAnimation.value,
            [0, 1],
            [colors.optionText, colors.selectedText]
        )

        return { color }
    })

    const highlightText = (text: string, query?: string) => {
        if (!query) return text

        const parts = text.split(new RegExp(`(${query})`, 'gi'))
        return parts.map((part, index) => (
            <Text
                key={index}
                style={[
                    part.toLowerCase() === query.toLowerCase() && styles.highlight,
                ]}
            >
                {part}
            </Text>
        ))
    }

    return (
        <AnimatedTouchableOpacity
            style={[
                styles.option,
                {
                    paddingVertical: sizes.option.paddingVertical,
                    paddingHorizontal: sizes.option.paddingHorizontal,
                    minHeight: sizes.option.minHeight,
                    opacity: option.disabled ? 0.5 : 1,
                },
                animatedStyle,
            ]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            disabled={option.disabled}
            activeOpacity={0.8}
        >
            <View style={styles.optionContent}>
                {option.icon && (
                    <Feather
                        name={option.icon as any}
                        size={sizes.icon}
                        color={isSelected ? colors.selectedText : colors.optionText}
                        style={styles.optionIcon}
                    />
                )}

                <View style={styles.optionTextContainer}>
                    <Animated.Text
                        style={[
                            styles.optionText,
                            { fontSize: sizes.text.fontSize },
                            textAnimatedStyle,
                        ]}
                    >
                        {highlightText(option.label, searchQuery)}
                    </Animated.Text>

                    {option.description && (
                        <Animated.Text
                            style={[
                                styles.optionDescription,
                                { fontSize: sizes.text.fontSize - 2 },
                                textAnimatedStyle,
                            ]}
                        >
                            {option.description}
                        </Animated.Text>
                    )}
                </View>

                {isSelected && (
                    <Animated.View
                        style={[
                            styles.checkIcon,
                            {
                                opacity: selectionAnimation.value,
                                transform: [{ scale: selectionAnimation.value }],
                            },
                        ]}
                    >
                        <Feather
                            name="check"
                            size={sizes.icon}
                            color={colors.selectedText}
                        />
                    </Animated.View>
                )}
            </View>
        </AnimatedTouchableOpacity>
    )
}

const styles = StyleSheet.create({
    option: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionIcon: {
        marginRight: 12,
    },
    optionTextContainer: {
        flex: 1,
    },
    optionText: {
        fontWeight: '500',
    },
    optionDescription: {
        opacity: 0.7,
        marginTop: 2,
    },
    checkIcon: {
        marginLeft: 12,
    },
    highlight: {
        backgroundColor: '#FEF3C7',
        fontWeight: '600',
    },
})