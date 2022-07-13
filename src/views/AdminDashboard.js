import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Airtable from "airtable";
import UserData from "../components/UserData";
import COLORS from "../helpers/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const base = new Airtable({ apiKey: "keyhCKeUwLaAVuNWB" }).base(
   "appZpNOdNq1NeGspC"
);

const AdminDashboard = () => {
   const [items, setItems] = useState([]);

   useEffect(() => {
      base("Users")
         .select({ view: "Grid view" })
         .eachPage((records, fetchNextPage) => {
            setItems(records);
            fetchNextPage();
         });
   }, []);

   return (
      <ScrollView style={styles.container}>
         <Text style={styles.header}>Admin Dashboard</Text>
         {items.map((item, idx) => (
            <UserData key={idx} item={item} id={idx} />
         ))}
         <TouchableOpacity
            style={styles.touch}
            onPress={() => {}}
          >
            <Text style={styles.link}>Create a new user</Text>
            <Icon name="account-multiple-plus" size={25} color={COLORS.white} />
          </TouchableOpacity>
      </ScrollView>
   );
};

export default AdminDashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff"
    },
    header: {
        fontSize: 25,
        color: COLORS.darkBlue,
        marginBottom: 15
    },
    touch: {
        backgroundColor: COLORS.blue,
        color: COLORS.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 10,
        marginBottom: 30,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical:10,
        alignSelf: 'flex-end'
    },
    link: {
        color: COLORS.white,
        fontSize: 18,
        marginRight: 8
    }
});
