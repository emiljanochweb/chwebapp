import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../helpers/colors";

const Copyright = () => {
   return (
      <View style={styles.copy}>
         <Text style={{color: COLORS.grey}}>
            Copyright <Icon style={styles.profileIcon} name="copyright" /> Chweb
            Green Room
         </Text>
      </View>
   );
};

export default Copyright;

const styles = StyleSheet.create({
    copy: {
        alignItems: 'center',
        marginTop: 50
    }
});
