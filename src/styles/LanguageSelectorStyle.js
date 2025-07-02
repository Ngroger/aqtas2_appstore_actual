import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
   background: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
   },
   container: {
      width: '100%',
      backgroundColor: '#FFF',
      padding: '20@msr',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      position: 'absolute',
      zIndex: 10,
      bottom: 0,
      gap: 6
   },
   title: {
      fontSize: '24@s',
      color: '#1A1A1A',
      fontFamily: 'Cambria',
      marginBottom: 6
   },
   language: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   langTxt: {
      fontSize: '24@s',
      color: '#1A1A1A',
      fontFamily: 'Cambria',
      opacity: 0.5
   },
   selector: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: '#26cfff',
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center'
   },
   dot: {
      width: 8,
      height: 8,
      borderRadius: 100,
      backgroundColor: '#26cfff'
   }
});

export default styles;