import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1000
    },
    container: {
        position: 'absolute',
        padding: 10,
        width: '100%',
        zIndex: 1000,
        backgroundColor: '#fff',
        bottom: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    navbar: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        borderBottomColor: '#BDBDBD',
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 24,
        marginLeft: 5,
    },
    button: {
        padding: 10,
        flexDirection: 'row',
        display: 'flex',
        borderColor: '#26CFFF',
        borderWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 16,
        marginTop: 10
    },
    buttonText: {
        fontFamily: 'Cambria',
        fontSize: 20
    },
    currency: {
        fontFamily: 'Cambria',
        fontSize: 18,
        borderLeftColor: '#26CFFF',
        borderLeftWidth: 1,
        paddingLeft: 10,
        color: '#26CFFF'
    },
});

export default styles;