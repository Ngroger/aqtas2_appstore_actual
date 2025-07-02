import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10000
    },
    container: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        padding: 6,
        paddingHorizontal: 14
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 28,
    },
    text: {
        fontFamily: 'Cambria',
        fontSize: 18,
        width: 200,
        marginTop: 6,
        color: '#BDBDBD'
    },
    button: {
        width: 'auto',
        backgroundColor: '#26CFFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6,
        marginTop: 6,
        borderRadius: 16
    },
    buttonText: {
        fontFamily: 'Cambria',
        fontSize: 24,
        color: '#FFF'
    }
});

export default styles;