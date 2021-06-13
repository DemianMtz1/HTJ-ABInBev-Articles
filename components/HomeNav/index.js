import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../../screens/nestedScreens/HomeScreen';


const Stack = createStackNavigator();

export function HomeNav() {
    return (
        <>
            <Stack.Navigator initialRouteName="Home" >
                <Stack.Screen name="Loading" component={HomeScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </>
    );
}