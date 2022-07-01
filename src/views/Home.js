import React from "react";
import {
   Image,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../helpers/colors";
import Loader from "../components/Loader";
import LogoContainer from "./LogoContainer";

const Home = () => {
   const navigation = useNavigation();

   return (
      <ScrollView style={styles.container}>
         <View style={styles.subContainer}>
            <LogoContainer />
            <Text style={styles.text}>Home</Text>
            <Text style={styles.description}>
               Chweb è un'azienda leader nello sviluppo web, specializzata nello
               sviluppo di soluzioni software di frontend , backend e mobile. Un
               team giovane e appassionato di tecnologia che lavora per
               garantire la miglior User Experience grazie alle competenze di
               sviluppo di interfacce Web e Mobile . I nostri developer sono
               professionisti sempre aggiornati sulle ultime tecnologie in grado
               di sviluppare soluzioni con diversi gradi di complessità. Sono
               problem solver flessibili e attenti al dettaglio.
            </Text>
            <TouchableOpacity
               style={styles.touch}
               onPress={() => navigation.navigate("RegisterForm")}
            >
               <Text style={styles.link}>Register now</Text>
            </TouchableOpacity>
         </View>
      </ScrollView>
   );
};

export default Home;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
   subContainer: {
      padding: 20,
   },
   text: {
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 10,
      color: COLORS.blue,
   },
   description: {
      marginBottom: 20,
      backgroundColor: "#e9ecef",
      padding: 10,
      color: COLORS.darkBlue,
   },
   touch: {
      alignItems: "center",
   },
   link: {
      color: COLORS.darkBlue,
      padding: 10,
      textDecorationLine: "underline",
      fontSize: 15,
      textTransform: "uppercase",
   },
});
