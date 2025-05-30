import type React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { globalStyles } from '@/styles/globalStyles';

interface ComponentPageProps {
    title: string;
    description: string;
}
//{ title, description }: ComponentPageProps
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
                {/* <Text style={styles.contentTitle}>
                    {title}
                </Text>
                <Text style={styles.contentText}>
                    {description}
                </Text> */}

                {children}
            </MotiView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentScroll: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    contentContainer: {
        padding: 24,
        paddingBottom: 40,
    },
    contentTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 16,
    },
    contentText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#4B5563',
        marginBottom: 24,
    },
});

export default ComponentPage;
