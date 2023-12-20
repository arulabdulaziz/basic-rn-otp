import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Container = (props) => {
  return (
    <View style={styles.container}>
      {props.children}
    </View>
  )
}

export default Container

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
})