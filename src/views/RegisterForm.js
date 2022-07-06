import {
   Text,
   StyleSheet,
   View,
   TouchableOpacity,
   ScrollView,
   Alert,
   Keyboard,
   KeyboardAvoidingView
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Airtable from "airtable";
import Input from "../components/Input";
import Button from "../components/Button";
import COLORS from "../helpers/colors";
import LogoContainer from "./LogoContainer";
import { login } from "../reducers/login";
import { useRoute } from "@react-navigation/native";
import SubMenu from "./SubMenu";
import { keyboardVerticalOffset } from "../helpers/utils";

const base = new Airtable({ apiKey: "keyhCKeUwLaAVuNWB" }).base(
   "appZpNOdNq1NeGspC"
);

const RegisterForm = () => {
   const isLoggedIn = useSelector((state) => state.login.isLogged);

   const dispatch = useDispatch();
   const navigation = useNavigation();
   const { name } = useRoute();

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

      let trimmedUsername = username.trim();
      let trimmedPassword = password.trim();
      let trimmedConfirmPassword = confirmPassword.trim();

      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      // const minLengthRegExp = /.{8,}/;

      const uppercasePassword = uppercaseRegExp.test(trimmedPassword);
      const lowercasePassword = lowercaseRegExp.test(trimmedPassword);
      const digitsPassword = digitsRegExp.test(trimmedPassword);
      const specialCharPassword = specialCharRegExp.test(trimmedPassword);
      // const minLengthPassword = minLengthRegExp.test(trimmedPassword);

      const usernameFound = items.find(
         (item) =>
            item.fields.Name.toLowerCase() === trimmedUsername.toLowerCase()
      );

      if (
         trimmedUsername.length === 0 ||
         trimmedPassword.length === 0 ||
         trimmedConfirmPassword.length === 0
      ) {
         Alert.alert("Fields should not be empty!");
         isValid = false;
      } else if (trimmedUsername.length < 3) {
         Alert.alert("Username is too short!");
         isValid = false;
      } else if (usernameFound !== undefined) {
         Alert.alert("This user is already registered!");
         isValid = false;
      } else if (trimmedPassword.length < 12) {
         Alert.alert("Password is too short!");
         isValid = false;
      } else if (!uppercasePassword) {
         Alert.alert("Password should have at least one uppercase!");
         isValid = false;
      } else if (!lowercasePassword) {
         Alert.alert("Password should have at least one lowercase!");
         isValid = false;
      } else if (!digitsPassword) {
         Alert.alert("Password should have at least one digit!");
         isValid = false;
      } else if (!specialCharPassword) {
         Alert.alert("Password should have at least one special character!");
         isValid = false;
      } else if (trimmedPassword !== trimmedConfirmPassword) {
         Alert.alert("Password don't match!");
         isValid = false;
      }

      if (isValid) {
         base("Users").create({
            Name: trimmedUsername.toLowerCase(),
            Password: trimmedPassword,
         });

         dispatch(login(trimmedUsername));
         setUsername("");
         setPassword("");
         setConfirmPassword("");
         navigation.navigate("UserProfile");
      }
   };

   return (
      !isLoggedIn && (
         <>
            <KeyboardAvoidingView
               style={styles.container}
               behavior="padding"
               keyboardVerticalOffset={keyboardVerticalOffset}
            >
               <ScrollView>
                  <LogoContainer name={name} />
                  <View style={styles.subContainer}>
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
            <SubMenu />
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
      paddingHorizontal: 20,
      paddingVertical: 25,
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
      alignItems: "center",
      fontWeight: "bold",
   },
});

export default RegisterForm;
