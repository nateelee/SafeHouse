import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import CheckBox from "react-native-check-box";
import { IconButton } from "react-native-paper";

const Task = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <IconButton
          style={styles.deleteButton}
          icon="delete"
          onPress={() => props.completeTask(props.index)}
        />
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.circular}></View>
      <CheckBox
        onClick={() => {
          if (props.isHomeVariable) {
            props.handleChangeTaskCheck(props.index);
          } else {
            Alert.alert(
              "Alert!",
              "You need to be at home to edit the task list.",
              [
                {
                  text: "Ok",
                },
              ]
            );
          }
        }}
        isChecked={props.checked}
        style={{
          marginTop: 19,
          marginLeft: 15,
          position: "absolute",
          transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    height: 150,
    width: 150,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
  },
  deleteButton: {
    marginLeft: 85,
    marginBottom: -10,
    top: -15,
  },
  itemText: {
    maxWidth: "80%",
  },
});

export default Task;
