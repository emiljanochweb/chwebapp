import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../helpers/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Airtable from "airtable";

const base = new Airtable({ apiKey: "keyhCKeUwLaAVuNWB" }).base(
   "appZpNOdNq1NeGspC"
);

const UserData = ({ item, id, handleRender, handleModal, handleModalData, handleUpdate }) => {
   const deleteHandler = () => {
      base("Users").destroy(item.id);
      handleRender(true);
   };

   const updateHandler = () => {
        // base("Users").update(item.id, item.fields);
        handleUpdate(false);
        handleModal(true);
        handleModalData(item.fields);
   };

   return (
      <View key={id} style={styles.allData}>
         <View>
            <Text>{item.fields.Name}</Text>
            <Text>{item.fields.Password}</Text>
            <Text>{item.fields.isAdmin}</Text>
         </View>
         <View style={styles.icons}>
            <TouchableOpacity style={{marginRight: 15}} onPress={updateHandler}>
               <Icon name="account-edit" size={25} color={COLORS.darkBlue} />
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteHandler}>
               <Icon name="delete" size={25} color={COLORS.red} />
            </TouchableOpacity>
         </View>
      </View>
   );
};

export default UserData;

const styles = StyleSheet.create({
   allData: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: COLORS.lightBlue,
      borderWidth: 1,
      padding: 5,
      borderColor: COLORS.darkBlue,
   },
   icons: {
      flexDirection: "row",
      alignItems: "center",
   },
});
