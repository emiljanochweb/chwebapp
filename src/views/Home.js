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
import { useRoute } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LogoContainer from "./LogoContainer";
import COLORS from "../helpers/colors";
import SubMenu from "./SubMenu";

const Home = () => {
   const isLoggedIn = useSelector((state) => state.login.isLogged);

   const navigation = useNavigation();
   const {name} = useRoute();

   return (
      <>
         <ScrollView contentContainerStyle={styles.container}>
            <LogoContainer name={name} />
            <View style={styles.subContainer}>
               <Text style={styles.description}>
                  Chweb è un'azienda leader nello sviluppo web, specializzata
                  nello sviluppo di soluzioni software di frontend, backend e
                  mobile. Un team giovane e appassionato di tecnologia che
                  lavora per garantire la miglior User Experience grazie alle
                  competenze di sviluppo di interfacce Web e Mobile. I nostri
                  developer sono professionisti sempre aggiornati sulle ultime
                  tecnologie in grado di sviluppare soluzioni con diversi gradi
                  di complessità. Sono problem solver flessibili e attenti al
                  dettaglio.
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
            </View>
         </ScrollView>
         <SubMenu />
      </>
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
      paddingVertical: 25
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
