import React, { useState } from "react";
import { View, Modal, TouchableOpacity, SafeAreaView } from "react-native";
import { styles } from "./styles";
import { Input, Button } from "../../index";
import { Entypo } from "@expo/vector-icons";
import useLists from "../../../hooks/useLists";

interface PROPS {
  showModal: boolean;
  setModal: (val: boolean) => void;
}

const AddListModal = ({ showModal, setModal }: PROPS) => {
  const { addListInDB, fetchListsDB } = useLists();
  const [title, setTitle] = useState<string>("");

  // const addListInDB = async (title: string) => {
  //   try {
  //     const data = {
  //       status: 0,
  //       title: title,
  //     };
  //     await addList(data);
  //   } catch (error) {
  //     Alert.alert("ERROR", String(error));
  //   }
  // };

  const onAdd = async () => {
    addListInDB(title);
    fetchListsDB();
    setModal(false);
  };

  return (
    <Modal animationType="slide" visible={showModal}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.xClose} onPress={() => setModal(false)}>
          <Entypo name="cross" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.body}>
          <Input onChangeText={setTitle} />
          <Button title="Add" onPress={onAdd} containerStyle={styles.button} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export { AddListModal };
