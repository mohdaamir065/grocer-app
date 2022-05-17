import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { styles } from "./styles";
import useLists from "../../hooks/useLists";
import { GrocerryList, GrocerryListItem } from "../../@types/index";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation";
import { GrocerryItemContextType } from "../../@types/grocerry";
import { GroceryItemContext } from "../../context/GroceryItemContext";

interface PROPS {
  lists: GrocerryList[];
  items: GrocerryListItem[];
  saveLists: (items: GrocerryList[]) => void;
  updateListItems: (listId: string | number) => void;
}

const Lists = ({ lists, saveLists, items, updateListItems }: PROPS) => {
  const navigation = useNavigation();
  const { markListDoneInDB, fetchListItemsDB } = useLists();

  const [swipedListId, setSwipedListId] = useState<string | number>(1);

  const closeItem = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteItem = async (id: string | number, rowMap: any, rowKey: any) => {
    updateListItems(id);
    setSwipedListId(id);
    markListDoneInDB(id, items);
    const newData = [...lists];
    const doneIndex = lists.findIndex((item: GrocerryList) => item.id === id);
    const doneList = lists[doneIndex];
    const done = {
      ...doneList,
      status: 1,
    };
    newData[doneIndex] = done;
    saveLists(newData);
    closeItem(rowMap, rowKey);
  };

  const navigateToItems = (id: string | number, title: string) => {
    navigation.navigate(Routes.LIST, { id, title });
  };

  const renderItem = (data: any) => {
    const { item } = data;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.rowFront}
        onPress={() => navigateToItems(item.id, item.title)}
      >
        <View>
          <Text style={[item.status ? styles.listDone : styles.list]}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHiddenItem = (data: any, rowMap: any) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.actionButton, styles.closeBtn]}
          onPress={() => closeItem(rowMap, data.item.key)}
        >
          <Text style={styles.btnText}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.doneBtn]}
          onPress={() => deleteItem(data.item.id, rowMap, data.item.key)}
        >
          <Text style={styles.btnText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyComponentContainer}>
        <Text style={styles.noLists}>No Lists Found</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        data={lists}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export { Lists };
