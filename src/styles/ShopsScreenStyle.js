import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    logo: {
        width: '110@ms',
        height: "30@ms"
    },
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: '42@msr'
    },
    search: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#95E5FF',
        padding: '6@ms',
        borderRadius: 10,
        marginLeft: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    serchInput: {
        fontFamily: 'Cambria',
        left: 3,
        width: '95%',
        fontSize: '14@ms'
    },
    categories: {
        paddingVertical: 16,
    },
    categoriesContainer: {
        width: '100%',
        borderBottomColor: '#BDBDBD',
        borderBottomWidth: 1,
        paddingHorizontal: 20
    },
    categoryActive: {
        backgroundColor: '#95E5FF',
        padding: '8@ms',
        borderRadius: 100,
        paddingHorizontal: 16,
        marginHorizontal: 5

    },
    categoryTextActive: {
        fontFamily: 'CambriaBold',
        fontSize: '18@mvs',
        color: '#fff'
    },

    category: {
        borderColor: '#95E5FF',
        borderWidth: 1,
        padding: '8@ms',
        borderRadius: 100,
        paddingHorizontal: 16,
        marginHorizontal: 5
    },
    categoryText: {
        fontFamily: 'CambriaBold',
        fontSize: '18@mvs',
        color: '#95E5FF'
    },
    image: {
        width: '170@ms',
        height: '125@ms',
        borderRadius: 15
    },
    shopCart: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: '#BDBDBD',
        borderBottomWidth: 1,
        paddingVertical: 20
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '2@s'
    },
    firstInfo: {
        fontFamily: 'Cambria',
        fontSize: '16@ms0.3',
        margin: 2,
    },
    secondInfo: {
        fontFamily: 'Cambria',
        fontSize: '16@ms0.3',
        margin: 2,
        color: '#BDBDBD',
    },
    mapsButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapsText: {
        fontFamily: 'Cambria',
        textAlign: 'center',
        marginTop: 6,
        color: '#95E5FF',
        fontSize: '16@ms0.3'
    },
    loadingIndicatorContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLoad: {
        fontFamily: 'Cambria',
        fontSize: 16,
        marginTop: 10,
        color: '#BDBDBD'
    },
    noDataText: {
        fontFamily: 'Cambria',
        fontSize: 18,
        color: '#BDBDBD',
        textAlign: 'center',
        marginTop: '100%',
        marginBottom: '100%'
    }
});

export default styles;