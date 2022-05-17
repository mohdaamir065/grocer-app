import { Text, SafeAreaView } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types";
import { Routes } from "../../navigation";
import { GroceryItemContext } from "../../context/GroceryItemContext/index";
import {
  GrocerryItemContextType,
  GrocerryListContextType,
} from "../../@types/grocerry";
import useLists from "../../hooks/useLists";
import { styles } from "./styles";
import { AddItemModal, Fab, Header, Items } from "../../components";
import { GroceryListContext } from "../../context/GroceryListContext";
import { GrocerryList } from "../../@types";

type Props = NativeStackScreenProps<RootStackParamList, Routes.LIST>;

const Home = ({ navigation, route }: Props) => {
  const { fetchListsDB, fetchListItemsDB } = useLists();

  const { lists } = useContext(GroceryListContext) as GrocerryListContextType;
  const { items, saveItems } = useContext(
    GroceryItemContext
  ) as GrocerryItemContextType;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentList, setCurrentList] = useState<GrocerryList | any>({});

  useEffect(() => {
    fetchListsDB();
  }, []);

  useEffect(() => {
    let _list: GrocerryList = lists[lists.length - 1];
    setCurrentList(_list);
  }, [lists]);

  useEffect(() => {
    fetchListItemsDB(currentList?.id);
  }, [currentList]);

  return (
    <SafeAreaView style={styles.container}>
      {!currentList ? (
        <Text style={styles.noLists}>No Lists Found</Text>
      ) : (
        <>
          <Header title={currentList?.title} />
          <Items items={items} saveItems={saveItems} />
          <Fab onPress={setShowModal} />
          <AddItemModal
            id={currentList?.id}
            showModal={showModal}
            setModal={setShowModal}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export { Home };
