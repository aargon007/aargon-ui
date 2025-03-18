// Installation steps data
export const libraries = [
    {
        id: "reanimated",
        name: "React Native Reanimated",
        description: "A powerful animation library that provides fluid animations and interactions.",
        npm: "npm install react-native-reanimated",
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
            "npx pod-install ios",
            "Restart your development server with cache reset:",
            "npx react-native start --reset-cache",
        ],
    },
    {
        id: "gesture",
        name: "React Native Gesture Handler",
        description: "Provides native-driven gesture management APIs for building best possible touch-based experiences.",
        npm: "npm install react-native-gesture-handler",
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