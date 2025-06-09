import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    interpolateColor,
} from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons'
import type { DropdownItem, DropdownColors, DropdownSizes } from './dropdownUtils'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

interface DropdownItemComponentProps {
    item: DropdownItem
    isSelected: boolean
    colors: DropdownColors
    sizes: DropdownSizes
    onPress: (item: DropdownItem) => void
    searchQuery?: string
}

export const DropdownItemComponent: React.FC<DropdownItemComponentProps> = ({
    item,
    isSelected,
    colors,
    sizes,
    onPress,
    searchQuery,
}) => {
    const pressAnimation = useSharedValue(0)
    const hoverAnimation = useSharedValue(0)

    const handlePressIn = () => {
        pressAnimation.value = withSpring(1, { damping: 15, stiffness: 300 })
    }

    const handlePressOut = () => {
        pressAnimation.value = withSpring(0, { damping: 15, stiffness: 300 })
    }

    const handlePress = () => {
        if (!item.disabled) {
            onPress(item)
        }
    }

    const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            hoverAnimation.value,
            [0, 1],
            [colors.itemBackground, colors.itemHover]
        )

        const scale = 1 - pressAnimation.value * 0.02

        return {
            backgroundColor,
            transform: [{ scale }],
        }
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

    // Render divider if needed
    if (item.divider) {
        return (
            <>
                <AnimatedTouchableOpacity
                    style={[
                        styles.item,
                        {
                            paddingVertical: sizes.item.paddingVertical,
                            paddingHorizontal: sizes.item.paddingHorizontal,
                            minHeight: sizes.item.minHeight,
                            opacity: item.disabled ? 0.5 : 1,
                        },
                        animatedStyle,
                    ]}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={handlePress}
                    disabled={item.disabled}
                    activeOpacity={0.8}
                >
                    <View style={styles.itemContent}>
                        {item.icon && (
                            <Feather
                                name={item.icon as any}
                                size={sizes.icon}
                                color={item.color || colors.itemIcon}
                                style={styles.itemIcon}
                            />
                        )}

                        <View style={styles.itemTextContainer}>
                            <Text
                                style={[
                                    styles.itemText,
                                    {
                                        fontSize: sizes.text.fontSize,
                                        color: item.color || colors.itemText,
                                    },
                                ]}
                            >
                                {highlightText(item.label, searchQuery)}
                            </Text>

                            {item.description && (
                                <Text
                                    style={[
                                        styles.itemDescription,
                                        {
                                            fontSize: sizes.text.fontSize - 2,
                                            color: colors.itemIcon,
                                        },
                                    ]}
                                >
                                    {item.description}
                                </Text>
                            )}
                        </View>

                        {isSelected && (
                            <Feather
                                name="check"
                                size={sizes.icon}
                                color={item.color || colors.itemIcon}
                            />
                        )}
                    </View>
                </AnimatedTouchableOpacity>

                <View style={[styles.divider, { backgroundColor: colors.divider }]} />
            </>
        )
    }

    return (
        <AnimatedTouchableOpacity
            style={[
                styles.item,
                {
                    paddingVertical: sizes.item.paddingVertical,
                    paddingHorizontal: sizes.item.paddingHorizontal,
                    minHeight: sizes.item.minHeight,
                    opacity: item.disabled ? 0.5 : 1,
                },
                animatedStyle,
            ]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            disabled={item.disabled}
            activeOpacity={0.8}
        >
            <View style={styles.itemContent}>
                {item.icon && (
                    <Feather
                        name={item.icon as any}
                        size={sizes.icon}
                        color={item.color || colors.itemIcon}
                        style={styles.itemIcon}
                    />
                )}

                <View style={styles.itemTextContainer}>
                    <Text
                        style={[
                            styles.itemText,
                            {
                                fontSize: sizes.text.fontSize,
                                color: item.color || colors.itemText,
                            },
                        ]}
                    >
                        {highlightText(item.label, searchQuery)}
                    </Text>

                    {item.description && (
                        <Text
                            style={[
                                styles.itemDescription,
                                {
                                    fontSize: sizes.text.fontSize - 2,
                                    color: colors.itemIcon,
                                },
                            ]}
                        >
                            {item.description}
                        </Text>
                    )}
                </View>

                {isSelected && (
                    <Feather
                        name="check"
                        size={sizes.icon}
                        color={item.color || colors.itemIcon}
                    />
                )}
            </View>
        </AnimatedTouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemIcon: {
        marginRight: 12,
    },
    itemTextContainer: {
        flex: 1,
    },
    itemText: {
        fontWeight: '500',
    },
    itemDescription: {
        opacity: 0.7,
        marginTop: 2,
    },
    highlight: {
        backgroundColor: '#FEF3C7',
        fontWeight: '600',
    },
    divider: {
        height: 1,
        marginVertical: 4,
    },
})