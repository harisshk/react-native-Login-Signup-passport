import React from 'react'
import HomeScreen from './home'
import ProfileScreen from './profile'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default function HomeContainer(){
    const navi = createMaterialTopTabNavigator();
    return(
        <navi.Navigator>
            <navi.Screen name="Home" component={HomeScreen} />
            <navi.Screen name="Profile" component={ProfileScreen} />
        </navi.Navigator>
    )

}