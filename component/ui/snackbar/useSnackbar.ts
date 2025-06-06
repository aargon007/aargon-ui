import { useCallback } from 'react'
import { useSnackbarContext } from './SnackbarManager'
import type { SnackbarConfig, SnackbarType } from './snackbarUtils'

export const useSnackbar = () => {
    const context = useSnackbarContext()

    const show = useCallback((config: SnackbarConfig) => {
        return context.show(config)
    }, [context])

    const hide = useCallback((id: string) => {
        context.hide(id)
    }, [context])

    const hideAll = useCallback(() => {
        context.hideAll()
    }, [context])

    const update = useCallback((id: string, config: Partial<SnackbarConfig>) => {
        context.update(id, config)
    }, [context])

    // Convenience methods for different types
    const success = useCallback((message: string, options?: Partial<SnackbarConfig>) => {
        return show({
            message,
            type: 'success',
            icon: 'check-circle',
            ...options
        })
    }, [show])

    const error = useCallback((message: string, options?: Partial<SnackbarConfig>) => {
        return show({
            message,
            type: 'error',
            icon: 'x-circle',
            duration: 6000, // Longer duration for errors
            ...options
        })
    }, [show])

    const warning = useCallback((message: string, options?: Partial<SnackbarConfig>) => {
        return show({
            message,
            type: 'warning',
            icon: 'alert-triangle',
            ...options
        })
    }, [show])

    const info = useCallback((message: string, options?: Partial<SnackbarConfig>) => {
        return show({
            message,
            type: 'info',
            icon: 'info',
            ...options
        })
    }, [show])

    const loading = useCallback((message: string, options?: Partial<SnackbarConfig>) => {
        return show({
            message,
            type: 'neutral',
            icon: 'loader',
            autoDismiss: false,
            dismissible: false,
            ...options
        })
    }, [show])

    const promise = useCallback(async <T,>(
        promise: Promise<T>,
        {
            loading: loadingMessage = 'Loading...',
            success: successMessage = 'Success!',
            error: errorMessage = 'Something went wrong'
        }: {
            loading?: string
            success?: string | ((data: T) => string)
            error?: string | ((error: any) => string)
        } = {}
    ) => {
        const loadingId = loading(loadingMessage)

        try {
            const result = await promise
            hide(loadingId)

            const message = typeof successMessage === 'function'
                ? successMessage(result)
                : successMessage

            success(message)
            return result
        } catch (err) {
            hide(loadingId)

            const message = typeof errorMessage === 'function'
                ? errorMessage(err)
                : errorMessage

            error(message)
            throw err
        }
    }, [loading, success, error, hide])

    return {
        show,
        hide,
        hideAll,
        update,
        success,
        error,
        warning,
        info,
        loading,
        promise
    }
}