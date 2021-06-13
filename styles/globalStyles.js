import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  btnPrimaryBackground: {
    alignItems: 'center',
    borderRadius: 20,
    borderTopRightRadius: 0,
    backgroundColor: '#000',
    height: 50,
    justifyContent: 'center',
    padding: 15,
  },
  btnPrimaryText: {
    fontSize: 15,
    color: 'white'
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
  errorTxt: {
    color: 'red',
    fontSize: Platform.OS === 'ios' ? null : 15,
    fontStyle: 'italic',
    marginBottom: 10
  },
  tag: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#555',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginBottom: 10
  },
  tagDesc: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  },
  btnSecondaryBackground: {
    alignItems: 'center',
    borderRadius: 20,
    borderTopRightRadius: 0,
    backgroundColor: '#555',
    height: 50,
    justifyContent: 'center',
    padding: 15,
    marginBottom: 10
  },
})