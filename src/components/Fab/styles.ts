import { StyleSheet } from "react-native";
import { normalize } from "../../theme";
import Colors from "../../theme/Colors";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: normalize(20),
    bottom: normalize(25),
    height: normalize(40),
    width: normalize(40),
    borderRadius: normalize(40),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.tint,
  },
});

export { styles };
