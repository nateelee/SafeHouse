import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const Map = () => {
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
            latitude: currentLatitude,
            longitude: currentLongitude,
          }}
          title={"Current Location"}
        ></Marker>
      </MapView>
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
});
export default Map;
