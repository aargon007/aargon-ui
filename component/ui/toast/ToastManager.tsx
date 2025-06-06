import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { type ToastItem,type ToastOptions, DEFAULT_TOAST_OPTIONS, generateId } from './toastUtils';
import AnimatedToast from './AnimatedToast';

export interface ToastManagerRef {
    show: (options: ToastOptions) => string;
    hide: (id: string) => void;
    hideAll: () => void;
    update: (id: string, options: Partial<ToastOptions>) => void;
    isActive: (id: string) => boolean;
}

interface ToastManagerProps {
    maxToasts?: number;
    offset?: number;
}

const ToastManager = forwardRef<ToastManagerRef, ToastManagerProps>(
    ({ maxToasts = 5, offset = 0 }, ref) => {
        const [toasts, setToasts] = useState<ToastItem[]>([]);

        // Group toasts by position
        const groupedToasts = toasts.reduce((acc, toast) => {
            const position = toast.position || 'top';
            if (!acc[position]) {
                acc[position] = [];
            }
            acc[position].push(toast);
            return acc;
        }, {} as Record<string, ToastItem[]>);

        // Expose methods via ref
        useImperativeHandle(ref, () => ({
            show: (options: ToastOptions) => {
                const id = options?.id || generateId();
                const newToast: ToastItem = {
                    ...DEFAULT_TOAST_OPTIONS,
                    ...options,
                    id,
                    createdAt: Date.now(),
                    visible: true,
                };

                setToasts((prevToasts) => {
                    // Remove oldest toasts if we exceed maxToasts
                    let updatedToasts = [...prevToasts, newToast];
                    if (updatedToasts.length > maxToasts) {
                        updatedToasts = updatedToasts.slice(-maxToasts);
                    }
                    return updatedToasts;
                });

                return id;
            },

            hide: (id: string) => {
                setToasts((prevToasts) =>
                    prevToasts.filter((toast) => toast.id !== id)
                );
            },

            hideAll: () => {
                setToasts([]);
            },

            update: (id: string, options: Partial<ToastOptions>) => {
                setToasts((prevToasts) =>
                    prevToasts.map((toast) =>
                        toast.id === id ? { ...toast, ...options } : toast
                    )
                );
            },

            isActive: (id: string) => {
                return toasts.some((toast) => toast.id === id);
            },
        }));

        // Handle toast removal
        const handleRemove = (id: string) => {
            setToasts((prevToasts) =>
                prevToasts.filter((toast) => toast.id !== id)
            );
        };

        return (
            <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
                {Object.entries(groupedToasts).map(([position, positionToasts]) => (
                    <View
                        key={position}
                        style={[
                            StyleSheet.absoluteFillObject,
                            styles.positionContainer,
                        ]}
                        pointerEvents="box-none"
                    >
                        {positionToasts.map((toast, index) => (
                            <AnimatedToast
                                key={toast.id}
                                toast={toast}
                                onClose={handleRemove}
                                index={index}
                                totalCount={positionToasts.length}
                            />
                        ))}
                    </View>
                ))}
            </View>
        );
    }
);

const styles = StyleSheet.create({
    positionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'box-none',
    },
});

export default ToastManager;