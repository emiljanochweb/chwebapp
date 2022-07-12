import { useRoute } from "@react-navigation/native";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Item from "../components/Item";
import COLORS from "../helpers/colors";
import { DATA } from "../helpers/constants";
import LogoContainer from "./LogoContainer";
import { LogBox } from 'react-native';
import { useEffect } from "react";

const Home = () => {
  const { name } = useRoute();

  const renderItem = ({ item }) => (
    <Item title={item.title} desc={item.desc} />
  );

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <LogoContainer name={name} />
        <View style={styles.subContainer}>
          <Text style={styles.description}>
            Chweb è un'azienda leader nello sviluppo web, specializzata nello
            sviluppo di soluzioni software di frontend, backend e mobile. Un
            team giovane e appassionato di tecnologia che lavora per garantire
            la miglior User Experience grazie alle competenze di sviluppo di
            interfacce Web e Mobile. I nostri developer sono professionisti
            sempre aggiornati sulle ultime tecnologie in grado di sviluppare
            soluzioni con diversi gradi di complessità. Sono problem solver
            flessibili e attenti al dettaglio.
          </Text>
        <FlatList
          nestedScrollEnabled={true}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </>
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
    lineHeight: 25
  },
});
