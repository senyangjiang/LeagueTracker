import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default StartStyles = StyleSheet.create({
  container: {
    marginTop: getStatusBarHeight(),
    flex: 1,
    flexDirection: "column",
  },
  header: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  fontTitle: {
    textAlign: "center",
    fontFamily: 'MSBold',
    fontSize: 36,
  },
  fontBody: {
    textAlign: "center",
    fontFamily: 'MSLight',
    fontSize: 18,
    color: "white",
  },
  body: {
    flex: 5,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  horizontalBox: {
    marginLeft: '10%',
    marginRight: '10%',
    margin: 20,
    flexDirection: "row",
  },
  input: {
    flex: 8,
    height: 40,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },
  button: {
    flex: 2,
    justifyContent: "center",
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
  },
});
