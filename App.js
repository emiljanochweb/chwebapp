import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import LoginForm from "./src/views/LoginForm";
import UserProfile from "./src/views/UserProfile";
import RegisterForm from "./src/views/RegisterForm";
import Home from "./src/views/Home";
import loginReducer from "./src/reducers/login";
import COLORS from "./src/helpers/colors";

const Stack = createNativeStackNavigator();

const store = configureStore({
   reducer: {
      login: loginReducer,
   },
});

export default function App() {
   const customOptions = (name) => {
      return {
         title: name,
         headerStyle: {
            backgroundColor: COLORS.blue
         },
         headerTintColor: "#fff",
         headerTitleStyle: {
            fontWeight: "bold",
         },
         headerTitleAlign: 'center'
      };
   };

   return (
      <Provider store={store}>
         <NavigationContainer>
            <Stack.Navigator
               initialRouteName="Home"
               screenOptions={{ headerShown: true, gestureEnabled: false, headerLeft: () => <></>,}}
            >
               <Stack.Screen
                  name="Home"
                  component={Home}
                  options={customOptions("Home")}
               />
               <Stack.Screen
                  name="RegisterForm"
                  component={RegisterForm}
                  options={customOptions("Register")}
               />
               <Stack.Screen
                  name="LoginForm"
                  component={LoginForm}
                  options={customOptions("Login")}
               />
               <Stack.Screen
                  name="UserProfile"
                  component={UserProfile}
                  options={customOptions("Profile")}
               />
            </Stack.Navigator>
         </NavigationContainer>
      </Provider>
   );
}
