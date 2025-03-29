import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        paddingHorizontal: 24
    },
    titleContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontFamily: 'Cambria'
    },
    photoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    photo: {
        width: 70,
        height: 70,
        borderRadius: 100,
        borderWidth: 1
    },
    addPhoto: {
        position: 'absolute',
        width: 25,
        height: 25,
        backgroundColor: '#FFF',
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: '#BDBDBD',
        borderBottomWidth: 0.5
    },
    firstInfo: {
        fontFamily: 'Cambria',
        fontSize: 20
    },
    secondInfo: {
        fontFamily: 'Cambria',
        fontSize: 20,
        color: '#BDBDBD'
    },
    field: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10
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
        left: 10
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
        zIndex: 200,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.25)'
    },
    containerChoiseImage: {
        position: 'absolute',
        zIndex: 300,
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
        fontSize: 28,
        color: '#95E5FF'
    },
    saveButton: {
        backgroundColor: '#95E5FF',
        width: '100%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: 150
    },
    saveButtonText: {
        fontFamily: 'CambriaBold',
        fontSize: 24,
        color: '#FFF',
    },

});

export default styles;