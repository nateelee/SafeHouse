import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const MenuBar = () => (
    <Appbar.Header style={{backgroundColor: 'darkgreen'}}>
      <Appbar.Action color="white" icon="menu" onPress={() => {}} />
       <Appbar.Content title="SafeHouse" style={{alignItems: 'center'}} />
        <Appbar.Action color="white" icon="map" onPress={() => {}} />
    </Appbar.Header>
);

export default MenuBar;