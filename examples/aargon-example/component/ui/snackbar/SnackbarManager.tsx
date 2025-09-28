import React, { createContext, useContext, useState, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import AnimatedSnackbar from './AnimatedSnackbar'
import { type SnackbarConfig, generateId } from './snackbarUtils'

interface SnackbarItem extends SnackbarConfig {
    id: string
    visible: boolean
}

interface SnackbarContextType {
    show: (config: SnackbarConfig) => string
    hide: (id: string) => void
    hideAll: () => void
    update: (id: string, config: Partial<SnackbarConfig>) => void
}

const SnackbarContext = createContext<SnackbarContextType | null>(null)

export const useSnackbarContext = () => {
    const context = useContext(SnackbarContext)
    if (!context) {
        throw new Error('useSnackbarContext must be used within SnackbarProvider')
    }
    return context
}

interface SnackbarProviderProps {
    children: React.ReactNode
    maxSnackbars?: number
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
    children,
    maxSnackbars = 3
}) => {
    const [snackbars, setSnackbars] = useState<SnackbarItem[]>([])

    const show = useCallback((config: SnackbarConfig): string => {
        const id = config.id || generateId()

        const newSnackbar: SnackbarItem = {
            ...config,
            id,
            visible: true
        }

        setSnackbars(prev => {
            const filtered = prev.filter(s => s.visible)

            // Remove oldest if exceeding max
            if (filtered.length >= maxSnackbars) {
                const toRemove = filtered.slice(0, filtered.length - maxSnackbars + 1)
                toRemove.forEach(s => {
                    setTimeout(() => hide(s.id), 100)
                })
            }

            return [...prev, newSnackbar]
        })

        return id
    }, [maxSnackbars])

    const hide = useCallback((id: string) => {
        setSnackbars(prev =>
            prev.map(snackbar =>
                snackbar.id === id
                    ? { ...snackbar, visible: false }
                    : snackbar
            )
        )

        // Remove from array after animation
        setTimeout(() => {
            setSnackbars(prev => prev.filter(s => s.id !== id))
        }, 1000)
    }, [])

    const hideAll = useCallback(() => {
        setSnackbars(prev =>
            prev.map(snackbar => ({ ...snackbar, visible: false }))
        )

        // Clear all after animation
        setTimeout(() => {
            setSnackbars([])
        }, 1000)
    }, [])

    const update = useCallback((id: string, config: Partial<SnackbarConfig>) => {
        setSnackbars(prev =>
            prev.map(snackbar =>
                snackbar.id === id
                    ? { ...snackbar, ...config }
                    : snackbar
            )
        )
    }, [])

    const contextValue: SnackbarContextType = {
        show,
        hide,
        hideAll,
        update
    }

    return (
        <SnackbarContext.Provider value={contextValue}>
            {children}
            <View style={styles.container} pointerEvents="box-none">
                {snackbars.map((snackbar) => (
                    <AnimatedSnackbar
                        key={snackbar.id}
                        {...snackbar}
                        onDismiss={() => hide(snackbar.id)}
                    />
                ))}
            </View>
        </SnackbarContext.Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999
    }
})