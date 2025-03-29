import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 100
    },
    container: {
        position: 'absolute',
        padding: 10,
        width: '100%',
        zIndex: 1000,
        backgroundColor: '#fff',
        bottom: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    navbar: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        borderBottomColor: '#BDBDBD',
        borderBottomWidth: 1,
        paddingBottom: 10,
        padding: 10
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 24,
        marginLeft: 5,
    },
    currency: {
        fontFamily: 'Cambria',
        fontSize: 18,
        borderLeftColor: '#95E5FF',
        borderLeftWidth: 1,
        paddingLeft: 10,
    },
    photoContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        display: 'flex',
        flexDirection: 'row'
    },
    photoPickFront: {
        width: '100%',
        height: '100%',
        borderRadius: 28,
    },
    photoPickContainer: {
        width: 200,
        height: 250,
        borderRadius: 28,
        marginTop: 30,
        marginHorizontal: 10,
        bottom: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photoPickButton: {
        backgroundColor: 'rgba(149, 229, 255, 0.35)',
        width: 45,
        height: 45,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 50
    },
    swiperContent: {
        alignItems: 'center', // Центрирование содержимого по горизонтали
    },
    field: {
        borderWidth: 1,
        borderColor: '#95E5FF',
        margin: 10,
        padding: 12,
        borderRadius: 15,
        paddingHorizontal: 20
    },
    titleInput: {
        backgroundColor: '#FFF',
        paddingHorizontal: 6,
        padding: 2,
        color: '#95E5FF',
        position: 'absolute',
        zIndex: 1000,
        top: -14,
        left: 12,
        fontFamily: 'Cambria',
        fontSize: 16
    },
    input: {
        fontFamily: 'Cambria',
        fontSize: 18,
        color: 'rgba(0, 0, 0, 0.5)'
    },
    publicButton: {
        backgroundColor: '#95E5FF',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        margin: 10
    },
    publicButtonText: {
        fontFamily: 'CambriaBold',
        fontSize: 24,
        color: '#FFF'
    },
    background: {
        position: 'absolute',
        zIndex: 1000,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.25)'
    },
    containerChoiseImage: {
        position: 'absolute',
        zIndex: 2000,
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
    deleteButton: {
        backgroundColor: '#95E5FF',
        borderRadius: 100,
        backgroundColor: 'rgba(149, 229, 255, 0.35)',
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    photoEmptyContainer: {
        borderWidth: 3,
        padding: 10,
        width: 200,
        height: 250,
        borderStyle: 'dashed',
        borderColor: '#95E5FF',
        borderRadius: 28
    },
    sizeContainer: {
        borderWidth: 1,
        borderColor: '#000',
        margin: 10,
        borderRadius: 15,
        flexWrap: 'wrap',
        borderStyle: 'dashed',
        flexDirection: 'row',
        padding: 10
    },
    size: {
        backgroundColor: '#fff',
        width: 40,
        height: 40,
        borderRadius: 10,
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
        margin: 5,

    },
    sizeInput: {
        fontFamily: 'Cambria',
        fontSize: 18,
        textAlign: 'center',
    },
    deleteSize: {
        position: 'absolute',
        zIndex: 1000,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;