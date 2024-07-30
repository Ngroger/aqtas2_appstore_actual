import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 10,
        position: 'absolute',
        zIndex: 1100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    navbar: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 24,
        marginLeft: 10
    },
    cardContainer: {
        flexDirection: 'row',
        display: 'flex',
        padding: 10,
        alignItems: 'center'
    },
    miniBankIcon: {
        width: 45,
        height: 27,
        borderRadius: 5
    },
    number: {
        fontFamily: 'Cambria',
        fontSize: 28,
        left: 10
    },
});

export default styles;