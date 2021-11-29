import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { firestore } from "../firebase/firebase.utils";
import UserContext from "../context/UserContext";

const Map = (props) => {
  const { user } = useContext(UserContext);
  const currentCoords = useRef({
    latitude: 36.988,
    longitude: -122.0583,
  });
  const followsUserLocation = useRef(true); // Used to determine whether the map automatically recenters on current coordinates.
  const mapRef = useRef(null);
  const [error, setError] = useState({});
  let isMounted = useRef(false); // Keeps track of whether the component is mounted
  const [updateState, setUpdateState] = useState(false);

  // Function that is used for location tracking when on the map screen
  getLocationAsync = async () => {
    // watchPositionAsync Return Lat & Long on Position Change
    if (isMounted) {
      let location = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 0,
        },
        (newLocation) => {
          let { coords } = newLocation;
          if (isMounted) {
            // Store user's current location
            currentCoords.current = {
              latitude: coords.latitude,
              longitude: coords.longitude,
            };
            animateToRegion(); // Centers the map on the user's current location
          } else {
            return null;
          }
        },
        (error) => console.log(error)
      );
      return location;
    }
    return null;
  };

  // Tracks location upon map component mounting
  useEffect(() => {
    (async () => {
      isMounted = true;
      if (isMounted) {
        let { status } = await Location.requestForegroundPermissionsAsync(); // Request location permission
        if (status === "granted") {
          // If location permissions are granted we call the tracking function
          getLocationAsync();
        } else {
          if (isMounted) {
            setError({ error: "Locations services needed" });
          }
        }
      }
      return () => {
        isMounted = false;
      };
    })();
  }, []);

  // Function used to set a new home location
  const setHome = () => {
    props.homeLocation.current = {
      latitude: currentCoords.current.latitude,
      longitude: currentCoords.current.longitude,
    };
    const userRef = firestore.doc(`users/${user.uid}`); // Updates db with new home
    userRef.update({
      home_location: props.homeLocation.current,
    });
    setUpdateState(!updateState);
  };

  // Function used to center map on current location
  const animateToRegion = () => {
    if (mapRef.current !== null) {
      followsUserLocation.current &&
        mapRef.current.animateToRegion(
          {
            latitude: currentCoords.current.latitude,
            longitude: currentCoords.current.longitude,
            latitudeDelta: 0.025,
            longitudeDelta: 0.025,
          },
          1000
        );
    }
  };

  // Function called when user drags the map
  // This stops the map from automatically centering on your current location
  const mapDrag = () => {
    followsUserLocation.current = false;
    setUpdateState(!updateState);
  };

  // Function called when the re-center button is pressed
  // Makes the map automatically center on current location
  const recenterMap = () => {
    followsUserLocation.current = true;
    animateToRegion();
    setUpdateState(!updateState);
  };

  // Function that determines whether the recenter button appears
  // Re-center button only appears when the map does not automatically center on current location
  const showRecenterButton = () => {
    if (followsUserLocation.current === false) {
      return (
        <View style={styles.recenterMapButton}>
          <FontAwesome5 name="map-marked-alt" size={24} color="white" />
          <Text
            style={{
              color: "white",
              fontSize: 15,
              fontWeight: "bold",
              left: 10,
            }}
          >
            Re-Center
          </Text>
        </View>
      );
    } else {
      return <View />;
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={(ref) => {
          mapRef.current = ref;
        }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: currentCoords.current.latitude,
          longitude: currentCoords.current.longitude,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        }}
        style={styles.map}
        showsCompass={true}
        showsUserLocation={true}
        followsUserLocation={followsUserLocation.current}
        onUserLocationChange={() =>
          followsUserLocation.current && animateToRegion()
        }
        onPanDrag={() => mapDrag()}
      >
        <Marker
          coordinate={{
            latitude: props.homeLocation.current.latitude,
            longitude: props.homeLocation.current.longitude,
          }}
          title={"Home"}
        >
          <Image source={require("../assets/home.png")} />
        </Marker>
      </MapView>
      <View style={styles.bottomButtonsWrapper}>
        <TouchableOpacity
          onPress={() => {
            recenterMap();
          }}
        >
          {showRecenterButton()}
        </TouchableOpacity>
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
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  setHomeButton: {
    flex: 1,
    width: 60,
    height: 60,
    backgroundColor: "darkgreen",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    right: 15,
  },
  recenterMapButton: {
    flex: 1,
    width: 150,
    height: 60,
    backgroundColor: "darkgreen",
    flexDirection: "row",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    left: 15,
  },
  bottomButtonsWrapper: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
export default Map;
