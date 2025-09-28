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
    Modal,
} from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    interpolate,
    runOnJS,
    interpolateColor,
    Easing,
} from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons'
import { DropdownItemComponent } from './DropdownItem'
import {
    getDropdownColors,
    getDropdownSizes,
    getAnimationConfig,
    getPlatformStyles,
    findItemByValue,
    filterItems,
    validateDropdownProps,
    type DropdownItem,
    type DropdownVariant,
    type DropdownSize,
    type DropdownColorScheme,
    type DropdownAnimationType,
    type DropdownPosition,
} from './dropdownUtils'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

export interface DropdownRef {
    open: () => void
    close: () => void
    toggle: () => void
    clear: () => void
    focus: () => void
    blur: () => void
}

export interface AnimatedDropdownProps {
    items: DropdownItem[]
    value?: string | number
    placeholder?: string
    variant?: DropdownVariant
    size?: DropdownSize
    colorScheme?: DropdownColorScheme
    animationType?: DropdownAnimationType
    position?: DropdownPosition
    searchable?: boolean
    clearable?: boolean
    disabled?: boolean
    loading?: boolean
    required?: boolean
    maxHeight?: number
    onSelectionChange?: (value: string | number) => void
    onOpen?: () => void
    onClose?: () => void
    onSearch?: (query: string) => void
    renderItem?: (item: DropdownItem, isSelected: boolean) => React.ReactNode
    renderTrigger?: (selectedItem?: DropdownItem, isOpen?: boolean) => React.ReactNode
    style?: any
    dropdownStyle?: any
    testID?: string
}

