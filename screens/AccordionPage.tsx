import React from 'react';
import { View, ScrollView } from 'react-native';
import ComponentPage from '@/component/common/ComponentPage';
import AccordionWithData from '@/component/ui/accordion/AccordionWithData';

export default function AccordionPage() {
    return (
        <ComponentPage
            title="Accordion"
            description="An accordion component that allows users to toggle between showing and hiding content sections."
            installation="npm install @animatereactnative/accordion"
            usage={`import { Accordion } from '@animatereactnative/accordion';`}
            examples={[
                {
                    title: 'Basic Accordion',
                    description: 'A simple accordion with a single item.',
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
                    name: 'Header',
                    type: 'React.ReactNode',
                    description: 'The component that will wrap any children and it will apply a rotation to it.',
                },
                {
                    name: 'Expanded',
                    type: 'React.ReactNode',
                    description: 'This is the content that will be displayed when the accordion is open',
                },
                {
                    name: 'Collapsed',
                    type: 'React.ReactNode',
                    description: 'This is the content that will be displayed when the accordion is closed',
                },
                {
                    name: 'Always',
                    type: 'React.ReactNode',
                    description: 'This is the content that will always be displayed',
                },
                {
                    name: 'Sibling',
                    type: 'React.ReactNode',
                    description: 'Sibling elements that should animate layout changes.',
                },
            ]}
        />
    );
}

// Example preview component
const AccordionPreview = () => {
    const faqData = [
        {
            question: 'What is React Native?',
            answer: 'React Native is an open-source mobile application framework created by Facebook. It allows developers to use React along with native platform capabilities to build mobile applications for iOS, Android, and other platforms.',
        },
        {
            question: 'How does React Native differ from React?',
            answer: "While React is used for building web applications with HTML, CSS, and JavaScript, React Native is used for building native mobile applications using JavaScript and React. Instead of web components, React Native provides a set of native components that map to the platform's native UI building blocks.",
        },
        {
            question: 'Is React Native good for all types of mobile apps?',
            answer: 'React Native is excellent for most mobile applications, especially those with straightforward UI requirements. However, for apps requiring intensive graphics, complex animations, or deep hardware integration, a fully native approach might be more suitable in some cases. That said, React Native has evolved to handle increasingly complex applications.',
        },
    ];

    return (
        <View style={{ width: '100%' }}>
            <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
                <View style={{ flex: 1, gap: 10, paddingHorizontal: 20 }}>
                    {faqData.map((item, index) => (
                        <AccordionWithData key={index} title={item.question} desc={item.answer} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};
