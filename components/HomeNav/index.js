import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../../screens/nestedScreens/HomeScreen';
import { ArticleDetailsScreen } from '../../screens/nestedScreens/ArticleDetailsScreen';
import { UserDetailsScreen } from '../../screens/nestedScreens/UserDetailsScreen';


const Stack = createStackNavigator();

export function HomeNav() {
    return (
        <>
            <Stack.Navigator initialRouteName="Home" >
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ArticleDetails" component={ArticleDetailsScreen} options={{ headerTransparent: true, headerBackTitleVisible: false, headerTitle: '', headerTintColor: '#fff' }} />
                <Stack.Screen name="UserDetails" component={UserDetailsScreen} options={{ headerTransparent: true, headerBackTitleVisible: false, headerTitle: '', headerTintColor: '#fff' }} />
            </Stack.Navigator>
        </>
    );
}