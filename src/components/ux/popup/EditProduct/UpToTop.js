import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../../../../styles/UpToTopStyles';
import { AntDesign } from '@expo/vector-icons'; 

function UpToTop({ onClose }) {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={handleClose}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Продвижение</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Продвинуть в TOP</Text>
                    <Text style={styles.currency}>5 000 тнг</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default UpToTop;