import {
   Text,
   StyleSheet,
   ScrollView,
   TouchableOpacity,
   View,
   Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Airtable from "airtable";
import Input from "../components/Input";
import Button from "../components/Button";
import COLORS from "../helpers/colors";
import Loader from "../components/Loader";
import LogoContainer from "./LogoContainer";

const base = new Airtable({ apiKey: "keyhCKeUwLaAVuNWB" }).base(
   "appZpNOdNq1NeGspC"
);

const LoginForm = () => {
   const navigation = useNavigation();

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [items, setItems] = useState([]);

   useEffect(() => {
      base("Users")
         .select({ view: "Grid view" })
         .eachPage((records, fetchNextPage) => {
            setItems(records);
            fetchNextPage();
         });
   }, []);

   const submitHandler = () => {
      if (username.length === 0 || password.length === 0) {
         Alert.alert("Username and password should not be empty!");
         return;
      }

      const usernameFound = items.find((item) => item.fields.Name === username);
      const passwordFound = items.find((itemP) => itemP.fields.Password === password);

      if (usernameFound !== undefined && passwordFound !== undefined) {
         setUsername("");
         setPassword("");
         navigation.navigate("UserProfile", { username });
      } else {
         Alert.alert("Username or password is incorrent!");
         return;
      }
   };

   return (
      <ScrollView style={styles.container}>
         <View style={styles.subContainer}>
         <LogoContainer />
            <Text style={styles.text}>Login</Text>
            <Input
               label="Username"
               iconName="email-outline"
               onChangeText={setUsername}
               value={username}
            />
            <Input
               label="Password"
               password
               iconName="lock-outline"
               onChangeText={setPassword}
               value={password}
            />
            <Button title="LOGIN" onPress={submitHandler} />
            <TouchableOpacity
               style={styles.touch}
               onPress={() => navigation.navigate("RegisterForm")}
            >
               <Text style={styles.link}>Create a new account</Text>
            </TouchableOpacity>
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
      color: COLORS.darkBlue,
      padding: 10,
      textDecorationLine: "underline",
      fontSize: 15,
      textTransform: "uppercase",
   },
});

export default LoginForm;
