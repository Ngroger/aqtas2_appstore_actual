import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../../../styles/ConfrimDeleteStyle';

function ConfrimDelete({ onClose }) {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };
    
    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Вы уверены, что хотите удалить?</Text>
                <View style={{ padding: 10 }}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Да</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleClose} style={styles.button}>
                        <Text style={styles.buttonText}>Нет</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

export default ConfrimDelete;