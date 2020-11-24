import React from "react";
import { View, Button, Linking } from "react-native";

export default function LinkingButtonScreen({ navigation }) {
  const profileUrl = "demo://app/profile/234";
  const notioficationsUrl = "demo://app/notifications";
  const homeUrl = "demo://app/home/123";
  const settingsUrl = "demo://app/settings";

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Deeplink to Profile"
        onPress={() => {
          Linking.openURL(profileUrl);
        }}
      />
      <Button
        title="Deeplink to Notiofications"
        onPress={() => {
          Linking.openURL(notioficationsUrl);
        }}
      />
      <Button
        title="Deeplink to Home"
        onPress={() => {
          Linking.openURL(homeUrl);
        }}
      />
      <Button
        title="Deeplink to Setting"
        onPress={() => {
          Linking.openURL(settingsUrl);
        }}
      />

      <Button
        title="Open public Url"
        onPress={() => {
          Linking.openURL("https://ankitkumar.dev");
        }}
      />
    </View>
  );
}
