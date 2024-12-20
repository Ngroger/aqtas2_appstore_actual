import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        padding: 24
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
    accordion: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#95E5FF',
        padding: 12,
        alignItems: 'center',
        borderRadius: 15,
    },
    openAccordion: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#95E5FF',
        padding: 12,
        alignItems: 'center',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    accordionText: {
        fontFamily: 'Cambria',
        fontSize: 20,
        width: '90%'
    },
    description: {
        borderColor: '#BDBDBD',
        borderWidth: 1,
        padding: 12,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopWidth: 0
    }
});

export default styles;