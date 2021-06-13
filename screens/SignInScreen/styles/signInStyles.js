import { Platform, StyleSheet } from 'react-native';
export const signStyles = StyleSheet.create({
    containerSignUp: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    imgLogo: {
        height: 100,
        width: 200
    },
    generalInput: {
        backgroundColor: 'white',
        borderRadius: 20,
        height: 60,
        marginBottom: 20,
        padding: 10,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: .5,
        elevation: 2,
    },
    rememberWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 50
    },
    textRemember: {
        marginLeft: 10
    },
    formWrapper: {
        backgroundColor: '#fcfcfc',
        borderTopLeftRadius: 125,
        flex: 2,
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
    headerImgWrapper: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    headerShape: {
        alignItems: 'center', 
        backgroundColor: 'white', 
        borderRadius: 20, 
        borderTopRightRadius: 0, 
        height: 100,
        justifyContent: 'center', 
        width: 100, 
    },
    shapeImage : {
        height: 50,
        width: 50
    },
    noAccountLinkWrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
    noAccountLink: {
        fontWeight: 'bold',
        marginLeft: 2
    },
    errorTxt: {
        color: 'red',
        fontSize: Platform.OS === 'ios' ? null: 15,
        fontStyle: 'italic',
        marginBottom: 10
    }
})