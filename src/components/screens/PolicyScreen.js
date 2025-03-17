import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../styles/PolicyScreenStyles';

function PolicyScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const info = t('policy-screen.info', { returnObjects: true });

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          <Text style={styles.title}>{t('policy-screen.title')}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        {info.map((section, index) => (
          <View key={index} style={styles.info}>
            <Text style={styles.titleInfo}>{section.title}</Text>
            {section.text.split('<br/>').map((line, i) => (
              <Text key={i} style={styles.textInfo}>{line}</Text>
            ))}
          </View>
        ))}
      </ScrollView>
      <StatusBar translucent={true} backgroundColor='transparent' />
    </SafeAreaView>
  );
};

export default PolicyScreen;
