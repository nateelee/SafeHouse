import "react-native-gesture-handler";
import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Location from "expo-location";
import { Provider as PaperProvider } from "react-native-paper";

import Home from "./screens/HomeScreen";
import Map from "./screens/MapScreen";
import LoginScreen from "./screens/LoginScreen";
import MenuBar from "./components/MenuBar";
import { UserContextProvider } from "./context/UserContext";

// Used to prevent certain warnings from appearing
import { LogBox } from "react-native";
import _ from "lodash";
LogBox.ignoreLogs(["Warning:..."]); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const Stack = createStackNavigator();
export default function App() {
  // Stores the coordinations of home
  const homeLocation = React.useRef({
    latitude: 0,
    longitude: 0,
  });
  // Boolean variable that shows whether the user is home
  // isHomeVariable = True if user is home
  const [isHomeVariable, setIsHomeVariable] = React.useState(false);

  // Main function used to handle location tracking
  // This function changes isHomeVariable based on if the user is within a certain range of the home coordinate.
  const getLocationAsync = async () => {
    let location = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 0,
      },
      (newLocation) => {
        // We save the current coords
        let { coords } = newLocation;
        let res = null;
        if (
          // Checks to see if the home location is unset
          homeLocation.current.latitude == 0 &&
          homeLocation.current.longitude == 0 &&
          coords.latitude == 0 &&
          coords.latitude == 0
        ) {
          return false;
        }
        if (
          //Checks to see if the current coordinates is within a certain range of the home coordinations
          homeLocation.current.latitude - 0.0003 <= coords.latitude &&
          coords.latitude <= homeLocation.current.latitude + 0.0003 &&
          homeLocation.current.longitude - 0.0003 <= coords.longitude &&
          coords.longitude <= homeLocation.current.longitude + 0.0003
        ) {
          res = true;
        } else {
          // If current coordinates are not in range we set isHomeVariable to false
          res = false;
        }
        setIsHomeVariable(res);
      },
      (error) => console.log(error)
    );
    return location;
  };

  // This runs whenever this component is mounted
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); // Get location tracking permission
      if (status === "granted") {
        // If location permissions are granted we call the tracking function
        getLocationAsync();
      } else {
        //setError({ error: "Locations services needed" });
        console.log("Locations services needed");
      }
      return () => {};
    })();
  }, []);

  return (
    <PaperProvider>
      <UserContextProvider>
        <NavigationContainer>
          <MenuBar />
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false, gestureEnabled: false }}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen name="Home" options={{ headerShown: false }}>
              {(props) => (
                <Home
                  isHomeVariable={isHomeVariable}
                  homeLocation={homeLocation}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Map" options={{ headerShown: false }}>
              {(props) => <Map homeLocation={homeLocation} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </UserContextProvider>
    </PaperProvider>
  );
}
