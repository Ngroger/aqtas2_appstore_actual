import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: '#fff',
        width: '90%',
        padding: 16,
        borderRadius: 16
    },
    navbar: {
        borderBottomColor: '#BDBDBD',
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    title: {
        fontFamily: 'Cambria',
        color: '#000',
        fontSize: 24
    },
    subtitle: {
        fontFamily: 'Cambria',
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 16
    },
    field: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#95E5FF',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
        padding: 10
    },
    titleField: {
        backgroundColor: '#FFF',
        padding: 2,
        paddingHorizontal: 6,
        color: '#95E5FF',
        position: 'absolute',
        zIndex: 100,
        top: -10,
        left: 10
    },
    input: {
        fontFamily: 'Cambria',
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 18
    },
    currency: {
        borderLeftColor: '#95E5FF',
        borderLeftWidth: 1,
        fontFamily: 'Cambria',
        paddingLeft: 10,
        fontSize: 20,
        color: '#95E5FF'
    },
    buttonContainer: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
    },
    saveButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: '48%',
        backgroundColor: '#95E5FF',
        borderRadius: 100

    },
    saveButtonText: {
        fontFamily: 'CambriaBold',
        fontSize: 20,
        color: '#fff'
    },
    cancelButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: '48%',
        borderWidth: 1,
        borderColor: '#95E5FF',
        borderRadius: 100

    },
    cancelButtonText: {
        fontFamily: 'CambriaBold',
        fontSize: 20,
        color: '#95E5FF'
    },
    fieldContainer: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    error: {
        fontFamily: 'Cambria',
        color: '#FF0000',
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 6
    }
});

export default styles;