import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        padding: 20
    },
    titleContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 28,
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
    }
});

export default styles;