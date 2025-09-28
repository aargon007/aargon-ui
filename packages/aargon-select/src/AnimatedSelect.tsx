import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    Platform,
    Modal,
} from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    interpolate,
    runOnJS,
    Easing,
} from 'react-native-reanimated'
import { type SelectOption, getSelectStyles, getSelectColors, type SelectAnimationType, type SelectVariant, type SelectSize, type SelectColorScheme } from './utils'
import { SelectOptionComponent } from './SelectOption'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export interface SelectRef {
    open: () => void
    close: () => void
    clear: () => void
    focus: () => void
    blur: () => void
}

export interface AnimatedSelectProps {
    options: SelectOption[]
    value?: string | number | (string | number)[]
    placeholder?: string
    multiple?: boolean
    searchable?: boolean
    clearable?: boolean
    disabled?: boolean
    loading?: boolean
    required?: boolean
    animationType?: SelectAnimationType
    variant?: SelectVariant
    size?: SelectSize
    colorScheme?: SelectColorScheme
    maxHeight?: number
    renderOption?: (option: SelectOption, isSelected: boolean) => React.ReactNode
    onSelectionChange?: (value: string | number | (string | number)[]) => void
    onOpen?: () => void
    onClose?: () => void
    onSearch?: (query: string) => void
    style?: any
    dropdownStyle?: any
    testID?: string
}

