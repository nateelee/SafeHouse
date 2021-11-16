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
          setTaskItems(doc.data().task_list);
          taskList.current = doc.data().task_list;
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
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const handleAddTask = () => {
    if (task != null) {
      Keyboard.dismiss();
      setTaskItems([...taskItems, { text: task, checked: false }]);
      taskList.current = [...taskItems, { text: task, checked: false }];
      setTask(null);

      const userRef = firestore.doc(`users/${user.uid}`);
      userRef.update({
        task_list: taskList.current,
      });
    }
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1); //delete item
    setTaskItems(itemsCopy);
    taskList.current = itemsCopy;
    const userRef = firestore.doc(`users/${user.uid}`);
    userRef.update({
      task_list: taskList.current,
    });
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
          {/* <Text>name: {user?.displayName}</Text> */}
          {/* <Text>email: {user?.email}</Text> */}
          {/* <Text>uid: {user?.uid}</Text> */}
          <Text style={styles.sectionTitle}>Before leaving home: </Text>
          <View style={styles.items}>
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}
                >
                  <Task
                    text={item.text}
                    index={index}
                    isHomeVariable={props.isHomeVariable}
                    taskList={taskItems}
                    setTaskList={setTaskItems}
                  />
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
