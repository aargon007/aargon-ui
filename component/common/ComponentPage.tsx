import type React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStyles } from '@/styles/globalStyles';
import Animated, { FadeInUp, Easing } from 'react-native-reanimated';

const ComponentPage = ({ children }: { children: React.ReactNode }) => {
    const inset = useSafeAreaInsets();

    return (
        <ScrollView
            style={[globalStyles.container, { paddingTop: inset.top }]}
            contentContainerStyle={globalStyles.contentContainer}
        >
            <Animated.View
                entering={
                    FadeInUp
                        .duration(600)
                        .easing(Easing.out(Easing.cubic))
                        .springify()
                        .damping(20)
                        .stiffness(90)
                        .mass(0.8)
                }
            >
                {children}
            </Animated.View>
        </ScrollView>
    );
};

export default ComponentPage;