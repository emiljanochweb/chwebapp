import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { FlatList, LogBox, StyleSheet, Text, View } from "react-native";
import Item from "../components/Item";
import COLORS from "../helpers/colors";
import { DATA } from "../helpers/constants";
import LogoContainer from "./LogoContainer";

const Home = () => {
  const { name } = useRoute();

  const renderItem = ({ item }) => (
    <Item title={item.title} desc={item.desc} src={item.logo} />
  );

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <FlatList
      nestedScrollEnabled={true}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={styles.container}>
          <LogoContainer name={name} />
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
          </View>
      }
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
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
