import "react-native-gesture-handler";
import * as React from "react";

import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Location from "expo-location";

import Home from "./components/Home";
import MenuBar from "./components/MenuBar";
import Map from "./components/Map";

const Stack = createStackNavigator();
export default function App() {
  const homeLocation = React.useRef({
    latitude: 0,
    longitude: 0,
  });
  const [isHomeVariable, setIsHomeVariable] = React.useState(false); // will need to read from database
  const getLocationAsync = async () => {
    // watchPositionAsync Return Lat & Long on Position Change
    let location = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 3000,
      },
      (newLocation) => {
        let { coords } = newLocation;
        let res = null;
        if (
          homeLocation.current.latitude == 0 &&
          homeLocation.current.longitude == 0 &&
          coords.latitude == 0 &&
          coords.latitude == 0
        ) {
          return false;
        }
        if (
          homeLocation.current.latitude == coords.latitude &&
          homeLocation.current.longitude == coords.longitude
        ) {
          res = true;
        } else {
          res = false;
        }
        setIsHomeVariable(res);
      },
      (error) => console.log(error)
    );
    return location;
  };

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        getLocationAsync();
      } else {
        //setError({ error: "Locations services needed" });
        console.log("Locations services needed");
      }
      return () => {};
    })();
  }, []);

  return (
    <NavigationContainer>
      <MenuBar />
      {/* <Button
        title="log ishomevaraible"
        onPress={() => {
          console.log(isHomeVariable);
        }}
      /> */}
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <Home isHomeVariable={isHomeVariable} />}
        </Stack.Screen>
        <Stack.Screen name="Map" options={{ headerShown: false }}>
          {(props) => <Map homeLocation={homeLocation} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
