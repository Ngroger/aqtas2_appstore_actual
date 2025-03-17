import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
    header: {
        paddingHorizontal: 16,
        marginTop: 24
    },
    container: {
        width: '100%',
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        marginTop: '20@msr',
    },
    title: {
        fontSize: 36,
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
        backgroundColor: '#95E5FF',
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
        borderColor: '#95E5FF',
        borderWidth: 1,
        padding: 8,
        borderRadius: 100,
        paddingHorizontal: 16,
        marginHorizontal: 5,
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center'
    },
    categoryText: {
        fontFamily: 'CambriaBold',
        fontSize: 18,
        color: '#95E5FF'
    },
    aboutCostumer: {
        padding: 16,
        width: 'auto',
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        margin: 10,
        borderRadius: 15,
        marginVertical: 20
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    stat: {
        backgroundColor: 'rgba(149, 229, 255, 0.2)',
        flexDirection: 'row',
        display: 'flex',
        borderRadius: 100,
        alignItems: 'center',
        padding: 5,
        paddingHorizontal: 16,
        marginHorizontal: 5,
        marginVertical: 5
    },
    statText: {
        fontFamily: 'Cambria',
        color: '#000',
        fontSize: 18,
        marginLeft: 5
    },
    reviewsStats: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        marginTop: 10
    },
    starsContainer: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between'
    },
    reviewsContainer: {
        flexDirection: 'row',
        display: 'flex',
    },
    review: {
        padding: 16,
        marginBottom: 20,
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
    },
    imageReviewer: {
        borderRadius: 100,
        height: 40,
        width: 40
    },
    reviewInfo: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    reviwerName: {
        fontFamily: 'Cambria',
        fontSize: 18
    },
    reviewerDate: {
        color: '#BDBDBD',
        fontFamily: 'Cambria',
        fontSize: 18
    },
    reviewDescription: {
        marginTop: 10,
        width: 200,
        fontFamily: 'Cambria',
        fontSize: 18
    },
    additionalInfo: {
        flexDirection: 'row',
        display: 'flex',
        marginTop: 10,
        justifyContent: 'space-between'
    },
    firstInfo: {
        fontFamily: 'Cambria',
        fontSize: 18
    },
    secondInfo: {
        fontFamily: 'Cambria',
        fontSize: 18,
        color: '#BDBDBD',
        textAlign: 'right'
    },
    likeContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    likeCounter: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center'
    },
    likeCount: {
        fontFamily: 'Cambria',
        fontSize: 24,
        marginHorizontal: 5,
        color: '#95E5FF'
    },
    imagesPreview: {
        flexDirection: 'row',
        display: 'flex',
        marginBottom: 12
    },
    imageReview: {
        width: 50,
        height: 50,
        borderRadius: 10
    },
    buttonContainer: {
        bottom: 0,
        width: '100%',
        padding: 16
    },
    writeReviewButton: {
        backgroundColor: '#95E5FF',
        borderRadius: 15,
        padding: 10,
        justifyContent: "center",
        alignItems: 'center',
    },
    writeReviewButtonText: {
        fontFamily: 'CambriaBold',
        fontSize: 24,
        color: '#FFF',
        marginVertical: 5
    },
    noDataText: {
        fontFamily: 'Cambria',
        fontSize: '14@s',
        color: '#BDBDBD',
        textAlign: 'center',
    },
    loadingIndicatorContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLoad: {
        fontFamily: 'Cambria',
        fontSize: 20,
        marginTop: 10,
        color: '#BDBDBD',
    },
    noDataContainer: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;