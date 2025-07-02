import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        padding: 0
    },
    tableImage: {
        width: '100%',
        height: 200,
        borderRadius: 15,
        marginTop: 12,
        backgroundColor: '#F6F6F6'
    },
    goBackBtn: {
        width: 52,
        height: 52,
        borderRadius: 100,
        backgroundColor: '#FFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        position: 'absolute',
        zIndex: 100,
        left: 24,
        top: 38,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: 300,
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
        borderColor: '#26CFFF',
        backgroundColor: 'transparent'
    },
    activeDot: {
        width: 9,
        height: 9,
        borderRadius: 100,
        marginHorizontal: 3,
        backgroundColor: '#26CFFF',
    },
    oldCost: {
        fontFamily: 'Cambria',
        fontSize: 16,
        color: '#BDBDBD',
        textDecorationLine: 'line-through'
    },
    costContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
    },
    cost: {
        fontFamily: 'Cambria',
        fontSize: 24,
        color: '#26CFFF'
    },
    commission: {
        left: 10,
        fontFamily: 'Cambria',
        color: '#14FF00',
        fontSize: 18
    },
    commisionButton: {
        left: 20,
        fontFamily: 'Cambria',
        backgroundColor: '#FFF',
        width: 20,
        height: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 24,
        marginTop: 3
    },
    description: {
        fontFamily: 'Cambria',
        fontSize: 18,
        marginTop: 3
    },
    infoContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#BDBDBD',
        padding: 0
    },
    additionInfo: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10

    },
    firstInfo: {
        fontFamily: 'Cambria',
        fontSize: 18,
        marginVertical: 4
    },
    secondInfo: {
        fontFamily: 'Cambria',
        textAlign: 'right',
        fontSize: 18,
        marginVertical: 4,
        color: '#BDBDBD'
    },
    aboutCostumer: {
        padding: 16,
        width: 'auto',
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        margin: 10,
        borderRadius: 15,
        marginVertical: 20
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    stat: {
        backgroundColor: 'rgba(149, 229, 255, 0.2)',
        flexDirection: 'row',
        display: 'flex',
        borderRadius: 100,
        alignItems: 'center',
        padding: 5,
        paddingHorizontal: 16,
        marginHorizontal: 5,
        marginVertical: 5
    },
    statText: {
        fontFamily: 'Cambria',
        color: '#000',
        fontSize: 18,
        marginLeft: 5
    },
    reviewsStats: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        marginTop: 10
    },
    starsContainer: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between'
    },
    reviewsContainer: {
        flexDirection: 'row',
        display: 'flex',
    },
    review: {
        padding: 16,
        marginHorizontal: 10,
        marginVertical: 20,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 15,
    },
    imageReviewer: {
        borderRadius: 100,
        height: 40,
        width: 40
    },
    reviewInfo: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center'
    },
    reviwerName: {
        fontFamily: 'Cambria',
        fontSize: 18
    },
    reviewerDate: {
        color: '#BDBDBD',
        fontFamily: 'Cambria',
        fontSize: 18
    },
    reviewDescription: {
        marginTop: 10,
        width: 200,
        fontFamily: 'Cambria',
        fontSize: 18
    },
    containerCart: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between'
    },
    cart: {
        borderRadius: 20,
        width: 160,
        marginHorizontal: 10
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
    cartCostContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -20
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
        backgroundColor: '#26CFFF',
        borderRadius: 100,
        width: 120,
        paddingVertical: 7,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 9,
        marginTop: 6,
        marginBottom: 12
    },
    addCartText: {
        color: '#fff',
        fontFamily: 'CambriaBold',
        fontSize: 14
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
        backgroundColor: '#26CFFF',
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
    buttons: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between'
    },
    buyNow: {
        backgroundColor: '#26CFFF',
        borderRadius: 100,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        width: 170,
        marginVertical: 20
    },
    buyNowText: {
        fontFamily: 'CambriaBold',
        color: '#fff',
        fontSize: 18,
    },
    addToCartButtons: {
        borderColor: '#26CFFF',
        borderWidth: 1,
        borderRadius: 100,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginVertical: 20
    },
    addToCartButtonText: {
        fontFamily: 'CambriaBold',
        color: '#26CFFF',
        fontSize: 18,
    },
    noDataText: {
        fontFamily: 'Cambria',
        fontSize: 24,
        color: '#BDBDBD',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    sizeContainer: {
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        display: 'flex'
    },
    size: {
        borderRadius: 10,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        width: 35,
        height: 35,
        margin: 5
    },
    sizeText: {
        fontFamily: 'Cambria',
        fontSize: 20,
        color: '#BDBDBD'
    },
    sizeSelected: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1000,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles