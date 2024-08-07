import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
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
        fontSize: '28@ms',
        fontFamily: 'Cambria'
    },
    button: {
        borderWidth: 1,
        borderColor: '#95E5FF',
        padding: '12@msr',
        marginTop: 16,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Cambria',
        fontSize: '20@ms'
    },
});

export default styles;