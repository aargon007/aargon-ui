// Installation steps data
export const libraries = [
    {
        id: "reanimated",
        name: "React Native Reanimated",
        description: "React Native Reanimated is a powerful animation library built by Software Mansion. With Reanimated, you can easily create smooth animations and interactions that run on the UI thread.",
        npm: "npm install react-native-reanimated",
        expo: "npx expo install react-native-reanimated",
        yarn: "yarn add react-native-reanimated",
        extraSteps: [
            "Add the Reanimated babel plugin to your babel.config.js:",
            `module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        'react-native-reanimated/plugin',
    ],
};`,
            "For iOS, run pod install in the ios directory:",
            "cd ios && pod install && cd ..",
            "Restart your development server with cache reset:",
            "npx expo start -c or npm start -- --reset-cache",
        ],
    },
    {
        id: "gesture",
        name: "React Native Gesture Handler",
        description: "Provides native-driven gesture management APIs for building best possible touch-based experiences.",
        npm: "npm install react-native-gesture-handler",
        expo: "npm install react-native-gesture-handler",
        yarn: "yarn add react-native-gesture-handler",
        extraSteps: [
            "For iOS, run pod install in the ios directory:",
            "npx pod-install ios",
            "Import at the top of your entry file (e.g. App.js or index.js):",
            `import 'react-native-gesture-handler';`,
            "Note: This import must be at the top of your entry file, before any other imports.",
        ],
    },
    {
        id: "skia",
        name: "React Native Skia",
        description: "High-performance 2D graphics for React Native using Skia as rendering engine.",
        npm: "npm install @shopify/react-native-skia",
        expo: "npm install @shopify/react-native-skia",
        yarn: "yarn add @shopify/react-native-skia",
        extraSteps: [
            "For iOS, run pod install in the ios directory:",
            "npx pod-install ios",
            "For Android, no additional steps required.",
            "Note: React Native Skia requires React Native 0.66 or higher.",
        ],
    },
    {
        id: "moti",
        name: "Moti",
        description: "The universal animation package for React Native, built on Reanimated 2.",
        npm: "npm install moti",
        expo: "npm install moti",
        yarn: "yarn add moti",
        extraSteps: [
            "Moti requires react-native-reanimated v2 or higher.",
            "Make sure you have installed and configured react-native-reanimated correctly.",
            "Basic usage example:",
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
]