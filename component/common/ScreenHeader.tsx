import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import ArrowLeft from '../icons/ArrowLeft'
import { useNavigation } from '@react-navigation/native'
import type { StackNavigation } from '@/navigators/RootNavigator'

const ScreenHeader = ({ title }: { title?: string }) => {
    const { goBack } = useNavigation<StackNavigation>();

    return (
        <TouchableOpacity
            style={{
                height: 50,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                columnGap: 15,
                paddingHorizontal: 20
            }}
            onPress={goBack}
        >
            <ArrowLeft />
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "600",
                    color: "#0879CC"
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default ScreenHeader