import { Dimensions, Platform } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';

// Constants
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TOAST_MAX_WIDTH = Math.min(SCREEN_WIDTH - 32, 400);
const IS_IOS = Platform.OS === 'ios';
const IS_ANDROID = Platform.OS === 'android';
const IS_WEB = Platform.OS === 'web';

// Types
export type ToastPosition = 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default';
export type ToastVariant = 'default' | 'filled' | 'outlined' | 'soft' | 'minimal' | 'accent';
export type ToastSize = 'sm' | 'md' | 'lg';
export type ToastAnimation = 'slide' | 'fade' | 'scale' | 'bounce' | 'flip' | 'zoom' | 'none';

export interface ToastOptions {
    id?: string;
    message: string;
    title?: string;
    type?: ToastType;
    position?: ToastPosition;
    duration?: number;
    variant?: ToastVariant;
    size?: ToastSize;
    animation?: ToastAnimation;
    animationIn?: ToastAnimation;
    animationOut?: ToastAnimation;
    icon?: string | boolean;
    showProgress?: boolean;
    swipeToClose?: boolean;
    onClose?: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    titleStyle?: TextStyle;
    hideCloseButton?: boolean;
    accessibilityAnnouncement?: string;
    testID?: string;
}

export interface ToastItem extends ToastOptions {
    id: string;
    createdAt: number;
    visible: boolean;
}

// Helper functions
export const getPositionStyle = (position: ToastPosition): ViewStyle => {
    const baseStyle: ViewStyle = {
        position: 'absolute',
        zIndex: 9999,
        maxWidth: TOAST_MAX_WIDTH,
        minWidth: 200,
    };

    const safeAreaTop = IS_IOS ? 50 : 30;
    const safeAreaBottom = IS_IOS ? 34 : 16;
    const horizontalPadding = 16;

    switch (position) {
        case 'top':
            return {
                ...baseStyle,
                top: safeAreaTop,
                alignSelf: 'center',
            };
        case 'bottom':
            return {
                ...baseStyle,
                bottom: safeAreaBottom,
                alignSelf: 'center',
            };
        case 'top-left':
            return {
                ...baseStyle,
                top: safeAreaTop,
                left: horizontalPadding,
            };
        case 'top-right':
            return {
                ...baseStyle,
                top: safeAreaTop,
                right: horizontalPadding,
            };
        case 'bottom-left':
            return {
                ...baseStyle,
                bottom: safeAreaBottom,
                left: horizontalPadding,
            };
        case 'bottom-right':
            return {
                ...baseStyle,
                bottom: safeAreaBottom,
                right: horizontalPadding,
            };
        default:
            return {
                ...baseStyle,
                top: safeAreaTop,
                alignSelf: 'center',
            };
    }
};

export const getTypeColors = (type: ToastType) => {
    switch (type) {
        case 'success':
            return {
                background: '#10B981',
                backgroundSoft: '#ECFDF5',
                text: '#FFFFFF',
                textSoft: '#065F46',
                border: '#059669',
                icon: 'check-circle',
            };
        case 'error':
            return {
                background: '#EF4444',
                backgroundSoft: '#FEF2F2',
                text: '#FFFFFF',
                textSoft: '#991B1B',
                border: '#DC2626',
                icon: 'x-circle',
            };
        case 'warning':
            return {
                background: '#F59E0B',
                backgroundSoft: '#FFFBEB',
                text: '#FFFFFF',
                textSoft: '#92400E',
                border: '#D97706',
                icon: 'alert-triangle',
            };
        case 'info':
            return {
                background: '#3B82F6',
                backgroundSoft: '#EFF6FF',
                text: '#FFFFFF',
                textSoft: '#1E40AF',
                border: '#2563EB',
                icon: 'info',
            };
        default:
            return {
                background: '#6B7280',
                backgroundSoft: '#F3F4F6',
                text: '#FFFFFF',
                textSoft: '#374151',
                border: '#4B5563',
                icon: 'bell',
            };
    }
};

