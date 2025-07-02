import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
    },
    container: {
        backgroundColor: '#FFF',
        shadowColor: "#000",
        position: 'absolute',
        zIndex: 1100,
        borderRadius: 24,
        paddingHorizontal: 20,
        padding: 14,
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 24,
        width: 200
    },
    subtitle: {
        fontFamily: 'Cambria',
        fontSize: 20,
        color: '#BDBDBD',
        width: 250,
        marginTop: 10
    },
    button: {
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: '#26CFFF',
        marginTop: 10
    },
    buttonText: {
        fontFamily: 'CambriaBold',
        fontSize: 20,
        color: '#fff'
    }
});

export default styles;