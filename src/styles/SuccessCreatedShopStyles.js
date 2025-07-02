import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#rgba(0, 0, 0, 0.1)'
    },
    container: {
        backgroundColor: '#FFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 6,
        position: 'absolute',
        zIndex: 110,
        borderRadius: 16,
        paddingHorizontal: 14,
        padding: 14
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 24,
        width: 250,

    },
    subtitle: {
        fontFamily: 'Cambria',
        fontSize: 24,
        width: 200,
        color: '#BDBDBD',
        marginTop: 20,
    },
    nextButton: {
        backgroundColor: '#26CFFF',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 16,
        marginTop: 20
    },
    nextButtonText: {
        fontFamily: 'CambriaBold',
        fontSize: 24,
        color: '#FFF'
    },
    checkboxContainer: {
        flexDirection: 'row',
        display: 'flex',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkbox: {
        borderWidth: 2,
        borderColor: '#26CFFF',
        borderRadius: 7,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkboxText: {
        fontFamily: 'Cambria',
        fontSize: 20,
        width: 250,
        marginLeft: 10
    },
    dot: {
        borderRadius: 100,
        backgroundColor: '#26CFFF',
        width: 12,
        height: 12
    }
});

export default styles;