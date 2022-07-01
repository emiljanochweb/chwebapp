import { Image, StyleSheet, View } from "react-native";
import React from "react";

const LogoContainer = () => {
   return (
      <View style={styles.center}>
         <Image source={require("../../assets/logo.png")} style={styles.logo} />
      </View>
   );
};

export default LogoContainer;

const styles = StyleSheet.create({
   center: {
      alignItems: "center",
   },
   logo: {
      alignItems: "center",
      justifyContent: "center",
      height: 60,
      marginTop: 10,
      marginBottom: 20,
   },
});
