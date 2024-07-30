import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        position: 'absolute',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        position: 'absolute',
        zIndex: 1000,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 250
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 20,
        marginHorizontal: 10
    },
    navbar: {
        borderBottomColor: '#BDBDBD',
        borderBottomWidth: 1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    description: {
        fontFamily: 'Cambria',
        color: '#BDBDBD',
        fontSize: 18,
        width: 250,
        paddingHorizontal: 20
    },
    firstInfo: {
        fontFamily: 'Cambria',
        fontSize: 18
    },
    secondInfo: {
        fontFamily: 'Cambria',
        fontSize: 18,
        color: '#BDBDBD',
        textAlign: 'right'
    },
    status: {
        backgroundColor: '#fff',
        width: 20,
        height: 20,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;