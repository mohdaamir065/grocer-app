import { SafeAreaView } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types";
import { Routes } from "../../navigation";
import { GroceryItemContext } from "../../context/GroceryItemContext/index";
import { GrocerryItemContextType } from "../../@types/grocerry";
import useLists from "../../hooks/useLists";
import { styles } from "./styles";
import { AddItemModal, Fab, Header, Items } from "../../components";

type Props = NativeStackScreenProps<RootStackParamList, Routes.LIST>;

const List = ({ navigation, route }: Props) => {
  const { id, title } = route.params;
  const { fetchListItemsDB, markListDoneInDB, fetchListsDB } = useLists();
  const { items, saveItems } = useContext(
    GroceryItemContext
  ) as GrocerryItemContextType;
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    fetchListItemsDB(id);
  }, [id]);

  const onBack = () => {
    saveItems([]);
    navigation.goBack();
  };

  const onRight = () => {
    saveItems([]);
    markListDoneInDB(id);
    fetchListsDB();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={title} onBack={onBack} onRight={onRight} />
      <Items listId={id} items={items} saveItems={saveItems} />
      <Fab onPress={setShowModal} />
      <AddItemModal id={id} showModal={showModal} setModal={setShowModal} />
    </SafeAreaView>
  );
};

export { List };
