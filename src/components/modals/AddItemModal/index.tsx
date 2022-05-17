import React, { useState } from "react";
import { View, Modal, TouchableOpacity, SafeAreaView } from "react-native";
import { styles } from "./styles";
import { Input, Button } from "../../index";
import { Entypo } from "@expo/vector-icons";
import useLists from "../../../hooks/useLists";
import { GrocerryListItem } from "../../../@types/index";
import { keyboardTypes } from "../../../constants";

interface PROPS {
  id: string | number;
  showModal: boolean;
  setModal: (val: boolean) => void;
}

const AddItemModal = ({ id, showModal, setModal }: PROPS) => {
  const {
    addListItemInDB,
    fetchListItemsDB,
    markListUndoneInDB,
    fetchListsDB,
  } = useLists();
  const [itemName, setItemName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const onAdd = async () => {
    const data: GrocerryListItem = {
      list_id: id,
      itemName: itemName,
      quantity: quantity,
      isDone: 0,
    };
    markListUndoneInDB(id);
    fetchListsDB();
    addListItemInDB(data);
    fetchListItemsDB(id);
    setModal(false);
  };

  return (
    <Modal animationType="slide" visible={showModal}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.xClose} onPress={() => setModal(false)}>
          <Entypo name="cross" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.body}>
          <Input placeholder="Item Name" onChangeText={setItemName} />
          <Input
            keyboardType={keyboardTypes.numeric}
            placeholder="Quantity"
            onChangeText={setQuantity}
            containerStyle={styles.inputContainer}
          />
          <Button title="Add" onPress={onAdd} containerStyle={styles.button} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export { AddItemModal };
