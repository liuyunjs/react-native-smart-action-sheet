import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#fff',
    paddingBottom: getBottomSpace(),
  },
  darkContainer: {
    backgroundColor: '#333',
  },

  title: {
    fontSize: 22,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  darkTitle: {
    color: '#eee',
  },

  item: {
    flexDirection: 'column-reverse',
  },

  btn: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    color: '#555',
  },
  darkMessage: {
    color: '#ccc',
  },

  cancelText: {
    fontSize: 18,
    color: '#e31111',
  },

  darkCancelText: {
    color: '#d20909',
  },
});
