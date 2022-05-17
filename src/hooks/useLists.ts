import useSqlite from "./useSqlite";
import { Alert } from "react-native";
import { useEffect, useContext } from "react";
import { GrocerryListItem } from "../@types/index";
import { GroceryListContext } from "../context/GroceryListContext/index";
import {
  GrocerryItemContextType,
  GrocerryListContextType,
} from "../@types/grocerry.d";
import { GroceryItemContext } from "../context/GroceryItemContext/index";

const useLists = () => {
  const { lists, saveLists } = useContext(
    GroceryListContext
  ) as GrocerryListContextType;
  const { items, saveItems } = useContext(
    GroceryItemContext
  ) as GrocerryItemContextType;
  const {
    addList,
    addListItem,
    fetchLists,
    fetchListItems,
    markListItemDone,
    markListDone,
    markListUndone,
  } = useSqlite();

  const fetchListsDB = async () => {
    try {
      const allLists = await fetchLists();
      saveLists(allLists);
    } catch (error) {
      Alert.alert("ERROR", String(error));
    }
  };

  const fetchListItemsDB = async (listId: any) => {
    try {
      const items = await fetchListItems(listId);
      saveItems(items);
    } catch (error) {
      Alert.alert("ERROR", String(error));
    }
  };

  useEffect(() => {
    fetchListsDB();
  }, []);

  const addListInDB = async (title: string) => {
    try {
      const data = {
        status: 0,
        title: title,
      };
      await addList(data);
    } catch (error) {
      Alert.alert("ERROR", String(error));
    }
  };

  const addListItemInDB = async ({
    list_id,
    itemName,
    quantity,
  }: GrocerryListItem) => {
    try {
      const data = {
        list_id: list_id,
        isDone: 0,
        itemName: itemName,
        quantity: quantity,
      };
      await addListItem(data);
    } catch (error) {
      Alert.alert("ERROR", String(error));
    }
  };

  const markItemDoneInDB = async (itemId: string | number) => {
    try {
      await markListItemDone(itemId, 1);
    } catch (error) {
      Alert.alert("ERROR", String(error));
    }
  };

  const markListDoneInDB = async (listId: string | number) => {
    try {
      await markListDone(listId, 1);
    } catch (error) {
      Alert.alert("ERROR", String(error));
    }
  };

  const markListUndoneInDB = async (listId: string | number) => {
    try {
      await markListUndone(listId);
    } catch (error) {
      Alert.alert("ERROR", String(error));
    }
  };

  return {
    lists,
    fetchListsDB,
    addListInDB,
    addListItemInDB,
    fetchListItemsDB,
    markItemDoneInDB,
    markListDoneInDB,
    markListUndoneInDB,
  };
};

export default useLists;
