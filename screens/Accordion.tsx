import React from "react"
import { View, Text, ScrollView, StatusBar } from "react-native"
import ComponentPage from "@/component/common/ComponentPage"
import AccordionWithData from "@/component/ui/accordion/AccordionWithData";

// Example preview component
const AccordionPreview = () => {
  const _spacing = 20;

  return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ gap: _spacing / 2, paddingHorizontal: _spacing }}>
          <AccordionWithData type="<Accordion /> component" />
          <AccordionWithData type="Done with Reanimated" />
          <AccordionWithData type="AnimateReactNative.com" />
        </View>
      </ScrollView>
  )
}

export default function AccordionPage() {
  return (
    <ComponentPage
      title="Accordion"
      description="An accordion component that allows users to toggle between showing and hiding content sections."
      installation="npm install @animatereactnative/accordion"
      usage={`import { Accordion } from '@animatereactnative/accordion';`}
      examples={[
        {
          title: "Basic Accordion",
          description: "A simple accordion with a single item.",
          code: `
export function Example() {
  return (
    <Accordion.Accordion>
      <Accordion.Header>
        <Text>AnimateReactNative.com</Text>
        <Accordion.HeaderIcon>
          <ChevronUp />
        </Accordion.HeaderIcon>
      </Accordion.Header>

      <Accordion.Collapsed>
        <Text>Visible !expanded</Text>
      </Accordion.Collapsed>
      <Accordion.Always>
        <Text>Always visible</Text>
      </Accordion.Always>

      <Accordion.Expanded>
        <Text>Expanded content</Text>
        {loading && <ActivityIndicator />}
        {data & <MyList data={data} />}
      </Accordion.Expanded>
    </Accordion.Accordion>
  );
}
          `,
          preview: <AccordionPreview />,
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

