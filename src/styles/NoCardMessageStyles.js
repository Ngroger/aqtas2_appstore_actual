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
        padding: 14
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 24
    },
    subtitle: {
        fontFamily: 'Cambria',
        fontSize: 24,
        color: '#BDBDBD',
        width: 250,
        marginTop: 10
    },
    addCard: {
        width: '100%',
        padding: 10,
        backgroundColor: '#26CFFF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    addCardText: {
        fontFamily: 'CambriaBold',
        fontSize: 24,
        color: '#FFF'
    }
});

export default styles;