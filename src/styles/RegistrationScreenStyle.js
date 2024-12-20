import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#95E5FF',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '18@s',
    borderWidth: 1,
    borderColor: '#000'
  },
  accordion: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Cambria',
    fontSize: 18,
    bottom: 10,
  },
  language: {
    fontFamily: 'Cambria',
    fontSize: 24
  },
  openAccordion: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderTopWidth: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  },
  line: {
    height: 1,
    backgroundColor: '#000',
    width: '100%',
    marginTop: 10,
    marginBottom: 10
  },
  buttonContainer: {
    position: 'absolute',
    zIndex: 10,
    bottom: -100,
    width: '100%'
  },
  nextButton: {
    top: 10,
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 100,
    width: '100%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    color: '#fff',
    fontFamily: 'CambriaBold',
    fontSize: 24
  },
  titleReg: {
    fontSize: '24@s',
    fontFamily: 'CambriaBold',
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Cambria',
    fontSize: '18@s',
    textAlign: 'center',
    marginTop: 6
  },
  inputContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 14,
    width: '100%',
    fontFamily: 'Cambria',
    fontSize: 18,
    paddingHorizontal: 20,
  },
  inputTitle: {
    fontFamily: 'Cambria',
    fontSize: 16,
    backgroundColor: '#95E5FF',
    paddingHorizontal: 10,
    position: 'absolute',
    top: -10,
    zIndex: 20,
    left: 10
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: 10,
    padding: 14,
    width: '100%',
    fontFamily: 'Cambria',
    fontSize: 18,
    paddingHorizontal: 20,
  },
  inputTitleError: {
    fontFamily: 'Cambria',
    fontSize: 16,
    backgroundColor: '#95E5FF',
    paddingHorizontal: 10,
    position: 'absolute',
    top: -10,
    zIndex: 20,
    left: 10,
    color: '#FF0000'
  },
  logInText: {
    fontFamily: 'Cambria',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10
  },
  error: {
    fontFamily: 'CambriaBold',
    fontSize: 18,
    textAlign: 'center',
    color: '#ff0000'
  },
  logo: {
    width: '250@vs',
    height: '100@vs',
    objectFit: 'contain',
  },
  fieldContainr: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  skipButton: {
    position: 'absolute',
    zIndex: 100,
    right: 24,
    top: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2
  },
  skipButtonText: {
    fontSize: 20,
    color: '#141414',
    fontFamily: 'Cambria'
  }
});

export default styles;