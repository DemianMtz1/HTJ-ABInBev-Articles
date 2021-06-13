import { Platform, StyleSheet } from 'react-native';
export const articleStyles = StyleSheet.create({
    article: { 
        backgroundColor: 'white', 
        borderRadius: 5,
        height: 160, 
        marginBottom: 20, 
        padding: 20, 
        width: '100%', 
    },
    authorWrapper:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleArticle : {
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 10,
        marginBottom: 5
    },
    banner: {
        borderRadius: 20,    
        height: 30, 
        marginRight: 10,
        width: 30, 
    }
})