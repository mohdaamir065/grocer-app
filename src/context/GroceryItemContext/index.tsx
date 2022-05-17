import React, { createContext, useState } from "react";
import { GrocerryItemContextType } from "../../@types/grocerry";
import { GrocerryListItem } from "../../@types/index";

export const GroceryItemContext = createContext<GrocerryItemContextType | null>(
  null
);

const GroceryItemProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [items, setItems] = useState<GrocerryListItem[]>([]);

  const saveItems = (items: GrocerryListItem[]) => {
    setItems(items);
  };

  return (
    <GroceryItemContext.Provider value={{ items, saveItems }}>
      {children}
    </GroceryItemContext.Provider>
  );
};

export default GroceryItemProvider;
