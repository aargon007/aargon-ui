import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    interpolate,
    runOnJS,
    interpolateColor,
} from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons'
import { SelectOptionComponent } from './SelectOption'
import {
    getSelectColors,
    getSelectSizes,
    getAnimationConfig,
    type SelectOption,
    type SelectVariant,
    type SelectSize,
    type SelectColorScheme,
    type SelectAnimationType,
} from './utils'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

export interface AnimatedSelectProps {
    options: SelectOption[]
    value?: string | number | (string | number)[]
    placeholder?: string
    variant?: SelectVariant
    size?: SelectSize
    colorScheme?: SelectColorScheme
    animationType?: SelectAnimationType
    multiple?: boolean
    searchable?: boolean
    disabled?: boolean
    required?: boolean
    loading?: boolean
    clearable?: boolean
    maxHeight?: number
    onSelectionChange?: (value: string | number | (string | number)[]) => void
    onOpen?: () => void
    onClose?: () => void
    onSearch?: (query: string) => void
    renderOption?: (option: SelectOption, isSelected: boolean) => React.ReactNode
    style?: any
    dropdownStyle?: any
    testID?: string
}

export interface SelectRef {
    open: () => void
    close: () => void
    clear: () => void
    focus: () => void
    blur: () => void
}

export const AnimatedSelect = forwardRef<SelectRef, AnimatedSelectProps>(
    (
        {
            options = [],
            value,
            placeholder = 'Select an option...',
            variant = 'default',
            size = 'md',
            colorScheme = 'primary',
            animationType = 'fade',
            multiple = false,
            searchable = false,
            disabled = false,
            required = false,
            loading = false,
            clearable = false,
            maxHeight,
            onSelectionChange,
            onOpen,
            onClose,
            onSearch,
            renderOption,
            style,
            dropdownStyle,
            testID,
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false)
        const [searchQuery, setSearchQuery] = useState('')
        const [dropdownLayout, setDropdownLayout] = useState({ width: 0, height: 0 })

        const containerRef = useRef<View>(null)
        const searchInputRef = useRef<TextInput>(null)

        // Animation values
        const dropdownAnimation = useSharedValue(0)
        const focusAnimation = useSharedValue(0)
        const rotationAnimation = useSharedValue(0)

        // Get theme values
        const colors = getSelectColors(variant, colorScheme)
        const sizes = getSelectSizes(size)
        const animationConfig = getAnimationConfig(animationType)

        // Get selected options
        const selectedOptions = React.useMemo(() => {
            if (!value) return []
            const values = Array.isArray(value) ? value : [value]
            return options.filter(option => values.includes(option.value))
        }, [value, options])

        // Filter options based on search
        const filteredOptions = React.useMemo(() => {
            if (!searchQuery) return options
            return options.filter(option =>
                option.label.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }, [options, searchQuery])

        // Imperative methods
        useImperativeHandle(ref, () => ({
            open: () => handleOpen(),
            close: () => handleClose(),
            clear: () => handleClear(),
            focus: () => handleOpen(),
            blur: () => handleClose(),
        }))

        const handleOpen = () => {
            if (disabled || loading) return

            setIsOpen(true)
            dropdownAnimation.value = withSpring(1, animationConfig.spring)
            focusAnimation.value = withSpring(1, animationConfig.spring)
            rotationAnimation.value = withSpring(1, animationConfig.spring)

            if (searchable) {
                setTimeout(() => searchInputRef.current?.focus(), 100)
            }

            onOpen?.()
        }

        const handleClose = () => {
            dropdownAnimation.value = withSpring(0, animationConfig.spring, () => {
                runOnJS(setIsOpen)(false)
                runOnJS(setSearchQuery)('')
            })
            focusAnimation.value = withSpring(0, animationConfig.spring)
            rotationAnimation.value = withSpring(0, animationConfig.spring)

            onClose?.()
        }

        const handleToggle = () => {
            if (isOpen) {
                handleClose()
            } else {
                handleOpen()
            }
        }

        const handleOptionSelect = (option: SelectOption) => {
            if (multiple) {
                const currentValues = Array.isArray(value) ? value : []
                const isSelected = currentValues.includes(option.value)

                let newValues: (string | number)[]
                if (isSelected) {
                    newValues = currentValues.filter(v => v !== option.value)
                } else {
                    newValues = [...currentValues, option.value]
                }

                onSelectionChange?.(newValues)
            } else {
                onSelectionChange?.(option.value)
                handleClose()
            }
        }

        const handleClear = () => {
            onSelectionChange?.(multiple ? [] : '')
        }

        const handleSearch = (query: string) => {
            setSearchQuery(query)
            onSearch?.(query)
        }

        // Animated styles
        const containerAnimatedStyle = useAnimatedStyle(() => {
            const borderColor = interpolateColor(
                focusAnimation.value,
                [0, 1],
                [colors.border, colors.borderFocus]
            )

            return {
                borderColor,
                backgroundColor: colors.background,
            }
        })

        const dropdownAnimatedStyle = useAnimatedStyle(() => {
            let transform: any[] = []
            let opacity = dropdownAnimation.value

            switch (animationType) {
                case 'scale':
                    const scale = interpolate(dropdownAnimation.value, [0, 1], [0.8, 1])
                    transform = [{ scale }]
                    break
                case 'slide':
                    const translateY = interpolate(dropdownAnimation.value, [0, 1], [-20, 0])
                    transform = [{ translateY }]
                    break
                case 'bounce':
                    const bounceScale = interpolate(dropdownAnimation.value, [0, 1], [0.3, 1])
                    transform = [{ scale: bounceScale }]
                    break
                case 'flip':
                    const rotateX = interpolate(dropdownAnimation.value, [0, 1], [-90, 0])
                    transform = [{ rotateX: `${rotateX}deg` }]
                    break
                case 'none':
                    opacity = dropdownAnimation.value > 0.5 ? 1 : 0
                    break
            }

            return {
                opacity,
                transform,
                backgroundColor: colors.dropdown,
                borderColor: colors.dropdownBorder,
            }
        })

        const iconAnimatedStyle = useAnimatedStyle(() => {
            const rotation = interpolate(rotationAnimation.value, [0, 1], [0, 180])
            return {
                transform: [{ rotate: `${rotation}deg` }],
            }
        })

        const backdropAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: dropdownAnimation.value * 0.5,
            }
        })

        // Render selected text
        const renderSelectedText = () => {
            if (selectedOptions.length === 0) {
                return (
                    <Text
                        style={[
                            styles.placeholderText,
                            { fontSize: sizes.text.fontSize, color: colors.placeholder },
                        ]}
                    >
                        {placeholder}
                        {required && <Text style={styles.required}> *</Text>}
                    </Text>
                )
            }

            if (multiple && selectedOptions.length > 1) {
                return (
                    <Text
                        style={[
                            styles.selectedText,
                            { fontSize: sizes.text.fontSize, color: colors.text },
                        ]}
                    >
                        {selectedOptions.length} items selected
                    </Text>
                )
            }

            return (
                <Text
                    style={[
                        styles.selectedText,
                        { fontSize: sizes.text.fontSize, color: colors.text },
                    ]}
                >
                    {selectedOptions[0]?.label}
                </Text>
            )
        }

        return (
            <View style={[styles.container, style]} testID={testID}>
                {/* Main Select Button */}
                <AnimatedTouchableOpacity
                    ref={containerRef}
                    style={[
                        styles.selectButton,
                        {
                            paddingVertical: sizes.container.paddingVertical,
                            paddingHorizontal: sizes.container.paddingHorizontal,
                            minHeight: sizes.container.minHeight,
                            borderRadius: sizes.container.borderRadius,
                            borderWidth: 1,
                            opacity: disabled ? 0.5 : 1,
                        },
                        containerAnimatedStyle,
                    ]}
                    onPress={handleToggle}
                    disabled={disabled || loading}
                    activeOpacity={0.8}
                >
                    <View style={styles.selectContent}>
                        {renderSelectedText()}

                        <View style={styles.rightSection}>
                            {clearable && selectedOptions.length > 0 && !loading && (
                                <TouchableOpacity
                                    style={styles.clearButton}
                                    onPress={handleClear}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                    <Feather
                                        name="x"
                                        size={sizes.icon - 2}
                                        color={colors.icon}
                                    />
                                </TouchableOpacity>
                            )}

                            {loading ? (
                                <Animated.View
                                    style={[
                                        styles.loadingSpinner,
                                        {
                                            width: sizes.icon,
                                            height: sizes.icon,
                                            borderColor: colors.icon,
                                        },
                                    ]}
                                />
                            ) : (
                                <Animated.View style={iconAnimatedStyle}>
                                    <Feather
                                        name="chevron-down"
                                        size={sizes.icon}
                                        color={colors.icon}
                                    />
                                </Animated.View>
                            )}
                        </View>
                    </View>
                </AnimatedTouchableOpacity>

                {/* Dropdown */}
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <Animated.View
                            style={[styles.backdrop, backdropAnimatedStyle]}
                            pointerEvents="auto"
                        >
                            <TouchableOpacity
                                style={StyleSheet.absoluteFillObject}
                                onPress={handleClose}
                                activeOpacity={1}
                            />
                        </Animated.View>

                        {/* Dropdown Content */}
                        <Animated.View
                            style={[
                                styles.dropdown,
                                {
                                    borderRadius: sizes.dropdown.borderRadius,
                                    maxHeight: maxHeight || sizes.dropdown.maxHeight,
                                    borderWidth: 1,
                                },
                                dropdownStyle,
                                dropdownAnimatedStyle,
                            ]}
                            onLayout={(event) => {
                                setDropdownLayout({
                                    width: event.nativeEvent.layout.width,
                                    height: event.nativeEvent.layout.height,
                                })
                            }}
                        >
                            {/* Search Input */}
                            {searchable && (
                                <View style={styles.searchContainer}>
                                    <Feather
                                        name="search"
                                        size={sizes.icon - 2}
                                        color={colors.icon}
                                        style={styles.searchIcon}
                                    />
                                    <TextInput
                                        ref={searchInputRef}
                                        style={[
                                            styles.searchInput,
                                            { fontSize: sizes.text.fontSize, color: colors.text },
                                        ]}
                                        placeholder="Search options..."
                                        placeholderTextColor={colors.placeholder}
                                        value={searchQuery}
                                        onChangeText={handleSearch}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                </View>
                            )}

                            {/* Options List */}
                            <ScrollView
                                style={styles.optionsList}
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps="handled"
                            >
                                {filteredOptions.length === 0 ? (
                                    <View style={styles.emptyContainer}>
                                        <Text
                                            style={[
                                                styles.emptyText,
                                                { fontSize: sizes.text.fontSize, color: colors.placeholder },
                                            ]}
                                        >
                                            {searchQuery ? 'No options found' : 'No options available'}
                                        </Text>
                                    </View>
                                ) : (
                                    filteredOptions.map((option, index) => {
                                        const isSelected = multiple
                                            ? Array.isArray(value) && value.includes(option.value)
                                            : value === option.value

                                        if (renderOption) {
                                            return (
                                                <TouchableOpacity
                                                    key={`${option.value}-${index}`}
                                                    onPress={() => handleOptionSelect(option)}
                                                    disabled={option.disabled}
                                                >
                                                    {renderOption(option, isSelected)}
                                                </TouchableOpacity>
                                            )
                                        }

                                        return (
                                            <SelectOptionComponent
                                                key={`${option.value}-${index}`}
                                                option={option}
                                                isSelected={isSelected}
                                                colors={colors}
                                                sizes={sizes}
                                                onPress={handleOptionSelect}
                                                searchQuery={searchQuery}
                                            />
                                        )
                                    })
                                )}
                            </ScrollView>
                        </Animated.View>
                    </>
                )}
            </View>
        )
    }
)

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        zIndex: 1000,
    },
    selectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    placeholderText: {
        flex: 1,
        opacity: 0.7,
    },
    selectedText: {
        flex: 1,
        fontWeight: '500',
    },
    required: {
        color: '#EF4444',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    clearButton: {
        marginRight: 8,
        padding: 2,
    },
    loadingSpinner: {
        borderWidth: 2,
        borderRadius: 50,
        borderTopColor: 'transparent',
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: -1000,
        right: -1000,
        bottom: -SCREEN_HEIGHT,
        // backgroundColor: '#000000',
        zIndex: 999,
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        marginTop: 4,
        zIndex: 1000,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
            },
            android: {
                elevation: 8,
            },
            web: {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
        }),
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 0,
    },
    optionsList: {
        maxHeight: 200,
    },
    emptyContainer: {
        padding: 20,
        alignItems: 'center',
    },
    emptyText: {
        textAlign: 'center',
        fontStyle: 'italic',
    },
})

AnimatedSelect.displayName = 'AnimatedSelect'