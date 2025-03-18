import EStyleSheet from 'react-native-extended-stylesheet';

export const globalStyles = EStyleSheet.create({
    //pos home
    posContainer: {
        flex: 1,
        backgroundColor: '$black',
        color: '$white',
        flexDirection: 'row',
    },
    leftNav: {
        height: '$full',
        '@media (max-width: 2160px)': {
            width: 83,
        },
        '@media (min-width: 2161px) and (max-width: 2600px)': {
            width: 90,
        },
    },
    leftNavMenuBtn: {
        backgroundColor: '$secondary',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        borderBottomWidth: '$border_sm',
        borderBottomColor: '$border_primary',
    },
    navItem: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: '$border_sm',
        borderBottomColor: '$border_primary',
    },
    navText: {
        color: '#A3A3A8',
        fontSize: '$text_xs',
        fontWeight: '$font_semibold',
        lineHeight: 12,
        marginTop: 9,
    },
    itemsContainer: {},
});
