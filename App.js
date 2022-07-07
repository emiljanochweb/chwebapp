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
        backgroundColor: COLORS.blue,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerTitleAlign: "center",
    };
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: true,
            gestureEnabled: false,
            headerLeft: () => <></>,
          }}
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
