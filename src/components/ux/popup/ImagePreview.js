import { Image, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from '../../../styles/ImagePreviewStyles';
import { StatusBar } from 'expo-status-bar';

function ImagePreview({ onClose, image }) {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <AntDesign style={{ position: 'absolute', zIndex: 1000 }} name="close" size={16} color="black" />
            </TouchableOpacity>
            {image && <Image source={image} style={styles.image} resizeMode='contain' />}
            <StatusBar backgroundColor="transparent" translucent={true} />
        </View>
    )
};

export default ImagePreview;