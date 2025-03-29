import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    logo: {
        width: '110@ms',
        height: "30@ms"
    },
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: '48@msr'
    },
    search: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#95E5FF',
        padding: '12@ms',
        borderRadius: 10,
        marginLeft: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    serchInput: {
        fontFamily: 'Cambria',
        left: 3,
        width: '95%',
        fontSize: '14@ms'
    },
    categories: {
        paddingVertical: 16,
    },
    categoriesContainer: {
        width: '100%',
        borderBottomColor: '#BDBDBD',
        borderBottomWidth: 1,
        paddingHorizontal: 20
    },
    categoryActive: {
        backgroundColor: '#95E5FF',
        padding: '8@ms',
        borderRadius: 100,
        paddingHorizontal: 16,
        marginHorizontal: 5

    },
    categoryTextActive: {
        fontFamily: 'CambriaBold',
        fontSize: '18@mvs',
        color: '#fff'
    },

    category: {
        borderColor: '#95E5FF',
        borderWidth: 1,
        padding: '8@ms',
        borderRadius: 100,
        paddingHorizontal: 16,
        marginHorizontal: 5
    },
    categoryText: {
        fontFamily: 'CambriaBold',
        fontSize: '18@mvs',
        color: '#95E5FF'
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: '24@ms',
        marginLeft: 20,
        marginTop: 12
    },
    containerCart: {
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: '16@msr'
    },
    cart: {
        borderRadius: 20,
        marginTop: 10,
        width: '150@ms0.9'
    },
    cartPreview: {
        width: '100%',
        height: '200@vs',
        borderRadius: 20,
        objectFit: 'cover'
    },
    pagination: {
        position: 'absolute', // Добавляем абсолютное позиционирование
        zIndex: 15, // Устанавливаем высокий zIndex, чтобы точки были поверх InfoBlock
    },
    dot: {
        width: 9,
        height: 9,
        borderRadius: 100,
        marginHorizontal: 100,
        borderWidth: 1,
        borderColor: '#95E5FF',
        backgroundColor: 'transparent'
    },
    activeDot: {
        width: 9,
        height: 9,
        borderRadius: 100,
        marginHorizontal: 3,
        backgroundColor: '#95E5FF',
    },
    costContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -20
    },
    cost: {
        fontFamily: 'Cambria',
        fontSize: '18@ms',
        color: '#95E5FF'
    },
    oldCost: {
        fontFamily: 'Cambria',
        fontSize: 16,
        color: '#BDBDBD',
        left: 6,
        textDecorationLine: 'line-through',
    },
    name: {
        fontFamily: 'Cambria',
        fontSize: '16@vs'
    },
    description: {
        fontFamily: 'Cambria',
        fontSize: '14@ms',
        color: '#BDBDBD',
        marginTop: 2
    },
    addCart: {
        backgroundColor: '#95E5FF',
        borderRadius: 100,
        paddingVertical: '7@msr',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '12@msr',
        marginTop: '6@s',
        alignSelf: 'flex-start'
    },
    addCartText: {
        color: '#fff',
        fontFamily: 'CambriaBold',
        fontSize: '10@vs'
    },
    previewContainer: {
        position: 'relative'
    },
    top: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: '#FF0000',
        borderRadius: 100,
        padding: 3,
        paddingHorizontal: 9,
        right: 12,
        top: 12
    },
    textTop: {
        fontFamily: 'Cambria',
        color: '#fff'
    },
    sale: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: '#95E5FF',
        borderRadius: 100,
        padding: 3,
        paddingHorizontal: 9,
        left: 12,
        bottom: 64
    },
    saleText: {
        fontFamily: 'CambriaBold',
        color: '#fff',
    },
    scrollContainer: {
        width: '100%',
        height: '100%'
    },
    loadingIndicatorContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLoad: {
        fontFamily: 'Cambria',
        fontSize: 16,
        marginTop: 10,
        color: '#BDBDBD'
    },
    noDataText: {
        fontFamily: 'Cambria',
        fontSize: 18,
        color: '#BDBDBD',
        textAlign: 'center',
        marginTop: '100%',
        marginBottom: '100%'
    }
});

export default styles;