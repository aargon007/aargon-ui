import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StatusBar = () => {
    const insets = useSafeAreaInsets();

    return <View style={{ height: insets?.top || 20 }} />;
};

export default StatusBar;
