import { StyleSheet } from "react-native";

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
        marginTop: 10,
        margin: 10
    },
    title: {
        fontSize: 32,
        fontFamily: 'Cambria'
    },
    order: {
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 15,
        position: 'relative',
    },
    orderImage: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    infoContainer: {
        flexDirection: 'row',
        display: 'flex',
    },
    nameOrder: {
        fontFamily: 'Cambria',
        fontSize: 16
    },
    infoOrder: {
        fontFamily: 'Cambria',
        fontSize: 16,
        color: '#BDBDBD'
    },
    productAvailability: {
        borderTopColor: '#BDBDBD',
        borderTopWidth: 1,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    quenstion: {
        fontFamily: 'CambriaBold',
        marginTop: 10,
        fontSize: 16
    },
    answer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5
    },
    yes: {
        fontFamily: 'CambriaBold',
        fontSize: 24,
        color: '#00FF38'
    },
    no: {
        fontFamily: 'CambriaBold',
        fontSize: 24,
        color: '#FF0000'
    },
    line: {
        height: '100%',
        width: 1,
        backgroundColor: '#000',
        marginHorizontal: 10
    },
    time: {
        fontFamily: 'Cambria',
        fontSize: 16,
        textAlign: 'center',
        width: 200,
        color: 'rgba(0, 0, 0, 0.25)'
    },
    deleteBackground: {
        backgroundColor: '#rgba(255, 104, 107, 0.7)',
        width: '100%',
        height: '100%',
        borderRadius: 25,
        position: 'absolute',
        zIndex: 1000,
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteContainer: {
        position: 'absolute',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'row',
    },
    noDataText: {
        fontFamily: 'Cambria',
        fontSize: 24,
        color: '#BDBDBD',
        marginLeft: '20%',
        marginRight: '20%',
        marginTop: '100%'
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
});

export default styles;