import React, { useContext, useState } from "react";
import { View, Platform } from "react-native";
import { Appbar, Menu } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../context/UserContext";
import { onSignOut } from "../firebase/firebase.utils";

const MenuBar = (props) => {
  const navigation = useNavigation();
  // Vars for hamburger meun
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { resetUser, user } = useContext(UserContext);

  const handleSignOut = () => {
    onSignOut()
      .then(() => {
        resetUser();
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  const loginCheck = () => {
    if (user) {
      return (
        <Appbar.Header
          style={{
            backgroundColor: "darkgreen",
            elevation: 1,
            zIndex: 1,
          }}
        >
          <Menu
            style={Platform.OS === "ios" ? { top: 77 } : { top: 105 }}
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action icon="menu" color="white" onPress={openMenu} />
            }
          >
            <Menu.Item onPress={handleSignOut} title="Sign Out" />
            <Menu.Item
              onPress={() => {
                console.log("Option 2 was pressed");
              }}
              title="Option 2"
            />
          </Menu>
          <Appbar.Content title="SafeHouse" style={{ alignItems: "center" }} />
          <Appbar.Action
            color="white"
            icon="map"
            onPress={() => {
              const { name } = navigation.getCurrentRoute();
              name === "Home"
                ? navigation.navigate("Map")
                : navigation.goBack();
            }}
          />
        </Appbar.Header>
      );
    } else {
      return <View />;
    }
  };

  return loginCheck();
};

export default MenuBar;
