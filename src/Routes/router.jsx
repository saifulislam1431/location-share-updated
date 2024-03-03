import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Home from '../screen/Home/Home';
import ChooseLocation from '../screen/ChooseLocation/ChooseLocation';
import Icon from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='Home'>
                <Tab.Screen name="Home" component={Home} options={{
                    tabBarIcon: ({ color }) => <Icon name="home" size={25} color={color} />,
                    tabBarActiveTintColor: "#FF5159",

                }} />
                <Tab.Screen name="ChooseLocation" component={ChooseLocation} options={{
                    tabBarItemStyle: { display: "none" }
                }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({})

export default Router;
