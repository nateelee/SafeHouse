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
  const db = useRef();
  let isMounted = useRef(false);
  const currentCoords = useRef({
    latitude: 36.988,
    longitude: -122.0583,
  });
  const mapRef = useRef(null);
  const followsUserLocation = useRef(true);
  const [error, setError] = useState({});
  const [updateState, setUpdateState] = useState(false);

  getLocationAsync = async () => {
    // watchPositionAsync Return Lat & Long on Position Change
    if (isMounted) {
      let location = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          // timeInterval: 3000,
          distanceInterval: 0,
        },
        (newLocation) => {
          let { coords } = newLocation;
          if (isMounted) {
            currentCoords.current = {
              latitude: coords.latitude,
              longitude: coords.longitude,
            };
            animateToRegion();
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

  useEffect(() => {
    (async () => {
      isMounted = true;
      if (isMounted) {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
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

  const setHome = () => {
    props.homeLocation.current = {
      latitude: currentCoords.current.latitude,
      longitude: currentCoords.current.longitude,
    };

    const userRef = firestore.doc(`users/${user.uid}`);
    userRef.update({
      home_location: props.homeLocation.current,
    });
    setUpdateState(!updateState);
  };

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

  const mapDrag = () => {
    followsUserLocation.current = false;
    setUpdateState(!updateState);
  };

  const recenterMap = () => {
    followsUserLocation.current = true;
    animateToRegion();
    setUpdateState(!updateState);
  };

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
