import React from "react";
import { styles } from "./styles";
import { Text, TouchableOpacity, StyleProp, ViewStyle } from "react-native";

interface PROPS {
  title: string;
  onPress: () => void;
  containerStyle: StyleProp<ViewStyle>;
}

const Button = ({ title, onPress, containerStyle }: PROPS) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export { Button };
