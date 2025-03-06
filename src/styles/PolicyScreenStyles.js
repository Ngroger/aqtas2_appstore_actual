import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    paddingHorizontal: 16
  },
  header: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    marginTop: '24@msr',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: '20@s',
    fontFamily: 'Cambria'
  },
  info: {
    marginTop: 12
  },
  titleInfo: {
    fontSize: '18@s',
    fontFamily: 'CambriaBold',
    color: '#95E5FF'
  },
  textInfo: {
    fontSize: '16@s',
    fontFamily: 'Cambria',
    color: '#BDBDBD'
  }
});

export default styles;