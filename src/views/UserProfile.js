import {
   View,
   Text,
   StyleSheet,
   ScrollView,
   TouchableOpacity,
} from "react-native";
import React from "react";
import COLORS from "../helpers/colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/login";

const UserProfile = () => {
   const navigation = useNavigation();
   const dispatch = useDispatch();

   const isLoggedIn = useSelector((state) => state.login.isLogged);
   const username = useSelector((state) => state.login.user);

   return (
      <ScrollView style={styles.container}>
         <View style={styles.subContainer}>
            <View style={styles.header}>
               <Text style={styles.text}>Profile</Text>
               {isLoggedIn && (
                  <TouchableOpacity
                     style={styles.touch}
                     onPress={() => {
                        dispatch(logout());
                        navigation.navigate("Home");
                     }
                  }
                  >
                     <Text style={styles.link}>Logout</Text>
                  </TouchableOpacity>
               )}
            </View>
            <Text>Welcome, {username ? username : 'User'}</Text>
            {isLoggedIn && <Text>You are now logged in!</Text>}
            <TouchableOpacity
               onPress={() => navigation.navigate("Home")}
            >
               <Text style={styles.homelink}>Go to homepage</Text>
            </TouchableOpacity>
         </View>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
   },
   innerText: {
      fontWeight: "bold",
   },
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
   subContainer: {
      padding: 20,
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
      color: COLORS.white,
      backgroundColor: COLORS.red,
      padding: 10,
      textDecorationLine: "underline",
      fontSize: 15,
      textTransform: "uppercase",
   },
   homelink: {
      color: COLORS.white,
      backgroundColor: COLORS.darkBlue,
      marginTop: 20,
      padding: 10,
      fontSize: 15,
      textTransform: "uppercase",
      textAlign: 'center'
   },
});

export default UserProfile;
