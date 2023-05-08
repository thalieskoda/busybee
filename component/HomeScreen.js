import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

//supabase
import { supabase } from "../supabase/supabase";

//components
import ToDoItems from "../component/ToDoItems"
import ModalComponent from "../component/ModalComponent";

const HomeScreen = () => {
  //Setting the states
  const [items, setItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  //Setting up supabase with the 'Items' table
  const getItems = async () => {
    let { data: Items, error } = await supabase.from("Items").select("*");

    return Items;
  };
  //Add New Item button
  const addNewItem = async (item) => {
    const { data: Items, error } = await supabase
      .from("Items")
      .insert([{ description: item, completed: false }]);

    return Items;
  };

  //Save the new created item in the array
  const saveItem = (item) => {
    addNewItem(item).then(() => {
      getItems().then((items) => {
        //set items after the collection
        setItems(items);
      });
    });
  };

  useEffect(() => {
    getItems().then((items) => {
      //set items after the collection
      setItems(items);
    });
  }, [isLoading]); //Everytime the loading state changes, it renders the page

  return (
    <>
      <SafeAreaView style={styles.mainView}>
        <View style={styles.scrollView}>
          {items.length > 0 ? (
            <Text style={styles.heading}>My to do's</Text>
          ) : (
            <Text style={styles.heading}>Enter your first task below!</Text>
          )}
          {/*  To do list  */}
          {items ? (
            <FlatList
              data={items}
              renderItem={({ item, index }) => (
                <ToDoItems
                  setItems={setItems}
                  item={item}
                  index={index}
                  checkedItems={checkedItems}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  items={items}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          ) : null}

          {/* add new item */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.addItem}>add item</Text>
          </TouchableOpacity>
        </View>
        {/* Add new item view */}

        {showModal ? (
          <ModalComponent
            saveNewItem={saveItem}
            hideModal={() => setShowModal(false)}
          />
        ) : null}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#F8F9FD",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#F8F9FD",
    padding: 15,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 60,
    marginBottom: 30,
  },
  addButton: {
    width: 77,
    height: 77,
    backgroundColor: "pink",
    borderRadius: 10,
    display: "flex",
    bottom: 0,
    right: 0,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  addItem: {
    fontWeight: "200",
  },
});

export default HomeScreen;
