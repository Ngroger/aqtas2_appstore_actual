import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        paddingHorizontal: 20
    },
    titleContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        fontSize: 36,
        fontFamily: 'Cambria'
    },
    filters: {
        flexDirection: 'row',
        display: 'flex',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#BDBDBD'
    },
    activeFilter: {
        backgroundColor: '#95E5FF',
        padding: 8,
        paddingHorizontal: 10,
        borderRadius: 100,
        marginHorizontal: 5
    },
    activeFilterText: {
        fontFamily: 'CambriaBold',
        color: '#fff',
        fontSize: 18
    },
    filter: {
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#95E5FF',
        padding: 8,
        paddingHorizontal: 10,
        marginHorizontal: 5
    },
    filterText: {
        fontFamily: 'CambriaBold',
        color: '#95E5FF',
        fontSize: 18,
    },
    dataContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 4
    },
    financeCard: {
        display: 'flex',
        flexDirection: 'row',
        padding: 14,
        borderWidth: 1,
        borderColor: "#95E5FF",
        borderRadius: 15,
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    financeState: {
        fontFamily: 'Cambria',
        fontSize: 24
    },
    count: {
        fontFamily: 'Cambria',
        fontSize: 24
    },
    date: {
        color: '#BDBDBD',
        fontFamily: "Cambria",
        fontSize: 24,
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