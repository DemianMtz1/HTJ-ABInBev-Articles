import { Platform, StyleSheet } from 'react-native';

export const userDetailsStyles = StyleSheet.create({
    containerSignUp: {
        color: '#fcfcfc',
        justifyContent: 'center',
        flex: 1,
    },

    userWrapper: {
        alignItems: 'center',
        marginTop: 30,
    },
    usernameText: {
        color: 'black', 
        fontSize: 20,
        fontWeight: 'bold'
    },
    userBioText: {
        color: 'black',
        fontSize: 17, 
        marginTop: 10
    },
    titleTxt: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black'
    },
    headerWapper: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fcfcfc',
        borderTopStartRadius : 100,
        padding: '2.5%',
        marginTop: Platform.OS === 'ios' ? 100: 5
    },
    imgAvatar: {
        alignItems: 'center',
        borderRadius: 120,
        height: 120,
        width: 120,
    }
})