import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../helpers/colors'

const Item = ({ title, desc}) => {
  return (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
        {/* <Image source={require("../../assets/mobile.png")} style={{width: 100, height: 100}} /> */}
    </View>
  )
}

export default Item

const styles = StyleSheet.create({
    item: {
        padding: 10,   
    },
    title: {
        width: '100%',
        fontWeight: 'bold',
        color: COLORS.darkBlue,
        fontSize: 20,
        marginBottom: 5
    },
    desc: {
        width: '100%',
        fontSize: 16,
        textAlign: "justify",
        color: COLORS.black
    }
})