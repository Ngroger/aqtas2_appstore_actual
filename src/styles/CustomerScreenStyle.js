import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#FFF',
        paddingHorizontal: 20
    },
    titleContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        marginBottom: 8
    },
    title: {
        fontSize: 36,
        fontFamily: 'Cambria'
    },
    fieldTitle: {
        fontFamily: 'Cambria',
        fontSize: 20,
        marginLeft: 10
    },
    field: {
        borderWidth: 1,
        borderColor: '#95E5FF',
        borderRadius: 15,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 14
    },
    input: {
        fontFamily: 'Cambria',
        fontSize: 20,
        color: 'rgba(0, 0, 0, 0.5)',
    },
    activeFieldTitle: {
        fontFamily: 'Cambria',
        fontSize: 18,
        padding: 2,
        backgroundColor: '#FFF',
        color: '#95E5FF',
        paddingHorizontal: 6,
        position: 'absolute',
        zIndex: 1000,
        top: -14,
        left: 12,
    },
    errorFieldTitle: {
        fontFamily: 'Cambria',
        fontSize: 18,
        padding: 2,
        backgroundColor: '#FFF',
        color: '#FF0000',
        paddingHorizontal: 6,
        position: 'absolute',
        zIndex: 1000,
        top: -14,
        left: 12
    },
    error: {
        fontFamily: 'Cambria',
        fontSize: 18,
        color: '#FF0000',
        textAlign: 'center',
    },
    errorField: {
        borderWidth: 1,
        borderColor: '#FF0000',
        borderRadius: 15,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    errorIcon: {
        borderRadius: 100,
        padding: 2,
        backgroundColor: '#FF0000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    createButton: {
        backgroundColor: '#95E5FF',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 14,
    },
    createButtonText: {
        fontFamily: 'CambriaBold',
        fontSize: 24,
        color: '#FFF'
    },
    photoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    photoBorder: {
        borderWidth: 2,
        borderColor: '#95E5FF',
        borderStyle: 'dashed',
        borderRadius: 15,
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photo: {
        width: '100%',
        height: '100%',
        borderRadius: 15
    },
    photoButton: {
        backgroundColor: 'rgba(149, 229, 255, 0.5)',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        position: 'absolute',
        zIndex: 100
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
        color: '#95E5FF'
    },
});

export default styles;