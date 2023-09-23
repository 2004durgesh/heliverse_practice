/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Cards from './Cards';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Filters from './Filters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Teams from './Teams';
import { Provider } from 'react-redux';
import store from './redux/store';

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={Cards}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }} />
            <Tab.Screen
              name="Filters"
              component={Filters} options={{
                tabBarLabel: 'Filters',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="filter" color={color} size={26} />
                ),
              }} />
            <Tab.Screen
              name="Teams"
              component={Teams} options={{
                tabBarLabel: 'Teams',
                tabBarIcon: ({ color }) => (
                  <FontAwesome name="users" color={color} size={26} />
                ),
              }} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
