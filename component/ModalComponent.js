import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

const ModalComponent = (props) => {
  const [text, setText] = useState("");

  const addNewItem = () => {
    if (text.length === 0) return;
//SaveNewItem = function to add the new item in the array
    props.saveNewItem(text);
    setText("");
    props.hideModal();
  };
  return (
    <Modal animationType="fade" visible={true} transparent={true}>
      <TouchableOpacity
        onPress={props.hideModal}
        style={styles.modalBackdrop}
        activeOpacity={1}
      >
        <View style={styles.newItemForm}>
          <Text style={styles.heading}>Enter your new task</Text>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Enter new item"
            style={styles.input}
          ></TextInput>
          <TouchableOpacity style={styles.button} onPress={() => addNewItem()}>
            <Text>Add item</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.60)",
    alignItems: "center",
    justifyContent: "center",
  },
  newItemForm: {
    width: "90%",
    height: 230,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom:10,
  },
  input: {
    width: "90%",
    height: 80,
    borderColor: "rgba(0,0,0,0.20)",

    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 4,
  },
  button: {
    marginTop: 20,
    width: "90%",
    height: 38,
    borderRadius: 4,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});