export const AnimatedSelect = forwardRef<SelectRef, AnimatedSelectProps>(({
    options = [],
    value,
    placeholder = 'Select an option...',
    multiple = false,
    searchable = false,
    clearable = false,
    disabled = false,
    loading = false,
    required = false,
    animationType = 'fade',
    variant = 'default',
    size = 'md',
    colorScheme = 'primary',
    maxHeight = 300,
    renderOption,
    onSelectionChange,
    onOpen,
    onClose,
    onSearch,
    style,
    dropdownStyle,
    testID,
}, ref) => {
    // State
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [triggerLayout, setTriggerLayout] = useState({ x: 0, y: 0, width: 0, height: 0 })

    // Refs
    const triggerRef = useRef<View>(null)
    const searchInputRef = useRef<TextInput>(null)

    // Animation values
    const dropdownAnimation = useSharedValue(0)
    const backdropAnimation = useSharedValue(0)

    // Get styles and colors
    const selectStyles = getSelectStyles(size)
    const selectColors = getSelectColors(colorScheme, variant)

    // Filter options based on search
    const filteredOptions = searchable && searchQuery
        ? options.filter(option =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : options

    // Get selected options
    const selectedOptions = multiple
        ? options.filter(option =>
            Array.isArray(value) ? value.includes(option.value) : false
        )
        : options.find(option => option.value === value)

    // Get display text
    const getDisplayText = () => {
        if (multiple && Array.isArray(value) && value.length > 0) {
            if (value.length === 1) {
                const option = options.find(opt => opt.value === value[0])
                return option?.label || ''
            }
            return `${value.length} items selected`
        }

        if (!multiple && value) {
            const option = options.find(opt => opt.value === value)
            return option?.label || ''
        }

        return ''
    }

    // Animation configurations
    const getAnimationConfig = () => {
        const configs = {
            fade: {
                duration: 200,
                easing: Easing.out(Easing.cubic),
            },
            scale: {
                duration: 250,
                damping: 20,
                stiffness: 300,
            },
            slide: {
                duration: 300,
                damping: 25,
                stiffness: 400,
            },
            bounce: {
                duration: 400,
                damping: 15,
                stiffness: 200,
            },
            flip: {
                duration: 350,
                damping: 20,
                stiffness: 300,
            },
            none: {
                duration: 0,
            },
        }
        return configs[animationType] || configs.fade
    }

    // Open dropdown
    const openDropdown = () => {
        if (disabled || loading) return

        // Measure trigger position
        triggerRef.current?.measureInWindow((x, y, width, height) => {
            setTriggerLayout({ x, y, width, height })
        })

        setIsOpen(true)
        onOpen?.()

        const config = getAnimationConfig()

        if (animationType === 'none') {
            dropdownAnimation.value = 1
            backdropAnimation.value = 1
        } else if (['scale', 'slide', 'bounce', 'flip'].includes(animationType)) {
            if ('damping' in config) {
                dropdownAnimation.value = withSpring(1, {
                    damping: config.damping,
                    stiffness: config.stiffness,
                    mass: 1,
                })
            }
            backdropAnimation.value = withTiming(1, { duration: config.duration })
        } else {
            if ('easing' in config) {
                dropdownAnimation.value = withTiming(1, {
                    duration: config.duration,
                    easing: config.easing,
                })
            } else {
                dropdownAnimation.value = withTiming(1, {
                    duration: config.duration,
                })
            }
            backdropAnimation.value = withTiming(1, { duration: config.duration })
        }

        // Focus search input if searchable
        if (searchable) {
            setTimeout(() => {
                searchInputRef.current?.focus()
            }, 100)
        }
    }

    // Close dropdown
    const closeDropdown = () => {
        const config = getAnimationConfig()

        const closeAnimation = () => {
            setIsOpen(false)
            setSearchQuery('')
            onClose?.()
        }

        if (animationType === 'none') {
            dropdownAnimation.value = 0
            backdropAnimation.value = 0
            runOnJS(closeAnimation)()
        } else if (['scale', 'slide', 'bounce', 'flip'].includes(animationType)) {
            if ('damping' in config) {
                dropdownAnimation.value = withSpring(0, {
                    damping: config.damping,
                    stiffness: config.stiffness,
                    mass: 1,
                }, () => {
                    runOnJS(closeAnimation)()
                })
            }
            backdropAnimation.value = withTiming(0, { duration: config.duration })
        } else {
            if ('easing' in config) {
                dropdownAnimation.value = withTiming(0, {
                    duration: config.duration,
                    easing: config.easing,
                }, () => {
                    runOnJS(closeAnimation)()
                })
            }
            backdropAnimation.value = withTiming(0, { duration: config.duration })
        }
    }

    // Handle option selection
    const handleOptionSelect = (option: SelectOption) => {
        if (option.disabled) return

        let newValue: string | number | (string | number)[]

        if (multiple) {
            const currentValues = Array.isArray(value) ? value : []
            if (currentValues.includes(option.value)) {
                newValue = currentValues.filter(v => v !== option.value)
            } else {
                newValue = [...currentValues, option.value]
            }
        } else {
            newValue = option.value
            closeDropdown()
        }

        onSelectionChange?.(newValue)
    }

    // Clear selection
    const clearSelection = () => {
        const newValue = multiple ? [] : ''
        onSelectionChange?.(newValue)
    }

    // Handle search
    const handleSearch = (query: string) => {
        setSearchQuery(query)
        onSearch?.(query)
    }

    // Imperative methods
    useImperativeHandle(ref, () => ({
        open: openDropdown,
        close: closeDropdown,
        clear: clearSelection,
        focus: openDropdown,
        blur: closeDropdown,
    }))

    // Animated styles
    const backdropAnimatedStyle = useAnimatedStyle(() => ({
        opacity: backdropAnimation.value,
    }))

    const dropdownAnimatedStyle = useAnimatedStyle(() => {
        const progress = dropdownAnimation.value

        switch (animationType) {
            case 'scale':
                return {
                    opacity: progress,
                    transform: [
                        { scale: interpolate(progress, [0, 1], [0.8, 1]) },
                    ],
                }
            case 'slide':
                return {
                    opacity: progress,
                    transform: [
                        { translateY: interpolate(progress, [0, 1], [-20, 0]) },
                    ],
                }
            case 'bounce':
                return {
                    opacity: progress,
                    transform: [
                        { scale: interpolate(progress, [0, 1], [0.3, 1]) },
                    ],
                }
            case 'flip':
                return {
                    opacity: progress,
                    transform: [
                        { rotateX: `${interpolate(progress, [0, 1], [90, 0])}deg` },
                    ],
                }
            case 'fade':
            default:
                return {
                    opacity: progress,
                }
        }
    })

    // Calculate dropdown position
    const getDropdownPosition = () => {
        const spaceBelow = SCREEN_HEIGHT - triggerLayout.y - triggerLayout.height
        const spaceAbove = triggerLayout.y
        const dropdownHeight = Math.min(maxHeight, filteredOptions.length * 50 + 60)

        const shouldShowAbove = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight

        return {
            top: shouldShowAbove
                ? triggerLayout.y - dropdownHeight - 8
                : triggerLayout.y + triggerLayout.height + 8,
            left: Math.max(16, Math.min(triggerLayout.x, SCREEN_WIDTH - triggerLayout.width - 16)),
            width: triggerLayout.width,
            maxHeight: shouldShowAbove ? spaceAbove - 16 : spaceBelow - 16,
        }
    }

    const dropdownPosition = getDropdownPosition()

    return (
        <>
            {/* Trigger */}
            <View ref={triggerRef} style={style}>
                <TouchableOpacity
                    style={[
                        styles.trigger,
                        selectStyles.container,
                        {
                            backgroundColor: selectColors.background,
                            borderColor: selectColors.border,
                            borderWidth: selectColors.borderWidth,
                        },
                        disabled && styles.disabled,
                    ]}
                    onPress={openDropdown}
                    disabled={disabled || loading}
                    activeOpacity={0.7}
                    testID={testID}
                >
                    <View style={styles.triggerContent}>
                        <Text
                            style={[
                                styles.triggerText,
                                selectStyles.text,
                                {
                                    color: getDisplayText() ? selectColors.text : selectColors.placeholder,
                                },
                            ]}
                            numberOfLines={1}
                        >
                            {getDisplayText() || placeholder}
                            {required && !getDisplayText() && (
                                <Text style={styles.required}> *</Text>
                            )}
                        </Text>

                        <View style={styles.triggerActions}>
                            {clearable && getDisplayText() && !disabled && !loading && (
                                <TouchableOpacity
                                    style={styles.clearButton}
                                    onPress={(e) => {
                                        e.stopPropagation()
                                        clearSelection()
                                    }}
                                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                >
                                    <Text style={[styles.clearIcon, { color: selectColors.icon }]}>×</Text>
                                </TouchableOpacity>
                            )}

                            {loading ? (
                                <View style={styles.loadingContainer}>
                                    <Text style={[styles.loadingText, { color: selectColors.icon }]}>...</Text>
                                </View>
                            ) : (
                                <Text
                                    style={[
                                        styles.chevron,
                                        { color: selectColors.icon, fontSize: selectStyles.icon },
                                        isOpen && styles.chevronOpen,
                                    ]}
                                >
                                    ▼
                                </Text>
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Dropdown Modal */}
            <Modal
                visible={isOpen}
                transparent
                animationType="none"
                onRequestClose={closeDropdown}
                statusBarTranslucent
            >
                {/* Backdrop */}
                <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
                    <TouchableOpacity
                        style={styles.backdropTouchable}
                        onPress={closeDropdown}
                        activeOpacity={1}
                    />
                </Animated.View>

                {/* Dropdown */}
                <Animated.View
                    style={[
                        styles.dropdown,
                        selectStyles.dropdown,
                        {
                            backgroundColor: selectColors.dropdownBackground,
                            borderColor: selectColors.dropdownBorder,
                            ...dropdownPosition,
                        },
                        dropdownStyle,
                        dropdownAnimatedStyle,
                    ]}
                >
                    {/* Search Input */}
                    {searchable && (
                        <View style={styles.searchContainer}>
                            <Text style={[styles.searchIcon, { color: selectColors.icon }]}>🔍</Text>
                            <TextInput
                                ref={searchInputRef}
                                style={[
                                    styles.searchInput,
                                    { color: selectColors.text },
                                ]}
                                placeholder="Search options..."
                                placeholderTextColor={selectColors.placeholder}
                                value={searchQuery}
                                onChangeText={handleSearch}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            {searchQuery.length > 0 && (
                                <TouchableOpacity
                                    style={styles.searchClear}
                                    onPress={() => handleSearch('')}
                                >
                                    <Text style={[styles.clearIcon, { color: selectColors.icon }]}>×</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}

                    {/* Options List */}
                    <ScrollView
                        style={styles.optionsList}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {filteredOptions.length === 0 ? (
                            <View style={styles.noOptionsContainer}>
                                <Text style={[styles.noOptionsText, { color: selectColors.placeholder }]}>
                                    {searchQuery ? 'No options found' : 'No options available'}
                                </Text>
                            </View>
                        ) : (
                            filteredOptions.map((option, index) => {
                                const isSelected = multiple
                                    ? Array.isArray(value) && value.includes(option.value)
                                    : value === option.value

                                return (
                                    <SelectOptionComponent
                                        key={`${option.value}-${index}`}
                                        option={option}
                                        isSelected={isSelected}
                                        onPress={() => handleOptionSelect(option)}
                                        colors={selectColors}
                                        size={size}
                                        multiple={multiple}
                                        renderCustom={renderOption}
                                        searchQuery={searchQuery}
                                    />
                                )
                            })
                        )}
                    </ScrollView>
                </Animated.View>
            </Modal>
        </>
    )
})

const styles = StyleSheet.create({
    trigger: {
        borderRadius: 8,
        borderWidth: 1,
        minHeight: 40,
        justifyContent: 'center',
    },
    disabled: {
        opacity: 0.5,
    },
    triggerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    triggerText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '400',
    },
    required: {
        color: '#EF4444',
    },
    triggerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    clearButton: {
        padding: 2,
    },
    clearIcon: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingContainer: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    chevron: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    chevronOpen: {
        transform: [{ rotate: '180deg' }],
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 999,
    },
    backdropTouchable: {
        flex: 1,
    },
    dropdown: {
        position: 'absolute',
        borderRadius: 12,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 8,
        zIndex: 1000,
        overflow: 'hidden',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    searchIcon: {
        marginRight: 8,
        fontSize: 16,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 4,
        paddingHorizontal: 0,
        ...Platform.select({
            web: {
                outlineWidth: 0,
                outlineColor: 'transparent',
            },
        }),
    },
    searchClear: {
        padding: 4,
        marginLeft: 8,
    },
    optionsList: {
        maxHeight: 300,
    },
    noOptionsContainer: {
        padding: 16,
        alignItems: 'center',
    },
    noOptionsText: {
        fontSize: 14,
        fontStyle: 'italic',
    },
})

export default AnimatedSelect;
