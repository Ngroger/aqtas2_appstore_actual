import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
   background: {
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.25)'
   },
   container: {
      width: '100%',
      padding: 24,
      borderTopLeftRadius: 36,
      borderTopRightRadius: 36,
      backgroundColor: '#FFF',
      position: 'absolute',
      zIndex: 100,
      bottom: 0,
      gap: 8
   },
   title: {
      fontSize: '20@s',
      color: '#000',
      fontFamily: 'Cambria'
   },
   info: {
      fontSize: '18@s',
      color: '#000',
      opacity: 0.5,
      fontFamily: 'Cambria'
   },
   btn: {
      width: '100%',
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#26CFFF',
      borderRadius: 12
   },
   btnTxt: {
      color: '#FFF',
      fontFamily: 'CambriaBold',
      fontSize: '18@s'
   },
});

export default styles;