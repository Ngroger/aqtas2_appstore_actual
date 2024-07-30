import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#FFF',
        padding: 10,
        width: '80%',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        paddingHorizontal: 20,
        elevation: 10,
        borderRadius: 15
    },
    navbar: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 32,
        marginLeft: 5
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        margin: 10,
        fontSize: 24,
        fontFamily: 'Cambria',
        color: '#95E5FF',
        textAlign: 'center'
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    }
});

export default styles;