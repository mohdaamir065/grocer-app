import React from "react";
import { styles } from "./styles";
import useLists from "../../hooks/useLists";
import { GrocerryListItem } from "../../@types/index";
import { Text, TouchableOpacity, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

interface PROPS {
  listId?: number | string;
  items: GrocerryListItem[];
  saveItems: (items: GrocerryListItem[]) => void;
}

const Items = ({ listId, items, saveItems }: PROPS) => {
  const { markItemDoneInDB, markListDoneInDB, fetchListsDB } = useLists();

  const closeItem = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const markAsDone = (id: string | number, rowMap: any, rowKey: any) => {
    markItemDoneInDB(id);
    const newData = [...items];
    const doneIndex = items.findIndex(
      (item: GrocerryListItem) => item.id === id
    );
    const doneItem = items[doneIndex];
    const done = {
      ...doneItem,
      is_done: 1,
    };
    newData[doneIndex] = done;
    const allDone = newData.filter((item) => item.is_done === 1);
    if (allDone.length === newData.length) {
      markListDoneInDB(listId);
      fetchListsDB();
    }
    saveItems(newData);
    closeItem(rowMap, rowKey);
  };

  const renderItem = (data: any) => {
    const { item } = data;
    return (
      <View style={styles.rowFront}>
        <View>
          <Text style={[item.is_done ? styles.listDone : styles.list]}>
            {item.item_name}
          </Text>
        </View>
      </View>
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
          onPress={() => markAsDone(data.item.id, rowMap, data.item.key)}
        >
          <Text style={styles.btnText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyComponentContainer}>
        <Text style={styles.noLists}>No items Found in list</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        data={items}
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

export { Items };
