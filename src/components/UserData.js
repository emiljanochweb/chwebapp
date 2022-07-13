import { StyleSheet, Text, View } from "react-native";
import React from "react";
import COLORS from "../helpers/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const UserData = ({ item, id }) => {
   return (
      <View key={id} style={styles.allData}>
        <View>
            <Text>{item.fields.Name}</Text>
            <Text>{item.fields.Password}</Text>
            <Text>{item.fields.isAdmin}</Text>
        </View>
        <View style={styles.icons}>
            <Icon name="account-edit" size={25} color={COLORS.darkBlue} />  
            <Icon name="delete" size={25} color={COLORS.red} />
        </View>
      </View>
   );
};

export default UserData;

const styles = StyleSheet.create({
    allData: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.lightBlue,
        borderWidth: 1,
        padding: 5,
        borderColor: COLORS.darkBlue
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
