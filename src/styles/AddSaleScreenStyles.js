import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF'
    },
    titleContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontFamily: 'Cambria'
    },
    photoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 10
    },
    photoTitle: {
        fontFamily: 'Cambria',
        fontSize: 18
    },
    photoPick: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: "#95E5FF",
        borderRadius: 15,
        borderStyle: 'dashed',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photoPickButton: {
        backgroundColor: 'rgba(149, 229, 255, 0.25)',
        borderRadius: 100,
        padding: 10,
        position: 'absolute',
        zIndex: 100
    },
    titleField: {
        fontFamily: 'Cambria',
        left: 10,
        fontSize: 18
    },
    field: {
        borderWidth: 1,
        borderColor: '#95E5FF',
        borderRadius: 15,
        padding: 10,
        paddingHorizontal: 20,
        marginTop: 2
    },
    errorField: {
        borderWidth: 1,
        borderColor: '#FF0000',
        borderRadius: 15,
        padding: 10,
        paddingHorizontal: 20,
        marginTop: 2
    },
    input: {
        fontFamily: 'Cambria',
        fontSize: 18,
        color: 'rgba(0, 0, 0, 0.5)'
    },
    addSaleButton: {
        borderRadius: 15,
        backgroundColor: '#95E5FF',
        padding: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addSaleButtonText: {
        fontFamily: 'CambriaBold',
        fontSize: 24,
        color: '#fff'
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
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: '#FFF',
        bottom: 0,
        width: '100%',
        padding: 16,
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
    error: {
        fontFamily: 'Cambria',
        fontSize: 18,
        color: '#FF0000',
        textAlign: 'center'
    },
    buttonContainer: {
        width: '100%',
        position: 'absolute',
        zIndex: 100,
        bottom: 24,
        paddingHorizontal: 24
    }
});

export default styles;