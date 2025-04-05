// Installation steps data
export const libraries = [
    {
        id: 'reanimated',
        name: 'React Native Reanimated',
        description:
            'React Native Reanimated is a powerful animation library built by Software Mansion. With Reanimated, you can easily create smooth animations and interactions that run on the UI thread.',
        npm: 'npm install react-native-reanimated',
        expo: 'npx expo install react-native-reanimated',
        yarn: 'yarn add react-native-reanimated',
        extraSteps: [
            'Add the Reanimated babel plugin to your babel.config.js:',
            `module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        'react-native-reanimated/plugin',
    ],
};`,
            'For iOS, run pod install in the ios directory:',
            'cd ios && pod install && cd ..',
            'Restart your development server with cache reset:',
            'npx expo start -c or npm start -- --reset-cache',
        ],
    },
    {
        id: 'gesture',
        name: 'React Native Gesture Handler',
        description: "Gesture Handler provides a declarative API exposing the native platform's touch and gesture system to React Native.",
        npm: 'npm install react-native-gesture-handler',
        expo: 'npx expo install react-native-gesture-handler',
        yarn: 'yarn add react-native-gesture-handler',
        extraSteps: [
            'Import at the top of your entry file (e.g. App.js or index.js):',
            `import { GestureHandlerRootView } from 'react-native-gesture-handler';
            
export default function App() {
  return (
    <GestureHandlerRootView>
      <ActualApp />
    </GestureHandlerRootView>
  );
}
            `,
            'Note: This import must be at the top of your entry file, before any other imports.',
        ],
    },
    {
        id: 'skia',
        name: 'React Native Skia',
        description: 'High-performance 2D graphics for React Native using Skia as rendering engine.',
        npm: 'npm install @shopify/react-native-skia',
        expo: 'npm install @shopify/react-native-skia',
        yarn: 'yarn add @shopify/react-native-skia',
        extraSteps: [
            'Version compatibility: react-native@>=0.71 and react@>=18 are required.',
            "In addition you should make sure you're on at least iOS 13 and Android API level 21 or above.",
        ],
    },
    {
        id: 'moti',
        name: 'Moti',
        description:
            'Moti is the universal animation package for React Native, made by Fernando Rojo. Universal works on all platforms. 60 FPS animations run on the native thread, Mount/ unmount animations like Framer Motion, Powered by Reanimated 3, Intuitive API, Variant & keyframe animations, Strong TypeScript support, Highly - configurable animations, Sequence animations, Loop & repeat animations, Web support, Expo support, Next.js support',
        npm: 'npm i moti --legacy-peer-deps',
        expo: 'npm install moti',
        yarn: 'yarn add moti',
        extraSteps: [
            'Moti requires react-native-reanimated v2 or higher.',
            'Make sure you have installed and configured react-native-reanimated correctly.',
            'Basic usage example:',
            `import { MotiView } from 'moti';

export default function App() {
    return (
        <MotiView
            from={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'timing' }}
        />
    );
}`,
        ],
    },
];
