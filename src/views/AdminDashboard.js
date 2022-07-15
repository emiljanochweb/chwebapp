import React, { useEffect, useState } from "react";
import {
   Alert,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomModal from "../components/CustomModal";
import Input from "../components/Input";
import Loader from "../components/Loader";
import COLORS from "../helpers/colors";
import { base } from "../helpers/utils";
import { useIsFocused } from "@react-navigation/core";

const AdminDashboard = () => {
   const isFocused = useIsFocused();

   const [items, setItems] = useState([]);
   const [shouldRender, setShouldRender] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [showModal, setShowModal] = useState(false);

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [userRole, setUserRole] = useState("0");

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
         setUsername("");
         setPassword("");
         setUserRole("0");
      }

      return () => {
         setShouldRender(false);
         setSingleItem(null);
      };
   }, [shouldRender]);

   const handleCreate = () => {
      setShowModal(false);
      setShouldRender(true);

      base("Users").create({
         Name: username,
         Password: password,
         isAdmin: userRole,
      });
   };

   const handleUpdate = () => {
      setShowModal(false);
      setShouldRender(true);

      base("Users").update(singleItem, {
         Name: username,
         Password: password,
         isAdmin: userRole,
      });
   };

   const deleteHandler = (id, name) => {
      Alert.alert(
         "Attention!",
         `Are you sure you want to delete user ${name}?`,
         [
            {
               text: "Yes",
               onPress: () => {
                  setShouldRender(true);
                  base("Users").destroy(id);
               },
            },
            { text: "No", onPress: () => {}, style: "cancel" },
         ],
         {
            cancelable: true,
         }
      );
   };

   const handleReset = () => {
      setUsername("");
      setPassword("");
      setUserRole("0");
      setShowModal(false);
      setSingleItem(null);
   };

   const [searchValue, setSearchValue] = useState("");
   const [users, setUsers] = useState(items);
   const [notFound, setNotFound] = useState(false);

   useEffect(() => {
      setUsers(items);
   }, [items]);

   const handleSearch = (value) => {
      setSearchValue(value);

      if (value.length === 0) {
         setUsers(items);
      }

      const filteredData = items.filter((item) =>
         item.fields.Name.toLowerCase().includes(value.toLowerCase())
      );

      if (filteredData.length === 0) {
         setUsers([]);
         setNotFound(true);
      } else {
         setUsers(filteredData);
         setNotFound(false);
      }
   };

   useEffect(() => {
      if (isFocused === false) {
         setNotFound(false);
         setUsers(items);
         setSearchValue("");
      }
   }, [isFocused]);

   return (
      <>
         <Loader visible={isLoading} />
         <CustomModal
            showModal={showModal}
            setShowModal={setShowModal}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            userRole={userRole}
            setUserRole={setUserRole}
            singleItem={singleItem}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            handleReset={handleReset}
         />
         <ScrollView style={styles.container}>
            <Text style={styles.header}>Admin Dashboard</Text>
            <Input
               label="Search Users"
               iconName="account-search"
               onChangeText={(e) => handleSearch(e)}
               value={searchValue}
            />
            {users.map((item, idx) => (
               <View key={idx} style={styles.allData}>
                  <View style={styles.userDataContainer}>
                     <Text style={styles.userData}>
                        <Text style={styles.userDataLabel}>Username: </Text>
                        {item.fields.Name}
                     </Text>
                     <Text style={styles.userData}>
                        <Text style={styles.userDataLabel}>Password: </Text>
                        {item.fields.Password}
                     </Text>
                     <Text style={styles.userData}>
                        <Text style={styles.userDataLabel}>Role: </Text>
                        {item.fields.isAdmin}
                     </Text>
                  </View>
                  <View style={styles.icons}>
                     <TouchableOpacity
                        style={{ marginRight: 15 }}
                        onPress={() => {
                           setShowModal(true);
                           setSingleItem(item.id);
                           setUsername(item.fields.Name);
                           setPassword(item.fields.Password);
                           setUserRole(item.fields.isAdmin);
                        }}
                     >
                        <Icon
                           name="account-edit"
                           size={30}
                           color={COLORS.darkBlue}
                        />
                     </TouchableOpacity>
                     <TouchableOpacity
                        onPress={() => deleteHandler(item.id, item.fields.Name)}
                     >
                        <Icon
                           name="delete-forever"
                           size={30}
                           color={COLORS.red}
                        />
                     </TouchableOpacity>
                  </View>
               </View>
            ))}
            {notFound && (
               <Text style={styles.userNotFound}>User not found!</Text>
            )}
            <TouchableOpacity
               style={styles.touch}
               onPress={() => {
                  setShowModal(true);
               }}
            >
               <Icon
                  name="account-multiple-plus"
                  size={25}
                  color={COLORS.white}
               />
               <Text style={styles.link}>Create new user</Text>
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
      backgroundColor: COLORS.white,
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
      marginLeft: 8,
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
   userDataContainer: {
      width: "80%",
   },
   userData: {
      fontSize: 18,
      marginBottom: 5,
   },
   userDataLabel: {
      color: COLORS.darkBlue,
      fontWeight: "bold",
   },
   icons: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      width: "20%",
   },
   userNotFound: {
      paddingHorizontal: 15,
      paddingVertical: 5,
      backgroundColor: COLORS.red,
      color: COLORS.white,
      fontSize: 20,
   },
});
