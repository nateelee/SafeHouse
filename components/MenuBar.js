import React, { useContext, useState } from "react";
import { Appbar, Menu } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Provider } from "react-native-paper";
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

  return (
    <Appbar.Header style={{ backgroundColor: "darkgreen" }}>
      <Provider>
        <Menu
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
      </Provider>
      <Appbar.Content title="SafeHouse" style={{ paddingRight: 96 }} />
      <Appbar.Action
        color="white"
        icon="map"
        onPress={() => {
          const { name } = navigation.getCurrentRoute();
          name === "Home" ? navigation.navigate("Map") : navigation.goBack();
        }}
      />
    </Appbar.Header>
  );
};

export default MenuBar;
