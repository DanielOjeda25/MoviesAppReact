import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Navbar from '../NavigationComponent/Navbar';
import Home from '../HomeComponent/Home';
import Detail from '../DetailsComponent/Detail';
import Search from '../SearchComponent/Search';

//definimos una constante para crear el Stack navigator
const Stack = createStackNavigator();
class MainNavigation extends React.PureComponent {
  render() {
    return (
      <Stack.Navigator headerMode={'screen'}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTransparent: true,
            header: ({ navigation }) => (
              <Navbar navigation={navigation} main={true} />
            ),
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerTransparent: true,
            header: ({ navigation }) => <Navbar navigation={navigation} />,
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerTransparent: true,
            header: ({ navigation }) => <Navbar navigation={navigation} />,
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default MainNavigation;
