import React from "react"
import { View, Text, Pressable } from "react-native"
import { MotiView } from "moti"
import { Feather } from "@expo/vector-icons"
import ComponentPage from "@/component/common/ComponentPage"

// Example preview component
const AccordionPreview = () => {
    const [expanded, setExpanded] = React.useState(false)

    return (
        <View style={{ width: "100%", maxWidth: 400 }}>
            <View
                style={{
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    borderRadius: 8,
                    overflow: "hidden",
                    backgroundColor: "#FFFFFF",
                }}
            >
                <Pressable
                    onPress={() => setExpanded(!expanded)}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 16,
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: "500", color: "#111827" }}>Click to expand</Text>
                    <MotiView
                        animate={{
                            rotateZ: expanded ? "180deg" : "0deg",
                        }}
                        transition={{
                            type: "timing",
                            duration: 300,
                        }}
                    >
                        <Feather name="chevron-down" size={18} color="#6B7280" />
                    </MotiView>
                </Pressable>

                <MotiView
                    animate={{
                        height: expanded ? "auto" : 0,
                        opacity: expanded ? 1 : 0,
                    }}
                    transition={{
                        type: "timing",
                        duration: 300,
                    }}
                    style={{
                        overflow: "hidden",
                        borderTopWidth: expanded ? 1 : 0,
                        borderTopColor: "#E5E7EB",
                    }}
                >
                    <View style={{ padding: 16 }}>
                        <Text style={{ fontSize: 14, lineHeight: 20, color: "#4B5563" }}>
                            This is the accordion content that appears when expanded. You can put any content here, including text,
                            images, or other components.
                        </Text>
                    </View>
                </MotiView>
            </View>
        </View>
    )
}

export default function AccordionPage() {
    return (
        <ComponentPage
            title="Accordion"
            description="An accordion component that allows users to toggle between showing and hiding content sections."
            usage={`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@your-org/motion-ui';`}
            examples={[
                {
                    title: "Basic Accordion",
                    description: "A simple accordion with a single item.",
                    code: `import React from 'react';
import { View } from 'react-native';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@your-org/motion-ui';

export default function BasicAccordion() {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>
          Content for section 1
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
                    preview: <AccordionPreview />,
                },
                {
                    title: "Multiple Items",
                    description: "An accordion with multiple items where only one can be open at a time.",
                    code: `import React from 'react';
import { View } from 'react-native';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@your-org/motion-ui';

export default function MultipleAccordion() {
  return (
    <Accordion type="single" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>
          Content for section 1
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>
          Content for section 2
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>
          Content for section 3
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
                },
                {
                    title: "Multiple Open Items",
                    description: "An accordion that allows multiple items to be open simultaneously.",
                    code: `import React from 'react';
import { View } from 'react-native';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@your-org/motion-ui';

export default function MultipleOpenAccordion() {
  return (
    <Accordion type="multiple" defaultValue={["item-1", "item-3"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>
          Content for section 1
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>
          Content for section 2
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>
          Content for section 3
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
                },
            ]}
            props={[
                {
                    name: "type",
                    type: "'single' | 'multiple'",
                    default: "'single'",
                    description: "Determines whether one or multiple items can be opened at the same time.",
                },
                {
                    name: "defaultValue",
                    type: "string | string[]",
                    description: "The default open accordion item value(s).",
                },
                {
                    name: "value",
                    type: "string | string[]",
                    description: "The controlled open accordion item value(s).",
                },
                {
                    name: "onValueChange",
                    type: "(value: string | string[]) => void",
                    description: "Callback called when the open state changes.",
                },
                {
                    name: "collapsible",
                    type: "boolean",
                    default: "true",
                    description: "When type is 'single', allows closing content when clicking the trigger for an open item.",
                },
                {
                    name: "animation",
                    type: "object",
                    default: "{ type: 'spring', damping: 15 }",
                    description: "Animation configuration for the accordion transitions.",
                },
            ]}
        />
    )
}

