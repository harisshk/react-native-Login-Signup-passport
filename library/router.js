import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './../src/homeScreen'
import Profile from './../src/profile';
import SettingScreen from './../src/settings';
import {NavigationContainer} from '@react-navigation/native';


const AppNavigator = createMaterialTopTabNavigator (
    <NavigationContainer>
       {
            {
                Home:HomeScreen,
                Setting:SettingScreen,
                profile:Profile
            },
            {
                initialRouteName: 'HomeScreen',
                defaultNavigationOptions: {
                  gestureEnabled: false,
                },
              }
       }
       
    </NavigationContainer>
)
export default AppNavigator;