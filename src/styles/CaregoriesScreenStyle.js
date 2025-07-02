import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    titleContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 36,
        fontFamily: 'Cambria'
    },
    categoryImage: {
        width: '80@vs',
        height: '80@vs',
        borderRadius: 24
    },
    containerCategories: {
        flexDirection: 'row', // Горизонтальная ориентация
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '42@msr'
    },
    containerSubcategories: {
        
    },
    subcategory: {
        marginHorizontal: 24,
        borderWidth: 1,
        borderColor: '#26CFFF',
        marginTop: 12,
        padding: 12,
        borderRadius: 12
    },
    subcategoryTxt: {
        fontFamily: 'Cambria',
        fontSize: '18@ms',
    },
    categoryButton: {
        width: '30%',
        margin: '2@s'
    },
    category: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryText: {
        fontFamily: 'CambriaBold',
        fontSize: '18@ms',
        margin: '5@msr',
    },
    loadTxt: {
        fontSize: '20@s',
        color: '#000',
        opacity: 0.5,
        fontFamily: 'Cambria'
    },
});

export default styles;
