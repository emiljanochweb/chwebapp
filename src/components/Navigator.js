import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import COLORS from "../helpers/colors";
import Home from "../views/Home";
import RegisterForm from "../views/RegisterForm";
import LoginForm from "../views/LoginForm";
import UserProfile from "../views/UserProfile";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const Navigator = () => {
   const isLoggedIn = useSelector((state) => state.login.isLogged);

   console.warn(isLoggedIn, "test");

   return (
      <Tab.Navigator
         initialRouteName="Home"
         screenOptions={{
            tabBarActiveTintColor: COLORS.blue,
            tabBarInactiveTintColor: COLORS.white,
            tabBarActiveBackgroundColor: COLORS.lightBlue,
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
               backgroundColor: COLORS.blue,
            },
            headerStyle: {
               backgroundColor: COLORS.blue,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
               fontWeight: "bold",
            },
            headerTitleAlign: "center",
         }}
      >
         <Tab.Screen
            name="Home"
            component={Home}
            options={{
               title: "Home",
               tabBarShowLabel: false,
               tabBarIcon: ({ color, size }) => (
                  <Icon name="home" size={size} color={color} />
               ),
            }}
         />
         {!isLoggedIn && (
            <>
               <Tab.Screen
                  name="RegisterForm"
                  component={RegisterForm}
                  options={{
                     title: "Register",
                     tabBarShowLabel: false,
                     tabBarIcon: ({ color, size }) => (
                        <Icon name="account-plus" size={size} color={color} />
                     ),
                  }}
               />
               <Tab.Screen
                  name="LoginForm"
                  component={LoginForm}
                  options={{
                     title: "Login",
                     tabBarShowLabel: false,
                     tabBarIcon: ({ color, size }) => (
                        <Icon name="login" size={size} color={color} />
                     ),
                  }}
               />
            </>
         )}
         <Tab.Screen
            name="UserProfile"
            component={UserProfile}
            options={{
               title: "Profile",
               tabBarShowLabel: false,
               tabBarIcon: ({ color, size }) => (
                  <Icon name="account" size={size} color={color} />
               ),
            }}
         />
      </Tab.Navigator>
   );
};

export default Navigator;

const styles = StyleSheet.create({});
