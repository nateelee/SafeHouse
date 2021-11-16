import React, { useState, useContext } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import Task from "./Task";
import { useNavigation } from "@react-navigation/core";

import UserContext from "../context/UserContext";
import { onSignOut } from "../firebase/firebase.utils";
// import { auth } from "../firebase/firebase.utils";

export default Home = (props) => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const navigation = useNavigation();

  const { resetUser, user } = useContext(UserContext);

  const handleSignOut = () => {
    // console.log(user);
    onSignOut()
      .then(() => {
        resetUser();
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const handleAddTask = () => {
    if (task != null && task.length <= 50) {
      Keyboard.dismiss();
      setTaskItems([...taskItems, task]);
      setTask(null);
    }
	else if(task != null && task.length > 50) {
      Keyboard.dismiss();
	  alert("Please keep your tasks under 50 characters in length!")
      setTask(null);
    }
	else{
		alert("You cannot have an empty task!");
	}
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1); //delete item
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tasksWrapper}>
          {/* <Text>Email: {auth.currentUser?.email}</Text> */}
          {/* <Text>uid: {auth.currentUser?.uid}</Text> */}
          <Text style={styles.sectionTitle}>Before leaving home: </Text>
          <View style={styles.items}>
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}
                >
                  <Task text={item} isHomeVariable={props.isHomeVariable} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 30}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  barcontainer: {
    flex: 1,
    backgroundColor: "darkgreen",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
	flexDirection: "row",
	justifyContent: "space-around",
	flexWrap: "wrap",
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
