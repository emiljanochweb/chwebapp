import { useRoute } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Item from "../components/Item";
import COLORS from "../helpers/colors";
import { DATA } from "../helpers/constants";
import LogoContainer from "./LogoContainer";

const Home = () => {
   const { name } = useRoute();

   return (
      <ScrollView contentContainerStyle={styles.container}>
         <LogoContainer name={name} />
         <View style={styles.subContainer}>
            <Text style={styles.description}>
               Chweb √® un'azienda leader nello sviluppo web, specializzata nello
               sviluppo di soluzioni software di frontend, backend e mobile. Un
               team giovane e appassionato di tecnologia che lavora per
               garantire la miglior User Experience grazie alle competenze di
               sviluppo di interfacce Web e Mobile. I nostri developer sono
               professionisti sempre aggiornati sulle ultime tecnologie in grado
               di sviluppare soluzioni con diversi gradi di complessit√†. Sono
               problem solver flessibili e attenti al dettaglio.
            </Text>
            {DATA.map((item) => (
               <Item
                  key={item.id}
                  title={item.title}
                  desc={item.desc}
                  id={item.id}
               />
            ))}
         </View>
      </ScrollView>
   );
};

export default Home;

const styles = StyleSheet.create({
   container: {
      flexGrow: 1,
      backgroundColor: "#fff",
   },
   subContainer: {
      paddingHorizontal: 20,
      paddingVertical: 25,
   },
   description: {
      color: COLORS.darkBlue,
      backgroundColor: COLORS.lightBlue,
      marginVertical: 20,
      padding: 10,
      fontSize: 16,
      textAlign: "justify",
      lineHeight: 25,
   },
});
