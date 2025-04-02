import Entypo from '@expo/vector-icons/Entypo';
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../styles/BanScreenStyles';

function BanScreen() {
   const route = useRoute();
   const { reason } = route.params;

   return (
      <View style={styles.container}>
         <Entypo name='block' size={128} color='#FFF' />
         <Text style={styles.title}>{t("ban-screen.title")}</Text>
         <Text style={styles.description}>{reason}</Text>
         <View style={styles.bottom}>
            <Text style={styles.additionalTxt}>{t("ban-screen.additional-txt")}</Text>
            <TouchableOpacity onPress={() => Linking.openURL('tel:+77077909001')}>
               <Text style={[styles.additionalTxt, { textDecorationLine: 'underline' }]}>+7 (707) 790-90-01</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:aqtas.office@gmail.com')}>
               <Text style={[styles.additionalTxt, { textDecorationLine: 'underline' }]}>aqtas.office@gmail.com</Text>
            </TouchableOpacity>
         </View>
         <StatusBar translucent={true} backgroundColor='transparent' />
      </View>
   )
};

export default BanScreen;