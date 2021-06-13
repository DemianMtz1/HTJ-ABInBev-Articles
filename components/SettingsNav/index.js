import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsScreen } from '../../screens/nestedScreens/SettingsScreen';
import { CreateArticleScreen } from '../../screens/nestedScreens/CreateArticleScreen';
import { EditUserInfoScreen } from '../../screens/nestedScreens/EditUserInfoScreen';
import { MyArticlesScreen } from '../../screens/nestedScreens/MyArticlesScreen';

const Stack = createStackNavigator();

export function SettingsNav() {
    return (
        <>
            <Stack.Navigator initialRouteName="Settings" >
                <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CreateArticle" component={CreateArticleScreen} options={{ headerTransparent: true, headerBackTitleVisible: false, headerTitle: '', headerTintColor: '#fff' }} />
                <Stack.Screen name="EditInfo" component={EditUserInfoScreen} options={{ headerTransparent: true, headerBackTitleVisible: false, headerTitle: '', headerTintColor: '#fff' }} />
                <Stack.Screen name="MyArticles" component={MyArticlesScreen} options={{ headerTransparent: true, headerBackTitleVisible: false, headerTitle: '', headerTintColor: '#fff' }} />
            </Stack.Navigator>
        </>
    );
}