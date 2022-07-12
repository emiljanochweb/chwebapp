import { NavigationContainer } from "@react-navigation/native";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import loginReducer from "./src/reducers/login";
import Navigator from "./src/components/Navigator";


const store = configureStore({
   reducer: {
      login: loginReducer,
   },
});

export default function App() {
    return (
      <Provider store={store}>
         <NavigationContainer>
            <Navigator />
         </NavigationContainer>
      </Provider>
   );
}
