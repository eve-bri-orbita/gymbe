import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProtectedScreen from '../screens/ProtectedScreen';
import HomeScreen from '../screens/HomeScreen';
import CompleteInformationScreen from '../screens/CompleteInformationScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown:false, 
                cardStyle:{
                    backgroundColor:'white',
                    marginTop:40
                }
            }}
        >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="CompleteInformationScreen" component={CompleteInformationScreen} />
        </Stack.Navigator>
    );
}