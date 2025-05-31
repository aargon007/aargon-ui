export const accordionExample = `
{/* open by default  */}
<AnimatedAccordion title="Show More" isExpanded={true}>
    <Text>This is the hidden content.</Text>
    <Text>It will appear smoothly on toggle.</Text>
</AnimatedAccordion>

<AnimatedAccordion title="Show More">
    <Text>This is the hidden content.</Text>
    <Text>It will appear smoothly on toggle.</Text>
</AnimatedAccordion>
`