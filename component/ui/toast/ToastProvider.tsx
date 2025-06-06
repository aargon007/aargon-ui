import React, { createContext, useContext, useState,type ReactNode } from 'react'
import { ToastManager } from './ToastManager'
import { type ToastConfig,type ToastOptions,type PromiseToastOptions, DEFAULT_TOAST_CONFIG, generateToastId } from './toastUtils'

interface ToastContextType {
    show: (options: ToastOptions) => string
    dismiss: (id: string) => void
    clear: () => void
    success: (message: string, options?: Partial<ToastOptions>) => string
    error: (message: string, options?: Partial<ToastOptions>) => string
    warning: (message: string, options?: Partial<ToastOptions>) => string
    info: (message: string, options?: Partial<ToastOptions>) => string
    promise: <T>(
        promise: Promise<T>,
        options: PromiseToastOptions
    ) => Promise<T>
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastProviderProps {
    children: ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastConfig[]>([])

    const show = (options: ToastOptions): string => {
        const id = generateToastId()
        const toast: ToastConfig = {
            ...DEFAULT_TOAST_CONFIG,
            ...options,
            id,
        }

        setToasts((prev) => [...prev, toast])
        return id
    }

    const dismiss = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }

    const clear = () => {
        setToasts([])
    }

    const success = (message: string, options?: Partial<ToastOptions>): string => {
        return show({
            message,
            type: 'success',
            ...options,
        })
    }

    const error = (message: string, options?: Partial<ToastOptions>): string => {
        return show({
            message,
            type: 'error',
            ...options,
        })
    }

    const warning = (message: string, options?: Partial<ToastOptions>): string => {
        return show({
            message,
            type: 'warning',
            ...options,
        })
    }

    const info = (message: string, options?: Partial<ToastOptions>): string => {
        return show({
            message,
            type: 'info',
            ...options,
        })
    }

    const promise = async <T,>(
        promise: Promise<T>,
        options: PromiseToastOptions
    ): Promise<T> => {
        const loadingId = show({
            message: options.loading.message,
            title: options.loading.title,
            type: 'info',
            duration: 0, // Don't auto-dismiss loading toast
            showProgress: false,
        })

        try {
            const result = await promise
            dismiss(loadingId)
            show({
                message: options.success.message,
                title: options.success.title,
                type: 'success',
            })
            return result
        } catch (error) {
            dismiss(loadingId)
            show({
                message: options.error.message,
                title: options.error.title,
                type: 'error',
            })
            throw error
        }
    }

    const contextValue: ToastContextType = {
        show,
        dismiss,
        clear,
        success,
        error,
        warning,
        info,
        promise,
    }

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <ToastManager toasts={toasts} onDismiss={dismiss} />
        </ToastContext.Provider>
    )
}

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}