import { Platform } from 'react-native';
import { ScaledSheet, moderateScale, verticalScale } from 'react-native-size-matters';

const styles = ScaledSheet.create({
   background: {
      width: '100%',
      height: '100%',
      backgroundColor: '#FFF'
   },
   header: {
      paddingHorizontal: 24,
      width: '100%',
      flexDirection: 'row',
      gap: 2,
      alignItems: 'center'
   },
   title: {
      fontSize: 28,
      fontFamily: 'Cambria'
   },
   addressContainer: {
      width: '100%',
      backgroundColor: '#FFF',
      paddingHorizontal: 24,
      paddingVertical: 16,
      justifyContent: 'center',
      alignItems: 'center'
   },
   field: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#26CFFF',
      borderRadius: 16,
      paddingHorizontal: moderateScale(16),
      paddingVertical: Platform.select({
         ios: verticalScale(12),
         android: verticalScale(6),
      }),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   input: {
      color: '#000',
      fontFamily: 'Cambria',
      fontSize: '18@s',
      width: '85%'
   },
   placeholdersContainer: {
      width: '100%',
      padding: 16,
      borderWidth: 1,
      borderTopWidth: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderColor: '#26CFFF',
      borderRadius: 16,
      gap: 8
   },
   placeholderTxt: {
      color: '#000',
      fontSize: '18@s',
      fontFamily: 'Cambria'
   },
   loadTxt: {
      textAlign: 'center',
      color: '#000',
      opacity: 0.5,
      fontSize: '18@s',
      fontFamily: 'Cambria'
   },
   map: {
      width: '100%',
      height: '100%',
   },
   marker: {
      width: 24,
      height: 24,
      backgroundColor: '#FFF',
      borderWidth: 6,
      borderColor: '#26CFFF',
      borderRadius: 100
   },
   mapContainer: {
      width: '100%',
      height: 'auto',
      flex: 1,
      position: 'relative'
   },
   myLocationBtn: {
      width: 48,
      height: 48,
      backgroundColor: '#26CFFF',
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      zIndex: 100,
      right: 24,
      top: 24
   },
   buttonContainer: {
      width: '100%',
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      zIndex: 100,
      bottom: 0,
   },
   saveBtn: {
      width: '100%',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#26CFFF',
      padding: 16
   },
   saveBtnTxt: {
      color: '#FFF',
      fontFamily: 'CambriaBold',
      fontSize: '20@s'
   },
});

export default styles;