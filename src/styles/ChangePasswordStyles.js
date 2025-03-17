import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
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
    field: {
        borderWidth: 1,
        borderColor: '#95E5FF',
        padding: 12,
        borderRadius: 15,
        marginTop: 24
    },
    fieldTitle: {
        backgroundColor: '#FFF',
        fontFamily: 'Cambria',
        fontSize: 18,
        padding: 2,
        paddingHorizontal: 9,
        position: 'absolute',
        zIndex: 1000,
        top: -16,
        left: 10,
        color: '#95E5FF'
    },
    input: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'Cambria',
        fontSize: 20,
        marginLeft: 6
    },
    saveButton: {
        backgroundColor: '#95E5FF',
        borderRadius: 15,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    saveButtonText: {
        color: '#FFF',
        fontFamily: 'CambriaBold',
        fontSize: 20
    },
    error: {
        textAlign: 'center',
        fontFamily: 'Cambria',
        color: '#FF0000',
        marginTop: 12,
        fontSize: '8@s'
    }
});

export default styles;