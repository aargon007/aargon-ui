// Define your colors, typography, spacing, dimensions, breakpoints, and borders
const colors = {
    $primary: '#111111',
    $secondary: '#181818',
    $tertiary: '#232325',
    $quarternary: '#212124',
    $white: '#FFFFFF',
    $dark: '#090909',
    $black: '#000000',
    $blue: '#0879CC',
    $red: '#A93E3E',
    $darkgray: '#373737',
    $gray: '#A3A3A8',
};

const typography = {
    $text_xs: 10,
    $text_sm: 12,
    $text_md: 16,
    $text_lg: 20,
    $font_regular: '400',
    $font_medium: '500',
    $font_semibold: '600',
    $font_bold: '700',
};

const spacing = {
    '$p-2': 8,
    '$p-4': 16,
    '$p-6': 24,
    '$m-2': 8,
    '$m-4': 16,
    '$m-6': 24,
};

const dimensions = {
    $full: '100%',
    $rounded: 7.5,
    $rounded_md: 12,
};

// const breakpoints = {
//     $small: '@media (max-width: 599px)',
//     $medium: '@media (min-width: 600px) and (max-width: 1199px)',
//     $large: '@media (min-width: 1200px)',
// };

const borders = {
    $border_sm: 0.5,
    $border: 1,
    $border_md: 2,
    $border_lg: 7.5,
    $border_primary: '#232325',
    $border_secondary: '',
};

// Export the styles
export default {
    ...colors,
    ...typography,
    ...spacing,
    ...dimensions,
    ...borders,
    // breakpoints: {
    //     small: breakpoints.small,
    //     medium: breakpoints.medium,
    //     large: breakpoints.large,
    // },
};
