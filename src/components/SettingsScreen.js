import React from "react";
import { View, Text, Button } from "react-native";

export default function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go Linking Buttons"
        onPress={() => navigation.navigate("LinkingButton")}
      />
    </View>
  );
}
