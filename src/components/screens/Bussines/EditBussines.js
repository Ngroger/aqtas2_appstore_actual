import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getUserData } from '../../../store/userDataManager';
import styles from '../../../styles/EditBussinesStyles';
import CategoryShop from '../../ux/popup/CategoryShop';

function EditBussinesScreen() {
    const navigation = useNavigation();
    const [shopInfo, setShopInfo] = useState({});
    const [customerInfo, setCustomerInfo] = useState({});
    const [userData, setUserData] = useState({});

    const [shopName, onChangeShopName] = useState();
    const [isShopNameChanged, setIsShopNameChanged] = useState(false);
    const [showErrorShopName, setShowErrorShopName] = useState(false);

    const [iin, onChangeIin] = useState();
    const [isIinChanged, setIsIinChanged] = useState(false);
    const [showErrorIin, setShowErrorIin] = useState(false);

    const [bin, onChangeBin] = useState(4827);
    const [isBinChanged, setIsBinChanged] = useState(false);
    const [showErrorBin, setShowErrorBin] = useState(false);

    const [adress, onChangeAdress] = useState();
    const [isAdressChanged, setIsAdressChanged] = useState(false);
    const [showErrorAdress, setShowErrorAdress] = useState(false);

    const [phone, onChangePhone] = useState();
    const [isPhoneChanged, setIsPhoneChanged] = useState(false);
    const [showErrorPhone, setShowErrorPhone] = useState(false);

    const [category, setCategory] = useState();
    const [isCategoryShowModal, setIsCategoryShowModal] = useState(false);

    const [isSave, setIsSave] = useState(false);

    const [isLoad, setIsLoad] = useState(false);

    const { t } = useTranslation();

    const handleGoBack = () => {
        navigation.goBack(); // Вернуться на предыдущий экран
    };

    const toggleShowCategoryModal = () => {
        setIsCategoryShowModal(!isCategoryShowModal);
    }

    const handleCategoryShopySelect = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    useEffect(() => {
        if (category !== shopInfo.category) {
            setIsSave(true);
        } else {
            setIsSave(false);
        }
    }, [category]);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setIsLoad(true);
            setUserData(userData);
            try {
                const response = await fetch(`https://aqtas.garcom.kz/api/shop/${userData.userId}`);
                const data = await response.json();

                if (data.success) {
                    console.log(data.item[0]);
                    setShopInfo(data.item[0]);
                    onChangeShopName(data.item[0].nameShop);
                    onChangeAdress(data.item[0].adress);
                    onChangePhone(data.item[0].phone);
                    setCategory(data.item[0].category);
                }
                try {
                    const response = await fetch(`https://aqtas.garcom.kz/api/customer/${userData.userId}`);
                    const data = await response.json();
                    data.map((item) => {
                        setCustomerInfo(item);
                        onChangeIin(`${item.iin}`);
                        onChangeBin(`${item.bin}`);
                    });

                } catch (error) {
                }

            } catch (error) {
            } finally {
                setIsLoad(false)
            }
        }
    };

    const handleShopNameChange = (text) => {
        onChangeShopName(text);
        setIsShopNameChanged(true);
        if (text.length < 2) {
            setShowErrorShopName(true);
        } else {
            setShowErrorShopName(false);
        }
    };

    const handleSavePressName = () => {
        if (shopName.length < 2) {
            setShowErrorShopName(true);
        } else {
            // Сохранить имя и выполнить соответствующие действия
            setIsShopNameChanged(false);
            setShowErrorShopName(false);
            const userID = userData.userId;
            fetch('https://aqtas.garcom.kz/api/changeShopName', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID: userID, name: shopName }), // Используйте newName вместо fullname
            })
                .then((response) => response.json())
                .then(async (data) => {
                    if (data.success) {
                    } else {
                    }
                })
                .catch((error) => {
                });
        }
    }

    const handleShopIinChange = (text) => {
        onChangeIin(text);
        setIsIinChanged(true);
        if (text.length == 12) {
            setShowErrorIin(false);
        } else {
            setShowErrorIin(true);
        }
    };

    const handleSavePressIin = () => {
        if (iin.length <= 10) {
            setShowErrorIin(true);
        } else {
            // Сохранить имя и выполнить соответствующие действия
            setIsIinChanged(false);
            setShowErrorIin(false);
            const userID = userData.userId;
            fetch('https://aqtas.garcom.kz/api/changeCustomerIin', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID: userID, iin: iin }), // Используйте newName вместо fullname
            })
                .then((response) => response.json())
                .then(async (data) => {
                    if (data.success) {
                    } else {
                    }
                })
                .catch((error) => {
                });
        }
    }

    const handleShopBinChange = (text) => {
        onChangeBin(text);
        setIsBinChanged(true);
        if (text.length === 12) {
            setShowErrorBin(false);
        } else {
            setShowErrorBin(true);
        }
    };

    const handleSavePressBin = () => {
        if (bin.length <= 10) {
            setShowErrorBin(true);
        } else {
            // Сохранить имя и выполнить соответствующие действия
            setIsBinChanged(false);
            setShowErrorBin(false);
            const userID = userData.userId;
            fetch('https://aqtas.garcom.kz/api/changeCustomerBin', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID, bin: bin }), // Используйте newName вместо fullname
            })
                .then((response) => response.json())
                .then(async (data) => {
                    if (data.success) {
                    } else {
                    }
                })
                .catch((error) => {

                });
        }
    }

    const handleAdressChange = (text) => {
        onChangeAdress(text);
        setIsAdressChanged(true);
        if (text.length < 2) {
            setShowErrorAdress(true);
        } else {
            setShowErrorAdress(false);
        }
    };

    const handleSavePressAdress = () => {
        if (adress.length < 2) {
            setShowErrorAdress(true);
        } else {
            // Сохранить имя и выполнить соответствующие действия
            setIsAdressChanged(false);
            setShowErrorAdress(false);
            const userID = userData.userId;
            fetch('https://aqtas.garcom.kz/api/changeShopAdress', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID, adress: adress }), // Используйте newName вместо fullname
            })
                .then((response) => response.json())
                .then(async (data) => {
                    if (data.success) {
                    } else {

                    }
                })
                .catch((error) => {

                });
        }
    }

    const handlePhoneChange = (text) => {
        onChangePhone(text);
        setIsPhoneChanged(true);
        if (text.length == 11) {
            setShowErrorPhone(false);
        } else {
            setShowErrorPhone(true);
        }
    };

    const handleSavePressPhone = () => {
        if (adress.length < 2) {
            setShowErrorPhone(true);
        } else {
            // Сохранить имя и выполнить соответствующие действия
            setIsPhoneChanged(false);
            setShowErrorPhone(false);
            const userID = userData.userId;
            fetch('https://aqtas.garcom.kz/api/changeShopPhone', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID: userID, phone: phone }), // Используйте newName вместо fullname
            })
                .then((response) => response.json())
                .then(async (data) => {
                    if (data.success) {

                    } else {

                    }
                })
                .catch((error) => {

                });
        }
    };

    const handleSaveCategory = () => {
        const userID = userData.userId;
        fetch('https://aqtas.garcom.kz/api/changeShopCategory', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userID: userID, category: category }), // Используйте newName вместо fullname
        })
            .then((response) => response.json())
            .then(async (data) => {
                if (data.success) {
                    alert("Категория успешно обновлена");
                } else {

                }
            })
            .catch((error) => {

            });
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <TouchableOpacity style={styles.titleContainer} onPress={handleGoBack}>
                <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                <Text style={styles.title}>{t('edit-info-bussines-button')}</Text>
            </TouchableOpacity>
            {isLoad && (
                <View style={styles.loadingIndicatorContainer}>
                    <Text style={styles.textLoad}>{t('products-load-message')}</Text>
                </View>
            )}
            {!isLoad && (
                <>
                    <ScrollView style={{ width: '100%', flex: 1, paddingHorizontal: 24 }}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.firstInfo}>{t('name-of-shop-field-title')}:</Text>
                            <View style={styles.field}>
                                <TextInput value={shopName} onChangeText={(text) => handleShopNameChange(text)} style={styles.secondInfo} />
                                {isShopNameChanged && (
                                    <TouchableOpacity onPress={handleSavePressName} >
                                        <AntDesign name="save" size={24} color="black" />
                                    </TouchableOpacity>
                                )}
                            </View>
                            {showErrorShopName && (
                                <Text style={styles.error}>{t('above-two-symbol-message')}</Text>
                            )}
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.firstInfo}>{t('iin-become-customer-field')}:</Text>
                            <View style={styles.field}>
                                <TextInput maxLength={12} keyboardType='numeric' value={iin} onChangeText={handleShopIinChange} style={styles.secondInfo} />
                                {isIinChanged && (
                                    <TouchableOpacity onPress={handleSavePressIin} >
                                        <AntDesign name="save" size={24} color="black" />
                                    </TouchableOpacity>
                                )}
                            </View>
                            {showErrorIin && (
                                <Text style={styles.error}>{t('above-twenteen-symbol-message')}</Text>
                            )}
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.firstInfo}>{t('bin-become-customer-field')}:</Text>
                            <View style={styles.field}>
                                <TextInput maxLength={12} keyboardType='numeric' value={bin} onChangeText={handleShopBinChange} style={styles.secondInfo} />
                                {isBinChanged && (
                                    <TouchableOpacity onPress={handleSavePressBin} >
                                        <AntDesign name="save" size={24} color="black" />
                                    </TouchableOpacity>
                                )}
                            </View>
                            {showErrorBin && (
                                <Text style={styles.error}>{t('above-twenteen-symbol-message')}</Text>
                            )}
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.firstInfo}>{t('address-become-customer-field')}:</Text>
                            <View style={styles.field}>
                                <TextInput value={adress} onChangeText={handleAdressChange} style={styles.secondInfo} />
                                {isAdressChanged && (
                                    <TouchableOpacity onPress={handleSavePressAdress} >
                                        <AntDesign name="save" size={24} color="black" />
                                    </TouchableOpacity>
                                )}
                            </View>
                            {showErrorAdress && (
                                <Text style={styles.error}>{t('above-two-symbol-message')}</Text>
                            )}
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.firstInfo}>{t('phone-number-become-customer-field')}:</Text>
                            <View style={styles.field}>
                                <TextInput value={phone} maxLength={11} keyboardType='numeric' onChangeText={handlePhoneChange} style={styles.secondInfo} />
                                {isPhoneChanged && (
                                    <TouchableOpacity onPress={handleSavePressPhone} >
                                        <AntDesign name="save" size={24} color="black" />
                                    </TouchableOpacity>
                                )}
                            </View>
                            {showErrorPhone && (
                                <Text style={styles.error}>{t('above-eleven-symbol-message')}</Text>
                            )}
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.firstInfo}>{t('category-become-customer-field')}:</Text>
                            <View style={[styles.field, { padding: 16, paddingHorizontal: 18 }]}>
                                <Text style={styles.secondInfo}>{category}</Text>
                                <TouchableOpacity onPress={toggleShowCategoryModal}>
                                    <MaterialIcons name="arrow-forward-ios" size={24} color="#95E5FF" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleSaveCategory} disabled={!isSave} style={!isSave ? { ...styles.saveButton, opacity: 0.5 } : styles.saveButton}>
                            <Text style={styles.saveButtonText}>{t('save-changes-button')}</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
            <StatusBar backgroundColor="transparent" translucent={true} />
            {isCategoryShowModal && <CategoryShop onClose={toggleShowCategoryModal} onCategorySelect={handleCategoryShopySelect} />}
        </KeyboardAvoidingView>
    )
};

export default EditBussinesScreen;