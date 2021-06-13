import { StyleSheet } from 'react-native';

export const settingsStyles = StyleSheet.create({
    containerSignUp: {
        flex: 1,
        justifyContent: 'center',
    },
    contentWrapper: {
        backgroundColor: '#fcfcfc',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        flex: 2,
        paddingTop: 40,
        paddingHorizontal: 35,
        width: '100%',
    },
    userWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },
    usernameText: {
        color: 'white', 
        fontWeight: 'bold'
    },
    userBioText: {
        color: 'white', 
        marginTop: 10
    },
    settingsTxt: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    },
    headerWapper: {
        flex: 1,
        justifyContent: 'center',
        padding: '2.5%'
    },
    imgAvatar: {
        borderRadius: 80,
        height: 80,
        width: 80,

    },
    wrapperSection: {
        borderBottomColor: '#555',
        borderBottomWidth: 1,
        padding: 15,
    },
    sectionHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        padding: 15,
        marginTop: 10
    },
    signOutBtn: {
        padding: 15,
        marginTop: 30
    },
    signOutText: {
        color: 'darkred',
        fontSize: 20,
        fontWeight: 'bold'
    }
})