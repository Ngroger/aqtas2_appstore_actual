import { StyleSheet } from 'react-native';

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
        marginTop: 10
    },
    title: {
        fontSize: 28,
        fontFamily: 'Cambria'
    },
    topic: {
        borderWidth: 1,
        borderColor: '#26CFFF',
        padding: 12,
        alignContent: 'center',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16
    },
    topicText: {
        fontFamily: 'Cambria',
        fontSize: 20,
    }
});

export default styles;