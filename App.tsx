// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/Login';
import SignUpScreen from './components/Signup';
import HomeScreen from './components/Dashboard';
import HomeScreenOwner from './components/Dashboard_Storeowner';
import LoginScreenOwner from './components/LoginOwner';
import SignUpScreenOwner from './components/SignupOwner';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignUpOwner" component={SignUpScreenOwner} />
        <Stack.Screen name="LoginOwner" component={LoginScreenOwner} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="HomeStore" component={HomeScreenOwner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
