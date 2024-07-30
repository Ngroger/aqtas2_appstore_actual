import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    container: {
        backgroundColor: '#FFF',
        position: 'absolute',
        padding: 16,
        borderRadius: 15,
        zIndex: 100,
    },
    navbar: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        borderBottomColor: '#BDBDBD',
        borderBottomWidth: 1,
    },
    title: {
        fontFamily: 'CambriaBold',
        fontSize: 20,
        paddingBottom: 10,
        marginLeft: 10,
    },
    reason: {
        fontFamily: 'Cambria',
        fontSize: 18,
        width: 200,
        marginLeft: 10
    },
    reasonContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        marginTop: 10
    },
    checkbox: {
        height: 25,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 5
    },
    activeCheckbox: {
        height: 25,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#95E5FF'
    },
    dot: {
        padding: 6,
        backgroundColor: '#95E5FF',
        borderRadius: 100
    },
    deleteButton: {
        borderRadius: 15,
        backgroundColor: '#95E5FF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 20
    },
    deleteButtonText: {
        fontFamily: 'CambriaBold',
        color: '#FFF',
        fontSize: 18
    }
});

export default styles;