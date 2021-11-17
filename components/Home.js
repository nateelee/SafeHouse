import React, { useState, useContext, useRef, useEffect } from "react";
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
import { onSignOut, firestore } from "../firebase/firebase.utils";

export default Home = (props) => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const taskList = useRef([]);
  const navigation = useNavigation();

  const { resetUser, user } = useContext(UserContext);

  useEffect(() => {
    const userRef = firestore.doc(`users/${user.uid}`);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          props.homeLocation.current = doc.data().home_location;
          taskList.current = doc.data().task_list;
          setTaskItems(doc.data().task_list);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  const handleSignOut = () => {
    // console.log(user);
    onSignOut()
      .then(() => {
        resetUser();
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  const handleAddTask = () => {
    if (task != null && task.length <= 50) {
      Keyboard.dismiss();
      setTaskItems([...taskItems, { text: task, checked: false }]);
      taskList.current = [...taskItems, { text: task, checked: false }];
      setTask(null);

      const userRef = firestore.doc(`users/${user.uid}`);
      userRef.update({
        task_list: taskList.current,
      });
    } else if (task != null && task.length > 50) {
      Keyboard.dismiss();
      alert("Please keep your tasks under 50 characters in length!");
      setTask(null);
    } else {
      alert("You cannot have an empty task!");
    }
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1); //delete item
    const userRef = firestore.doc(`users/${user.uid}`);
    userRef.update({
      task_list: itemsCopy,
    });
    taskList.current = itemsCopy;
    setTaskItems(itemsCopy);
  };

  const handleChangeTaskCheck = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].checked = !itemsCopy[index].checked;
    const userRef = firestore.doc(`users/${user.uid}`);
    userRef.update({
      task_list: itemsCopy,
    });
    taskList.current = itemsCopy;
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
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Before leaving home: </Text>
          <View style={styles.items}>
            {taskItems.map((item, index) => {
              return (
                <View key={index}>
                  <Task
                    text={item.text}
                    checked={item.checked}
                    index={index}
                    isHomeVariable={props.isHomeVariable}
                    completeTask={completeTask}
                    handleChangeTaskCheck={handleChangeTaskCheck}
                  />
                </View>
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
    position: "absolute",
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginLeft: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
