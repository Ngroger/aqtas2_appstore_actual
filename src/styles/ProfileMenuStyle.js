import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 100,
    },
    goBack: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 101,
    },
    addCardContainer: {
        position: 'absolute',
        padding: 10,
        width: 130,
        zIndex: 1000,
        backgroundColor: '#fff',
        top: 50,
        right: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    exitButton: {
        fontFamily: 'Cambria',
        textAlign: 'center',
        fontSize: 24
    },
    deleteButton: {
        fontFamily: 'Cambria',
        textAlign: 'center',
        fontSize: 24,
        color: '#FF0000'
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#BDBDBD',
        marginVertical: 5
    }
});

export default styles;