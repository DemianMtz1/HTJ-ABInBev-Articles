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
import backgroundApp from '../../assets/bg-pattern.jpg';
import * as SecureStore from 'expo-secure-store';

import { showAlertSignUp, validateEmailFormat } from '../../utilities/validations'
import { signUpStyles } from './styles/signUpStyles';
import { globalStyles } from '../../styles/globalStyles';
import axios from 'axios';

export const SignUpScreen = ({ navigation }) => {
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '', repeatedPassword: '' });

    // state errors
    const [errors, setErrors] = useState({ requestError: false, repeatedPassword: false, invalidEmail: false });

    const handleChangeUsername = text => {
        setErrors({ ...errors, requestError: false, invalidEmail: false });
        setNewUser({ ...newUser, username: text })
    }

    const handleChangeEmail = text => {
        setErrors({ ...errors, requestError: false, invalidEmail: false });
        setNewUser({ ...newUser, email: text })
    }

    const handleChangePassword = text => {
        setErrors({ ...errors, repeatedPassword: false, requestError: false });
        setNewUser({ ...newUser, password: text });
    }

    const handleChangeRepeatPass = text => {
        setErrors({ ...errors, repeatedPassword: false, requestError: false });
        setNewUser({ ...newUser, repeatedPassword: text });
    }

    const handleLogin = () => {
        navigation.goBack()
    }

    const createUser = async () => {
        try {
            const { username, email, password, repeatedPassword } = newUser;
            showAlertSignUp(username, email, password, repeatedPassword);

            if (!email || !password || !repeatedPassword) {
                return null;
            }

            if (password !== repeatedPassword) {
                setErrors({ ...errors, repeatedPassword: true });
                return;
            }

            const isValidMail = validateEmailFormat(email);
            if (!isValidMail) {
                setErrors({ ...errors, invalidEmail: true });
                return;
            }

            const user = {
                username,
                email,
                password
            }

            const { data } = await axios.post('https://conduit.productionready.io/api/users', { user });

            let existToken = await SecureStore.getItemAsync('token')
            if (existToken) {
                await SecureStore.deleteItemAsync('token');
            }
            await SecureStore.setItemAsync('token', data.user.token)
            navigation.navigate('TabNav')

            // cleaning states
            setNewUser({ username: '', email: '', password: '', repeatedPassword: '' });
            setErrors({ requestError: false, repeatedPassword: false, invalidEmail: false })

        } catch (error) {
            setErrors({ ...errors, requestError: true });
        }
    }

    return (
        <ImageBackground source={backgroundApp} style={signUpStyles.container}>
            <View style={{ flex: 1 }}></View>

            <KeyboardAvoidingView
                style={signUpStyles.formWrapper}
                behavior='padding'
                enabled={Platform.OS === 'ios' ? true : false}
            >
                <View style={signUpStyles.headerFormWrapper}>
                    <Text style={signUpStyles.headerFormTxt}>Sign Up</Text>
                </View>
                <SafeAreaView>
                    {
                        errors.repeatedPassword ?
                            <Text style={globalStyles.errorTxt}>Diferentes contraseñas, favor de validar.</Text>
                            :
                            null
                    }
                    {
                        errors.invalidEmail ?
                            <Text style={globalStyles.errorTxt}>E-mail invalido, favor de validar.</Text>
                            :
                            null
                    }
                    {
                        errors.requestError ?
                            <Text style={globalStyles.errorTxt}>Cuenta registrada, favor de validar.</Text>
                            :
                            null
                    }

                    <TextInput
                        style={globalStyles.generalInput}
                        placeholder="username"
                        value={newUser.username}
                        onChangeText={handleChangeUsername}
                    />

                    <TextInput
                        style={globalStyles.generalInput}
                        placeholder="e-mail"
                        keyboardType='email-address'
                        value={newUser.email}
                        onChangeText={handleChangeEmail}
                    />
                    <TextInput
                        secureTextEntry
                        style={globalStyles.generalInput}
                        placeholder="password"
                        value={newUser.password}
                        onChangeText={handleChangePassword}
                    />

                    <TextInput
                        secureTextEntry
                        style={globalStyles.generalInput}
                        placeholder="repeat password"
                        value={newUser.repeatedPassword}
                        onChangeText={handleChangeRepeatPass}
                    />

                    <TouchableOpacity
                        onPress={createUser}
                        style={globalStyles.btnPrimaryBackground}
                    >
                        <Text style={globalStyles.btnPrimaryText}>Sign up</Text>
                    </TouchableOpacity>
                </SafeAreaView>

                <View style={signUpStyles.accountLinkWrapper}>
                    <Text>
                        Already have an account?
                    </Text>
                    <Text
                        style={signUpStyles.accountLink}
                        onPress={handleLogin}
                    >
                        Sign in
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}
