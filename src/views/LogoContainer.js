import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const LogoContainer = () => {
   const navigation = useNavigation();
   // const route = useRoute();

   return (
      <TouchableOpacity
         style={styles.center}
         onPress={() => navigation.navigate("Home")}
      >
         <Image source={require("../../assets/logo.png")} />
      </TouchableOpacity>
   );
};

export default LogoContainer;

const styles = StyleSheet.create({
   center: {
      alignItems: "center",
     // paddingTop: 35,
      paddingBottom: 10,
   },
});
