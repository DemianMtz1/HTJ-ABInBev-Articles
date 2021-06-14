import React, { useState } from 'react'
import {
    ImageBackground,
    Image,
    SafeAreaView,
    KeyboardAvoidingView,
    TextInput,
    Text,
    TouchableOpacity,
    View,
    Platform,
} from 'react-native';

import header from '../../assets/bg-pattern.jpg';
import logo from '../../assets/at-logo.png';

import * as SecureStore from 'expo-secure-store';

import { showAlertSignIn } from '../../utilities/validations';
import { signStyles } from './styles/signInStyles';
import { globalStyles } from '../../styles/globalStyles';
import { postLogin } from '../../utilities/services';

export const SignInScreen = ({ navigation }) => {

    const [user, setUser] = useState({ user: '', password: '' });

    // state errors
    const [statusError, setStatusError] = useState(false);

    const handleChangeEmail = text => {
        setStatusError(false);
        setUser({ ...user, email: text })
    }

    const handleChangePassword = text => {
        setStatusError(false);
        setUser({ ...user, password: text });
    }


    const handleRegister = () => {
        navigation.navigate('SignUp')
    }

    const postUserCredentials = async () => {
        try {
            const { email, password } = user;
            showAlertSignIn(email, password)

            if (!email || !password) {
                return null;
            }

            const data = await postLogin(user)

            let existToken = await SecureStore.getItemAsync('token')
            if (existToken) {
                await SecureStore.deleteItemAsync('token');
            }

            await SecureStore.setItemAsync('token', data.user.token);

            // cleaning the state
            setUser({
                user: '',
                password: ''
            })
            setStatusError(false);

            navigation.navigate('TabNav')

        } catch (error) {
            if (error.message.trim().search('422')) {
                setStatusError(true)
            }
        }
    }

    return (
        <ImageBackground source={header} style={signStyles.containerSignUp}>
            <View style={signStyles.headerImgWrapper}>
                <View style={signStyles.headerShape}>
                    <Image source={logo} style={signStyles.shapeImage} />
                </View>
            </View>

            <KeyboardAvoidingView
                style={signStyles.formWrapper}
                behavior={Platform.OS === "ios" ? 'padding' : "height"}
                enabled={Platform.OS === 'ios' ? true : false}
            >
                <View style={signStyles.headerFormWrapper}>
                    <Text style={signStyles.headerFormTxt}>Login</Text>
                </View>
                <SafeAreaView>
                    {statusError ? <Text style={signStyles.errorTxt}>El usuario o contraseña no existen o son incorrectas</Text> : null
                    }
                    <TextInput
                        style={globalStyles.generalInput}
                        placeholder="e-mail"
                        keyboardType='email-address'
                        value={user.email}
                        onChangeText={handleChangeEmail}
                    />
                    <TextInput

                        secureTextEntry
                        style={globalStyles.generalInput}
                        placeholder="password"
                        value={user.password}
                        onChangeText={handleChangePassword}
                    />

                    <TouchableOpacity
                        onPress={postUserCredentials}
                        style={globalStyles.btnPrimaryBackground}
                    >
                        <Text style={globalStyles.btnPrimaryText}>Log In</Text>
                    </TouchableOpacity>
                </SafeAreaView>

                <View style={signStyles.noAccountLinkWrapper}>
                    <Text>
                        Don't have an account?
                    </Text>
                    <Text
                        style={signStyles.noAccountLink}
                        onPress={handleRegister}
                    >
                        Sign Up
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}