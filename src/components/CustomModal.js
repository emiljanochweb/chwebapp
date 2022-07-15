import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../helpers/colors";

const CustomModal = ({
  showModal,
  setShowModal,
  username,
  setUsername,
  password,
  setPassword,
  userRole,
  setUserRole,
  singleItem,
  handleCreate,
  handleUpdate,
  handleReset,
}) => {
  return (
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
              <Icon
                name={
                  singleItem === null
                    ? "account-multiple-plus-outline"
                    : "update"
                }
                size={20}
                color={COLORS.white}
              />
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
              <Icon name="cancel" size={20} color={COLORS.white} />
              <Text style={styles.singleModalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
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
  singleModalButton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  singleModalButtonText: {
    color: COLORS.white,
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
});
