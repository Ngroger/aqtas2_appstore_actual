import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        zIndex: 1000,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: '#fff',
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        paddingHorizontal: 20,
        elevation: 10,
        position: 'absolute',
        zIndex: 10000,
        borderRadius: 16
    },
    navbar: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 24,
        marginLeft: 10
    },
    button: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2
    },
    buttonText: {
        fontFamily: 'CambriaBold',
        fontSize: 24,
        color: '#26CFFF'
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#BDBDBD',
        marginVertical: 5
    }
});

export default styles;