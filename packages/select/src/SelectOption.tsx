import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { type SelectOption, type SelectSize, highlightText } from './utils'

interface SelectOptionComponentProps {
    option: SelectOption
    isSelected: boolean
    onPress: (option: SelectOption) => void
    colors: any
    size: SelectSize
    multiple?: boolean
    renderCustom?: (option: SelectOption, isSelected: boolean) => React.ReactNode
    searchQuery?: string
}

export const SelectOptionComponent = ({
    option,
    isSelected,
    onPress,
    colors,
    size = 'md',
    multiple = false,
    renderCustom,
    searchQuery = '',
}: SelectOptionComponentProps) => {
    // If custom render function is provided
    if (renderCustom) {
        return (
            <TouchableOpacity
                onPress={() => onPress(option)}
                disabled={option.disabled}
                style={[
                    styles.option,
                    option.disabled && styles.disabled,
                ]}
            >
                {renderCustom(option, isSelected)}
            </TouchableOpacity>
        )
    }

    // Get sizes based on the size prop
    const getSizes = () => {
        switch (size) {
            case 'sm':
                return { fontSize: 14, iconSize: 14, padding: 8 }
            case 'lg':
                return { fontSize: 18, iconSize: 18, padding: 14 }
            case 'xl':
                return { fontSize: 20, iconSize: 20, padding: 16 }
            case 'md':
            default:
                return { fontSize: 16, iconSize: 16, padding: 12 }
        }
    }

    const sizes = getSizes()

    // Highlight text if search query exists
    const renderLabel = () => {
        if (!searchQuery) {
            return (
                <Text
                    style={[
                        styles.optionLabel,
                        { fontSize: sizes.fontSize, color: colors.optionText },
                        isSelected && { color: colors.optionSelectedText, fontWeight: '500' },
                        option.disabled && styles.disabledText,
                    ]}
                    numberOfLines={1}
                >
                    {option.label}
                </Text>
            )
        }

        const parts = highlightText(option.label, searchQuery)

        return (
            <Text
                style={[
                    styles.optionLabel,
                    { fontSize: sizes.fontSize, color: colors.optionText },
                    isSelected && { color: colors.optionSelectedText, fontWeight: '500' },
                    option.disabled && styles.disabledText,
                ]}
                numberOfLines={1}
            >
                {Array.isArray(parts) ? parts.map((part, index) => {
                    const isMatch = part.toLowerCase() === searchQuery.toLowerCase()
                    return (
                        <Text
                            key={index}
                            style={isMatch ? styles.highlight : undefined}
                        >
                            {part}
                        </Text>
                    )
                }) : parts}
            </Text>
        )
    }

    return (
        <TouchableOpacity
            style={[
                styles.option,
                { paddingVertical: sizes.padding, paddingHorizontal: sizes.padding + 4 },
                isSelected && { backgroundColor: colors.optionSelected },
                option.disabled && styles.disabled,
            ]}
            onPress={() => onPress(option)}
            disabled={option.disabled}
            activeOpacity={0.7}
        >
            <View style={styles.optionContent}>
                {option.icon && (
                    <Text style={[styles.optionIcon, { fontSize: sizes.iconSize, color: isSelected ? colors.optionSelectedText : colors.optionText }]}>
                        {option.icon}
                    </Text>
                )}

                <View style={styles.optionTextContainer}>
                    {renderLabel()}

                    {option.description && (
                        <Text
                            style={[
                                styles.optionDescription,
                                { fontSize: sizes.fontSize - 2, color: colors.placeholder },
                                option.disabled && styles.disabledText,
                            ]}
                            numberOfLines={1}
                        >
                            {option.description}
                        </Text>
                    )}
                </View>
            </View>

            {isSelected && (
                <Text style={[styles.checkIcon, { fontSize: sizes.iconSize, color: colors.optionSelectedText }]}>
                    {multiple ? '☑' : '✓'}
                </Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    disabled: {
        opacity: 0.5,
    },
    disabledText: {
        opacity: 0.6,
    },
    optionContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionIcon: {
        marginRight: 8,
    },
    optionTextContainer: {
        flex: 1,
    },
    optionLabel: {
        fontWeight: '400',
    },
    optionDescription: {
        marginTop: 2,
    },
    highlight: {
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fontWeight: '500',
    },
    checkIcon: {
        fontWeight: 'bold',
    },
})
