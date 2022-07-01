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
import LogoContainer from "./LogoContainer";
import { useSelector } from "react-redux";


const UserProfile = ({ route }) => {
   const navigation = useNavigation();
   const uName = route.params;

   const loginRedux = useSelector((state) => state.login.isLogged);

   console.warn(loginRedux, 'lr')

   return (
      <ScrollView style={styles.container}>
         <View style={styles.subContainer}>
         <LogoContainer />
         {loginRedux && (
            <>
            <View style={styles.header}>
               <Text style={styles.text}>Profile</Text>
               <TouchableOpacity
                  style={styles.touch}
                  onPress={() => navigation.navigate("Home")}
               >
                  <Text style={styles.link}>Logout</Text>
               </TouchableOpacity>
            </View>
            <Text>
               Welcome, <Text style={styles.innerText}>{uName.username}</Text>
            </Text>
            <Text>You are now logged in!</Text>
            </>
         )
         }
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
});

export default UserProfile;
