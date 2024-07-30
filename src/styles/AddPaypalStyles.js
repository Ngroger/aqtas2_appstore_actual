import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1000
    },
    container: {
        backgroundColor: '#FFF',
        padding: 6,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        paddingHorizontal: 10
    },
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 30,
        marginLeft: 6
    },
    infoContainer: {
        backgroundColor: '#fff',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    form: {
        width: 'auto',
        margin: 5,
        borderWidth: 2,
        borderColor: '#95E5FF',
        borderRadius: 16,
        padding: 8,
        paddingHorizontal: 14,
        marginTop: 12
    },
    formTitle: {
        backgroundColor: '#FFF',
        position: 'absolute',
        zIndex: 1000,
        marginTop: -13,
        left: 10,
        fontFamily: 'Cambria',
        fontSize: 20,
        color: '#95E5FF',
        paddingHorizontal: 6
    },
    formInput: {
        fontSize: 24,
        width: 200,
        color: '#BDBDBD',
        fontFamily: 'Cambria'
    },
    link: {
        textAlign: 'center',
        fontFamily: 'Cambria',
        fontSize: 18,
        marginTop: 4,
    },
    buttonContainer: {
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        display: 'flex'
    },
    addPayPal: {
        width: 'auto',
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#95E5FF',
        margin: 5,
        borderRadius: 16,
        marginTop: 10
    },
    addPayPalText: {
        color: '#FFF',
        fontFamily: 'Cambria',
        fontSize: 24
    }
});

export default styles;