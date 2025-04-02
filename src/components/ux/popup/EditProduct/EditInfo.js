import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getUserData } from '../../../../store/userDataManager';
import styles from '../../../../styles/EditInfoStyles';

function EditInfo({ data, onClose, productId }) {
    const [cost, onChangeCost] = useState(data.cost ? data.cost.toString() : '');
    const [oldCost, onChangeOldCost] = useState(data.cost ? data.cost.toString() : '');
    const [name, onChangeName] = useState(data.name);
    const [description, onChangeDescription] = useState(data.description);
    const [userData, setUserData] = useState({});
    const { t } = useTranslation();
    const [message, setMessage] = useState();

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setUserData(userData);
        }
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const saveChanges = () => {
        if (!cost || !name || !description) {
            setMessage(t("edit-info.all-fields"));
            return;
        }

        setMessage("");

        const postData = {
            cost: cost !== '' ? parseFloat(cost) : null,
            oldCost: parseFloat(oldCost),
            name: name !== '' ? name : null,
            description: description !== '' ? description : null,
        };

        fetch(`https://aqtas.garcom.kz/api/updateProduct/${userData.userId}/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
            .then(response => response.json())
            .then(data => {
                setMessage("");
                alert(t("edit-info.success"))
                onClose();
            })
            .catch(error => {
                console.log("Ошибка при сохранении изменений:", error);
                setMessage(t("edit-info.server-error"));
            });
    };


    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <Text style={styles.title}>{t("edit-info.title")}</Text>
                    <Text style={styles.subtitle}>{t("edit-info.description")}</Text>
                </View>
                <View style={styles.field}>
                    <Text style={styles.titleField}>{t("edit-info.cost-title")}</Text>
                    <TextInput
                        value={cost}
                        onChangeText={onChangeCost}
                        keyboardType='numeric'
                        style={[styles.input, { width: '80%' }]}
                        placeholder={t("edit-info.cost-placeholder")}
                    />
                    <Text style={styles.currency}>тнг</Text>
                </View>
                <View>
                    <View style={styles.field}>
                        <Text style={styles.titleField}>{t("edit-info.name-title")}</Text>
                        <TextInput
                            value={name}
                            onChangeText={onChangeName}
                            style={styles.input}
                            placeholder={t("edit-info.name-placeholder")}
                        />
                    </View>
                </View>
                <View>
                    <View style={styles.field}>
                        <Text style={styles.titleField}>{t("edit-info.description-title")}</Text>
                        <TextInput
                            value={description}
                            onChangeText={onChangeDescription}
                            style={[styles.input, { height: 150, textAlignVertical: 'top' }]}
                            placeholder={t("edit-info.description-placeholder")}
                            multiline={true}
                        />
                    </View>
                </View>
                <Text style={styles.error}>{message}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={saveChanges} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>{t("edit-info.save-btn")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleClose} style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>{t("edit-info.cancel-btn")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

export default EditInfo;