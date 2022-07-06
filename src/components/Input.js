import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../helpers/colors';

const Input = ({
  label,
  iconName,
  error,
  password,
  onChangeText,
  value,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);

  const {isError, errorMessage} = error;

  return (
    <View style={{marginBottom: 20}}>
      <Text style={[style.label]}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: isError
              ? COLORS.red
              : isFocused
              ? COLORS.darkBlue
              : COLORS.light,
            alignItems: 'center',
            backgroundColor: isError ? COLORS.lightRed : COLORS.light
          },
        ]}>
        <Icon
          name={iconName}
          style={{color: isError ? COLORS.red : COLORS.darkBlue, fontSize: 22, marginRight: 10}}
        />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          onChangeText={onChangeText}
          value={value}
          style={{
            color: COLORS.darkBlue, 
            flex: 1
          }}
          placeholder={label}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: isError ? COLORS.red : COLORS.darkBlue, fontSize: 22}}
          />
        )}
      </View>
      {errorMessage && (
        <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
  },
});

export default Input;