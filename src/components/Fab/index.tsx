import React from "react";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface PROPS {
  onPress: (val: boolean) => void;
}

const Fab = ({ onPress }: PROPS) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(true)}>
      <Ionicons name="add-sharp" size={24} color="white" />
    </TouchableOpacity>
  );
};

export { Fab };
