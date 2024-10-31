import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  closeModal: {
    backgroundColor: '#95E5FF',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 100,
    right: 24,
    top: 24,
    borderRadius: 100
  }
});

export default styles;