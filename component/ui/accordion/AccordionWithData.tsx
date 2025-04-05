import { useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Accordion } from '@animatereactnative/accordion';
// import { Accordion } from "./Accordion"
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

interface AccordionWithDataProps {
    title: string;
    desc?: string;
    summary?: string;
    isLoading?: boolean;
}

const AccordionWithData = ({ title, desc, summary, isLoading = false }: AccordionWithDataProps) => {
    const _spacing = 20;
    const [isActive, setIsActive] = useState(false);

    return (
        <Accordion.Accordion onChange={value => setIsActive(value)} style={{ gap: _spacing / 2, marginBottom: _spacing }}>
            <Accordion.Header>
                <View
                    style={{
                        backgroundColor: 'gold',
                        padding: _spacing / 2,
                        borderRadius: _spacing / 2,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <Text style={{ color: '#111', flexShrink: 1, fontWeight: '600' }}>{title}</Text>
                    <Accordion.HeaderIcon>
                        <Animated.View
                            style={{
                                transform: [{ rotate: isActive ? '0deg' : '180deg' }],
                            }}>
                            <Feather name="chevron-up" size={20} color="#333" />
                        </Animated.View>
                    </Accordion.HeaderIcon>
                </View>
            </Accordion.Header>

            {/* <Accordion.Collapsed>
                <Animated.View entering={FadeIn.duration(200)} style={{ paddingVertical: 4 }}>
                    <Text style={{ color: "white", fontSize: 12, opacity: 0.7 }}>Tap to expand</Text>
                </Animated.View>
            </Accordion.Collapsed> */}

            {/* <Accordion.Always>
                <View style={{ height: 4 }} />
            </Accordion.Always> */}

            <Accordion.Expanded
                style={{
                    backgroundColor: '#333',
                    width: '100%',
                    borderRadius: _spacing / 2,
                    padding: _spacing / 2,
                }}>
                {isLoading ? (
                    <ActivityIndicator color={'white'} />
                ) : (
                    <View style={{ gap: _spacing / 2 }}>
                        <Animated.View entering={FadeInDown.springify().damping(80).stiffness(200)}>
                            <Text
                                style={{
                                    color: '#fff',
                                    opacity: 0.7,
                                    fontSize: 12,
                                    fontFamily: 'Menlo',
                                }}>
                                {desc}
                            </Text>
                        </Animated.View>
                    </View>
                )}
            </Accordion.Expanded>
        </Accordion.Accordion>
    );
};

export default AccordionWithData;
