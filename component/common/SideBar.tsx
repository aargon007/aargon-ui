import { useState, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { ContentStackNavigation } from '@/navigators/ContentNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { navItems } from '@/constants/navItems';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    FadeIn,
    FadeOut,
    SlideInDown,
    SlideOutUp,
    LayoutAnimationConfig
} from 'react-native-reanimated';

interface NavigationProps {
    activeSection: string;
    onNavItemPress: (item: any) => void;
}

const SideBar = ({ activeSection, onNavItemPress }: NavigationProps) => {
    const inset = useSafeAreaInsets();
    const [expandedSections, setExpandedSections] = useState<string[]>(['components']);
    const { navigate } = useNavigation<ContentStackNavigation>();

    const toggleSection = (sectionId: string) => {
        if (expandedSections.includes(sectionId)) {
            setExpandedSections(expandedSections.filter(id => id !== sectionId));
        } else {
            setExpandedSections([...expandedSections, sectionId]);
        }
    };

    const handleItemPress = (item: { id: string; label: string; icon: string; hasChildren?: boolean; }) => {
        // If the item has children, toggle expansion
        if (item.hasChildren) {
            toggleSection(item.id);
            return;
        }

        // Otherwise navigate to the item
        navigate(item.label as any);
        onNavItemPress(item);
    };

    const isItemActive = (itemId: string) => {
        return activeSection === itemId;
    };

    const isChildActive = (parentId: string, childId: string) => {
        return activeSection === childId;
    };

    // Animated Nav Item Component
    const AnimatedNavItem = ({ item, isActive }: { item: any, isActive: boolean }) => {
        const scale = useSharedValue(1);
        const translateX = useSharedValue(0);

        useEffect(() => {
            scale.value = withSpring(isActive && !item.hasChildren ? 1.1 : 1, {
                stiffness: 300
            });
            translateX.value = withSpring(isActive && !item.hasChildren ? 5 : 0, {
                stiffness: 300
            });
        }, [isActive, item.hasChildren]);

        const animatedStyle = useAnimatedStyle(() => ({
            transform: [
                { scale: scale.value },
                { translateX: translateX.value }
            ]
        }));

        return (
            <Animated.View style={[styles.navItemContent, animatedStyle]}>
                <Feather
                    name={item.icon as any}
                    size={18}
                    color={isActive && !item.hasChildren ? '#6366F1' : '#666'}
                />
                <Text style={[styles.navItemText, isActive && !item.hasChildren && styles.activeNavItemText]}>
                    {item.label}
                </Text>

                {item.hasChildren && (
                    <AnimatedChevron expanded={expandedSections.includes(item.id)} />
                )}
            </Animated.View>
        );
    };

    // Animated Chevron Component
    const AnimatedChevron = ({ expanded }: { expanded: boolean }) => {
        const rotation = useSharedValue(0);

        useEffect(() => {
            rotation.value = withTiming(expanded ? 180 : 0, { duration: 300 });
        }, [expanded]);

        const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ rotate: `${rotation.value}deg` }]
        }));

        return (
            <Animated.View style={[styles.chevronIcon, animatedStyle]}>
                <Feather name="chevron-down" size={16} color="#666" />
            </Animated.View>
        );
    };

    // Animated Child Item Component
    const AnimatedChildItem = ({ child, parentId, isActive }: { child: any, parentId: string, isActive: boolean }) => {
        const scale = useSharedValue(1);
        const translateX = useSharedValue(0);

        useEffect(() => {
            scale.value = withSpring(isActive ? 1.05 : 1, { stiffness: 300 });
            translateX.value = withSpring(isActive ? 3 : 0, { stiffness: 300 });
        }, [isActive]);

        const animatedStyle = useAnimatedStyle(() => ({
            transform: [
                { scale: scale.value },
                { translateX: translateX.value }
            ]
        }));

        return (
            <Animated.View style={[styles.childNavItemContent, animatedStyle]}>
                <Feather
                    name={child.icon as any}
                    size={16}
                    color={isActive ? '#6366F1' : '#666'}
                />
                <Text
                    style={[
                        styles.childNavItemText,
                        isActive && styles.activeChildNavItemText,
                    ]}
                >
                    {child.label}
                </Text>
            </Animated.View>
        );
    };

    return (
        <ScrollView
            style={[styles.navItems, { marginTop: inset.top }]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
        >
            <LayoutAnimationConfig skipEntering>
                {navItems.map((item, index) => (
                    <View key={item.id}>
                        <Pressable
                            onPress={() => handleItemPress(item)}
                            style={({ pressed }) => [
                                styles.navItem,
                                isItemActive(item.id) && !item.hasChildren && styles.activeNavItem,
                                pressed && styles.pressedNavItem,
                            ]}
                        >
                            <AnimatedNavItem item={item} isActive={isItemActive(item.id)} />
                        </Pressable>

                        {/* Render children if this section is expanded */}
                        {item.hasChildren && expandedSections.includes(item.id) && (
                            <Animated.View
                                entering={SlideInDown.duration(300).springify()}
                                exiting={SlideOutUp.duration(200)}
                                style={styles.childrenContainer}
                            >
                                {item.children?.map((child, childIndex) => (
                                    <Animated.View
                                        key={child.id}
                                        entering={FadeIn.delay(childIndex * 50).duration(200)}
                                        exiting={FadeOut.duration(100)}
                                    >
                                        <Pressable
                                            onPress={() => handleItemPress(child)}
                                            style={({ pressed }) => [
                                                styles.childNavItem,
                                                isChildActive(item.id, child.id) && styles.activeChildNavItem,
                                                pressed && styles.pressedNavItem,
                                            ]}
                                        >
                                            <AnimatedChildItem
                                                child={child}
                                                parentId={item.id}
                                                isActive={isChildActive(item.id, child.id)}
                                            />
                                        </Pressable>
                                    </Animated.View>
                                ))}
                            </Animated.View>
                        )}
                    </View>
                ))}
            </LayoutAnimationConfig>
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