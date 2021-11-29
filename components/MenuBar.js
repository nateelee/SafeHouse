import React, { useContext } from "react";
import { View, Platform } from "react-native";
import { Appbar, Menu } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../context/UserContext";
import { onSignOut } from "../firebase/firebase.utils";

const MenuBar = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { resetUser, user } = useContext(UserContext);

  // Function used to handle signing out
  const handleSignOut = () => {
    onSignOut()
      .then(() => {
        resetUser();
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  // Function used to determine if the menubar should render
  // Menubar should not render on the login screen
  const loginCheck = () => {
    if (user) {
      // Checks if user is logged in
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
      // If no user is logged in we don't render the menubar
      return <View />;
    }
  };

  return loginCheck();
};

export default MenuBar;
