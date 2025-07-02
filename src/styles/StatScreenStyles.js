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
        marginTop: 10
    },
    title: {
        fontSize: 28,
        fontFamily: 'Cambria'
    },
    categories: {
        paddingVertical: 16,

    },
    categoriesContainer: {
        width: '100%',
        borderBottomColor: '#BDBDBD',
        borderBottomWidth: 1,
    },
    categoryActive: {
        backgroundColor: '#26CFFF',
        padding: 8,
        borderRadius: 100,
        paddingHorizontal: 16,
        marginHorizontal: 5

    },
    categoryTextActive: {
        fontFamily: 'CambriaBold',
        fontSize: 18,
        color: '#fff'
    },
    category: {
        borderColor: '#26CFFF',
        borderWidth: 1,
        padding: 8,
        borderRadius: 100,
        paddingHorizontal: 16,
        marginHorizontal: 5
    },
    categoryText: {
        fontFamily: 'CambriaBold',
        fontSize: 18,
        color: '#26CFFF'
    },
});

export default styles;