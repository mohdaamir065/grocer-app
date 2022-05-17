import { StyleSheet } from "react-native";
import Colors from "../../theme/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  list: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  listDone: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  btnText: {
    color: Colors.white,
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: Colors.gray,
    borderBottomColor: Colors.black,
    borderBottomWidth: 0.5,
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: Colors.white,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 5,
  },
  actionButton: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  closeBtn: {
    backgroundColor: Colors.tint,
    right: 75,
  },
  doneBtn: {
    backgroundColor: Colors.green,
    right: 0,
  },
  emptyComponentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  noLists: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
export { styles };
