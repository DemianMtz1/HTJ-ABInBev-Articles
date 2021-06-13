import { Platform, StyleSheet } from 'react-native';
export const homeStyles = StyleSheet.create({
    containerHome: {
        backgroundColor: 'black',
        flex: 1,
        paddingHorizontal: '2.5%',
    },
    headerWrapper: {
        flex: 1,
        justifyContent: 'center'
    },
    headerTxt: { 
        alignItems: 'flex-end' ,
        color: 'white', 
        fontWeight: 'bold', 
        justifyContent: 'flex-end', 
        fontSize: 25
    },
    wrapperArticles: { 
        flex: Platform.OS === 'ios' ? 5 : 3
    },
    noArticlesTxt: {
        color: 'white',
        fontSize: 25,
        marginTop: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})