export const getVariantStyles = (variant: ToastVariant, type: ToastType): { container: ViewStyle; text: TextStyle } => {
    const colors = getTypeColors(type);

    switch (variant) {
        case 'filled':
            return {
                container: {
                    backgroundColor: colors.background,
                    borderColor: colors.background,
                },
                text: {
                    color: colors.text,
                },
            };
        case 'outlined':
            return {
                container: {
                    backgroundColor: 'transparent',
                    borderColor: colors.border,
                    borderWidth: 1,
                },
                text: {
                    color: colors.textSoft,
                },
            };
        case 'soft':
            return {
                container: {
                    backgroundColor: colors.backgroundSoft,
                    borderColor: colors.backgroundSoft,
                },
                text: {
                    color: colors.textSoft,
                },
            };
        case 'minimal':
            return {
                container: {
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                },
                text: {
                    color: colors.textSoft,
                },
            };
        case 'accent':
            return {
                container: {
                    backgroundColor: '#FFFFFF',
                    borderLeftColor: colors.background,
                    borderLeftWidth: 4,
                    borderColor: '#E5E7EB',
                    borderWidth: 1,
                },
                text: {
                    color: colors.textSoft,
                },
            };
        default:
            return {
                container: {
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E5E7EB',
                    borderWidth: 1,
                },
                text: {
                    color: colors.textSoft,
                },
            };
    }
};

export const getSizeStyles = (size: ToastSize): { container: ViewStyle; title: TextStyle; message: TextStyle; iconSize: number } => {
    switch (size) {
        case 'sm':
            return {
                container: {
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 6,
                    minHeight: 36,
                },
                title: {
                    fontSize: 14,
                    lineHeight: 18,
                },
                message: {
                    fontSize: 12,
                    lineHeight: 16,
                },
                iconSize: 16,
            };
        case 'lg':
            return {
                container: {
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 10,
                    minHeight: 56,
                },
                title: {
                    fontSize: 18,
                    lineHeight: 24,
                },
                message: {
                    fontSize: 14,
                    lineHeight: 20,
                },
                iconSize: 24,
            };
        default: // md
            return {
                container: {
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderRadius: 8,
                    minHeight: 46,
                },
                title: {
                    fontSize: 16,
                    lineHeight: 20,
                },
                message: {
                    fontSize: 13,
                    lineHeight: 18,
                },
                iconSize: 20,
            };
    }
};

export const getAnimationConfig = (animation: ToastAnimation, position: ToastPosition) => {
    // Default values
    const defaultConfig = {
        translateY: 0,
        translateX: 0,
        scale: 1,
        opacity: 1,
        rotateX: '0deg',
        rotateY: '0deg',
    };

    // Initial values based on animation type
    const initialValues = { ...defaultConfig };

    switch (animation) {
        case 'slide':
            if (position.includes('top')) {
                initialValues.translateY = -100;
            } else {
                initialValues.translateY = 100;
            }
            break;
        case 'fade':
            initialValues.opacity = 0;
            break;
        case 'scale':
            initialValues.scale = 0;
            initialValues.opacity = 0;
            break;
        case 'bounce':
            if (position.includes('top')) {
                initialValues.translateY = -20;
            } else {
                initialValues.translateY = 20;
            }
            break;
        case 'flip':
            initialValues.rotateX = '90deg';
            initialValues.opacity = 0;
            break;
        case 'zoom':
            initialValues.scale = 1.2;
            initialValues.opacity = 0;
            break;
        case 'none':
        default:
            // No animation, use default values
            break;
    }

    return {
        initial: initialValues,
        animate: defaultConfig,
        exit: { ...initialValues, opacity: 0 },
    };
};

// Spring configurations
export const getSpringConfig = (animation: ToastAnimation) => {
    switch (animation) {
        case 'bounce':
            return {
                damping: 10,
                mass: 0.8,
                stiffness: 150,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01,
            };
        case 'scale':
            return {
                damping: 15,
                mass: 1,
                stiffness: 200,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01,
            };
        case 'flip':
            return {
                damping: 12,
                mass: 1,
                stiffness: 120,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01,
            };
        case 'zoom':
            return {
                damping: 20,
                mass: 1.2,
                stiffness: 250,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01,
            };
        default:
            return {
                damping: 18,
                mass: 1,
                stiffness: 180,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01,
            };
    }
};

// Default options
export const DEFAULT_TOAST_OPTIONS: Partial<ToastOptions> = {
    type: 'default',
    position: 'top',
    duration: 3000,
    variant: 'default',
    size: 'md',
    animation: 'slide',
    animationIn: 'slide',
    animationOut: 'fade',
    icon: true,
    showProgress: true,
    swipeToClose: true,
    hideCloseButton: false,
};

// Generate unique ID
export const generateId = () => `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`;