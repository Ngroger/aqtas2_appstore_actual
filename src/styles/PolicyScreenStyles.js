import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    paddingHorizontal: 20
  },
  header: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    marginTop: '24@msr',
    marginBottom: 6
  },
  container: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Cambria'
  },
  info: {
    marginTop: 12
  },
  titleInfo: {
    fontSize: '18@s',
    fontFamily: 'CambriaBold',
    color: '#26CFFF'
  },
  textInfo: {
    fontSize: '16@s',
    fontFamily: 'Cambria',
    color: '#BDBDBD'
  }
});

export default styles;