import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        position: 'absolute',
        zIndex: 100,
    },
    addCardContainer: {
        position: 'absolute',
        padding: 10,
        width: '100%',
        zIndex: 1000,
        backgroundColor: '#fff',
        bottom: 0
    },
    cardTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleCard: {
        fontFamily: 'CambriaBold',
        fontSize: 18
    },
    visa: {
        width: 65,
        height: 20
    },
    addCardButton: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        padding: 10,
        borderBlockColor: '#BDBDBD',
        borderBottomWidth: 1
    },
    addCardButtonText: {
        fontFamily: 'Cambria',
        fontSize: 18,
        left: 10,
        color: '#BDBDBD'
    },
    cardContainer: {
        flexDirection: 'row',
        display: 'flex',
        padding: 10,
        borderBottomColor: '#BDBDBD',
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    miniBankIcon: {
        width: 45,
        height: 27,
        borderRadius: 5
    },
    number: {
        fontFamily: 'Cambria',
        fontSize: 24,
        left: 10
    },
    noCard: {
        fontFamily: 'Cambria',
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        color: '#BDBDBD'
    }
});

export default styles