import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
  onClose: {
    width: '100%',
    height: '100%',
  },
  blurBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  containerBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16@msr'
  },
  container: {
    width: '100%',
    padding: 16,
    paddingHorizontal: 24,
    backgroundColor: '#FFF',
    borderRadius: 18,
    gap: 16
  },
  title: {
    fontSize: '16@s',
    color: '#141414',
    fontFamily: 'CambriaBold',
    textAlign: 'center'
  },
  description: {
    fontSize: '14@s',
    color: '#141414',
    fontFamily: 'Cambria',
    opacity: 0.5,
    textAlign: 'center'
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#141414'
  },
  button: {
    width: '50%',
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: '14@s',
    color: '#95E5FF',
    fontFamily: 'CambriaBold'
  }
});

export default styles;