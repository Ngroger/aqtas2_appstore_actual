import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        padding: 20
    },
    infoContainer: {
        flexDirection: 'row',
        display: 'flex',
        marginTop: 10,
        alignItems: 'center'
    },
    bonusContainer: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: '#BDBDBD',
        borderBottomWidth: 1,
        paddingVertical: 16
    },
    photo: {
        width: 50,
        height: 50,
        borderRadius: 100,
        margin: 3
    },
    infoText: {
        fontFamily: 'Cambria',
        fontSize: 24,
        left: 10
    },
    sale: {
        backgroundColor: '#FF0000',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 100
    },
    saleText: {
        color: '#fff',
        fontFamily: 'CambriaBold',
        fontSize: 18
    },
    seasonSale: {
        backgroundColor: '#FF843F',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 100,
        left: 10
    },
    seasonSaleText: {
        color: '#fff',
        fontFamily: 'CambriaBold',
        fontSize: 18,
    },
    profileButton: {
        borderWidth: 1,
        borderColor: '#95E5FF',
        padding: 12,
        marginTop: 16,
        borderRadius: 15
    },
    profileButtonText: {
        fontFamily: 'Cambria',
        fontSize: 20
    },
    faq: {
        width: 80,
        height: 80
    },
    faqButton: {
        backgroundColor: '#95E5FF',
        borderRadius: 15,
        padding: 16,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 16
    },
    faqText: {
        color: '#fff',
        fontFamily: 'Cambria',
        fontSize: 18,
        width: 200,
        left: 20,
        top: 10
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
});

export default styles;