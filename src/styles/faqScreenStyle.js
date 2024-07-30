import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        padding: 30
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
        borderColor: '#95E5FF',
        padding: 12,
        alignContent: 'center',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24
    },
    topicText: {
        fontFamily: 'Cambria',
        fontSize: 20,
    }
});

export default styles;