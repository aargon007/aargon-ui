import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, useWindowDimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import ContentNavigator from '@/navigators/ContentNavigator';
import { type StackNavigation } from '@/navigators/RootNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import SideBar from '@/component/common/SideBar';

export default function Home() {
    const [activeSection, setActiveSection] = useState('introduction');
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const { navigate } = useNavigation<StackNavigation>();
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    const inset = useSafeAreaInsets();

    const handleNavItemPress = (nav: any) => {
        setActiveSection(nav?.id);
        navigate('Home', { screen: nav?.label });

        if (isMobile) {
            setIsMobileNavOpen(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header for mobile */}
            {isMobile && (
                <View
                    style={[
                        styles.mobileHeader,
                        {
                            marginTop: inset.top,
                        },
                    ]}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.mobileHeaderButton}
                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                        onPress={() => setIsMobileNavOpen(!isMobileNavOpen)}>
                        <Feather name={isMobileNavOpen ? 'x' : 'menu'} size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.mobileHeaderTitle}>Aargon UI</Text>
                </View>
            )}

            {/* Navigation sidebar */}
            {(!isMobile || isMobileNavOpen) && (
                <MotiView
                    style={[styles.sidebar, isMobile && styles.mobileSidebar]}
                    animate={{
                        translateX: isMobile && !isMobileNavOpen ? -300 : 0,
                    }}
                    transition={{
                        type: 'timing',
                        duration: 300,
                    }}>
                    {!isMobile && (
                        <View style={styles.logoContainer}>
                            <MotiView
                                style={styles.logo}
                                from={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring' }}>
                                <Text style={styles.logoText}>AUI</Text>
                            </MotiView>
                            <Text style={styles.logoTitle}>Aargon UI</Text>
                        </View>
                    )}

                    <SideBar activeSection={activeSection} onNavItemPress={handleNavItemPress} />

                    <View style={styles.sidebarFooter}>
                        <Text style={styles.footerText}>v1.0.0</Text>
                        <Pressable style={styles.themeToggle}>
                            <Feather name="moon" size={16} color="#666" />
                        </Pressable>
                    </View>
                </MotiView>
            )}

            {/* Main content */}
            <MotiView
                style={[styles.content, isMobile && styles.mobileContent]}
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing', duration: 500 }}>
                <ContentNavigator />
            </MotiView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F9FAFB',
        position: 'relative',
    },
    mobileHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#fff',
        zIndex: 9999,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    mobileHeaderButton: {
        // backgroundColor:"red",
    },
    mobileHeaderTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 16,
        color: '#111827',
    },
    sidebar: {
        width: 250,
        backgroundColor: '#fff',
        borderRightWidth: 1,
        borderRightColor: '#E5E7EB',
        paddingVertical: 24,
        paddingHorizontal: 16,
        height: '100%',
        flexDirection: 'column',
    },
    mobileSidebar: {
        position: 'absolute',
        top: 60,
        left: 0,
        bottom: 0,
        zIndex: 5,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#6366F1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    logoTitle: {
        marginLeft: 12,
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    sidebarFooter: {
        marginTop: 24,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#6B7280',
    },
    themeToggle: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#F3F4F6',
    },
    content: {
        flex: 1,
        padding: 40,
    },
    mobileContent: {
        marginTop: 60,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
});
