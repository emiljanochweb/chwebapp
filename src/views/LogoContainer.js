import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import COLORS from "../helpers/colors";

const LogoContainer = () => {
   const navigation = useNavigation();
   const route = useRoute();

   console.log(route.name, "route");

   console.log(navigation, "navvv");

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
      flex: 1,
      alignItems: "center",
      paddingVertical: 5,
   },
});
