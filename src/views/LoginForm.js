import {
   Text,
   StyleSheet,
   ScrollView,
   TouchableOpacity,
   View,
   Alert,
   KeyboardAvoidingView,
   SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Airtable from "airtable";
import Input from "../components/Input";
import Button from "../components/Button";
import COLORS from "../helpers/colors";
import LogoContainer from "./LogoContainer";
import { login } from "../reducers/login";
import { useRoute } from "@react-navigation/native";
import SubMenu from "./SubMenu";
import { keyboardBehaviour } from "../helpers/utils";
import { useHeaderHeight } from "@react-navigation/elements";

const base = new Airtable({ apiKey: "keyhCKeUwLaAVuNWB" }).base(
   "appZpNOdNq1NeGspC"
);

const LoginForm = () => {
   const isLoggedIn = useSelector((state) => state.login.isLogged);

   const dispatch = useDispatch();
   const navigation = useNavigation();
   const { name } = useRoute();
   const headerHeight = useHeaderHeight();

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
      let trimmedUsername = username.trim();
      let trimmedPassword = password.trim();

      if (trimmedUsername.length === 0 || trimmedPassword.length === 0) {
         Alert.alert("Username and password should not be empty!");
         return;
      }

      const usernameFound = items.find(
         (item) =>
            item.fields.Name.toLowerCase() === trimmedUsername.toLowerCase()
      );
      const passwordFound = items.find(
         (itemP) => itemP.fields.Password === trimmedPassword
      );

      if (usernameFound !== undefined && passwordFound !== undefined) {
         setUsername("");
         setPassword("");
         dispatch(login(trimmedUsername));
         navigation.navigate("UserProfile");
      } else {
         Alert.alert("Username or password is incorrent!");
         return;
      }
   };

   return (
      !isLoggedIn && (
         <>
            <KeyboardAvoidingView
               style={styles.container}
               behavior={keyboardBehaviour}
               keyboardVerticalOffset={headerHeight}
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
                     <Button title="LOGIN" onPress={submitHandler} />
                     <TouchableOpacity
                        style={styles.touch}
                        onPress={() => navigation.navigate("RegisterForm")}
                     >
                        <Text style={styles.link}>Create a new account</Text>
                     </TouchableOpacity>
                  </View>
               </ScrollView>
            </KeyboardAvoidingView>
            <SafeAreaView>
               <SubMenu />
            </SafeAreaView>
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
      padding: 10,
      textDecorationLine: "underline",
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
      alignItems: "center",
      fontWeight: "bold",
   },
});

export default LoginForm;
