import {
   Text,
   StyleSheet,
   View,
   TouchableOpacity,
   ScrollView,
   Alert,
   Keyboard,
   KeyboardAvoidingView,
   Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Input from "../components/Input";
import Button from "../components/Button";
import COLORS from "../helpers/colors";
import Airtable from "airtable";
import LogoContainer from "./LogoContainer";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/login";

const base = new Airtable({ apiKey: "keyhCKeUwLaAVuNWB" }).base(
   "appZpNOdNq1NeGspC"
);

const RegisterForm = () => {
   const isLoggedIn = useSelector((state) => state.login.isLogged);

   const dispatch = useDispatch();
   const navigation = useNavigation();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
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
      Keyboard.dismiss();
      let isValid = true;

      const usernameFound = items.find(
         (item) => item.fields.Name.toLowerCase() === username.toLowerCase()
      );

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
      } else if (usernameFound !== undefined) {
         Alert.alert("This user is already registered!");
         isValid = false;
      } else if (password.length < 12) {
         Alert.alert("Password is too short!");
         isValid = false;
      } else if (password !== confirmPassword) {
         Alert.alert("Password don't match!");
         isValid = false;
      }

      if (isValid) {
         base("Users").create({
            Name: username.toLowerCase(),
            Password: password,
         });

         dispatch(login(username));
         setUsername("");
         setPassword("");
         setConfirmPassword("");
         navigation.navigate("UserProfile");
      }
   };

   const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

   return (
      !isLoggedIn && (
         <>
            <KeyboardAvoidingView
               style={styles.container}
               behavior="padding"
               keyboardVerticalOffset={keyboardVerticalOffset}
            >
               <ScrollView
                  contentContainerStyle={{ justifyContent: "flex-start" }}
               >
                  <LogoContainer />
                  <View style={styles.subContainer}>
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
                        <Text style={styles.link}>
                           Already have an account? Login
                        </Text>
                     </TouchableOpacity>
                  </View>
               </ScrollView>
            </KeyboardAvoidingView>
         </>
      )
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.white,
   },
   subContainer: {
      flex: 1,
      paddingHorizontal: 20,
   },
   text: {
      color: COLORS.blue,
      fontWeight: "bold",
      fontSize: 30,
      marginBottom: 10,
   },
   touch: {
      alignItems: "center",
   },
   link: {
      color: COLORS.darkBlue,
      fontSize: 15,
      textDecorationLine: "underline",
      textTransform: "uppercase",
      padding: 10,
   },
});

export default RegisterForm;
