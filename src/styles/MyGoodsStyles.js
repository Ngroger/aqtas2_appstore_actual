import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        paddingHorizontal: 20
    },
    titleContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        marginTop: '36@msr'
    },
    productPreview: {
        width: 160,
        height: 160,
        borderRadius: 15
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 16,
        borderBottomColor: '#BDBDBD',
        borderBottomWidth: 1
    },
    costContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cost: {
        fontFamily: 'Cambria',
        fontSize: 24
    },
    oldCost: {
        fontFamily: 'Cambria',
        fontSize: 16,
        color: '#BDBDBD',
        marginLeft: 6,
        textDecorationLine: 'line-through',
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    firstInfo: {
        fontFamily: 'Cambria',
        fontSize: 18,
        margin: 2,
    },
    secondInfo: {
        fontFamily: 'Cambria',
        fontSize: 18,
        margin: 2,
        color: '#BDBDBD',
        textAlign: 'right',
    },
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 36
    },
    data: {
        fontFamily: 'Cambria',
        fontSize: 28,
        color: '#BDBDBD',
        top: 10
    },
    buttonAddProduct: {
        backgroundColor: '#95E5FF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 15
    },
    buttonAddProductText: {
        fontFamily: 'CambriaBold',
        fontSize: 20,
        color: '#fff'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    topButton: {
        backgroundColor: '#95E5FF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6,
        borderRadius: 15,
        marginTop: 10
    },
    topButtonText: {
        fontFamily: 'CambriaBold',
        fontSize: 12,
        color: '#fff',
    },
    editButton: {
        borderColor: '#95E5FF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6,
        borderRadius: 15,
        borderWidth: 1,
        left: 4,
        marginTop: 10
    },
    editButtonText: {
        fontFamily: 'CambriaBold',
        fontSize: 12,
        color: '#95E5FF',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 5,
        marginLeft: 12,
        borderColor: '#000'
    },
    selectedCheckbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 5,
        marginLeft: 12,
        borderColor: '#95E5FF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    activeCheckbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 5,
        marginLeft: 12,
        borderColor: '#95E5FF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot: {
        backgroundColor: '#95E5FF',
        borderRadius: 100,
        padding: 5
    },
    categories: {
        paddingVertical: 16,

    },
    categoriesContainer: {
        width: '100%',
        borderBottomColor: '#BDBDBD',
        borderBottomWidth: 1,
    },
    categoryActive: {
        backgroundColor: '#95E5FF',
        padding: 8,
        borderRadius: 100,
        paddingHorizontal: 16,
        marginHorizontal: 5

    },
    categoryTextActive: {
        fontFamily: 'CambriaBold',
        fontSize: 18,
        color: '#fff'
    },
    category: {
        borderColor: '#95E5FF',
        borderWidth: 1,
        padding: 8,
        borderRadius: 100,
        paddingHorizontal: 16,
        marginHorizontal: 5
    },
    categoryText: {
        fontFamily: 'CambriaBold',
        fontSize: 18,
        color: '#95E5FF'
    },
    loadingIndicatorContainer: {
        width: '100%',
        height: '78%',
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
        marginBottom: '77%'
    },
    buttonActionProduct: {
        borderWidth: 1,
        borderColor: '#95E5FF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 15,
        width: '47%'
    },
    buttonActionProductText: {
        fontFamily: 'CambriaBold',
        fontSize: 20,
        color: '#95E5FF'
    },
    buttonDeleteProduct: {
        backgroundColor: '#95E5FF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 15,
        width: '47%'
    },
    buttonDeleteProductText: {
        fontFamily: 'CambriaBold',
        fontSize: 20,
        color: '#fff'
    },
    buttonsContainer: {
        position: 'absolute',
        zIndex: 1000,
        bottom: 0,
        margin: 24,
        width: '100%'
    }
});

export default styles;