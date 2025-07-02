import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  closeBtn: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backgroundContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 10
  },
  text: {
    fontFamily: 'Cambria',
    fontSize: '20@s',
    color: '#141414',
    opacity: 0.5,
    marginBottom: 4
  },
  container: {
    width: '100%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'absolute',
    zIndex: 11,
    bottom: 0,
    padding: 20,
    gap: 2
  },
  title: {
    fontSize: '20@s',
    color: '#141414',
    fontFamily: 'Cambria',
    textAlign: 'center'
  },
  field: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    fontSize: '24@s',
    color: '#141414',
    fontFamily: 'CambriaBold',
    opacity: 0.5
  },
  btn: {
    width: '100%',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26CFFF'
  },
  btnText: {
    fontSize: '16@s',
    color: '#FFF',
    fontFamily: 'CambriaBold'
  },
  description: {
    fontSize: '12@s',
    color: '#141414',
    opacity: 0.5,
    textAlign: 'center',
    fontFamily: 'Cambria'
  },
  error: {
    fontSize: '16@s',
    color: '#FF0000',
    fontFamily: 'Cambria',
    textAlign: 'center'
  },
  selector: {
    width: '100%',
    padding: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#26CFFF",
    borderRadius: 16,
    marginBottom: 12
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
  },
  dropMenu: {
    width: '100%',
    marginTop: 6,
    maxHeight: 100
  },
  selectedCard: {
    fontSize: '20@s',
    color: "#141414",
    fontFamily: 'Cambria'
  },
  loadTxt: {
    width: '100%',
    textAlign: 'center',
    marginVertical: 6,
    fontFamily: 'Cambria',
    color: '#141414',
    opacity: 0.5,
    fontSize: '18@s'
  }
});

export default styles;