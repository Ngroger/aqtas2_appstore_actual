import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
   goBack: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
   },
   container: {
      width: '100%',
      backgroundColor: '#FFF',
      position: 'absolute',
      zIndex: 20,
      borderTopRightRadius: 24,
      borderTopLeftRadius: 24,
      bottom: 0,
      padding: 20
   },
   title: {
      fontSize: 24,
      marginBottom: 16,
      color: '#000',
      fontFamily: 'Cambria'
   },
   label: {
      fontSize: 18,
      marginBottom: 8,
      color: '#555',
      fontFamily: 'Cambria'
   },
   dropdownToggle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#26CFFF',
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginBottom: 8
   },
   dropdownText: {
      fontSize: 14,
      color: '#000'
   },
   dropdownList: {
      borderWidth: 1,
      borderColor: '#26CFFF',
      borderRadius: 8,
      backgroundColor: '#fff',
      marginBottom: 12
   },
   dropdownItem: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#eee'
   },
   dropdownItemText: {
      fontSize: 14,
      color: '#000'
   },
   input: {
      borderWidth: 1,
      borderColor: '#26CFFF',
      borderRadius: 8,
      padding: 10,
      marginBottom: 16,
      fontSize: 16,
      color: '#000',
      height: 80
   },
   imagesRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 20
   },
   imagePreview: {
      width: 100,
      height: 100,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd'
   },
   addPhotoBtn: {
      width: 100,
      height: 100,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#aaa',
      justifyContent: 'center',
      alignItems: 'center'
   },
   submitBtn: {
      backgroundColor: '#26CFFF',
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: 'center'
   },
   submitText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
   }
});

export default styles;
