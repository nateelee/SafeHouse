import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Entypo } from "@expo/vector-icons";

const Map = ({ route, navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let currentLatitude = 36.96638;
  let currentLongitude = -122.04229;
  if (errorMsg) {
    currentLatitude = errorMsg;
    currentLongitude = errorMsg;
  } else if (location) {
    // currentLatitude = parseFloat(JSON.stringify(location.coords.latitude));
    // currentLongitude = parseFloat(JSON.stringify(location.coords.longitude));
    currentLatitude = location.coords.latitude;
    currentLongitude = location.coords.longitude;
  }

  const [homeCoords, setHomeCoords] = useState([36.96638, -122.04229]);
  const setHome = () => {
    route.params.homeLocation[0] = currentLatitude;
    route.params.homeLocation[1] = currentLongitude;
    setHomeCoords([route.params.homeLocation[0], route.params.homeLocation[1]]);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        }}
      >
        <Marker
          coordinate={{
            latitude: route.params.homeLocation[0],
            longitude: route.params.homeLocation[1],
          }}
          title={"Home"}
        >
          <Image source={require("../assets/home.png")} />
        </Marker>
      </MapView>
      <View style={styles.setHomeWrapper}>
        <TouchableOpacity
          onPress={() => {
            setHome();
          }}
        >
          <View style={styles.setHomeButton}>
            <Entypo name="home" size={30} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    elevation: 1,
    backgroundColor: "#E8EAED",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  homeIcon: {
    width: 40,
    height: 40,
  },
  setHomeButton: {
    width: 60,
    height: 60,
    backgroundColor: "darkgreen",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  setHomeWrapper: {
    position: "absolute",
    bottom: 60,
    right: 8,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
});
export default Map;
