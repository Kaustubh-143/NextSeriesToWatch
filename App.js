import React from 'react' 
import {Text} from 'react-native'
import { View } from 'native-base'

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // copy paste these imports

import Home from './screens/Home'
import Edit from './screens/Edit'   //Bring your screens
import Add from './screens/Add'

const Stack = createStackNavigator();

const App=()=> {
  return (
  
 <NavigationContainer>
   <Stack.Navigator initialRouteName='Home'>
   <Stack.Screen name="Home"
   component={Home}
   options={{
     headerStyle:{
       backgroundColor:"#0f4c75"},
       title:'LCO NETFLIX APP',
       headerTitleStyle:{
         textAlign:'center',
         color:'#00b7c2',
       }
       }}>

   </Stack.Screen>
   <Stack.Screen name="Add"
   component={Add}
   options={{
     headerStyle:{
       backgroundColor:"#0f4c75"},
       title:'LCO NETFLIX APP',
       headerTitleStyle:{
         textAlign:'center',
         color:'#00b7c2',
       }
       }}>

   </Stack.Screen>

   <Stack.Screen name="Edit"
   component={Edit}
   options={{
     headerStyle:{
       backgroundColor:"#0f4c75"},
       title:'LCO NETFLIX APP',
       headerTitleStyle:{
         textAlign:'center',
         color:'#00b7c2',
       }
       }}>

   </Stack.Screen>

   </Stack.Navigator>

 </NavigationContainer>

  )
}

export default App;