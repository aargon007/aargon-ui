import React from 'react'
import { View, StyleSheet } from 'react-native'
import { AnimatedToast } from './AnimatedToast'
import { type ToastConfig, getPositionStyles } from './toastUtils'

interface ToastManagerProps {
    toasts: ToastConfig[]
    onDismiss: (id: string) => void
}

export const ToastManager: React.FC<ToastManagerProps> = ({ toasts, onDismiss }) => {
    // Group toasts by position
    const toastsByPosition = toasts.reduce((acc, toast) => {
        const position = toast.position || 'top'
        if (!acc[position]) {
            acc[position] = []
        }
        acc[position].push(toast)
        return acc
    }, {} as Record<string, ToastConfig[]>)

    return (
        <>
            {Object.entries(toastsByPosition).map(([position, positionToasts]) => {
                const positionStyles = getPositionStyles(position as any)

                return (
                    <View
                        key={position}
                        style={[styles.container, positionStyles]}
                        pointerEvents="box-none"
                    >
                        {positionToasts.map((toast) => (
                            <AnimatedToast
                                key={toast.id}
                                toast={toast}
                                onDismiss={onDismiss}
                            />
                        ))}
                    </View>
                )
            })}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        pointerEvents: 'box-none',
    },
})