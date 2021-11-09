import React, { useState } from "react";
import { Appbar,Menu } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Provider } from 'react-native-paper';

const MenuBar = (props) => {
  const navigation = useNavigation();
  const [homeLocation, setHomeLocation] = useState([0, 0]);
  const [currLocation, setCurrLocation] = useState([0, 0]);
  
  // Vars for hamburger meun
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
 
  return (
    <Appbar.Header style={{ backgroundColor: "darkgreen", zIndex: 1}}>
	  	<Provider>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="white" onPress={openMenu} />
          }>
          <Menu.Item onPress={() => {console.log('Option 1 was pressed')}} title="Option 1" />
          <Menu.Item onPress={() => {console.log('Option 2 was pressed')}} title="Option 2" />
        </Menu>
	  	  </Provider>
      <Appbar.Content title="SafeHouse" style={{paddingRight: 96}} />
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
