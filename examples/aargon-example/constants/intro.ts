export const introExample = `
import React from 'react';
import { View, Text } from 'react-native';
import { MotiView } from '@alloc/moti';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
            type: "timing",
            duration: 1000,
            loop: true,
            repeatReverse: true,
            }}
      >
        <Text style={{ fontSize: 24 }}>
           Hello, Animations!
        </Text>
      </MotiView>
    </View>
  );
}
`