import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import Airtable from "airtable";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Input from "../components/Input";
import COLORS from "../helpers/colors";
import {
  digitsRegExp,
  lowercaseRegExp,
  specialCharRegExp,
  uppercaseRegExp,
} from "../helpers/constants";
import { keyboardBehaviour } from "../helpers/utils";
import { login } from "../reducers/login";
import LogoContainer from "./LogoContainer";
import SubMenu from "./SubMenu";

const base = new Airtable({ apiKey: "keyhCKeUwLaAVuNWB" }).base(
  "appZpNOdNq1NeGspC"
);

const RegisterForm = () => {
  const isLoggedIn = useSelector((state) => state.login.isLogged);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { name } = useRoute();
  const headerHeight = useHeaderHeight();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    base("Users")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        setItems(records);
        fetchNextPage();
      });
  }, []);

  const submitHandler = () => {
    Keyboard.dismiss();
    let isValid = true;

    let trimmedUsername = username.trim();
    let trimmedPassword = password.trim();
    let trimmedConfirmPassword = confirmPassword.trim();

    const uppercasePassword = uppercaseRegExp.test(trimmedPassword);
    const lowercasePassword = lowercaseRegExp.test(trimmedPassword);
    const digitsPassword = digitsRegExp.test(trimmedPassword);
    const specialCharPassword = specialCharRegExp.test(trimmedPassword);

    const usernameFound = items.find(
      (item) => item.fields.Name.toLowerCase() === trimmedUsername.toLowerCase()
    );

    if (
      trimmedUsername.length === 0 ||
      trimmedPassword.length === 0 ||
      trimmedConfirmPassword.length === 0
    ) {
      if (trimmedUsername.length > 0) {
        handleError(null, "username");
      } else handleError("This field should not be empty!", "username");

      if (trimmedPassword.length > 0) {
        handleError(null, "password");
      } else handleError("This field should not be empty!", "password");

      if (trimmedConfirmPassword.length > 0) {
        handleError(null, "confirmPassword");
      } else handleError("This field should not be empty!", "confirmPassword");

      isValid = false;
    }

    if (
      trimmedUsername.length > 0 &&
      trimmedPassword.length > 0 &&
      trimmedConfirmPassword.length > 0
    ) {
      handleError(null, "username");
      handleError(null, "password");
      handleError(null, "confirmPassword");
    }

    if (trimmedUsername.length < 3) {
      handleError("Username is too short!", "username");
      isValid = false;
    } else if (usernameFound !== undefined) {
      handleError("This user is already registered!", "username");
      isValid = false;
    } else if (trimmedPassword.length < 12) {
      handleError("Password is too short!", "password");
      isValid = false;
    } else if (!uppercasePassword) {
      handleError("Password should have at least one uppercase!", "password");
      isValid = false;
    } else if (!lowercasePassword) {
      handleError("Password should have at least one lowercase!", "password");
      isValid = false;
    } else if (!digitsPassword) {
      handleError("Password should have at least one digit!", "password");
      isValid = false;
    } else if (!specialCharPassword) {
      handleError(
        "Password should have at least one special character!",
        "password"
      );
      isValid = false;
    } else if (trimmedPassword !== trimmedConfirmPassword) {
      handleError("Passwords don't match!", "confirmPassword");
      isValid = false;
    }

    if (isValid) {
      base("Users").create({
        Name: trimmedUsername.toLowerCase(),
        Password: trimmedPassword,
      });

      dispatch(login(trimmedUsername));
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      navigation.push("UserProfile");
    }
  };

  const handleError = (error, input) => {
    if (error !== null) {
      setErrors((prevState) => ({ ...prevState, [input]: error }));
    } else setErrors({});
  };

  return (
    !isLoggedIn && (
      <>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={keyboardBehaviour}
          keyboardVerticalOffset={headerHeight}
        >
          <ScrollView>
            <LogoContainer name={name} />
            <View style={styles.subContainer}>
              <Input
                label="Username"
                iconName="email-outline"
                onChangeText={setUsername}
                value={username}
                error={errors.username}
              />
              <Input
                label="Password"
                password
                iconName="lock-outline"
                onChangeText={setPassword}
                value={password}
                error={errors.password}
              />
              <Input
                label="Confirm Password"
                password
                iconName="lock-outline"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                error={errors.confirmPassword}
              />
              <Button title="REGISTER" onPress={submitHandler} />
              <TouchableOpacity
                style={styles.touch}
                onPress={() => navigation.push("LoginForm")}
              >
                <Text style={styles.link}>Already have an account? Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <SubMenu />
      </>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  subContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  touch: {
    alignItems: "center",
  },
  link: {
    color: COLORS.darkBlue,
    fontSize: 15,
    textDecorationLine: "underline",
    textTransform: "uppercase",
    padding: 10,
  },
  iconStyle: {
    color: COLORS.white,
    fontSize: 20,
  },
  homelink: {
    color: COLORS.white,
    backgroundColor: COLORS.darkBlue,
    marginTop: 20,
    padding: 10,
    fontSize: 15,
    textTransform: "uppercase",
    textAlign: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
});

export default RegisterForm;
