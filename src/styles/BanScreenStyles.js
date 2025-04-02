import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
   container: {
      width: '100%',
      height: '100%',
      backgroundColor: '#95E5FF',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 20
   },
   title: {
      fontSize: '24@s',
      color: '#FFF',
      fontFamily: 'CambriaBold',
      textAlign: 'center'
   },
   description: {
      fontSize: '20@s',
      color: '#000',
      fontFamily: 'Cambria',
      textAlign: 'center',
      opacity: 0.5
   },
   bottom: {
      width: '100%',
      padding: 20,
      position: 'absolute',
      zIndex: 100,
      bottom: 0,
      gap: 4
   },
   additionalTxt: {
      fontSize: 18,
      color: '#000',
      fontFamily: 'Cambria',
      textAlign: 'center'
   }
});

export default styles;