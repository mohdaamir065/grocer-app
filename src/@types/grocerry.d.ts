import { GrocerryList } from ".";
import { GrocerryListItem } from "./index";

export interface GrocerryListContextType {
  lists: GrocerryList[];
  saveLists: (list: GrocerryList[]) => void;
}

export interface GrocerryItemContextType {
  items: GrocerryListItem[];
  saveItems: (items: GrocerryListItem[]) => void;
}
