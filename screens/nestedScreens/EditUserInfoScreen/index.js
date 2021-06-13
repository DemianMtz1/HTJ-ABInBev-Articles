import React, { useState } from 'react';
import {
    ImageBackground,
    SafeAreaView,
    KeyboardAvoidingView,
    TextInput,
    Text,
    TouchableOpacity,
    View,
    Platform,

} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import backgroundApp from '../../../assets/bg-pattern.jpg';

import { useRoute, useNavigation } from '@react-navigation/native';
import { editInfoStyles } from './styles/editInfoStyles';
import { globalStyles } from '../../../styles/globalStyles';
import { putUserInfo } from '../../../utilities/services';
import { showAlertUpdate } from '../../../utilities/validations';

export const EditUserInfoScreen = () => {
    const [newUser, setNewUser] = useState({})

    const route = useRoute();
    const navigation = useNavigation();

    const handleChangeUsername = username => setNewUser({ ...newUser, username })

    const handleChangeEmail = email => setNewUser({ ...newUser, email })

    const handleChangeBio = bio => setNewUser({ ...newUser, bio })

    const handleChangeImage = image => setNewUser({ ...newUser, image })

    const handleChangePassword = password => setNewUser({ ...newUser, password })

    const handleSubmitNewUserInfo = async () => {
        try {
            if (Object.keys(newUser).length === 0) {
                showAlertUpdate()
                return;
            }
            const response = await putUserInfo(route.params.token, newUser);
            await SecureStore.deleteItemAsync('token');
            await SecureStore.setItemAsync('token', response.user.token);
            navigation.navigate('Settings')
        } catch (error) {

        }
    }
    return (
        <ImageBackground source={backgroundApp} style={editInfoStyles.container}>
            <View style={editInfoStyles.headerContainer}></View>

            <KeyboardAvoidingView
                style={editInfoStyles.formWrapper}
                behavior='padding'
                enabled={Platform.OS === 'ios' ? true : false}
            >
                <View>
                    <Text style={editInfoStyles.headerFormTxt}>Edit your info</Text>
                </View>
                <SafeAreaView>
                    <TextInput
                        style={globalStyles.generalInput}
                        placeholder="Username"
                        onChangeText={handleChangeUsername}
                    />
                    <TextInput
                        style={globalStyles.generalInput}
                        keyboardType="email-address"
                        placeholder="Email"
                        onChangeText={handleChangeEmail}
                    />
                    <TextInput
                        multiline
                        numberOfLines={10}
                        style={globalStyles.generalInput}
                        placeholder="Bio"
                        onChangeText={handleChangeBio}
                    />
                    <TextInput
                        style={globalStyles.generalInput}
                        placeholder="Image URL"
                        onChangeText={handleChangeImage}
                    />
                    <TextInput
                        secureTextEntry
                        style={globalStyles.generalInput}
                        placeholder="Password"
                        onChangeText={handleChangePassword}
                    />
                    <TouchableOpacity
                        style={globalStyles.btnPrimaryBackground}
                        onPress={handleSubmitNewUserInfo}
                    >
                        <Text style={globalStyles.btnPrimaryText}>Edit your info</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}
