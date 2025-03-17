import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        paddingHorizontal: 20
    },
    infoContainer: {
        flexDirection: 'row',
        display: 'flex',
        marginTop: '42@msr',
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
        width: '36@vs',
        height: '36@vs',
        borderRadius: 100,
    },
    infoText: {
        fontFamily: 'Cambria',
        fontSize: '20@ms',
        left: 6
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
        padding: '12@msr',
        marginTop: 16,
        borderRadius: 15
    },
    profileButtonText: {
        fontFamily: 'Cambria',
        fontSize: '20@ms'
    },
    faq: {
        width: '60@vs',
        height: '60@vs'
    },
    faqButton: {
        backgroundColor: '#95E5FF',
        borderRadius: 15,
        padding: '16@msr',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 16,
        alignItems: 'center',
        paddingRight: '24@msr'
    },
    faqText: {
        color: '#fff',
        fontFamily: 'Cambria',
        fontSize: '18@ms',
        flex: 1,
        left: 20,
    },
    loadingIndicatorContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLoad: {
        fontFamily: 'Cambria',
        fontSize: '16@ms',
        marginTop: 10,
        color: '#BDBDBD'
    },
});

export default styles;