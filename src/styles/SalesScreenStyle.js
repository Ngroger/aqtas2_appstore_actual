import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF'
    },
    titleContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        marginTop: 28,
        paddingHorizontal: 24
    },
    title: {
        fontSize: '28@ms',
        fontFamily: 'Cambria'
    },
    sale: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginTop: 20
    },
    imageSale: {
        width: '100%',
        height: 100,
        borderRadius: 25
    },
    filter: {
        backgroundColor: '#rgba(0, 0, 0, 0.3)',
        width: '100%',
        height: 100,
        borderRadius: 25,
        position: 'absolute',
        zIndex: 100
    },
    textSale: {
        fontFamily: 'CambriaBold',
        fontSize: 24,
        color: '#FFF',
        position: 'absolute',
        zIndex: 100
    },
    deleteBackground: {
        backgroundColor: '#rgba(255, 104, 107, 0.1)',
        width: '100%',
        height: 100,
        borderRadius: 25,
        position: 'absolute',
        zIndex: 1000,
        borderRadius: 25,
        overflow: 'hidden',
    },
    deleteContainer: {
        position: 'absolute',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'row'
    },
    line: {
        height: '100%',
        width: 1,
        backgroundColor: '#000',
        marginHorizontal: 16
    },
    addSaleButton: {
        borderRadius: 15,
        backgroundColor: '#95E5FF',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addSaleButtonText: {
        fontFamily: 'CambriaBold',
        fontSize: 24,
        color: '#fff'
    },
    noDataText: {
        fontFamily: 'Cambria',
        fontSize: '24@ms',
        color: '#BDBDBD',
        textAlign: 'center',
        marginTop: '100%',
        marginBottom: '90%'
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
    buttonContainer: {
        width: '100%',
        position: 'absolute',
        zIndex: 100,
        bottom: 24,
        paddingHorizontal: 24
    }
});

export default styles;