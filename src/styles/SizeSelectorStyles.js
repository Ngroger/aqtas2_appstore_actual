import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        position: 'absolute',
        zIndex: 1000
    },
    container: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        width: '100%',
        padding: 12,
        position: 'absolute',
        zIndex: 1100,
        bottom: 0
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 24,
        marginLeft: 10
    },
    navbar: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center'
    },
    sizeContainer: {
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
    },
    size: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        marginLeft: 10,
        marginTop: 10
    },
    sizeText: {
        fontFamily: 'Cambria',
        fontSize: 24,
        color: '#BDBDBD'
    }
});

export default styles;