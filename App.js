import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import LoginForm from "./src/views/LoginForm";
import UserProfile from "./src/views/UserProfile";
import RegisterForm from "./src/views/RegisterForm";
import Home from "./src/views/Home";
import loginReducer from "./src/reducers/login";

const Stack = createNativeStackNavigator();

const store = configureStore({
   reducer: {
      login: loginReducer,
   },
});

export default function App() {
   return (
      <Provider store={store}>
         <NavigationContainer>
            <Stack.Navigator
               initialRouteName="Home"
               screenOptions={{ headerShown: false }}
            >
               <Stack.Screen name="Home" component={Home} />
               <Stack.Screen name="RegisterForm" component={RegisterForm} />
               <Stack.Screen name="LoginForm" component={LoginForm} />
               <Stack.Screen name="UserProfile" component={UserProfile} />
            </Stack.Navigator>
         </NavigationContainer>
      </Provider>
   );
}
