import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AnimatedSkeleton, {
    SkeletonRect,
    SkeletonCircle,
    type SkeletonAnimation,
    type SkeletonSpeed
} from '@/component/ui/skeleton/AnimatedSkeleton';

const SkeletonPage = () => {
    // Animation types for demo
    const animationTypes: SkeletonAnimation[] = ['shimmer', 'pulse', 'none'];

    // Speed options for demo
    const speedOptions: SkeletonSpeed[] = ['slow', 'medium', 'fast'];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Animated Skeleton Component</Text>

            {/* Basic Shapes */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Basic Shapes</Text>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <SkeletonRect width={120} height={20} />
                        <Text style={styles.label}>Rectangle</Text>
                    </View>
                    <View style={styles.item}>
                        <SkeletonCircle size="medium" />
                        <Text style={styles.label}>Circle</Text>
                    </View>
                    <View style={styles.item}>
                        <SkeletonRect width={120} height={20} borderRadius={20} />
                        <Text style={styles.label}>Rounded</Text>
                    </View>
                </View>
            </View>

            {/* Predefined Sizes */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Predefined Sizes</Text>
                <View style={styles.column}>
                    <View style={styles.row}>
                        <SkeletonRect size="small" />
                        <Text style={styles.labelSmall}>Small</Text>
                    </View>
                    <View style={styles.row}>
                        <SkeletonRect size="medium" />
                        <Text style={styles.labelSmall}>Medium</Text>
                    </View>
                    <View style={styles.row}>
                        <SkeletonRect size="large" />
                        <Text style={styles.labelSmall}>Large</Text>
                    </View>
                    <View style={styles.row}>
                        <SkeletonRect size="xlarge" />
                        <Text style={styles.labelSmall}>XLarge</Text>
                    </View>
                </View>
            </View>

            {/* Animation Types */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Animation Types</Text>
                <View style={styles.row}>
                    {animationTypes.map((animType) => (
                        <View key={animType} style={styles.item}>
                            <SkeletonRect width={100} height={20} animation={animType} />
                            <Text style={styles.label}>{animType}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Animation Speeds */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Animation Speeds</Text>
                <View style={styles.row}>
                    {speedOptions.map((speedOpt) => (
                        <View key={speedOpt} style={styles.item}>
                            <SkeletonRect width={100} height={20} speed={speedOpt} />
                            <Text style={styles.label}>{speedOpt}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Custom Colors */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Custom Colors</Text>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <SkeletonRect
                            width={100}
                            height={20}
                            color="#DBEAFE"
                            highlightColor="#93C5FD"
                        />
                        <Text style={styles.label}>Blue</Text>
                    </View>
                    <View style={styles.item}>
                        <SkeletonRect
                            width={100}
                            height={20}
                            color="#D1FAE5"
                            highlightColor="#6EE7B7"
                        />
                        <Text style={styles.label}>Green</Text>
                    </View>
                    <View style={styles.item}>
                        <SkeletonRect
                            width={100}
                            height={20}
                            color="#FEE2E2"
                            highlightColor="#FECACA"
                        />
                        <Text style={styles.label}>Red</Text>
                    </View>
                </View>
            </View>

            {/* Complex Layouts */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Complex Layouts</Text>

                {/* Profile Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Profile Card</Text>
                    <View style={styles.profileCard}>
                        <SkeletonCircle size="large" />
                        <View style={styles.profileInfo}>
                            <SkeletonRect width={150} height={20} />
                            <SkeletonRect
                                width={200}
                                height={15}
                                style={styles.smallGap}
                            />
                            <SkeletonRect
                                width={100}
                                height={15}
                                style={styles.smallGap}
                            />
                        </View>
                    </View>
                </View>

                {/* List Item */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>List Items</Text>
                    {[1, 2, 3].map((item) => (
                        <View key={item} style={styles.listItem}>
                            <SkeletonCircle size="small" />
                            <View style={styles.listItemContent}>
                                <SkeletonRect width="80%" height={16} />
                                <SkeletonRect
                                    width="60%"
                                    height={12}
                                    style={styles.smallGap}
                                />
                            </View>
                        </View>
                    ))}
                </View>

                {/* Content Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Content Card</Text>
                    <View style={styles.contentCard}>
                        <SkeletonRect width="100%" height={150} />
                        <View style={styles.contentCardBody}>
                            <SkeletonRect width="90%" height={20} />
                            <SkeletonRect
                                width="100%"
                                height={15}
                                style={styles.smallGap}
                            />
                            <SkeletonRect
                                width="100%"
                                height={15}
                                style={styles.smallGap}
                            />
                            <SkeletonRect
                                width="80%"
                                height={15}
                                style={styles.smallGap}
                            />
                            <View style={styles.footer}>
                                <SkeletonCircle size="small" />
                                <SkeletonRect
                                    width={100}
                                    height={15}
                                    style={styles.footerText}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#111827',
    },
    section: {
        marginBottom: 24,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
        color: '#374151',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
    },
    column: {
        gap: 16,
    },
    item: {
        alignItems: 'center',
        minWidth: 100,
    },
    label: {
        marginTop: 8,
        fontSize: 14,
        color: '#6B7280',
    },
    labelSmall: {
        marginLeft: 12,
        fontSize: 14,
        color: '#6B7280',
    },
    card: {
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 12,
        color: '#4B5563',
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    profileInfo: {
        marginLeft: 16,
        gap: 8,
    },
    smallGap: {
        marginTop: 8,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    listItemContent: {
        marginLeft: 12,
        gap: 6,
        flex: 1,
    },
    contentCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    contentCardBody: {
        padding: 16,
        gap: 8,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    footerText: {
        marginLeft: 8,
    },
});

export default SkeletonPage;