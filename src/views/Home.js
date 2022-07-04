import React from "react";
import {
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LogoContainer from "./LogoContainer";
import COLORS from "../helpers/colors";
import Copyright from "./Copyright";

const Home = () => {
   const isLoggedIn = useSelector((state) => state.login.isLogged);
   const navigation = useNavigation();

   return (
      <ScrollView contentContainerStyle={styles.container}>
         <LogoContainer />
         <View style={styles.subContainer}>
            <View style={styles.home}>
               <Text style={styles.text}>Home</Text>
               {isLoggedIn && (
                  <TouchableOpacity
                     onPress={() => navigation.navigate("UserProfile")}
                  >
                     <View style={styles.profile}>
                        <Icon
                           style={styles.profileIcon}
                           name="human-greeting-variant"
                        />
                     </View>
                  </TouchableOpacity>
               )}
            </View>
            <Text style={styles.description}>
               Chweb è un'azienda leader nello sviluppo web, specializzata nello
               sviluppo di soluzioni software di frontend, backend e mobile. Un
               team giovane e appassionato di tecnologia che lavora per
               garantire la miglior User Experience grazie alle competenze di
               sviluppo di interfacce Web e Mobile. I nostri developer sono
               professionisti sempre aggiornati sulle ultime tecnologie in grado
               di sviluppare soluzioni con diversi gradi di complessità. Sono
               problem solver flessibili e attenti al dettaglio.
            </Text>
            {!isLoggedIn && (
               <>
                  <TouchableOpacity
                     style={styles.touch}
                     onPress={() => navigation.navigate("LoginForm")}
                  >
                     <Text style={styles.link}>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={styles.touch}
                     onPress={() => navigation.navigate("RegisterForm")}
                  >
                     <Text style={styles.link}>Register</Text>
                  </TouchableOpacity>
               </>
            )}
            <Copyright />
         </View>
      </ScrollView>
   );
};

export default Home;

const styles = StyleSheet.create({
   container: {
      justifyContent: "flex-start",
      backgroundColor: "#fff",
      height: "100%",
   },
   subContainer: {
      flex: 1,
      paddingHorizontal: 20,
   },
   home: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
   },
   text: {
      color: COLORS.blue,
      fontWeight: "bold",
      fontSize: 30,
   },
   profile: {
      backgroundColor: COLORS.blue,
      justifyContent: "center",
      alignItems: "center",
      width: 50,
      height: 50,
      borderRadius: 25,
   },
   profileIcon: {
      color: COLORS.white,
      fontSize: 30,
   },
   description: {
      color: COLORS.darkBlue,
      backgroundColor: COLORS.lightBlue,
      marginVertical: 20,
      padding: 10,
      fontSize: 16,
      textAlign: "justify",
   },
   touch: {
      alignItems: "center",
   },
   link: {
      color: COLORS.darkBlue,
      textDecorationLine: "underline",
      textTransform: "uppercase",
      fontSize: 15,
      padding: 10,
   },
});
