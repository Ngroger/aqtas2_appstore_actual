import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.25)'
    },
    container: {
        backgroundColor: '#FFF',
        shadowColor: "#000",
        position: 'absolute',
        zIndex: 1100,
        borderRadius: 24,
        paddingHorizontal: 20,
        padding: 14,
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 24,
        width: 200
    },
    subtitle: {
        fontFamily: 'Cambria',
        fontSize: 20,
        color: '#BDBDBD',
        width: 200,
        marginTop: 10
    },
    loadContainer: {
        width: '100%',
        backgroundColor: 'rgba(149, 229, 255, 0.25)',
        marginTop: 10,
        borderRadius: 100,
        height: 5,
        justifyContent: 'center'
    },
    load: {
        backgroundColor: '#26CFFF',
        marginTop: 10,
        borderRadius: 100,
        position: 'absolute',
        zIndex: 1200,
        height: 5
    }
});

export default styles;