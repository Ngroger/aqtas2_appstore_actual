import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        paddingHorizontal: 20
    },
    titleContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 36,
        fontFamily: 'Cambria'
    },
    containerMessage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    message: {
        flexDirection: 'row',
        display: 'flex',
    },
    messageText: {
        fontFamily: 'Cambria',
        fontSize: 24,
        color: '#BDBDBD',
        width: 250,
        textAlign: 'center'
    },
    infoContainer: {
        height: 30,
        width: 30,
        borderRadius: 6,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    myBalance: {
        fontSize: 24,
        color: '#141414',
        fontFamily: 'CambriaBold'
    },
    buttonContainer: {
        width: '100%',
        padding: 20,
        position: 'absolute',
        zIndex: 100,
        bottom: 0
    },
    button: {
        width: '100%',
        padding: 20,
        backgroundColor: '#95E5FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF',
        fontFamily: 'CambriaBold'
    }
});

export default styles;