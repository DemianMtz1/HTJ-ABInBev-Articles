import { Platform, StyleSheet } from 'react-native';

export const articleDetailsStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    titleArticleWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    titleArticle: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
    },
    headerWapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5%'
    },
    contentWrapper: {
        backgroundColor: '#fcfcfc',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        flex: 10,
        paddingTop: 10,
        paddingHorizontal: 35,
        width: '100%',
    },
    userWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    userInfoWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    usernameText: {
        marginLeft: 10,
        fontWeight: 'bold'
    },
    imgAvatar: {
        borderRadius: 30,
        height: 30,
        width: 30,
    },
    descriptionArticle: {
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    articleBody: {
        fontSize: 15,
        marginTop: 20
    },
    discussionTitle: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    commentWrapper: {
        backgroundColor: 'white', 
        marginBottom: 10, 
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: .5,
        elevation: 2,
        width: '100%'
    }
})