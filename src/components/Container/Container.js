import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Container = (props) => {
  const { children, containerStyle = {} } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      {children}
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