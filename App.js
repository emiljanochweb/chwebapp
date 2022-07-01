import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginForm from "./src/views/LoginForm";
import UserProfile from "./src/views/UserProfile";
import RegisterForm from "./src/views/RegisterForm";
import Home from "./src/views/Home";

const Stack = createNativeStackNavigator();

export default function App() {
   return (
      <NavigationContainer>
            <Stack.Navigator
               initialRouteName="Home"
               screenOptions={{ headerShown: true }}
            >
               <Stack.Screen name="Home" component={Home} />
               <Stack.Screen name="RegisterForm" component={RegisterForm} />
               <Stack.Screen name="LoginForm" component={LoginForm} />
               <Stack.Screen name="UserProfile" component={UserProfile} />
            </Stack.Navigator>
         </NavigationContainer>
   );
}