export const AnimatedDropdown = forwardRef<DropdownRef, AnimatedDropdownProps>(
    (
        {
            items = [],
            value,
            placeholder = 'Select an option...',
            variant = 'default',
            size = 'md',
            colorScheme = 'primary',
            animationType = 'fade',
            position = 'auto',
            searchable = false,
            clearable = false,
            disabled = false,
            loading = false,
            required = false,
            maxHeight,
            onSelectionChange,
            onOpen,
            onClose,
            onSearch,
            renderItem,
            renderTrigger,
            style,
            dropdownStyle,
            testID,
        },
        ref
    ) => {
        // Validate props
        React.useEffect(() => {
            validateDropdownProps({ items, value, onSelectionChange })
        }, [items, value, onSelectionChange])

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
        const rotationAnimation = useSharedValue(0)

        // Get theme values
        const colors = getDropdownColors(colorScheme, variant)
        const sizes = getDropdownSizes(size)
        const animationConfig = getAnimationConfig(animationType)
        const platformStyles = getPlatformStyles()

        // Get selected item
        const selectedItem = value ? findItemByValue(items, value) : undefined

        // Filter items based on search
        const filteredItems = searchable ? filterItems(items, searchQuery) : items

        // Imperative methods
        useImperativeHandle(ref, () => ({
            open: handleOpen,
            close: handleClose,
            toggle: handleToggle,
            clear: handleClear,
            focus: handleOpen,
            blur: handleClose,
        }))

        const handleOpen = () => {
            if (disabled || loading) return

            // Measure trigger position
            triggerRef.current?.measureInWindow((x, y, width, height) => {
                setTriggerLayout({ x, y, width, height })
            })

            setIsOpen(true)
            onOpen?.()

            // Animate dropdown
            if (animationType === 'none') {
                dropdownAnimation.value = 1
                backdropAnimation.value = 1
            } else {
                dropdownAnimation.value = withSpring(1, animationConfig.spring)
                backdropAnimation.value = withTiming(1, { duration: animationConfig.duration })
            }

            // Rotate chevron
            rotationAnimation.value = withSpring(1, animationConfig.spring)

            // Focus search input if searchable
            if (searchable) {
                setTimeout(() => {
                    searchInputRef.current?.focus()
                }, 100)
            }
        }

        const handleClose = () => {
            const closeAnimation = () => {
                setIsOpen(false)
                setSearchQuery('')
                onClose?.()
            }

            if (animationType === 'none') {
                dropdownAnimation.value = 0
                backdropAnimation.value = 0
                runOnJS(closeAnimation)()
            } else {
                dropdownAnimation.value = withSpring(0, animationConfig.spring, () => {
                    runOnJS(closeAnimation)()
                })
                backdropAnimation.value = withTiming(0, { duration: animationConfig.duration })
            }

            // Rotate chevron back
            rotationAnimation.value = withSpring(0, animationConfig.spring)
        }

        const handleToggle = () => {
            if (isOpen) {
                handleClose()
            } else {
                handleOpen()
            }
        }

        const handleItemSelect = (item: DropdownItem) => {
            if (item.disabled) return

            onSelectionChange?.(item.value)
            handleClose()
        }

        const handleClear = () => {
            onSelectionChange?.('')
        }

        const handleSearch = (query: string) => {
            setSearchQuery(query)
            onSearch?.(query)
        }

        // Calculate dropdown position
        const getDropdownPosition = () => {
            const spaceBelow = SCREEN_HEIGHT - triggerLayout.y - triggerLayout.height
            const spaceAbove = triggerLayout.y
            const dropdownHeight = Math.min(
                maxHeight || sizes.dropdown.maxHeight,
                filteredItems.length * sizes.item.minHeight + 60
            )

            let shouldShowAbove = false
            if (position === 'top') {
                shouldShowAbove = true
            } else if (position === 'auto') {
                shouldShowAbove = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight
            }

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

        // Animated styles
        const triggerAnimatedStyle = useAnimatedStyle(() => {
            const borderColor = interpolateColor(
                dropdownAnimation.value,
                [0, 1],
                [colors.border, colors.borderFocus]
            )

            return {
                borderColor,
                backgroundColor: colors.background,
            }
        })

        const backdropAnimatedStyle = useAnimatedStyle(() => ({
            opacity: backdropAnimation.value,
        }))

        const dropdownAnimatedStyle = useAnimatedStyle(() => {
            const progress = dropdownAnimation.value

            switch (animationType) {
                case 'scale':
                    return {
                        opacity: progress,
                        transform: [{ scale: interpolate(progress, [0, 1], [0.8, 1]) }],
                    }
                case 'slide':
                    return {
                        opacity: progress,
                        transform: [{ translateY: interpolate(progress, [0, 1], [-20, 0]) }],
                    }
                case 'bounce':
                    return {
                        opacity: progress,
                        transform: [{ scale: interpolate(progress, [0, 1], [0.3, 1]) }],
                    }
                case 'flip':
                    return {
                        opacity: progress,
                        transform: [{ rotateX: `${interpolate(progress, [0, 1], [90, 0])}deg` }],
                    }
                case 'fade':
                default:
                    return {
                        opacity: progress,
                    }
            }
        })

        const chevronAnimatedStyle = useAnimatedStyle(() => ({
            transform: [{ rotate: `${interpolate(rotationAnimation.value, [0, 1], [0, 180])}deg` }],
        }))

        // Render trigger
        const renderTriggerContent = () => {
            if (renderTrigger) {
                return renderTrigger(selectedItem, isOpen)
            }

            return (
                <View style={styles.triggerContent}>
                    <Text
                        style={[
                            styles.triggerText,
                            {
                                fontSize: sizes.text.fontSize,
                                color: selectedItem ? colors.text : colors.placeholder,
                            },
                        ]}
                        numberOfLines={1}
                    >
                        {selectedItem?.label || placeholder}
                        {required && !selectedItem && (
                            <Text style={styles.required}> *</Text>
                        )}
                    </Text>

                    <View style={styles.triggerActions}>
                        {clearable && selectedItem && !disabled && !loading && (
                            <TouchableOpacity
                                style={styles.clearButton}
                                onPress={(e) => {
                                    e.stopPropagation()
                                    handleClear()
                                }}
                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            >
                                <Feather name="x" size={sizes.icon} color={colors.icon} />
                            </TouchableOpacity>
                        )}

                        {loading ? (
                            <View style={styles.loadingContainer}>
                                <Text style={[styles.loadingText, { color: colors.icon }]}>...</Text>
                            </View>
                        ) : (
                            <Animated.View style={chevronAnimatedStyle}>
                                <Feather name="chevron-down" size={sizes.icon} color={colors.icon} />
                            </Animated.View>
                        )}
                    </View>
                </View>
            )
        }

        return (
            <>
                {/* Trigger */}
                <View ref={triggerRef} style={style}>
                    <AnimatedTouchableOpacity
                        style={[
                            styles.trigger,
                            {
                                ...sizes.container,
                                borderWidth: 1,
                                opacity: disabled ? 0.5 : 1,
                            },
                            triggerAnimatedStyle,
                            platformStyles.webInput,
                        ]}
                        onPress={handleToggle}
                        disabled={disabled || loading}
                        activeOpacity={0.7}
                        testID={testID}
                    >
                        {renderTriggerContent()}
                    </AnimatedTouchableOpacity>
                </View>

                {/* Dropdown Modal */}
                <Modal
                    visible={isOpen}
                    transparent
                    animationType="none"
                    onRequestClose={handleClose}
                    statusBarTranslucent
                >
                    {/* Backdrop */}
                    <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
                        <TouchableOpacity
                            style={styles.backdropTouchable}
                            onPress={handleClose}
                            activeOpacity={1}
                        />
                    </Animated.View>

                    {/* Dropdown */}
                    <Animated.View
                        style={[
                            styles.dropdown,
                            {
                                backgroundColor: colors.dropdown,
                                borderColor: colors.dropdownBorder,
                                borderWidth: 1,
                                borderRadius: sizes.dropdown.borderRadius,
                                paddingVertical: sizes.dropdown.paddingVertical,
                                ...dropdownPosition,
                            },
                            platformStyles.shadow,
                            dropdownStyle,
                            dropdownAnimatedStyle,
                        ]}
                    >
                        {/* Search Input */}
                        {searchable && (
                            <View style={styles.searchContainer}>
                                <Feather name="search" size={16} color={colors.icon} style={styles.searchIcon} />
                                <TextInput
                                    ref={searchInputRef}
                                    style={[
                                        styles.searchInput,
                                        { color: colors.text, fontSize: sizes.text.fontSize },
                                        platformStyles.webInput,
                                    ]}
                                    placeholder="Search options..."
                                    placeholderTextColor={colors.placeholder}
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
                                        <Feather name="x" size={14} color={colors.icon} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}

                        {/* Items List */}
                        <ScrollView
                            style={[styles.itemsList, { maxHeight: dropdownPosition.maxHeight - 60 }]}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >
                            {filteredItems.length === 0 ? (
                                <View style={styles.noItemsContainer}>
                                    <Text style={[styles.noItemsText, { color: colors.placeholder }]}>
                                        {searchQuery ? 'No items found' : 'No items available'}
                                    </Text>
                                </View>
                            ) : (
                                filteredItems.map((item, index) => {
                                    const isSelected = value === item.value

                                    if (renderItem) {
                                        return (
                                            <TouchableOpacity
                                                key={`${item.value}-${index}`}
                                                onPress={() => handleItemSelect(item)}
                                                disabled={item.disabled}
                                            >
                                                {renderItem(item, isSelected)}
                                            </TouchableOpacity>
                                        )
                                    }

                                    return (
                                        <DropdownItemComponent
                                            key={`${item.value}-${index}`}
                                            item={item}
                                            isSelected={isSelected}
                                            colors={colors}
                                            sizes={sizes}
                                            onPress={handleItemSelect}
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
    }
)

const styles = StyleSheet.create({
    trigger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    triggerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    triggerText: {
        flex: 1,
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
        marginBottom: 4,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 4,
        paddingHorizontal: 0,
    },
    searchClear: {
        padding: 4,
        marginLeft: 8,
    },
    itemsList: {
        flexGrow: 0,
    },
    noItemsContainer: {
        padding: 16,
        alignItems: 'center',
    },
    noItemsText: {
        fontSize: 14,
        fontStyle: 'italic',
    },
})

AnimatedDropdown.displayName = 'AnimatedDropdown'
