"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { View, Text, Pressable, StyleSheet, type ViewStyle, type TextStyle } from "react-native"
import { MotiView } from "moti"
import { AnimatePresence } from "framer-motion"
import { Feather } from "@expo/vector-icons"

// Types
type AccordionType = "single" | "multiple"
type AccordionValue = string | string[]

interface AccordionContextType {
    type: AccordionType
    value: AccordionValue
    onValueChange: (value: AccordionValue) => void
    collapsible: boolean
    animationConfig: any
}

interface AccordionItemContextType {
    value: string
    isOpen: boolean
    toggle: () => void
}

interface AccordionProps {
    type?: AccordionType
    defaultValue?: AccordionValue
    value?: AccordionValue
    onValueChange?: (value: AccordionValue) => void
    collapsible?: boolean
    children: React.ReactNode
    animationConfig?: any
    style?: ViewStyle
}

interface AccordionItemProps {
    value: string
    children: React.ReactNode
    style?: ViewStyle
    disabled?: boolean
}

interface AccordionTriggerProps {
    children: React.ReactNode
    style?: ViewStyle
    textStyle?: TextStyle
    iconPosition?: "left" | "right"
    customIcon?: React.ReactNode
}

interface AccordionContentProps {
    children: React.ReactNode
    style?: ViewStyle
}

// Context
const AccordionContext = createContext<AccordionContextType | null>(null)
const AccordionItemContext = createContext<AccordionItemContextType | null>(null)

// Hooks
const useAccordion = () => {
    const context = useContext(AccordionContext)
    if (!context) {
        throw new Error("useAccordion must be used within an Accordion component")
    }
    return context
}

const useAccordionItem = () => {
    const context = useContext(AccordionItemContext)
    if (!context) {
        throw new Error("useAccordionItem must be used within an AccordionItem component")
    }
    return context
}

// Components
export const Accordion = ({
    type = "single",
    defaultValue = type === "single" ? "" : [],
    value,
    onValueChange,
    collapsible = true,
    children,
    animationConfig = {
        type: "spring",
        damping: 18,
        stiffness: 250,
    },
    style,
}: AccordionProps) => {
    const [internalValue, setInternalValue] = useState<AccordionValue>(defaultValue)

    const currentValue = value !== undefined ? value : internalValue

    const handleValueChange = (newValue: AccordionValue) => {
        if (value === undefined) {
            setInternalValue(newValue)
        }
        onValueChange?.(newValue)
    }

    return (
        <AccordionContext.Provider
            value={{
                type,
                value: currentValue,
                onValueChange: handleValueChange,
                collapsible,
                animationConfig,
            }}
        >
            <View style={[styles.accordion, style]}>{children}</View>
        </AccordionContext.Provider>
    )
}

export const AccordionItem = ({ value, children, style, disabled = false }: AccordionItemProps) => {
    const { type, value: accordionValue, onValueChange, collapsible } = useAccordion()

    const isOpen =
        type === "single" ? accordionValue === value : Array.isArray(accordionValue) && accordionValue.includes(value)

    const toggle = () => {
        if (disabled) return

        if (type === "single") {
            if (isOpen && collapsible) {
                onValueChange("")
            } else {
                onValueChange(value)
            }
        } else {
            if (isOpen) {
                onValueChange((accordionValue as string[]).filter((v) => v !== value))
            } else {
                onValueChange([...(accordionValue as string[]), value])
            }
        }
    }

    return (
        <AccordionItemContext.Provider value={{ value, isOpen, toggle }}>
            <View style={[styles.accordionItem, disabled && styles.accordionItemDisabled, style]}>{children}</View>
        </AccordionItemContext.Provider>
    )
}

export const AccordionTrigger = ({
    children,
    style,
    textStyle,
    iconPosition = "right",
    customIcon,
}: AccordionTriggerProps) => {
    const { isOpen, toggle } = useAccordionItem()
    const { animationConfig } = useAccordion()

    return (
        <Pressable
            onPress={toggle}
            style={({ pressed }) => [styles.accordionTrigger, pressed && styles.accordionTriggerPressed, style]}
            accessibilityRole="button"
            accessibilityState={{ expanded: isOpen }}
        >
            {iconPosition === "left" && (
                <MotiView
                    animate={{
                        rotateZ: isOpen ? "180deg" : "0deg",
                    }}
                    transition={animationConfig}
                    style={styles.iconLeft}
                >
                    {customIcon || <Feather name="chevron-down" size={18} color="#6B7280" />}
                </MotiView>
            )}

            {typeof children === "string" ? (
                <Text style={[styles.accordionTriggerText, textStyle]}>{children}</Text>
            ) : (
                children
            )}

            {iconPosition === "right" && (
                <MotiView
                    animate={{
                        rotateZ: isOpen ? "180deg" : "0deg",
                    }}
                    transition={animationConfig}
                    style={styles.iconRight}
                >
                    {customIcon || <Feather name="chevron-down" size={18} color="#6B7280" />}
                </MotiView>
            )}
        </Pressable>
    )
}

export const AccordionContent = ({ children, style }: AccordionContentProps) => {
    const { isOpen } = useAccordionItem()
    const { animationConfig } = useAccordion()

    return (
        <AnimatePresence>
            {isOpen && (
                <MotiView
                    from={{
                        opacity: 0,
                        height: 0,
                    }}
                    animate={{
                        opacity: 1,
                        height: "auto",
                    }}
                    exit={{
                        opacity: 0,
                        height: 0,
                    }}
                    transition={{
                        ...animationConfig,
                        opacity: {
                            type: "timing",
                            duration: 200,
                        },
                    }}
                    style={[styles.accordionContentWrapper]}
                >
                    <View style={[styles.accordionContent, style]}>{children}</View>
                </MotiView>
            )}
        </AnimatePresence>
    )
}

const styles = StyleSheet.create({
    accordion: {
        width: "100%",
    },
    accordionItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        overflow: "hidden",
    },
    accordionItemDisabled: {
        opacity: 0.5,
    },
    accordionTrigger: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 4,
    },
    accordionTriggerPressed: {
        opacity: 0.7,
    },
    accordionTriggerText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#111827",
        flex: 1,
    },
    iconLeft: {
        marginRight: 12,
    },
    iconRight: {
        marginLeft: 12,
    },
    accordionContentWrapper: {
        overflow: "hidden",
    },
    accordionContent: {
        paddingVertical: 12,
        paddingHorizontal: 4,
    },
})

