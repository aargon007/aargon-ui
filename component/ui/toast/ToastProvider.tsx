import React, { createContext, useRef } from 'react';
import ToastManager, { type ToastManagerRef } from './ToastManager';

export const ToastContext = createContext<ToastManagerRef | null>(null);

interface ToastProviderProps {
    children: React.ReactNode;
    maxToasts?: number;
    offset?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
    children,
    maxToasts = 5,
    offset = 0,
}) => {
    const toastRef = useRef<ToastManagerRef>(null);

    return (
        <ToastContext.Provider value={toastRef.current!}>
            {children}
            <ToastManager ref={toastRef} maxToasts={maxToasts} offset={offset} />
        </ToastContext.Provider>
    );
};

export default ToastProvider;