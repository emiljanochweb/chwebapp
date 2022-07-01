import {
   Text,
   StyleSheet,
   View,
   TouchableOpacity,
   ScrollView,
   Alert,
   Keyboard
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Input from "../components/Input";
import Button from "../components/Button";
import COLORS from "../helpers/colors";
import Airtable from "airtable";
import LogoContainer from "./LogoContainer";

const base = new Airtable({ apiKey: "keyhCKeUwLaAVuNWB" }).base(
   "appZpNOdNq1NeGspC"
);

const RegisterForm = () => {
   const navigation = useNavigation();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   const submitHandler = () => {
      Keyboard.dismiss();
      let isValid = true;

      if (
         username.length === 0 ||
         password.length === 0 ||
         confirmPassword.length === 0
      ) {
         Alert.alert("Fields should not be empty!");
         isValid = false;
      } else if (username.length < 3) {
         Alert.alert("Username is too short!");
         isValid = false;
      } else if (password.length < 8) {
         Alert.alert("Password is too short!");
         isValid = false;
      } else if (password !== confirmPassword) {
         Alert.alert("Password don't match!");
         isValid = false;
      }

      if(isValid){
         base("Users").create({
            Name: username,
            Password: password,
         });
   
         setUsername("");
         setPassword("");
         setConfirmPassword("");
         navigation.navigate("UserProfile", { username });
      }
   };

   return (
      <ScrollView style={styles.container}>
         <View style={styles.subContainer}>
         <LogoContainer />
            <Text style={styles.text}>Register</Text>
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
            <Input
               label="Confirm Password"
               password
               iconName="lock-outline"
               onChangeText={setConfirmPassword}
               value={confirmPassword}
            />
            <Button title="REGISTER" onPress={submitHandler} />
            <TouchableOpacity
               style={styles.touch}
               onPress={() => navigation.navigate("LoginForm")}
            >
               <Text style={styles.link}>Already have an account? Login</Text>
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

export default RegisterForm;
