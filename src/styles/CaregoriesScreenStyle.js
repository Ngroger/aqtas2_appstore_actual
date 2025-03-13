import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        paddingTop: 38
    },
    categoryImage: {
        width: '80@vs',
        height: '80@vs'
    },
    containerCategories: {
        flexDirection: 'row', // Горизонтальная ориентация
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: '12@ms',
    },
    categoryButton: {
        width: '30%',
        marginBottom: '20@ms',
    },
    category: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        fontFamily: 'CambriaBold',
        fontSize: '18@ms',
        margin: '5@msr',
    },
});

export default styles;
