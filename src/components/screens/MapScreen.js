import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../styles/MapScreenStyles';
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

function MapScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params;

    console.log(item);

    const handleGoBack = () => {
        navigation.goBack(); // Вернуться на предыдущий экран
    };

    return (
        <View>
            <View style={styles.navbar}>
                <TouchableOpacity style={styles.titleContainer} onPress={handleGoBack}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                    <Text style={styles.title}>{item.nameShop}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.map}>
                <MapView
                    style={styles.map}
                        initialRegion={{
                            latitude: item.latitudev,
                            longitude: item.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                    <Marker
                        coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                        title="Marker 1"
                        description="This is marker 1"
                    />
                </MapView>
            </View>
        </View>
    )
};

export default MapScreen;