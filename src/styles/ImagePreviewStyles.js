import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 100,
        
    },
    image: {
        width: '100%',
        height: '100%',
        zIndex: 1000,
        position: 'absolute'
    },
    closeButton: {
        overflow: 'visible', 
        position: 'relative', 
        zIndex: 10000, 
        backgroundColor: '#fff', 
        width: 30, 
        height: 30, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 100, 
        margin: 30,
        borderWidth: 1
    }
});

export default styles;