import React, { createContext, useState } from "react";
import { GrocerryListContextType } from "../../@types/grocerry";
import { GrocerryList } from "../../@types/index";

export const GroceryListContext = createContext<GrocerryListContextType | null>(
  null
);

const GroceryListProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [lists, setLists] = useState<GrocerryList[]>([]);

  const saveLists = (lists: GrocerryList[]) => {
    setLists(lists);
  };

  return (
    <GroceryListContext.Provider value={{ lists, saveLists }}>
      {children}
    </GroceryListContext.Provider>
  );
};

export default GroceryListProvider;
