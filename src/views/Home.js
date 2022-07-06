import React from "react";
import {
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { useRoute } from '@react-navigation/native';
import LogoContainer from "./LogoContainer";
import COLORS from "../helpers/colors";
import SubMenu from "./SubMenu";

const Home = () => {
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
            </View>
         </ScrollView>
         <SubMenu />
      </>
   );
};

export default Home;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
   subContainer: {
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
