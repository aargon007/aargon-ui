import { useState } from "react"
import { View, Text, ScrollView, Pressable, StyleSheet, useWindowDimensions } from "react-native"
import { MotiView } from "moti"
import { Feather } from "@expo/vector-icons"
import { docs } from "@/constants/docs"
import { navItems } from "@/constants/navItems"

export default function Home() {
    const [activeSection, setActiveSection] = useState("introduction")
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    const handleNavItemPress = (id: string) => {
        setActiveSection(id)
        if (isMobile) {
            setIsMobileNavOpen(false)
        }
    };

    return (
        <View style={styles.container}>
            {/* Header for mobile */}
            {isMobile && (
                <View style={styles.mobileHeader}>
                    <Pressable onPress={() => setIsMobileNavOpen(!isMobileNavOpen)}>
                        <Feather name={isMobileNavOpen ? "x" : "menu"} size={24} color="#333" />
                    </Pressable>
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
                        type: "timing",
                        duration: 300,
                    }}
                >
                    <View style={styles.logoContainer}>
                        <MotiView
                            style={styles.logo}
                            from={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring" }}
                        >
                            <Text style={styles.logoText}>
                                AUI
                            </Text>
                        </MotiView>
                        <Text style={styles.logoTitle}>
                            Aargon UI
                        </Text>
                    </View>

                    <ScrollView style={styles.navItems}>
                        {navItems.map((item) => (
                            <Pressable
                                key={item.id}
                                onPress={() => handleNavItemPress(item.id)}
                                style={({ pressed }) => [
                                    styles.navItem,
                                    activeSection === item.id && styles.activeNavItem,
                                    pressed && styles.pressedNavItem,
                                ]}
                            >
                                <MotiView
                                    animate={{
                                        scale: activeSection === item.id ? 1.1 : 1,
                                        translateX: activeSection === item.id ? 5 : 0,
                                    }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    style={styles.navItemContent}
                                >
                                    <Feather name={item.icon as any} size={18} color={activeSection === item.id ? "#6366F1" : "#666"} />
                                    <Text style={[styles.navItemText, activeSection === item.id && styles.activeNavItemText]}>
                                        {item.label}
                                    </Text>
                                </MotiView>
                            </Pressable>
                        ))}
                    </ScrollView>

                    <View style={styles.sidebarFooter}>
                        <Text style={styles.footerText}>
                            v1.0.0
                        </Text>
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
                transition={{ type: "timing", duration: 500 }}
            >
                <ScrollView style={styles.contentScroll}>
                    <MotiView
                        from={{ translateY: 20, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        transition={{ type: "spring", damping: 18 }}
                    >
                        <Text style={styles.contentTitle}>
                            {docs[activeSection].title}
                        </Text>
                        <Text style={styles.contentText}>
                            {docs[activeSection].content}
                        </Text>

                        {activeSection === "examples" && (
                            <View style={styles.exampleContainer}>
                                <MotiView
                                    style={styles.exampleBox}
                                    from={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                >
                                    <Text style={styles.exampleTitle}>
                                        Button Example
                                    </Text>
                                    <Pressable style={({ pressed }) => [styles.exampleButton, pressed && styles.exampleButtonPressed]}>
                                        <Text style={styles.exampleButtonText}>
                                            Press Me
                                        </Text>
                                    </Pressable>
                                </MotiView>

                                <MotiView
                                    style={styles.exampleBox}
                                    from={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 15,
                                        delay: 100,
                                    }}
                                >
                                    <Text style={styles.exampleTitle}>
                                        Card Example
                                    </Text>
                                    <View style={styles.exampleCard}>
                                        <Text style={styles.exampleCardTitle}>
                                            Card Title
                                        </Text>
                                        <Text style={styles.exampleCardText}>
                                            This is an example card component with subtle animations.
                                        </Text>
                                    </View>
                                </MotiView>
                            </View>
                        )}
                    </MotiView>
                </ScrollView>
            </MotiView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#F9FAFB",
    },
    mobileHeader: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: "#fff",
        zIndex: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    mobileHeaderTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 16,
        color: "#111827",
    },
    sidebar: {
        width: 250,
        backgroundColor: "#fff",
        borderRightWidth: 1,
        borderRightColor: "#E5E7EB",
        paddingVertical: 24,
        paddingHorizontal: 16,
        height: "100%",
        flexDirection: "column",
    },
    mobileSidebar: {
        position: "absolute",
        top: 60,
        left: 0,
        bottom: 0,
        zIndex: 5,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 32,
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: "#6366F1",
        justifyContent: "center",
        alignItems: "center",
    },
    logoText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    logoTitle: {
        marginLeft: 12,
        fontSize: 18,
        fontWeight: "600",
        color: "#111827",
    },
    navItems: {
        flex: 1,
    },
    navItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 4,
    },
    activeNavItem: {
        backgroundColor: "#EEF2FF",
    },
    pressedNavItem: {
        opacity: 0.7,
    },
    navItemContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    navItemText: {
        marginLeft: 12,
        fontSize: 15,
        color: "#4B5563",
        fontWeight: "500",
    },
    activeNavItemText: {
        color: "#6366F1",
        fontWeight: "600",
    },
    sidebarFooter: {
        marginTop: 24,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    footerText: {
        fontSize: 12,
        color: "#6B7280",
    },
    themeToggle: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: "#F3F4F6",
    },
    content: {
        flex: 1,
        padding: 40,
    },
    mobileContent: {
        marginTop: 60,
        padding: 20,
    },
    contentScroll: {
        flex: 1,
    },
    contentTitle: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 16,
    },
    contentText: {
        fontSize: 16,
        lineHeight: 24,
        color: "#4B5563",
        marginBottom: 24,
    },
    exampleContainer: {
        marginTop: 24,
    },
    exampleBox: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 24,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 2,
    },
    exampleTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 16,
    },
    exampleButton: {
        backgroundColor: "#6366F1",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: "center",
        alignSelf: "flex-start",
    },
    exampleButtonPressed: {
        backgroundColor: "#4F46E5",
        transform: [{ scale: 0.98 }],
    },
    exampleButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    exampleCard: {
        backgroundColor: "#F9FAFB",
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    exampleCardTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 8,
    },
    exampleCardText: {
        fontSize: 14,
        color: "#6B7280",
    },
})



// const Home = () => {
//     return (
//         <View style={styles.container}>
//             <StatusBar />
//             <Header />
//         </View>
//     );
// };

// const styles = EStyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '$white',
//         // '@media (max-width: 599px)': {
//         //     backgroundColor: '$gray',
//         // },
//         // '@media (min-width: 600px) and (max-width: 1199px)': {
//         //     backgroundColor: '$secondary',
//         // },
//         // '@media (min-width: 1200px)': {
//         //     backgroundColor: '$primary',
//         // },
//     },
//     title: {
//         fontSize: '$text_lg',
//         color: '$gray',
//         fontWeight: '$font_bold',
//         borderWidth: '$border',
//         borderColor: '$border_primary',
//     },
// });

// export default Home;
