export const switchExample = `
const switch1 = useSharedValue(false);

<AnimatedSwitch
    value={switch1}
    onPress={() => (switch1.value = !switch1.value)}
    isDisabled={false}
/>
<AnimatedSwitch
    value={switch3}
    onPress={() => (switch3.value = !switch3.value)}
    isDisabled={false}
    trackColors={{ on: "#10B981", off: "#374151" }}
    thumbColors={{ on: "#FFFFFF", off: "#9CA3AF" }}
/>
`