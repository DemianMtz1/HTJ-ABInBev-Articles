import { Platform, StyleSheet } from 'react-native';
export const signUpStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    textRemember: {
        marginLeft: 10
    },
    formWrapper: {
        backgroundColor: '#fcfcfc',
        borderTopLeftRadius: 125,
        flex: 5,
        justifyContent: 'space-evenly',
        paddingHorizontal: 35,
        width: '100%',
    },
    headerFormWrapper: {
        alignItems: 'center'
    },
    headerFormTxt: {
        fontSize: Platform.OS === 'ios' ? 40: 30,
        fontWeight: 'bold'
    },
    accountLinkWrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
    accountLink: {
        fontWeight: 'bold',
        marginLeft: 2
    },

})