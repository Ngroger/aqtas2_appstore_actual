import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logotype: {
        width: 250,
        height: 150,
        objectFit: 'contain'
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 28,
        textAlign: 'center',
        color: '#26CFFF'
    },
    subtitle: {
        fontFamily: 'Cambria',
        fontSize: 24,
        textAlign: 'center',
        color: '#FFF'
    },
    button: {
        marginTop: 24,
        width: 48,
        height: 48,
        borderRadius: 100,
        backgroundColor: 'rgba(149, 229, 255, 0.10)',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;