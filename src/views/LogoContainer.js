import { Image, StyleSheet, View } from "react-native";
import COLORS from "../helpers/colors";

const LogoContainer = ({ name }) => {
  let path = require("../../assets/logoimage.png");
  if (name === "RegisterForm") {
    path = require("../../assets/registration.jpg");
  }
  if (name === "LoginForm") {
    path = require("../../assets/login.jpg");
  }

  return (
    <View style={styles.center}>
      <Image style={styles.image} source={path} />
    </View>
  );
};

export default LogoContainer;

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    height: 120,
    paddingBottom: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: COLORS.white,
    flexDirection: "row",
    width: "100%",
  },
});
