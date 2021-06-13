import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FilterScreen } from '../../screens/nestedScreens/FilterScreen';
import { SavedPostScreen } from '../../screens/nestedScreens/SavedPostScreen';
import { HomeNav } from '../HomeNav';
import { SettingsNav } from '../SettingsNav';

const Tab = createBottomTabNavigator();

export const TabNav = () => {


  const handleScreenOptions = ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;
      switch (route.name) {
        case 'Home':
          iconName = 'ios-home'
          break;
        case 'Filter':
          iconName = 'ios-search'
          break;
        case 'SavedPost':
          iconName = 'ios-bookmark'
          break;
        case 'Settings':
          iconName = 'ios-settings'
          break;
        default:

          break;
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    },

  })

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={handleScreenOptions}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: '#555',
      }}
    >
      <Tab.Screen name="Home" component={HomeNav} options={{ title: '' }} />
      <Tab.Screen name="Filter" component={FilterScreen} options={{ title: '' }} />
      <Tab.Screen name="SavedPost" component={SavedPostScreen} options={{ title: '' }} />
      <Tab.Screen name="Settings" component={SettingsNav} options={{ title: '' }} />
    </Tab.Navigator>
  )
}