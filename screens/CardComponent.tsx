import { View, Text, StyleSheet, } from "react-native"
import ComponentPage from "@/component/common/ComponentPage";
import CodeExample from "@/component/common/CodeExample";
import { globalStyles } from "@/styles/globalStyles";

export default function CardComponent() {

    return (
        <ComponentPage>
            {/* UI Demo */}
            <View style={globalStyles.demoSection}>
                <Text style={globalStyles.title}>
                    Card Component
                </Text>
                <Text style={globalStyles.description}>
                    Highly customizable button component with smooth animations
                </Text>

                <View style={globalStyles.previewContainer}>
                    {/* toast prevview here  */}

                </View>
            </View>

            {/* Code Display */}
            {/* <CodeExample
                title="Code"
                code={accordionCode}
                filename="AnimatedAccordion.tsx"
            /> */}

            {/* implementation section */}
            {/* <CodeExample
                title="Implementation"
                code={accordionExample}
                filename="Example.ts"
            /> */}
        </ComponentPage>
    )
}