import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        padding: 20
    }, 
    titleContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        padding: 10
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
        alignItems: 'center'
    },
    counterContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#95E5FF',
        padding: 4,
        paddingHorizontal: 12,
        borderRadius: 100,
        alignItems: 'center'
    },
    counterButtonText: {
        fontSize: 28,
        color: '#fff',
        fontFamily: 'Cambria'
    },
    count: {
        fontSize: 24,
        color: '#fff',
        fontFamily: 'Cambria',
        marginRight: 10,
        marginLeft: 10
    },
    buttonBuy: {
        display: 'flex',
        flexDirection: 'row',
        borderColor: '#95E5FF',
        borderWidth: 1,
        padding: 4,
        paddingHorizontal: 20,
        borderRadius: 100,
        alignItems: 'center',
        left: 10
    },
    textBuy: {
        fontFamily: 'CambriaBold',
        color: '#95E5FF',
        fontSize: 18
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
    totalCost: {
        fontFamily: 'Cambria',
        fontSize: 18,
        color: '#BDBDBD',
        left: 10
    },
    data: {
        fontFamily: 'Cambria',
        fontSize: 28,
        color: '#BDBDBD',
        top: 10
    },
    noDataText: {
        fontFamily: 'Cambria',
        fontSize: 24,
        color: '#BDBDBD',
        textAlign: 'center',
        marginTop: '100%',
        marginBottom: '100%'
    }
});

export default styles;