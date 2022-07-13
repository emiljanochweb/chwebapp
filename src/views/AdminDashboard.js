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
import UserData from "../components/UserData";
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
   const [modalData, setModalData] = useState({});

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
      }
   }, [shouldRender]);

   return (
      <>
         <Loader visible={isLoading} />
         <Modal visible={showModal} animationType="fade" transparent={true}>
            <TouchableOpacity style={styles.modalView} onPress={() => setShowModal(false)}>
               <View style={styles.modalContent}>
                  <Text style={styles.modalInputLabel}>Username:</Text>
                  <TextInput style={styles.modalInput} value={modalData.Name} />

                  <Text style={styles.modalInputLabel}>Password:</Text>
                  <TextInput style={styles.modalInput} value={modalData.Password} />

                  <Text style={styles.modalInputLabel}>Role (0 - user, 1 - admin):</Text>
                  <TextInput keyboardType='numeric' style={styles.modalInput} value={modalData.isAdmin} />

                  <Button title="SAVE" onPress={() => {
                     console.log("save");
                     setShowModal(false);
               }} />
                  <Button title="CANCEL" onPress={() => setShowModal(false)} backgroundColor={COLORS.red} />
               </View>
            </TouchableOpacity>
         </Modal>
         <ScrollView style={styles.container}>
            <Text style={styles.header}>Admin Dashboard</Text>
            {items.map((item, idx) => (
               <UserData
                  key={idx}
                  item={item}
                  id={idx}
                  handleRender={setShouldRender}
                  handleModal={setShowModal}
                  handleModalData={setModalData}
               />
            ))}
            <TouchableOpacity style={styles.touch} onPress={() => {}}>
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
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 5,
      justifyContent: "center",
      alignContent: 'space-between',
      paddingHorizontal: 20,
   },
   modalContent: {
      justifyContent: "center",
      backgroundColor: COLORS.white,
      paddingHorizontal: 20,
      paddingVertical: 50,
      borderRadius: 10
   },
   modalInput: {
      fontSize: 20,
      marginBottom: 10,
      backgroundColor: COLORS.lightBlue,
      paddingVertical: 5,
      paddingHorizontal: 10
   },
   modalInputLabel: {
      fontSize: 15,
      color: COLORS.black
   }
});
