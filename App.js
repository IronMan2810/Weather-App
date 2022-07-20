import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./Components/Home/Home"
import SettingsScreen from "./Components/Settings/Settings"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              return <AntDesign name="home" size={24} color={color} />
            } else if (route.name === 'Settings') {
              return <Feather name="settings" size={24} color={color} />
            }
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// const fetch = require('node-fetch');

// const url = 'https://transloc-api-1-2.p.rapidapi.com/agencies.json?callback=call&geo_area=35.80176%2C-78.64347%7C35.78061%2C-78.68218&agencies=12';

// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': 'bbfa6d3cfcmsh8e24fb9b281ad48p1d060ajsndffc924d826b',
//     'X-RapidAPI-Host': 'transloc-api-1-2.p.rapidapi.com'
//   }
// };

// fetch(url, options).then(res => res.json())
// 	.then(json => console.log(json))
// 	.catch(err => console.error('error:' + err));
