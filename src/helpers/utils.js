import { Platform } from "react-native";

export const keyboardBehaviour = Platform.select({
  android: undefined,
  ios: "padding",
});

export const capitalizeUsername = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};
