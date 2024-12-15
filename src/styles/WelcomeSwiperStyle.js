import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  text: {
    fontFamily: 'Cambria',
    fontSize: '18@s',
    textAlign: 'center',
  },
  wrapper: {},
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#95E5FF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    padding: 20,
    borderRadius: 25,
    backgroundColor: '#95E5FF',
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    marginTop: 12,
    elevation: 6,
    height: '350@vs'
  },
  image: {
    width: '200@vs',
    height: '200@vs',
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
    bottom: 24,
    width: '100%'
  },
  nextButton: {
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 100,
    width: '100%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -150
  },
  nextText: {
    color: '#fff',
    fontFamily: 'CambriaBold',
    fontSize: 24
  }
});

export default styles;