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
        width: 350,
        height: 250
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 32,
        textAlign: 'center',
        color: '#95E5FF'
    },
    subtitle: {
        fontFamily: 'Cambria',
        fontSize: 24,
        textAlign: 'center',
        color: '#FFF'
    },
    button: {
        marginTop: 150,
        width: 64,
        height: 64,
        borderRadius: 100,
        backgroundColor: 'rgba(149, 229, 255, 0.10)',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;