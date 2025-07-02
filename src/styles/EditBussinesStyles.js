import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
    },
    photoContainer: {
        width: '100%',
        height: 200,
        borderRadius: 15,
        borderColor: '#26CFFF',
        borderWidth: 1,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageShop: {
        width: '100%',
        height: '100%',
        borderRadius: 15
    },
    pickPhotoBtn: {
        width: 50,
        height: 50,
        backgroundColor: '#26CFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1000,
        position: 'absolute',
        zIndex: 100
    },
    textLoad: {
        width: '85%',
        textAlign: 'center',
        justifyContent: 'center',
        color: '#141414',
        fontFamily: 'Cambria',
        fontSize: 20
    },
    titleContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: '36@msr'
    },
    title: {
        fontSize: 36,
        fontFamily: 'Cambria'
    },
    input: {
        borderWidth: 1,
        borderColor: '#26CFFF',
        width: '100%',
        padding: 10,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 15,
        marginTop: 5
    },
    value: {
        fontSize: 20,
        fontFamily: 'Cambria',
        color: 'rgba(0, 0, 0, 0.5)'
    },
    titleInput: {
        left: 10,
        fontFamily: 'Cambria',
        fontSize: 20,
    },
    infoContainer: {
        marginTop: 6
    },
    firstInfo: {
        fontFamily: 'Cambria',
        fontSize: 18,
        marginTop: 6
    },
    secondInfo: {
        fontFamily: 'Cambria',
        fontSize: 20,
        color: '#BDBDBD',
        width: '85%'
    },
    field: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#26CFFF',
        padding: 12,
        paddingHorizontal: 18,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 6
    },
    fieldTitle: {
        fontFamily: 'Cambria',
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 18,
        backgroundColor: '#FFF',
        padding: 2,
        paddingHorizontal: 9,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1000,
        top: -14,
        left: 12
    },
    input: {
        fontFamily: 'Cambria',
        color: '#BDBDBD',
        fontSize: 20,
        left: 10,
    },
    error: {
        fontFamily: 'Cambria',
        fontSize: 16,
        color: '#FF0000',
        alignItems: 'center',
        left: '20%',
        right: '20%'
    },
    background: {
        position: 'absolute',
        zIndex: 100,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.25)'
    },
    containerChoiseImage: {
        position: 'absolute',
        zIndex: 200,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#FFF',
        bottom: 0,
        width: '100%',
        padding: 10,
    },
    buttonChoiseImage: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    buttonChoiseImageText: {
        fontFamily: 'Cambria',
        fontSize: 24,
        color: '#26CFFF'
    },
    saveButton: {
        backgroundColor: '#26CFFF',
        width: '100%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    saveButtonText: {
        fontFamily: 'CambriaBold',
        fontSize: 24,
        color: '#FFF',
    },
    loadingIndicatorContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        width: '100%',
        padding: 20
    }
});

export default styles;