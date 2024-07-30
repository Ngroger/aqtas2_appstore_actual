import { Text, TouchableOpacity, View, StatusBar, ScrollView } from 'react-native';
import styles from '../../../styles/StatScreenStyles';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', ],
    datasets: [
        {
            data: [20, 45, 28, 80, 9915,],
            color: (opacity = 0) => `rgba(149, 229, 255, ${opacity})`, // Line color
            strokeWidth: 2, // Line thickness
        },
    ],
};

const chartConfig = {
    backgroundGradientFrom: '#fff', // Background color
    backgroundGradientTo: '#fff', // Background color
    decimalPlaces: 0, // Number of decimal places for labels
    color: (opacity = 10) => `rgba(0, 0, 0, 1)`, // Label color
    propsForBackgroundLines: {
        stroke: '#000', // Solid line color
    },
    propsForLabels: {
        fontSize: 14,
    },
};

function StatScreen() {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack(); // Вернуться на предыдущий экран
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.titleContainer} onPress={handleGoBack}>
                <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                <Text style={styles.title}>Статистика</Text>
            </TouchableOpacity>
            <View style={styles.categoriesContainer}>
                <ScrollView style={styles.categories} horizontal={true}>
                    <TouchableOpacity style={styles.categoryActive}>
                        <Text style={styles.categoryTextActive}>За день</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category}>
                        <Text style={styles.categoryText}>За неделю</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category}>
                        <Text style={styles.categoryText}>За месяц</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={styles.categoriesContainer}>
                <ScrollView style={styles.categories} horizontal={true}>
                    <TouchableOpacity style={styles.categoryActive}>
                        <Text style={styles.categoryTextActive}>Продажи</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category}>
                        <Text style={styles.categoryText}>Просмотры</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={{  marginTop: 20 }}>
                <LineChart
                    data={data}
                    width={330} // Width of the chart
                    height={300} // Height of the chart
                    chartConfig={chartConfig}
                    bezier // Use Bezier curve to smooth the line
                />
            </View>
            <StatusBar backgroundColor="transparent" translucent={true} />
        </View>
    )
};

export default StatScreen;