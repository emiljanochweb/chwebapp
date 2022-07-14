import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../helpers/colors";
import { capitalizeUsername } from "../helpers/utils";
import { logout } from "../reducers/login";

const UserProfile = () => {
   const navigation = useNavigation();
   const dispatch = useDispatch();

   const isLoggedIn = useSelector((state) => state.login.isLogged);
   const username = useSelector((state) => state.login.user);

   const [quote, setQuote] = useState([]);

   const getNewQuote = async () => {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();

      let indx = Math.floor(Math.random() * data.length);

      setQuote(data[indx]);
   };

   useEffect(() => {
      getNewQuote();
   }, []);

   const dateNow = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
   });

   const { text, author } = quote;

   return (
      <ScrollView contentContainerStyle={styles.container}>
         <View style={styles.subContainer}>
            <View style={styles.logoutContainer}>
               <Text style={styles.innerText}>
                  {username ? capitalizeUsername(username) : "Guest"}
               </Text>
               {isLoggedIn ? (
                  <TouchableOpacity
                     style={[
                        styles.linkButton,
                        {
                           backgroundColor: COLORS.red,
                        },
                     ]}
                     onPress={() => {
                        dispatch(logout());
                        navigation.navigate("UserProfile");
                     }}
                  >
                     <Icon style={styles.iconStyle} name="logout" />
                     <Text style={styles.linkText}>Logout</Text>
                  </TouchableOpacity>
               ) : (
                  <TouchableOpacity
                     style={[
                        styles.linkButton,
                        {
                           backgroundColor: COLORS.green,
                        },
                     ]}
                     onPress={() => {
                        navigation.navigate("LoginForm");
                     }}
                  >
                     <Icon style={styles.iconStyle} name="login" />
                     <Text style={styles.linkText}>Login</Text>
                  </TouchableOpacity>
               )}
            </View>
            {isLoggedIn && (
               <View style={styles.general}>
                  <View style={styles.dateNow}>
                     <Icon style={styles.dateIcon} name="calendar-month" />
                     <Text
                        style={{
                           fontSize: 25,
                        }}
                     >
                        {dateNow}
                     </Text>
                  </View>
                  <View>
                     <Text style={styles.quoteText}>{text}</Text>
                     <Text style={styles.quoteAuthor}>{author}</Text>
                  </View>
               </View>
            )}
         </View>
      </ScrollView>
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
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
   },
   general: {
      paddingVertical: 20,
   },
   dateNow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
   },
   dateIcon: {
      fontSize: 35,
   },
   quoteText: {
      color: COLORS.blue,
      fontSize: 22,
      fontStyle: "italic",
   },
   quoteAuthor: {
      color: COLORS.black,
      fontSize: 20,
      fontStyle: "normal",
      textDecorationLine: "underline",
   },
   innerText: {
      fontWeight: "bold",
      fontSize: 30,
      width: "65%",
   },
   linkButton: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      width: "35%",
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
