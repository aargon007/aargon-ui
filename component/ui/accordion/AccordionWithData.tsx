import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, } from 'react-native';
import { Accordion } from '@animatereactnative/accordion';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Feather } from "@expo/vector-icons"

const AccordionWithData = ({ type }: { type: string }) => {
    const _spacing = 20;

    const [isActive, setIsActive] = useState(false);
    // const { data, isLoading } = useQuery({
    //     queryKey: ['dummydata', isActive, type],
    //     enabled: isActive,
    //     queryFn: async () => {
    //         const data = (await fetch(
    //             `https://dummyjson.com/quotes?limit=${Math.floor(Math.random() * 4) + 4
    //             }&skip=${Math.floor(Math.random() * 20)}`
    //         ).then((res) => res.json())) as { quotes: Quote[] };
    //         await wait(1000);

    //         return data;
    //     },
    // });

    // useEffect(() => {
    //     if (!isActive) {
    //         queryClient.resetQueries({
    //             queryKey: ['dummydata', true, type],
    //         });
    //     }
    // }, [isActive, type]);

    return (
        <Accordion.Accordion
            onChange={(value) => setIsActive(value)}
            style={{ gap: _spacing / 2 }}
        >
            <Accordion.Header>
                <View
                    style={{
                        backgroundColor: 'gold',
                        padding: _spacing / 2,
                        borderRadius: _spacing / 2,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: '#111', flexShrink: 1 }}>
                        {type}
                    </Text>
                    <Accordion.HeaderIcon>
                        <Feather name='chevron-up' size={20} color="#333" />
                    </Accordion.HeaderIcon>
                </View>
            </Accordion.Header>

            <Accordion.Collapsed>
                <Text style={{ color: 'white', fontSize: 12 }}>
                    Hidden when expanded
                </Text>
            </Accordion.Collapsed>
            
            <Accordion.Always>
                <Text style={{ color: 'white', fontSize: 10 }}>
                    Get more details about {type}
                </Text>
            </Accordion.Always>
            
            <Accordion.Expanded
                style={{
                    backgroundColor: '#333',
                    width: '100%',
                    borderRadius: _spacing / 2,
                    padding: _spacing / 2,
                }}
            >
                {/* {isLoading && <ActivityIndicator color={'white'} />} */}
                
                <View style={{ gap: _spacing / 2 }}>
                    
                    <Animated.View
                        // key={quote.id}
                        entering={FadeInDown.springify()
                            .damping(80)
                            .stiffness(200)
                            .delay(75)}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                opacity: 0.7,
                                fontSize: 12,
                                fontFamily: 'Menlo',
                            }}
                        >
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum dolorum aspernatur quos inventore officia, voluptatem cum ullam expedita animi voluptas?
                        </Text>
                        <Text style={{ color: '#fff' }}>
                            Lorem ipsum dolor sit amet.
                        </Text>
                    </Animated.View>
                </View>
            </Accordion.Expanded>
        </Accordion.Accordion>
    );
};

export default AccordionWithData;