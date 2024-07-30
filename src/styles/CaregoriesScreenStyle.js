import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    logo: {
        width: 110,
        height: 30
    },
    categoryImage: {
        width: '100@ms0.3',
        height: '100@ms0.3'
    },
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    search: {
        width: 230,
        borderWidth: 1,
        borderColor: '#95E5FF',
        padding: 5,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    serchInput: {
        fontFamily: 'Cambria',
        left: 3,
        fontSize: 18
    },
    category: {
        margin: 12
    },
    categoryText: {
        fontFamily: 'CambriaBold',
        fontSize: '18@ms0.3',
        padding: 2,
    },
    containerCategories: {
        flexDirection: 'row',
        display: 'row',
        flexWrap: 'wrap',
        width: '100%',
    }
});

export default styles;