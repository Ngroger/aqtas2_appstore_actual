import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%'
    },
    productPreview: {
        width: '160@ms',
        height: '160@ms',
        borderRadius: 15
    },
    card: {
        flexDirection: 'row',
        paddingVertical: 16,
        borderBottomColor: '#BDBDBD',
        borderBottomWidth: 1,
        width: '100%',
    },
    costContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    counterContainer: {
        flexDirection: 'row',
        backgroundColor: '#26CFFF',
        padding: '2@msr',
        paddingHorizontal: '12@msr',
        borderRadius: 100,
        alignItems: 'center'
    },
    counterButtonText: {
        fontSize: '24@ms',
        color: '#fff',
        fontFamily: 'Cambria'
    },
    count: {
        fontSize: '20@ms',
        color: '#fff',
        fontFamily: 'Cambria',
        marginHorizontal: '10@msr'
    },
    buttonBuy: {
        flexDirection: 'row',
        borderColor: '#26CFFF',
        borderWidth: 1,
        padding: '2@msr',
        paddingHorizontal: '10@msr',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    textBuy: {
        fontFamily: 'CambriaBold',
        color: '#26CFFF',
        fontSize: '18@ms'
    },
    cost: {
        fontFamily: 'Cambria',
        fontSize: '20@ms',
        color: '#26CFFF'
    },
    oldCost: {
        fontFamily: 'Cambria',
        fontSize: '16@ms',
        color: '#BDBDBD',
        marginLeft: 6,
        textDecorationLine: 'line-through',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },
    firstInfo: {
        fontFamily: 'Cambria',
        fontSize: '14@ms',
        margin: 2,
    },
    secondInfo: {
        fontFamily: 'Cambria',
        fontSize: '14@ms',
        margin: 2,
        color: '#BDBDBD',
        textAlign: 'right',
    },
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '24@msr',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: '32@mvs'
    },
    totalCost: {
        fontFamily: 'Cambria',
        fontSize: '18@mvs',
        color: '#BDBDBD',
        marginLeft: 10
    },
    checkbox: {
        borderWidth: 2,
        borderRadius: '5@mvs',
        width: '20@ms',
        height: '20@ms',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedCheckbox: {
        borderWidth: 2,
        borderColor: '#26CFFF',
        borderRadius: 5,
        width: '20@ms',
        height: '20@ms',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot: {
        backgroundColor: '#26CFFF',
        width: '12@ms',
        height: '12@ms',
        borderRadius: 100
    },
    noDataText: {
        fontFamily: 'Cambria',
        fontSize: 24,
        color: '#BDBDBD',
        textAlign: 'center'
    },
    buttonContainer: {
        width: '100%',
        padding: 20,
        position: 'absolute',
        zIndex: 100,
        bottom: 0
    },
    orderBtn: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#26CFFF',
        borderRadius: 12
    },
    orderBtnTxt: {
        fontSize: '18@s',
        color: '#FFF',
        fontFamily: 'CambriaBold'
    }
});

export default styles;
