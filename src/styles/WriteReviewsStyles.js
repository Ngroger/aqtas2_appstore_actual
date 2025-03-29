import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        position: 'absolute',
        zIndex: 100,
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
    title: {
        fontFamily: 'Cambria',
        fontSize: 28,
    },
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
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
        fontSize: 24
    },
    secondInfo: {
        fontFamily: 'Cambria',
        fontSize: 24,
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
    },
    imageContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    image: {
        width: 100,
        height: 100,
        borderWidth: 3,
        borderColor: "#95E5FF",
        borderRadius: 15,
        borderStyle: 'dashed',
        marginHorizontal: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addPhotoButton: {
        backgroundColor: 'rgba(149, 229, 255, 0.20)',
        borderRadius: 100,
        width: 50,
        height: 50,
        left: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    starsContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    reviewContainer: {
        borderWidth: 1,
        borderColor: '#95E5FF',
        marginTop: 10,
        borderRadius: 15,
        marginBottom: 10
    },
    input: {
        fontFamily: 'Cambria',
        fontSize: 20,

        margin: 16,
        width: 300
    },
    titleInput: {
        backgroundColor: '#fff',
        paddingHorizontal: 6,
        padding: 2,
        position: 'absolute',
        zIndex: 1000,
        fontFamily: 'Cambria',
        color: '#95E5FF',
        fontSize: 18,
        top: -12,
        left: 20
    },
    publicButton: {
        backgroundColor: '#95E5FF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 15,
        marginBottom: 20,
        marginTop: 10
    },
    publicButtonText: {
        fontFamily: 'CambriaBold',
        fontSize: 24,
        color: '#fff'
    },
    backgroundContainer: {
        position: 'absolute',
        zIndex: 1000,
        width: '100%',
        height: '100%',
    },
    containerChoiseImage: {
        position: 'absolute',
        zIndex: 2000,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: '#FFF',
        bottom: 0,
        width: '100%',
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,

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
    deleteImage: {
        backgroundColor: 'rgba(149, 229, 255, 0.35)',
        borderRadius: 100,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10000
    },
    error: {
        color: '#ff0000',
        fontFamily: 'Cambria',
        fontSize: '14@s',
        textAlign: 'center'
    }
});

export default styles;