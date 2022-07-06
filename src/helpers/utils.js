import { Platform } from "react-native";

export const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : -120;

export const capitalizeUsername = (str) => {
    return str[0].toUpperCase() + str.slice(1);
 };
