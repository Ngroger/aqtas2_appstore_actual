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
        marginTop: 10
    },
    title: {
        fontSize: 28,
        fontFamily: 'Cambria'
    },
    button: {
        borderWidth: 1,
        borderColor: '#95E5FF',
        padding: 12,
        marginTop: 16,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Cambria',
        fontSize: 20
    },
});

export default styles;