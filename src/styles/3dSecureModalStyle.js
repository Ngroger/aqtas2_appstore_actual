import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 18
  },
  goBackBtn: {
    width: 52,
    height: 52,
    borderRadius: 100,
    backgroundColor: '#FFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    position: 'absolute',
    zIndex: 100,
    left: 24,
    top: 38,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#141414',
    fontSize: '24@s',
    fontFamily: 'Cambria'
  },
  description: {
    color: '#141414',
    fontSize: '18@s',
    fontFamily: 'Cambria',
    textAlign: 'center',
    opacity: 0.5
  },
  field: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#26CFFF',
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 16
  },
  input: {
    fontSize: '18@s',
    color: '#141414',
    fontFamily: 'Cambria'
  },
  sendBtn: {
    width: '100%',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#26CFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendBtnText: {
    fontSize: '20@s',
    color: '#FFF',
    fontFamily: 'Cambria'
  }
});

export default styles;