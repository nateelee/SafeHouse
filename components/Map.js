import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { Entypo } from "@expo/vector-icons";

const Map = ({ route }) => {
  const isMounted = useRef(false);
  const LOCATION_TASK_NAME = "background-location-task";
  const [currentCoords, setCurrentCoords] = useState([36.96638, -122.04229]);
  const [error, setError] = useState({});

  getLocationAsync = async () => {
    // watchPositionAsync Return Lat & Long on Position Change
    if (isMounted.current) {
      let location = await Location.watchPositionAsync(
        {
          enableHighAccuracy: true,
          distanceInterval: 1,
          timeInterval: 10000,
        },
        (newLocation) => {
          let { coords } = newLocation;
          // console.log(coords);
          let region = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.045,
          };
          if (isMounted.current) {
            setCurrentCoords([region.latitude, region.longitude]);
          }
        },
        (error) => console.log(error)
      );
      return location;
    }
  };

  useEffect(() => {
    (async () => {
      isMounted.current = true;
      if (isMounted.current) {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          getLocationAsync();
        } else {
          if (isMounted.current) {
            setError({ error: "Locations services needed" });
          }
        }
      }
      return () => {
        isMounted.current = false;
      };
    })();
  }, []);

  const [homeCoords, setHomeCoords] = useState([36.96638, -122.04229]);
  const setHome = () => {
    route.params.homeLocation[0] = currentCoords[0];
    route.params.homeLocation[1] = currentCoords[1];
    setHomeCoords([route.params.homeLocation[0], route.params.homeLocation[1]]);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsCompass={true}
        showsUserLocation={true}
        region={{
          latitude: currentCoords[0],

          longitude: currentCoords[1],

          latitudeDelta: 0.045,
          longitudeDelta: 0.045,
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
    bottom: 90,
    right: 10,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
});
export default Map;
