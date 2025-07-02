import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  text: {
    fontFamily: 'Cambria',
    fontSize: '14@s',
    textAlign: 'center',
  },
  wrapper: {},
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#26CFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: '#000'
  },
  card: {
    padding: '16@msr',
    borderRadius: 25,
    backgroundColor: '#26CFFF',
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    height: '300@vs',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: '12@msr'
  },
  image: {
    width: '150@vs',
    height: '150@vs',
  },
  pagination: {
    position: 'absolute', // Добавляем абсолютное позиционирование
    zIndex: 15, // Устанавливаем высокий zIndex, чтобы точки были поверх InfoBlock
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 100,
    marginHorizontal: 100,
  },
  activeDot: {
    width: 9,
    height: 9,
    borderRadius: 100,
    marginHorizontal: 3,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    position: 'absolute',
    zIndex: 10,
    bottom: 0,
    width: '100%',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '18@msr'
  },
  nextButton: {
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
  }
});

export default styles;