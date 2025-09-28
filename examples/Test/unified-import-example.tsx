// import React from 'react';
// import { View, Text } from 'react-native';

// // Pattern 1: Import from unified package
// import {
//     AnimatedButton,
//     AnimatedAccordion,
//     AnimatedCard,
//     AnimatedInput,
//     AnimatedModal,
//     AnimatedDropdown,
//     AnimatedCheckbox,
//     AnimatedRadio,
//     AnimatedSwitch,
//     AnimatedSkeleton,
//     AnimatedSnackbar,
//     ToastApp
// } from 'aargon-ui';

// // Pattern 2: Import individual components from unified package
// import { AnimatedButton as ButtonFromUnified } from 'aargon-ui/button';
// import { AnimatedAccordion as AccordionFromUnified } from 'aargon-ui/accordion';
// import { AnimatedCard as CardFromUnified } from 'aargon-ui/card';

// // Pattern 3: Import from individual packages (existing)
// import { AnimatedButton as IndividualButton } from 'aargon-button';
// import { AnimatedAccordion as IndividualAccordion } from 'aargon-accordion';
// import { AnimatedCard as IndividualCard } from 'aargon-card';

// export default function UnifiedImportExample() {
//     return (
//         <View style={{ padding: 20 }}>
//             <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
//                 Aargon UI - Unified Import Example
//             </Text>

//             <Text style={{ fontSize: 18, marginBottom: 10 }}>
//                 All three import patterns work:
//             </Text>

//             <Text style={{ marginBottom: 5 }}>
//                 ✓ Unified package: aargon-ui
//             </Text>
//             <Text style={{ marginBottom: 5 }}>
//                 ✓ Individual from unified: aargon-ui/button
//             </Text>
//             <Text style={{ marginBottom: 20 }}>
//                 ✓ Individual packages: aargon-button
//             </Text>

//             <Text style={{ fontSize: 16, marginBottom: 10 }}>
//                 Available components:
//             </Text>

//             <Text style={{ marginBottom: 5 }}>• AnimatedButton</Text>
//             <Text style={{ marginBottom: 5 }}>• AnimatedAccordion</Text>
//             <Text style={{ marginBottom: 5 }}>• AnimatedCard</Text>
//             <Text style={{ marginBottom: 5 }}>• AnimatedInput</Text>
//             <Text style={{ marginBottom: 5 }}>• AnimatedModal</Text>
//             <Text style={{ marginBottom: 5 }}>• AnimatedDropdown</Text>
//             <Text style={{ marginBottom: 5 }}>• AnimatedCheckbox</Text>
//             <Text style={{ marginBottom: 5 }}>• AnimatedRadio</Text>
//             <Text style={{ marginBottom: 5 }}>• AnimatedSwitch</Text>
//             <Text style={{ marginBottom: 5 }}>• AnimatedSkeleton</Text>
//             <Text style={{ marginBottom: 5 }}>• AnimatedSnackbar</Text>
//             <Text style={{ marginBottom: 5 }}>• ToastApp</Text>
//         </View>
//     );
// }
