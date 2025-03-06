import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
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
  photoContainer: {
    position: 'absolute',
    zIndex: 100,
    bottom: 24,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12
  },
  photo: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#000'
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
});

export default styles;