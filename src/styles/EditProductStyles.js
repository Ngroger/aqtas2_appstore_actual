import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        padding: 0
    },
    image: {
        width: 200,
        height: 300,
    },
    pagination: {
        position: 'absolute', // Добавляем абсолютное позиционирование
        zIndex: 15, // Устанавливаем высокий zIndex, чтобы точки были поверх InfoBlock
    },
    goBackBtn: {
        width: 36,
        height: 36,
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
        left: 20,
        top: 36,
        justifyContent: 'center',
        alignItems: 'center'
    },
    saveBtn: {
        width: 36,
        height: 36,
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
        right: 20,
        top: 36,
        justifyContent: 'center',
        alignItems: 'center'
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
        marginLeft: 20,
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
        marginTop: 3,
    },
    infoContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#BDBDBD',
        padding: 0,
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
        width: 170,
        marginVertical: 20
    },
    addToCartButtonText: {
        fontFamily: 'CambriaBold',
        color: '#26CFFF',
        fontSize: 18,
    },
    photoContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        display: 'flex',
        flexDirection: 'row'
    },
    photoPickFront: {
        width: '100%',
        height: '100%',
        borderRadius: 28
    },
    photo: {
        width: 200,
        height: 250,
        borderRadius: 28,
        marginTop: 20,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deletePhoto: {
        position: 'absolute',
        zIndex: 100,
        width: 45,
        height: 45,
        backgroundColor: 'rgba(149, 229, 255, 0.35)',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#26CFFF'
    },
    photoPickButton: {
        backgroundColor: 'rgba(149, 229, 255, 0.25)',
        width: 45,
        height: 45,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#26CFFF'
    },
    swiperContent: {
        alignItems: 'center', // Центрирование содержимого по горизонтали
    },
    topButton: {
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#26CFFF',
        borderRadius: 100,
        marginTop: 20
    },
    topButtonText: {
        color: '#fff',
        fontFamily: 'CambriaBold',
        fontSize: 24,
    },
    saveButton: {
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#26CFFF',
        borderWidth: 1,
        borderRadius: 100,
        marginTop: 20
    },
    saveButtonText: {
        color: '#26CFFF',
        fontFamily: 'CambriaBold',
        fontSize: 24,
    },
    background: {
        position: 'absolute',
        zIndex: 100,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.25)'
    },
    containerChoiseImage: {
        position: 'absolute',
        zIndex: 200,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#FFF',
        bottom: 0,
        width: '100%',
        padding: 10,
    },
    buttonChoiseImage: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    buttonChoiseImageText: {
        fontFamily: 'Cambria',
        fontSize: 24,
        color: '#26CFFF'
    },
    loadTxt: {
        color: '#000',
        opacity: 0.5,
        fontSize: '16@s',
        textAlign: 'center',
        fontFamily: 'Cambria'
    }
});

export default styles