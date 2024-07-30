import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        width: '100%',
        height: '100%'
    },
    titleContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: 24
    },
    title: {
        fontSize: 32,
        fontFamily: 'Cambria'
    },
    field: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#95E5FF',
        padding: 10,
        paddingHorizontal: 20,
        marginTop: 20
    },
    fieldTitle: {
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 100,
        top: -10,
        left: 10,
        paddingHorizontal: 6,
        fontFamily: 'Cambria',
        color: '#95E5FF'
    },
    input: {
        fontFamily: 'Cambria',
        fontSize: 18,
        width: 220
    },
    cardImage: {
        width: 42,
        height: 28
    },
    fields: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    fieldDate: {
        width: '100%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#95E5FF',
        padding: 10,
        paddingHorizontal: 20,
        marginTop: 20
    },
    addCardButton: {
        borderWidth: 1,
        borderColor: '#95E5FF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 15,
        marginTop: 560
    },
    addCardText: {
        fontFamily: 'CambriaBold',
        fontSize: 24,
        color: '#95E5FF'
    },
    activAddCardButton: {
        backgroundColor: '#95E5FF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 15
    },
    activeAddCardText: {
        fontFamily: 'CambriaBold',
        fontSize: 24,
        color: '#fff'
    },
    errorMessage: {
        fontFamily: 'CambriaBold',
        fontSize: 18,
        color: '#FF0000',
        textAlign: 'center'
    },
    buttonContainer: {
        width: '100%',
        position: 'absolute',
        zIndex: 100,
        bottom: 0,
        padding: 24
    }
});

export default styles;