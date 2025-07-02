import { Text, View, TouchableOpacity } from "react-native";
import styles from "../../../../styles/EditCategoryStyle";
import { AntDesign } from '@expo/vector-icons'; 

function EditType({ onClose, onTypeSelect  }) {
   const handleClose = () => {
      if (onClose) {
         onClose();
      }
   };

   const handleTypeSelect = (selectedCategory) => {
      onTypeSelect(selectedCategory);
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
                  <Text style={styles.title}>Изменить тип</Text>
               </View>
               <TouchableOpacity onPress={() => handleTypeSelect('На развес')} style={styles.button}>
                  <Text style={styles.buttonText}>На развес</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => handleTypeSelect('Одежда')} style={styles.button}>
                  <Text style={styles.buttonText}>Одежда</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => handleTypeSelect('Поштучно')} style={styles.button}>
                  <Text style={styles.buttonText}>Поштучно</Text>
               </TouchableOpacity>
         </View>
      </View>
   )
};

export default EditType