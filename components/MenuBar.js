import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MenuBar = (props) => {
  const navigation = useNavigation();
  const [homeLocation, setHomeLocation] = useState([0, 0]);
  const [currLocation, setCurrLocation] = useState([0, 0]);
 
  return (
    <Appbar.Header style={{ backgroundColor: "darkgreen" }}>
      <Appbar.Action color="white" icon="menu" onPress={() => {}} />
      <Appbar.Content title="SafeHouse" style={{ alignItems: "center" }} />
      <Appbar.Action
        color="white"
        icon="map"
        onPress={() => {
          const { name } = navigation.getCurrentRoute();
          name === "Home"
            ? navigation.navigate("Map", {
                homeLocation: homeLocation,
                currLocation: currLocation,
              })
            : navigation.goBack(),
              props.isHome(homeLocation, currLocation);
        }}
      />
    </Appbar.Header>
  );
};

export default MenuBar;
