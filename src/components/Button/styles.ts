import { StyleSheet } from "react-native";
import { normalize } from "../../theme";
import Colors from "../../theme/Colors";

const styles = StyleSheet.create({
  container: {
    height: normalize(45),
    backgroundColor: Colors.tint,
    marginHorizontal: normalize(15),
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export { styles };
