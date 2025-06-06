import { useContext, useCallback } from 'react';
import { ToastContext } from './ToastProvider';
import type { ToastOptions } from './toastUtils';

export const useToast = () => {
    const toastManager = useContext(ToastContext);

    if (!toastManager) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    const show = useCallback(
        (options: string | ToastOptions) => {
            if (typeof options === 'string') {
                return toastManager.show({ message: options });
            }
            return toastManager.show(options);
        },
        [toastManager]
    );

    const success = useCallback(
        (options: string | Omit<ToastOptions, 'type'>) => {
            if (typeof options === 'string') {
                return toastManager.show({ message: options, type: 'success' });
            }
            return toastManager.show({ ...options, type: 'success' });
        },
        [toastManager]
    );

    const error = useCallback(
        (options: string | Omit<ToastOptions, 'type'>) => {
            if (typeof options === 'string') {
                return toastManager.show({ message: options, type: 'error' });
            }
            return toastManager.show({ ...options, type: 'error' });
        },
        [toastManager]
    );

    const warning = useCallback(
        (options: string | Omit<ToastOptions, 'type'>) => {
            if (typeof options === 'string') {
                return toastManager.show({ message: options, type: 'warning' });
            }
            return toastManager.show({ ...options, type: 'warning' });
        },
        [toastManager]
    );

    const info = useCallback(
        (options: string | Omit<ToastOptions, 'type'>) => {
            if (typeof options === 'string') {
                return toastManager.show({ message: options, type: 'info' });
            }
            return toastManager.show({ ...options, type: 'info' });
        },
        [toastManager]
    );

    const update = useCallback(
        (id: string, options: Partial<ToastOptions>) => {
            toastManager.update(id, options);
        },
        [toastManager]
    );

    const hide = useCallback(
        (id: string) => {
            toastManager.hide(id);
        },
        [toastManager]
    );

    const hideAll = useCallback(() => {
        toastManager.hideAll();
    }, [toastManager]);

    const isActive = useCallback(
        (id: string) => {
            return toastManager.isActive(id);
        },
        [toastManager]
    );

    const promise = useCallback(
        <T>(
            promise: Promise<T>,
            {
                loading,
                success: successOptions,
                error: errorOptions,
            }: {
                loading: string | Omit<ToastOptions, 'type'>;
                success: string | Omit<ToastOptions, 'type'>;
                error: string | ((err: any) => string | Omit<ToastOptions, 'type'>);
            }
        ) => {
            const loadingMessage = typeof loading === 'string' ? { message: loading } : loading;
            const id = toastManager.show({
                ...loadingMessage,
                type: 'info',
                duration: 0, // Don't auto-dismiss
            });

            return promise
                .then((data) => {
                    const successMessage = typeof successOptions === 'string' ? { message: successOptions } : successOptions;
                    toastManager.update(id, {
                        ...successMessage,
                        type: 'success',
                        duration: 3000,
                    });
                    return data;
                })
                .catch((err) => {
                    const errorMessage = typeof errorOptions === 'function'
                        ? errorOptions(err)
                        : typeof errorOptions === 'string'
                            ? { message: errorOptions }
                            : errorOptions;

                    toastManager.update(id, {
                        ...errorMessage as object,
                        type: 'error',
                        duration: 4000,
                    });
                    return Promise.reject(err);
                });
        },
        [toastManager]
    );

    return {
        show,
        success,
        error,
        warning,
        info,
        update,
        hide,
        hideAll,
        isActive,
        promise,
    };
};

export default useToast;