import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 100
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
        elevation: 10,
        position: 'absolute',
        zIndex: 10000,
        borderRadius: 16,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 18,
        color: 'rgba(0, 0, 0, 0.5)',
        width: 230,
        textAlign: 'center',
        marginLeft: 10
    },
    root: {flex: 1, padding: 20},
    codeFieldRoot: {marginTop: 20},
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        borderRadius: 10,
        marginHorizontal: 5
    },
    focusCell: {
        borderColor: '#95E5FF',
    },
    time: {
        color: 'rgba(0, 0, 0, 0.3)',
        fontFamily: 'Cambria',
        marginTop: 10,
        marginBottom: 10
    },
    buttonConfrim: {
        backgroundColor: '#95E5FF',
        borderRadius: 15,
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontFamily: 'CambriaBold',
        fontSize: 20
    },
    navbar: {
        flexDirection: 'row',
        display: 'flex'
    }
});

export default styles;