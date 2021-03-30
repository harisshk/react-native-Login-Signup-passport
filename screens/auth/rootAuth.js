import React from 'react'
import SplashScreen from './splash';
import LoginScreen from './login';
import SignupScreen from './signup';
import ForgotScreen from './forgot';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack     = createStackNavigator();
 function AuthstackScreen(){
       return(
        <AuthStack.Navigator>
        <AuthStack.Screen options={{headerShown: false}} name="SplashScreen" component={SplashScreen} />
        <AuthStack.Screen options={{headerShown: false}} name="LoginScreen" component={LoginScreen} />
        <AuthStack.Screen options={{headerShown: false}} name="SignupScreen" component={SignupScreen} />
        <AuthStack.Screen options={{headerShown: false}} name="ForgotScreen" component={ForgotScreen} />
    </AuthStack.Navigator>
   
       )
}
export default AuthstackScreen;