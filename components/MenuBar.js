import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MenuBar = () => {
  const navigation = useNavigation();
  const [isMap, setIsMap] = useState(true);
  const [homeLocation, setHomeLocation] = useState([0, 0]);
  return (
    <Appbar.Header style={{ backgroundColor: "darkgreen" }}>
      <Appbar.Action color="white" icon="menu" onPress={() => {}} />
      <Appbar.Content title="SafeHouse" style={{ alignItems: "center" }} />
      <Appbar.Action
        color="white"
        icon="map"
        onPress={() => {
          setIsMap(!isMap);
          isMap === true
            ? navigation.navigate("Map", {
                homeLocation: homeLocation,
              })
            : navigation.navigate("Home", {
                homeLocation: homeLocation,
              });
        }}
      />
    </Appbar.Header>
  );
};

export default MenuBar;
