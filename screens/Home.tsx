import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Header from '@/component/home/Header';
import StatusBar from '@/component/common/StatusBar';

const Home = () => {
    return (
        <View style={styles.container}>
            <StatusBar />
            <Header />
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '$white',
        // '@media (max-width: 599px)': {
        //     backgroundColor: '$gray',
        // },
        // '@media (min-width: 600px) and (max-width: 1199px)': {
        //     backgroundColor: '$secondary',
        // },
        // '@media (min-width: 1200px)': {
        //     backgroundColor: '$primary',
        // },
    },
    title: {
        fontSize: '$text_lg',
        color: '$gray',
        fontWeight: '$font_bold',
        borderWidth: '$border',
        borderColor: '$border_primary',
    },
});

export default Home;
