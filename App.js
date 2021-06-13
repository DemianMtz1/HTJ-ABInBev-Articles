import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from './screens/SignInScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { TabNav } from './components/TabNav';
import { LoadingScreen } from './screens/LoadingScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Loading" >
          <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerTransparent: true, headerBackTitleVisible: false, headerTitle: '', headerTintColor: '#fff' }} />
          <Stack.Screen name="TabNav" component={TabNav} options={{ headerShown: false, gestureEnabled: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


export default App;