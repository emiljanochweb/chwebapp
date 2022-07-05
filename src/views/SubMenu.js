import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../helpers/colors";
import { useSelector } from "react-redux";

const SubMenu = () => {
   const navigation = useNavigation();
   const isLoggedIn = useSelector((state) => state.login.isLogged);

   return (
      <View style={styles.submenu}>
         <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <View style={styles.profile}>
               <Icon style={styles.profileIcon} name="home" />
            </View>
         </TouchableOpacity>
         {!isLoggedIn && (
            <>
               <TouchableOpacity
                  onPress={() => navigation.navigate("RegisterForm")}
               >
                  <View style={styles.profile}>
                     <Icon
                        style={styles.profileIcon}
                        name="application-edit-outline"
                     />
                  </View>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => navigation.navigate("LoginForm")}
               >
                  <View style={styles.profile}>
                     <Icon style={styles.profileIcon} name="login" />
                  </View>
               </TouchableOpacity>
            </>
         )}
         <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
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
