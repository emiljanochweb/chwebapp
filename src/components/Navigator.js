import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import COLORS from "../helpers/colors";
import Home from "../views/Home";
import LoginForm from "../views/LoginForm";
import RegisterForm from "../views/RegisterForm";
import UserProfile from "../views/UserProfile";

const Tab = createBottomTabNavigator();

const Navigator = () => {
  const isLoggedIn = useSelector((state) => state.login.isLogged);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: COLORS.blue,
        tabBarInactiveTintColor: COLORS.white,
        tabBarActiveBackgroundColor: COLORS.white,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: COLORS.blue,
          borderTopWidth: 0,
          elevation: 0,
        },

        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: COLORS.blue,
        },
        headerTintColor: COLORS.white,
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
