import Colors from "../../theme/Colors";
import { normalize } from "../../theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: normalize(45),
    backgroundColor: Colors.black_05,
    marginHorizontal: normalize(15),
    borderRadius: 10,
  },
  input: {
    flex: 1,
    padding: normalize(8),
    color: Colors.white,
  },
});

export { styles };
