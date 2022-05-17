import { styles } from "./styles";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native";
import { AddListModal, Fab, Header, Lists } from "../../components";
import { GroceryListContext } from "../../context/GroceryListContext/index";
import {
  GrocerryItemContextType,
  GrocerryListContextType,
} from "../../@types/grocerry";
import { GroceryItemContext } from "../../context/GroceryItemContext";
import useLists from "../../hooks/useLists";

const AllList = () => {
  const { fetchListItemsDB } = useLists();
  const { lists, saveLists } = useContext(
    GroceryListContext
  ) as GrocerryListContextType;
  const { items, saveItems } = useContext(
    GroceryItemContext
  ) as GrocerryItemContextType;
  const [showListModal, setShowListModal] = useState<boolean>(false);

  const updateListItems = async (listId: string | number) => {
    await fetchListItemsDB(listId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="All Lists" />
      <Lists
        lists={lists}
        saveLists={saveLists}
        items={items}
        updateListItems={updateListItems}
      />
      <Fab onPress={setShowListModal} />
      <AddListModal showModal={showListModal} setModal={setShowListModal} />
    </SafeAreaView>
  );
};

export { AllList };
