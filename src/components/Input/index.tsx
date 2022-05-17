import React from "react";
import { styles } from "./styles";
import { keyboardTypes } from "../../constants";
import { View, TextInput, ViewStyle, StyleProp } from "react-native";

interface PROPS {
  keyboardType?: keyboardTypes;
  placeholder?: string;
  onChangeText: (val: any) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const Input = ({
  keyboardType,
  containerStyle,
  placeholder,
  onChangeText,
}: PROPS) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        keyboardType={keyboardType ?? keyboardTypes.default}
        placeholder={placeholder}
        style={styles.input}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export { Input };
