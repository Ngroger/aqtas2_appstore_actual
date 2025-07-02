import { Text, View, TouchableOpacity } from "react-native";
import styles from "../../../../styles/EditCategoryStyle";
import { AntDesign } from '@expo/vector-icons'; 

function EditEntity({ onClose, onEntitySelect  }) {
   const handleClose = () => {
      if (onClose) {
         onClose();
      }
   };

   const handleEntitySelect = (selectedCategory) => {
      onEntitySelect(selectedCategory);
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
                  <Text style={styles.title}>Изменить ед.измерения</Text>
               </View>
               <TouchableOpacity onPress={() => handleEntitySelect('Миллиметр')} style={styles.button}>
                  <Text style={styles.buttonText}>Миллиметр</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => handleEntitySelect('Сантиметр')} style={styles.button}>
                  <Text style={styles.buttonText}>Сантиметр</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => handleEntitySelect('Метр')} style={styles.button}>
                  <Text style={styles.buttonText}>Метр</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => handleEntitySelect('Грамм')} style={styles.button}>
                  <Text style={styles.buttonText}>Грамм</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => handleEntitySelect('Килограмм')} style={styles.button}>
                  <Text style={styles.buttonText}>Килограмм</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => handleEntitySelect('Литр')} style={styles.button}>
                  <Text style={styles.buttonText}>Литр</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => handleEntitySelect('Диагональ')} style={styles.button}>
                  <Text style={styles.buttonText}>Диагональ</Text>
               </TouchableOpacity>
         </View>
      </View>
   )
};

export default EditEntity