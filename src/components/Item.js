import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import COLORS from "../helpers/colors";

const Item = ({ title, desc, id, src }) => {
   return (
      <View style={styles.item} key={id}>
         <Text style={styles.title}>{title}</Text>
         <View style={styles.imageContainer}>
            <Text style={styles.desc}>{desc}</Text>
            <Image style={styles.image} source={src} />
         </View>
      </View>
   );
};

export default Item;

const styles = StyleSheet.create({
   item: {
      paddingHorizontal: 10,
      backgroundColor: COLORS.white,
      paddingBottom: 20,
   },
   title: {
      width: "100%",
      fontWeight: "bold",
      color: COLORS.darkBlue,
      fontSize: 20,
      marginBottom: 5,
      letterSpacing: 3,
      lineHeight: 30
   },
   imageContainer: {
    flexDirection: 'row',
    alignContent: 'flex-start',
   },
   desc: {
      fontSize: 16,
      textAlign: "justify",
      color: COLORS.black,
      width: '70%',
      paddingRight: 20
   },
   image: {
    height: '100%',
    width: '30%',
    resizeMode: 'cover',
  }
});
