import {
   Modal,
   ScrollView,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Airtable from "airtable";
import COLORS from "../helpers/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Loader from "../components/Loader";
import Button from "../components/Button";

const base = new Airtable({ apiKey: "keyhCKeUwLaAVuNWB" }).base(
   "appZpNOdNq1NeGspC"
);

const AdminDashboard = () => {
   const [items, setItems] = useState([]);
   const [shouldRender, setShouldRender] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [showModal, setShowModal] = useState(false);

   const [newUsername, setNewUsername] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [newRole, setNewRole] = useState('0');

   const [singleItem, setSingleItem] = useState(null);


   useEffect(() => {
      setIsLoading(true);
      base("Users")
         .select({ view: "Grid view" })
         .eachPage((records, fetchNextPage) => {
            setItems(records);
            setIsLoading(false);
            fetchNextPage();
         });
   }, []);

   useEffect(() => {
      if (shouldRender === true) {
         setIsLoading(true);
         base("Users")
            .select({ view: "Grid view" })
            .eachPage((records, fetchNextPage) => {
               setItems(records);
               setIsLoading(false);
               fetchNextPage();
            });
         setNewUsername("");
         setNewPassword("");
         setNewRole("0");
      }

      return () => {
         setShouldRender(false);
         setSingleItem(null);
      } 
   }, [shouldRender]);

   const handleCreate = () => {
      setShowModal(false);
      setShouldRender(true);

      base("Users").create({
         Name: newUsername,
         Password: newPassword,
         isAdmin: newRole
       });
   };

   const handleUpdate = () => {
      setShowModal(false);
      setShouldRender(true);

      base("Users").update(singleItem, {
         Name: newUsername,
         Password: newPassword,
         isAdmin: newRole
      });
   }

   const deleteHandler = (id) => {
      setShouldRender(true);

      base("Users").destroy(id);
   };

   return (
      <>
         <Loader visible={isLoading} />
         <Modal
            visible={showModal}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setShowModal(false)}
         >
            <View
               style={styles.modalView}
            >
               <View style={styles.modalContent}>
                  <Text style={styles.modalInputLabel}>Username:</Text>
                  <TextInput 
                     style={styles.modalInput} 
                     value={newUsername} 
                     onChangeText={(e) => setNewUsername(e)}
                  />

                  <Text style={styles.modalInputLabel}>Password:</Text>
                  <TextInput
                     style={styles.modalInput}
                     value={newPassword}
                     onChangeText={(e) => setNewPassword(e)}
                  />

                  <Text style={styles.modalInputLabel}>
                     Role (0 - user, 1 - admin):
                  </Text>
                  <TextInput
                     keyboardType="numeric"
                     style={styles.modalInput}
                     value={newRole}
                     onChangeText={(e) => setNewRole(e)}
                  />

                  <Button
                     title="SAVE"
                     onPress={singleItem === null ? handleCreate : handleUpdate}
                  />
                  <Button
                     title="CANCEL"
                     onPress={() => setShowModal(false)}
                     backgroundColor={COLORS.red}
                  />
               </View>
            </View>
         </Modal>
         <ScrollView style={styles.container}>
            <Text style={styles.header}>Admin Dashboard</Text>
            {items.map((item, idx) => (
               <View key={idx} style={styles.allData}>
                 <View>
                    <Text>{item.fields.Name}</Text>
                    <Text>{item.fields.Password}</Text>
                    <Text>{item.fields.isAdmin}</Text>
                 </View>
                 <View style={styles.icons}>
                    <TouchableOpacity style={{marginRight: 15}} onPress={() => {
                        setShowModal(true);
                        setSingleItem(item.id)
                        setNewUsername(item.fields.Name);
                        setNewPassword(item.fields.Password);
                        setNewRole(item.fields.isAdmin);
                    }
                  }>
                       <Icon name="account-edit" size={25} color={COLORS.darkBlue} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteHandler(item.id)}>
                       <Icon name="delete" size={25} color={COLORS.red} />
                    </TouchableOpacity>
                 </View>
               </View>
            ))}
            <TouchableOpacity style={styles.touch} onPress={() => {
               setShowModal(true);
            }}>
               <Text style={styles.link}>Create a new user</Text>
               <Icon
                  name="account-multiple-plus"
                  size={25}
                  color={COLORS.white}
               />
            </TouchableOpacity>
         </ScrollView>
      </>
   );
};

export default AdminDashboard;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
   },
   header: {
      fontSize: 25,
      color: COLORS.darkBlue,
      marginBottom: 15,
   },
   touch: {
      backgroundColor: COLORS.blue,
      color: COLORS.white,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      marginTop: 10,
      marginBottom: 30,
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
      alignSelf: "flex-end",
   },
   link: {
      color: COLORS.white,
      fontSize: 18,
      marginRight: 8,
   },
   modalView: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      borderRadius: 5,
      justifyContent: "center",
      alignContent: "space-between",
      paddingHorizontal: 20,
      zIndex: 1
   },
   modalContent: {
      justifyContent: "center",
      backgroundColor: COLORS.white,
      paddingHorizontal: 20,
      paddingVertical: 50,
      borderRadius: 10,
   },
   modalInput: {
      fontSize: 20,
      marginBottom: 10,
      backgroundColor: COLORS.lightBlue,
      paddingVertical: 5,
      paddingHorizontal: 10,
   },
   modalInputLabel: {
      fontSize: 15,
      color: COLORS.black,
   },
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
