import { Navigation } from "./navigation";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import GroceryListProvider from "./context/GroceryListContext";
import GroceryItemProvider from "./context/GroceryItemContext";

const App = () => {
  return (
    <SafeAreaProvider>
      <GroceryListProvider>
        <GroceryItemProvider>
          <Navigation />
          <StatusBar />
        </GroceryItemProvider>
      </GroceryListProvider>
    </SafeAreaProvider>
  );
};

export default App;
