import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import COLORS from "./src/helpers/colors";
import loginReducer from "./src/reducers/login";
import Home from "./src/views/Home";
import LoginForm from "./src/views/LoginForm";
import RegisterForm from "./src/views/RegisterForm";
import UserProfile from "./src/views/UserProfile";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const store = configureStore({
   reducer: {
      login: loginReducer,
   },
});

export default function App() {
   return (
      <Provider store={store}>
         <NavigationContainer>
            <Tab.Navigator
               initialRouteName="Home"
               screenOptions={{
                  tabBarActiveTintColor: COLORS.blue,
                  tabBarInactiveTintColor: COLORS.white,
                  tabBarActiveBackgroundColor: COLORS.lightBlue,
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
                    title: 'Login',
                     tabBarShowLabel: false,
                     tabBarIcon: ({ color, size }) => (
                        <Icon name="login" size={size} color={color} />
                     ),
                  }}
               />
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
         </NavigationContainer>
      </Provider>
   );
}
