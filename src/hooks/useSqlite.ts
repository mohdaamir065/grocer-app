import * as SQLite from "expo-sqlite";
import { GrocerryList, GrocerryListItem } from "../@types/index";

const useSqlite = () => {
  const DB_NAME: string = "db.grocerryDb";

  const db = SQLite.openDatabase(DB_NAME);

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, status INTEGER)"
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, list_id INTEGER, is_done INTEGER, item_name TEXT, quantity INTEGER, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, foreign key (list_id) references lists (id))"
    );
  });

  const addList = async <T>(data: GrocerryList): Promise<string> => {
    const { title, status } = data;
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO lists (title,status) values (?,?)",
          [title, status],
          (_, result) => {
            resolve("success");
          },
          (_, error): any => {
            console.warn(error);
            reject("can't add list");
            return error;
          }
        );
      });
    });
  };

  const markListDone = async <T>(
    listId: string | number,
    isDone: number
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE lists SET (status) = (?) WHERE lists.id=?",
          [isDone, listId],
          (_, result) => {
            markAllItemsDone(listId);
            resolve("success");
          },
          (_, error): any => {
            console.warn(error);
            reject("can't add list");
            return error;
          }
        );
      });
    });
  };

  const addListItem = async <T>(
    data: GrocerryListItem
  ): Promise<string | T[]> => {
    const { list_id, isDone, itemName, quantity } = data;
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO items (list_id,is_done,item_name,quantity) values (?,?,?,?)",
          [list_id, isDone, itemName, quantity],
          (_, result) => {
            resolve("success");
          },
          (_, error): boolean => {
            console.warn(error);
            resolve([]);
            return false;
          }
        );
      });
    });
  };

  const markListItemDone = async <T>(
    itemId: string | number,
    isDone: number
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE items SET (is_done) = (?) WHERE items.id=?`,
          [isDone, itemId],
          (_, result) => {
            resolve("success");
          },
          (_, error): any => {
            console.warn(error);
            reject("can't mark done");
            return error;
          }
        );
      });
    });
  };

  const markListUndone = async <T>(
    listId: string | number
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE lists SET (status) = (0) WHERE id=?`,
          [listId],
          (_, result) => {
            resolve("success");
          },
          (_, error): any => {
            console.warn(error);
            reject("can't mark done");
            return error;
          }
        );
      });
    });
  };

  const markAllItemsDone = async <T>(
    listId: string | number
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE items SET (is_done) = (1) WHERE items.list_id=?`,
          [listId],
          (_, result) => {
            resolve("success");
          },
          (_, error): any => {
            console.warn(error);
            reject("can't mark done");
            return error;
          }
        );
      });
    });
  };

  const fetchLists = async <T>(): Promise<GrocerryList[]> => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM lists",
          undefined,
          (_, { rows: { _array } }) => {
            resolve(_array as GrocerryList[]);
          },
          (_, error): any => {
            console.warn(error);
            const err = "can't fetch lists";
            reject(err);
            return err;
          }
        );
      });
    });
  };

  const fetchListItems = async <T>(
    listId: string | number
  ): Promise<GrocerryListItem[]> => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT items.id,items.item_name,items.list_id,items.is_done,items.quantity FROM items inner join lists on lists.id=items.list_id WHERE items.list_id=?",
          [listId],
          (_, { rows: { _array } }) => {
            resolve(_array as GrocerryListItem[]);
          },
          (_, error): any => {
            console.warn(error);
            const err = "can't fetch list items ";
            reject(err);
            return err;
          }
        );
      });
    });
  };

  return {
    addList,
    markListDone,
    fetchLists,
    addListItem,
    markListItemDone,
    fetchListItems,
    markAllItemsDone,
    markListUndone,
  } as const;
};

export default useSqlite;
