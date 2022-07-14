import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Loader from "../components/Loader";
import COLORS from "../helpers/colors";
import { base } from "../helpers/utils";

const AdminDashboard = () => {
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

  const deleteHandler = (id) => {
    Alert.alert(
      'Attention!',
      'Are you sure you want to delete this user?',
      [
        {text: 'Yes', onPress: () => {
          setShouldRender(true);
          base("Users").destroy(id);
        }},
        {text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
    
  };

  const handleReset = () => {
    setUsername("");
    setPassword("");
    setUserRole("0");
    setShowModal(false);
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
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalInputLabel}>Username:</Text>
            <TextInput
              style={styles.modalInput}
              value={username}
              onChangeText={(e) => setUsername(e)}
            />

            <Text style={styles.modalInputLabel}>Password:</Text>
            <TextInput
              style={styles.modalInput}
              value={password}
              onChangeText={(e) => setPassword(e)}
            />

            <Text style={styles.modalInputLabel}>
              Role (0 - user, 1 - admin):
            </Text>
            <TextInput
              keyboardType="numeric"
              style={styles.modalInput}
              value={userRole}
              onChangeText={(e) => setUserRole(e)}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.singleModalButton,
                  {
                    backgroundColor: COLORS.green,
                  },
                ]}
                onPress={singleItem === null ? handleCreate : handleUpdate}
              >
                <Text style={styles.singleModalButtonText}>
                  {singleItem === null ? "Create" : "Update"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.singleModalButton,
                  {
                    backgroundColor: COLORS.red,
                  },
                ]}
                onPress={handleReset}
              >
                <Text style={styles.singleModalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
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
                <Icon name="account-edit" size={25} color={COLORS.darkBlue} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteHandler(item.id)}>
                <Icon name="delete" size={25} color={COLORS.red} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <TouchableOpacity
          style={styles.touch}
          onPress={() => {
            setShowModal(true);
          }}
        >
          <Text style={styles.link}>Create a new user</Text>
          <Icon name="account-multiple-plus" size={25} color={COLORS.white} />
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
    zIndex: 1,
  },
  modalContent: {
    justifyContent: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 40,
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
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  singleModalButton: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  singleModalButtonText: {
    color: COLORS.white,
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "bold",
  },
});
