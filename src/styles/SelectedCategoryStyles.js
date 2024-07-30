import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#FFF',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 100,
    },
    titleContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 30
    },
    mainTitle: {
        fontSize: 36,
        fontFamily: 'Cambria'
    },
    logo: {
        width: '100%',
        height: 30
    },
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    search: {
        borderWidth: 1,
        borderColor: '#95E5FF',
        padding: 5,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    serchInput: {
        fontFamily: 'Cambria',
        left: 3,
        width: 180,
        fontSize: 18
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 24
    },
    containerCart: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    cart: {
        borderRadius: 20,
        width: '45%',
        marginTop: 10,
    },
    cartPreview: {
        width: 160,
        height: 250,
        borderRadius: 20,
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
        fontSize: 24,
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
        fontSize: 24
    },
    description: {
        fontFamily: 'Cambria',
        fontSize: 18,
        color: '#BDBDBD',
        marginTop: 2
    },
    addCart: {
        backgroundColor: '#95E5FF',
        borderRadius: 100,
        width: 100,
        paddingVertical: 7,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 9,
        marginTop: 6
    },
    addCartText: {
        color: '#fff',
        fontFamily: 'CambriaBold'
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
    }
});

export default styles;