import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import styles from '../../../styles/ReasonForDeleteStyles';
import { AntDesign } from '@expo/vector-icons';

function ReasonForDelete({ onClose, id, userId, buyerId }) {
    const [selectedReason, setSelectedReason] = useState(null);
    const [selectedReasonText, setSelectedReasonText] = useState(null);

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const toggleCheckbox = (reason) => {
        if (selectedReason === reason) {
            setSelectedReason(null); // Uncheck the checkbox
            setSelectedReasonText(null); // Clear the selected reason text
        } else {
            setSelectedReason(reason); // Check the checkbox
            setSelectedReasonText(reason); // Set the selected reason text
        }
    };

    const handleDelete = async () => {
        if (selectedReason) {
            try {
                const response = await fetch(`https://aqtas.garcom.kz/deleteOrder/${userId}/${id}/${buyerId}?reasons=${encodeURIComponent(selectedReasonText)}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    handleClose();
                } else {
                }
            } catch (error) {
            }
        } else {
            Alert.alert('Ошибка', 'Хотя бы одна причина должна быть указана');
        }
    };

    const renderCheckbox = (reason) => (
        <TouchableOpacity
            onPress={() => toggleCheckbox(reason)}
            style={selectedReason === reason ? styles.activeCheckbox : styles.checkbox}
        >
            {selectedReason === reason && <View style={styles.dot} />}
        </TouchableOpacity>
    );

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={handleClose}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Причины удаления</Text>
                </View>
                <View style={{ padding: 5 }}>
                    <View style={styles.reasonContainer}>
                        {renderCheckbox('Неправильно указан адрес')}
                        <Text style={styles.reason}>Неправильно указан адрес</Text>
                    </View>
                    <View style={styles.reasonContainer}>
                        {renderCheckbox('Ошибка в цене или количестве товара в заказе.')}
                        <Text style={styles.reason}>Ошибка в цене или количестве товара в заказе.</Text>
                    </View>
                    <View style={styles.reasonContainer}>
                        {renderCheckbox('Невозможность доставки товара.')}
                        <Text style={styles.reason}>Невозможность доставки товара.</Text>
                    </View>
                    <View style={styles.reasonContainer}>
                        {renderCheckbox('Дублирование заказа')}
                        <Text style={styles.reason}>Дублирование заказа</Text>
                    </View>
                    <View style={styles.reasonContainer}>
                        {renderCheckbox('Технические проблемы с заказом')}
                        <Text style={styles.reason}>Технические проблемы с заказом</Text>
                    </View>
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                        <Text style={styles.deleteButtonText}>Удалить</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default ReasonForDelete;
