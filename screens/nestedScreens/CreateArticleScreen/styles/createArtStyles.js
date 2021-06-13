import { StyleSheet } from 'react-native';

export const createArtStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    headerContainer: {
        flex: 1,
    },
    formWrapper: {
        backgroundColor: '#fcfcfc',
        borderTopLeftRadius: 125,
        flex: 5,
        justifyContent: 'space-evenly',
        paddingHorizontal: 35,
        width: '100%',
    },
    headerFormTxt: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold'
    }
})