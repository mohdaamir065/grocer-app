import { StyleSheet } from "react-native";
import { normalize } from "../../../theme";
import Colors from "../../../theme/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black_05,
  },
  xClose: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 10,
  },
  body: {
    marginTop: normalize(50),
  },
  button: {
    marginTop: normalize(30),
    backgroundColor: Colors.tint,
  },
  inputContainer: {
    marginTop: normalize(20),
  },
});

export { styles };
