import { StyleSheet } from "react-native";
import { normalize } from "../../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: normalize(55),
    width: "100%",
    borderBottomWidth: 0.5,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: normalize(10),
  },
  placeholder: {
    height: 24,
    width: 24,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#1A132F",
  },
});

export { styles };
