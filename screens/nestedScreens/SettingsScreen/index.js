import React, { useEffect, useState } from 'react';
import header from '../../../assets/bg-pattern.jpg'
import {
    Image,
    ImageBackground,
    Text,
    View,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MenuSettings } from '../../../components/MenuSettings';

import { getFavArticlesLengthByUser, getArticlesLengthByAuthor, getSessionUserInfo, getToken } from '../../../utilities/services';
import { settingsStyles } from './styles/settingsStyles';

export function SettingsScreen() {
    const [user, setUser] = useState({});
    const [interactions, setInteractions] = useState({
        createdArticles: 0,
        favoritedCourses: 0
    })
    const navigation = useNavigation();

    const defaultImage = 'https://static.productionready.io/images/smiley-cyrus.jpg';

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            const request = async () => {
                const currentUser = await getSessionUserInfo();
                setUser(currentUser.user)
            }
            request()
            return () => {
                isActive = false;
            }
        }, [])
    )

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            const request = async (username) => {
                const favoritedCourses = await getFavArticlesLengthByUser(username);
                const createdArticles = await getArticlesLengthByAuthor(username)
                const interaction = {
                    createdArticles,
                    favoritedCourses
                }
                setInteractions(interaction)
            }
            request(!user ? '' : user.username)
            return () => {
                isActive = false;
            }
        }, [user])
    )

    const handleSignOut = async () => {
        try {
            await SecureStore.deleteItemAsync('token');
            navigation.navigate('SignIn');
        } catch (error) {
            console.error(object)
        }
    }

    return (
        <ImageBackground source={header} style={settingsStyles.containerSignUp}>
            <View style={settingsStyles.headerWapper}>
                <Text style={settingsStyles.settingsTxt}>Settings</Text>
                <View style={settingsStyles.userWrapper}>
                    <Image source={{ uri: !user.image ? defaultImage : user.image }} style={settingsStyles.imgAvatar} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={settingsStyles.usernameText}>@{!user ? '' : user.username}</Text>
                        <Text style={settingsStyles.userBioText}>{!user.bio ? 'Not Found Bio' : user.bio}</Text>
                    </View>
                </View>
            </View>

            <View style={settingsStyles.contentWrapper}>
                <MenuSettings
                    styles={settingsStyles}
                    interactions={interactions}
                    handleSignOut={handleSignOut}
                    navigation={navigation}
                    user={user}
                />
            </View>
        </ImageBackground>
    );
}