import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { navItems } from '@/constants/navItems';
import { MotiView } from 'moti';

interface NavigationProps {
    activeSection: string;
    onNavItemPress: (item: any) => void;
}

const SideBar = ({ activeSection, onNavItemPress }: NavigationProps) => {
    const inset = useSafeAreaInsets();
    const [expandedSections, setExpandedSections] = useState<string[]>(['components']);

    const toggleSection = (sectionId: string) => {
        if (expandedSections.includes(sectionId)) {
            setExpandedSections(expandedSections.filter(id => id !== sectionId));
        } else {
            setExpandedSections([...expandedSections, sectionId]);
        }
    };

    const handleItemPress = (item: any) => {
        // If the item has children, toggle expansion
        if (item.hasChildren) {
            toggleSection(item.id);
            return;
        }

        // Otherwise navigate to the item
        onNavItemPress(item);
    };

    const isItemActive = (itemId: string) => {
        return activeSection === itemId;
    };

    const isChildActive = (parentId: string, childId: string) => {
        return activeSection === childId;
    };

    return (
        <ScrollView
            style={[styles.navItems, { marginTop: inset.top }]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
        >
            {navItems.map(item => (
                <View key={item.id}>
                    <Pressable
                        onPress={() => handleItemPress(item)}
                        style={({ pressed }) => [
                            styles.navItem,
                            isItemActive(item.id) && !item.hasChildren && styles.activeNavItem,
                            pressed && styles.pressedNavItem,
                        ]}>
                        <MotiView
                            animate={{
                                scale: isItemActive(item.id) && !item.hasChildren ? 1.1 : 1,
                                translateX: isItemActive(item.id) && !item.hasChildren ? 5 : 0,
                            }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            style={styles.navItemContent}>
                            <Feather
                                name={item.icon as any}
                                size={18}
                                color={isItemActive(item.id) && !item.hasChildren ? '#6366F1' : '#666'}
                            />
                            <Text style={[styles.navItemText, isItemActive(item.id) && !item.hasChildren && styles.activeNavItemText]}>
                                {item.label}
                            </Text>

                            {item.hasChildren && (
                                <MotiView
                                    animate={{
                                        rotateZ: expandedSections.includes(item.id) ? '180deg' : '0deg',
                                    }}
                                    transition={{
                                        type: 'timing',
                                        duration: 300,
                                    }}
                                    style={styles.chevronIcon}>
                                    <Feather name="chevron-down" size={16} color="#666" />
                                </MotiView>
                            )}
                        </MotiView>
                    </Pressable>

                    {/* Render children if this section is expanded */}
                    {item.hasChildren && expandedSections.includes(item.id) && (
                        <MotiView
                            from={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            transition={{
                                type: 'timing',
                                duration: 300,
                                height: {
                                    type: 'spring',
                                    damping: 15,
                                },
                            }}
                            style={styles.childrenContainer}>
                            {item.children?.map(child => (
                                <Pressable
                                    key={child.id}
                                    onPress={() => onNavItemPress(child)}
                                    style={({ pressed }) => [
                                        styles.childNavItem,
                                        isChildActive(item.id, child.id) && styles.activeChildNavItem,
                                        pressed && styles.pressedNavItem,
                                    ]}>
                                    <MotiView
                                        animate={{
                                            scale: isChildActive(item.id, child.id) ? 1.05 : 1,
                                            translateX: isChildActive(item.id, child.id) ? 3 : 0,
                                        }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        style={styles.childNavItemContent}>
                                        <Feather
                                            name={child.icon as any}
                                            size={16}
                                            color={isChildActive(item.id, child.id) ? '#6366F1' : '#666'}
                                        />
                                        <Text
                                            style={[
                                                styles.childNavItemText,
                                                isChildActive(item.id, child.id) && styles.activeChildNavItemText,
                                            ]}>
                                            {child.label}
                                        </Text>
                                    </MotiView>
                                </Pressable>
                            ))}
                        </MotiView>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    navItems: {
        flex: 1,
    },
    navItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 4,
        userSelect: 'none',
    },
    activeNavItem: {
        backgroundColor: '#EEF2FF',
    },
    pressedNavItem: {
        opacity: 0.7,
    },
    navItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navItemText: {
        marginLeft: 12,
        fontSize: 15,
        color: '#4B5563',
        fontWeight: '500',
        flex: 1,
    },
    activeNavItemText: {
        color: '#6366F1',
        fontWeight: '600',
    },
    chevronIcon: {
        marginLeft: 'auto',
    },
    childrenContainer: {
        marginLeft: 16,
        marginBottom: 8,
        overflow: 'hidden',
    },
    childNavItem: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 2,
        userSelect: 'none',
    },
    activeChildNavItem: {
        backgroundColor: '#EEF2FF',
    },
    childNavItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    childNavItemText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#4B5563',
        fontWeight: '400',
    },
    activeChildNavItemText: {
        color: '#6366F1',
        fontWeight: '500',
    },
});

export default SideBar;