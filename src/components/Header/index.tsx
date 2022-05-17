import React from "react";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import Colors from "../../theme/Colors";

interface PROPS {
  title: string;
  onBack?: () => void;
  onRight?: () => void;
}

const Header = ({ title, onBack, onRight }: PROPS) => {
  const RenderBackButton = () =>
    onBack ? (
      <TouchableOpacity onPress={onBack}>
        <Ionicons name="chevron-back-outline" size={24} color={Colors.black} />
      </TouchableOpacity>
    ) : (
      <View style={styles.placeholder} />
    );

  const RenderRightButton = () =>
    onRight ? (
      <TouchableOpacity onPress={onRight}>
        <FontAwesome5 name="check" size={24} color={Colors.black} />
      </TouchableOpacity>
    ) : (
      <View style={styles.placeholder} />
    );
  return (
    <View style={styles.container}>
      <RenderBackButton />
      <Text style={styles.title}>{title}</Text>
      <RenderRightButton />
    </View>
  );
};

export { Header };
