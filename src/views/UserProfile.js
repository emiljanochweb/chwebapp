import {
   View,
   Text,
   StyleSheet,
   ScrollView,
   TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../helpers/colors";
import { logout } from "../reducers/login";
import SubMenu from "./SubMenu";
import { useRoute } from "@react-navigation/native";

const UserProfile = () => {
   const navigation = useNavigation();
   const dispatch = useDispatch();

   const isLoggedIn = useSelector((state) => state.login.isLogged);
   const username = useSelector((state) => state.login.user);

   const [quotes, setQuotes] = useState([]);

   const capitalizeUsername = (str) => {
      return str[0].toUpperCase() + str.slice(1);
   };

   const getNewQuote = async () => {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      setQuotes(data);
   };

   useEffect(() => {
      getNewQuote();
   }, []);

   const dateNow = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
   });

   const indx = Math.floor(Math.random() * quotes.length);

   const { text, author } = quotes.length > 0 && quotes[indx];

   return (
      <>
         <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.subContainer}>
               <View style={styles.logoutContainer}>
                  <Text style={styles.innerText}>
                     {username ? capitalizeUsername(username) : "Guest"}
                  </Text>
                  {isLoggedIn && (
                     <TouchableOpacity
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
               <View style={styles.general}>
                  <Text style={styles.dateNow}>{dateNow}</Text>
                  <Text style={styles.quoteText}>
                     "{text}" <Text style={styles.quoteAuthor}>{author}</Text>
                  </Text>
               </View>
            </View>
         </ScrollView>
         <SubMenu />
      </>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
   subContainer: {
      paddingHorizontal: 20,
      paddingVertical: 25,
   },
   logoutContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
   },
   general: {
      backgroundColor: COLORS.grey,
      padding: 20,
   },
   dateNow: {
      textDecorationLine: "underline",
   },
   quoteText: {
      color: COLORS.blue,
      fontSize: 22,
      fontStyle: "italic",
   },
   quoteAuthor: {
      color: COLORS.light,
      fontSize: 20,
      fontStyle: "normal",
   },
   innerText: {
      fontWeight: "bold",
      fontSize: 30,
   },
   link: {
      backgroundColor: COLORS.red,
      paddingVertical: 10,
      paddingHorizontal: 15,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      minWidth: 150,
   },
   linkText: {
      color: COLORS.white,
      fontWeight: "bold",
      fontSize: 15,
      textTransform: "uppercase",
   },
   iconStyle: {
      color: COLORS.white,
      fontSize: 20,
   },
});

export default UserProfile;
