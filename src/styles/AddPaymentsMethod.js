import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        padding: 20
    }, 
    titleContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        padding: 10
    },
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 32
    },
    card: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        marginTop: 20
    },
    unavailable: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
        position: 'absolute',
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    }
});

export default styles;