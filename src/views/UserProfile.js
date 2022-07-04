import {
   View,
   Text,
   StyleSheet,
   ScrollView,
   TouchableOpacity,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../helpers/colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/login";
import LogoContainer from "./LogoContainer";

const UserProfile = () => {
   const navigation = useNavigation();
   const dispatch = useDispatch();

   const isLoggedIn = useSelector((state) => state.login.isLogged);
   const username = useSelector((state) => state.login.user);

   const capitalizeUsername = (str) => {
      return str[0].toUpperCase() + str.slice(1);
   };

   return (
      <ScrollView contentContainerStyle={styles.container}>
         <LogoContainer />
         <View style={styles.subContainer}>
            <View style={styles.header}>
               <Text style={styles.text}>Profile</Text>
               {isLoggedIn && (
                  <TouchableOpacity
                     style={styles.touch}
                     onPress={() => {
                        dispatch(logout());
                        navigation.navigate("Home");
                     }}
                  >
                     <View style={styles.link}>
                        <Icon style={styles.iconStyle} name="logout" />
                        <Text style={styles.linkText}>Logout</Text>
                     </View>
                  </TouchableOpacity>
               )}
            </View>
            <Text>
               Welcome, <Text style={styles.innerText}>{username ? capitalizeUsername(username) : "User"} </Text>
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
               <Text style={styles.homelink}>
                  <Icon style={styles.iconStyle} name="home" />
                  Go to homepage
               </Text>
            </TouchableOpacity>
         </View>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   container: {
      backgroundColor: "#fff"
   },
   subContainer: {
      padding: 20
   },
   header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
   },
   innerText: {
      fontWeight: "bold",
   },
   text: {
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 10,
      color: COLORS.blue,
   },
   touch: {
      alignItems: "center",
   },
   link: {
      backgroundColor: COLORS.red,
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      minWidth: 120,
   },
   linkText: {
      color: COLORS.white,
      fontWeight: 'bold',
      fontSize: 15,
      textTransform: "uppercase",
   },
   iconStyle: {
      color: COLORS.white,
      fontSize: 20,
   },
   homelink: {
      color: COLORS.white,
      backgroundColor: COLORS.darkBlue,
      marginTop: 20,
      padding: 10,
      fontSize: 15,
      textTransform: "uppercase",
      textAlign: "center",
      alignItems: 'center',
      fontWeight: 'bold'
   },
});

export default UserProfile;
