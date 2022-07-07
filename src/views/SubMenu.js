import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import COLORS from "../helpers/colors";

const SubMenu = () => {
  const navigation = useNavigation();
  const isLoggedIn = useSelector((state) => state.login.isLogged);

  return (
    <View style={styles.submenu}>
      <TouchableOpacity onPress={() => navigation.push("Home")}>
        <View style={styles.profile}>
          <Icon style={styles.profileIcon} name="home" />
        </View>
      </TouchableOpacity>
      {!isLoggedIn && (
        <>
          <TouchableOpacity onPress={() => navigation.push("RegisterForm")}>
            <View style={styles.profile}>
              <Icon style={styles.profileIcon} name="account-plus" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("LoginForm")}>
            <View style={styles.profile}>
              <Icon style={styles.profileIcon} name="login" />
            </View>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity onPress={() => navigation.push("UserProfile")}>
        <View style={styles.profile}>
          <Icon style={styles.profileIcon} name="account" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SubMenu;

const styles = StyleSheet.create({
  submenu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.blue,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  profile: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileIcon: {
    color: COLORS.white,
    fontSize: 30,
  },
});
