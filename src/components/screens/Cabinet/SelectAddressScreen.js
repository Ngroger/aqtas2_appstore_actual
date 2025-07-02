import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as Location from 'expo-location';
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import i18next from "../../../i18next";
import { getUserData, updateUserData } from "../../../store/userDataManager";
import styles from "../../../styles/SelectAddressScreenStyle";

function SelectAddressScreen() {
   const navigation = useNavigation();
   const { t } = useTranslation();
   const [data, onChagenData] = useState({
      address: '',
      longitude: null,
      latitude: null,
   });
   const [isAddressFocus, setIsAddressFocus] = useState(false);
   const [isLoad, setIsLoad] = useState(false);
   const [placeholders, setPlaceholders] = useState([]);
   const mapRef = useRef(null);
   const insets = useSafeAreaInsets();
   const [isProccess, setIsProccess] = useState(false);

   const handleChangeData = (name, value) => {
      onChagenData(prevData => ({
         ...prevData,
         [name]: value
      }));
   };

   const selectAddress = (address, lon, lat) => {
      onChagenData({
         address: address,
         longitude: parseFloat(lon),
         latitude: parseFloat(lat)
      });
      mapRef.current.animateToRegion({
         latitude: parseFloat(lat),
         longitude: parseFloat(lon),
         latitudeDelta: 0.01,
         longitudeDelta: 0.01,
      }, 1000);
      setIsAddressFocus(false);
   };

   const handleChangeAddress = async (address) => {
      handleChangeData('address', address);
      const result = await fetchAddressPlaceholders(address);

      setPlaceholders(result);
   };

   const fetchAddressPlaceholders = async (query) => {
      setIsLoad(true);
      if (!query || query.length < 3) return [];

      const apiKey = 'fdbffad5db65409cb05e50f17186337c';
      const lang = i18next.language;
      const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&limit=5&lang=${lang}&apiKey=${apiKey}`;

      try {
         const response = await axios.get(url);
         return response.data.features.map((item) => ({
            title: item.properties.formatted,
            lon: item.properties.lon,
            lat: item.properties.lat
         }));
      } catch (err) {
         console.error("Geoapify autocomplete error:", err);
         return [];
      } finally {
         setIsLoad(false);
      }
   };

   const fetchMyLocation = async _ => {
      try {
         let { status } = await Location.requestForegroundPermissionsAsync();
         if (status !== 'granted') {
            return;
         }

         let location = await Location.getCurrentPositionAsync({});
         let addressResponse = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
         });

         const formattedAddress = `${addressResponse[0].street} ${addressResponse[0].name}, ${addressResponse[0].city}`

         onChagenData({
            address: formattedAddress,
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
         });

         if (mapRef) {
            mapRef.current.animateToRegion({
               latitude: parseFloat(location.coords.latitude),
               longitude: parseFloat(location.coords.longitude),
               latitudeDelta: 0.01,
               longitudeDelta: 0.01,
            }, 1000);
         };
      } catch (error) {
         if (error.code === 'E_LOCATION_UNAVAILABLE') {
            console.log('Current location is unavailable. Make sure that location services are enabled.');
            Alert.alert(t("select-address-screen.alert-title"), t("select-address-screen.alert-title"));
         } else {
            console.log('Error fetching address:', error);
         }
      }
   };

   const saveAddress = async _ => {
      try {
         setIsProccess(true)
         const userData = await getUserData();
         const { userId } = userData;
         if (userId) {
            const response = await fetch('https://aqtas.garcom.kz/api/save-address', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                  address: data.address,
                  user_id: userId
               })
            });

            const responseJson = await response.json();

            if (responseJson.success) {
               await updateUserData({ address: data.address });
               Alert.alert(
                  t("select-address-screen.success-title"),
                  t("select-address-screen.success-subtitle")
               );
               setIsProccess(false);
               navigation.navigate(t('profile-name-bottom-tab'));
            }
         }
      } catch (error) {
         console.log('Save Address Error: ', error);
      }
   }

   const isDisabled = !data.address || !data.longitude || !data.latitude

   return (
      <SafeAreaView style={styles.background}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.header, { paddingTop: Platform.OS === 'android' && 36 }]}>
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            <Text style={styles.title}>{t("select-address-screen.title")}</Text>
         </TouchableOpacity>
         <View style={styles.addressContainer}>
            <View style={isAddressFocus && data.address.length > 0 ? [styles.field, { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }] : styles.field}>
               <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Feather name="map" size={18} color="rgba(0, 0, 0, 0.5)" />
                  <TextInput
                     style={styles.input}
                     placeholder={t("select-address-screen.placeholder")}
                     onFocus={() => setIsAddressFocus(true)}
                     onBlur={() => setIsAddressFocus(false)}
                     value={data.address}
                     onChangeText={(text) => handleChangeAddress(text)}
                  />
               </View>
               {data.address.length > 0 && (
                  <TouchableOpacity onPress={_ => handleChangeData('address', '')}>
                     <AntDesign name="close" size={24} color='#000' />
                  </TouchableOpacity>
               )}
            </View>
            {isAddressFocus && data.address.length > 0 && (
               <View style={styles.placeholdersContainer}>
                  {isLoad && (
                     <View>
                        <Text style={styles.loadTxt}>{t('select-address-screen.load-txt')}</Text>
                     </View>
                  )}
                  {!isLoad && (
                     <>
                        {placeholders && placeholders.length > 0 ? (
                           <>
                              {placeholders.map((item, index) => (
                                 <TouchableOpacity
                                    onPress={() => selectAddress(item.title, item.lon, item.lat)}
                                    key={index}
                                 >
                                    <Text style={styles.placeholderTxt}>{item.title}</Text>
                                 </TouchableOpacity>
                              ))}
                           </>
                        ) : (
                           <View>
                              <Text style={styles.loadTxt}>{t("screen-address-screen.not-fount-txt")}</Text>
                           </View>
                        )}
                     </>
                  )}
               </View>
            )}
         </View>
         <View style={styles.mapContainer}>
            <TouchableOpacity onPress={() => fetchMyLocation()} style={styles.myLocationBtn}>
               <MaterialIcons name="location-on" size={24} color="#FFF" />
            </TouchableOpacity>
            <MapView
               ref={mapRef}
               style={styles.map}
               initialRegion={{
                  latitude: data.latitude ? parseFloat(data.latitude) : 43.238949,
                  longitude: data.longitude ? parseFloat(data.longitude) : 76.889709,
                  latitudeDelta: 0.3,
                  longitudeDelta: 0.3,
               }}
            >
               {data.latitude && data.longitude && (
                  <Marker
                     anchor={{ x: 0.5, y: 0.5 }}
                     coordinate={{
                        latitude: parseFloat(data.latitude),
                        longitude: parseFloat(data.longitude),
                     }}
                  >
                     <View style={styles.marker} />
                  </Marker>
               )}
            </MapView>
         </View>
         <View style={[styles.buttonContainer, { marginBottom: insets.bottom }]}>
            <TouchableOpacity
               disabled={isDisabled}
               onPress={_ => saveAddress()}
               style={isDisabled ? [styles.saveBtn, { opacity: 0.5 }] : styles.saveBtn}
            >
               { isProccess ? (
                  <Text style={styles.saveBtnTxt}>{t("select-address-screen.in-proccess")}</Text>
               ) : (
                  <Text style={styles.saveBtnTxt}>{t("select-address-screen.save-btn")}</Text>
               ) }
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   )
};

export default SelectAddressScreen;