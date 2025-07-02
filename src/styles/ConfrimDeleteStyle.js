import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        position: 'absolute',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        position: 'absolute',
        zIndex: 1000,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 250
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 24,
        marginHorizontal: 10,
        textAlign: 'center'
    },
    button: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2
    },
    buttonText: {
        color: '#26CFFF',
        fontFamily: 'CambriaBold',
        fontSize: 28
    },
});

export default styles;