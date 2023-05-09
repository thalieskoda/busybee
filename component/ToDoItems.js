import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
//Supabase
import { supabase } from "../supabase/supabase";

const ToDoItems = (props) => {
  let listItem = props.index;
  const [checkedItem, setCheckedItem] = useState(props.checkedItems);
  //   const [loading, setLoading] = useState(false);
  const markItemAsCompleted = async (id) => {
    const itemIsChecked = checkedItem.includes(listItem);

    if (itemIsChecked) {
      // If the item is already checked, mark it as unchecked
      await supabase
        .from("Items")
        .update({ completed: false })
        .eq("id", id)
        .select("*")
        .single();
      setCheckedItem(checkedItem.filter((item) => item !== listItem));
    } else {
      // Otherwise, mark it as checked
      await supabase
        .from("Items")
        .update({ completed: true })
        .eq("id", id)
        .select("*")
        .single();
      setCheckedItem([...checkedItem, listItem]);
    }
  };
  //console.log({"items": props.items, "index": props.index})
  const handleDelete = async (id) => {
    props.setIsLoading(true);
    await supabase.from("Items").delete().eq("id", id);
    props.setIsLoading(false);
    // Remove the task from the list
    let newItems = props.items.filter((item) => item.id !== id);
    props.setItems(newItems);
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.viewItem}>
        <TouchableOpacity
          style={
            checkedItem.includes(listItem)
              ? styles.checkedItem
              : styles.uncheckedItem
          }
          onPress={() => markItemAsCompleted(props.item.id)}
        >
          {checkedItem.includes(listItem) ? (
            <Text style={styles.done}>x</Text>
          ) : null}
        </TouchableOpacity>
        <Text
          style={[
            styles.toDoText,
            checkedItem.includes(listItem) ? styles.completedItemText : null,
          ]}
          numberOfLines={null}
        >
          {props.item.id} - {props.item.description}
        </Text>
        <TouchableOpacity
          style={styles.garbageIcon}
          onPress={() => handleDelete(props.item.id)}
        >
          <Image
            source={require("../assets/garbage.png")}
            style={{ width: 15, height: 15 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ToDoItems;

const styles = StyleSheet.create({
  toDoText: {
    marginLeft: 30,
    marginRight: 30,
    maxWidth: "70%",
    flexWrap: "wrap",
    alignItems: "center",
  },
  viewItem: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 8,
    borderColor: "rgba(0,0,0,0.20)",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.46,

    elevation: 9,
  },
  mainView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  uncheckedItem: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "pink",
    marginLeft: 10,
  },
  checkedItem: {
    width: 18,
    height: 18,
    borderRadius: 10,
    backgroundColor: "pink",
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  completedItemText: {
    textDecorationLine: "line-through",
  },
  checkIcon: {
    width: 12.6,
    height: 9.4,
  },
  done: {
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  garbageIcon: {
    paddingRight: 10,
    alignItems: "center",
  },
});
