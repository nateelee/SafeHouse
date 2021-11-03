import "react-native-gesture-handler";
import * as React from "react";

import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import Home from "./components/Home";
import MenuBar from "./components/MenuBar";
import Map from "./components/Map";


const Stack = createStackNavigator();
export default function App() {
  const [isHomeVariable, setIsHomeVariable] = React.useState(false); // will need to read from database
  const isHome = (homeLocation, currLocation) => {
    //currLocation = [36.988, -122.0583]; for location outside home
    let res = null;
    if (homeLocation[0] == 0 && homeLocation[1] == 0 && currLocation[0] == 0 && currLocation[1] == 0) {
      return false;
    }
    if (homeLocation[0] == currLocation[0] && homeLocation[1] == currLocation[1]) {
      res = true;
    }
    else {
      res = false;
    }
  
    setIsHomeVariable(res)
  }
  return (
    <NavigationContainer>
      <MenuBar isHomeVariable = {isHomeVariable} isHome = {isHome}/>
      <Stack.Navigator>
        <Stack.Screen name="Home" options = {{headerShown: false}}>
                 {props => <Home isHomeVariable = {isHomeVariable}/>}
        </Stack.Screen>
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
