import type React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStyles } from '@/styles/globalStyles';
import { MotiView } from 'moti';

const ComponentPage = ({ children }: { children: React.ReactNode }) => {
    const inset = useSafeAreaInsets();

    return (
        <ScrollView
            style={[globalStyles.container, { paddingTop: inset.top }]}
            contentContainerStyle={globalStyles.contentContainer}
        >
            <MotiView
                from={{ translateY: 20, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 18 }}
            >
                {children}
            </MotiView>
        </ScrollView>
    );
};

export default ComponentPage;
