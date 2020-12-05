/**
 * @format
 * @flow
 */

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Linking,
} from "react-native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

type ButtonProps = {|
  onPress?: ?any,
  label?: ?string,
|};

const Button = ({ onPress, label }) => {
  return (
    <TouchableHighlight
      underlayColor={"white"}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableHighlight>
  );
};
const PushNotificationScreen = () => {
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    PushNotificationIOS.addEventListener("register", onRegistered);
    PushNotificationIOS.addEventListener(
      "registrationError",
      onRegistrationError
    );
    PushNotificationIOS.addEventListener("notification", onRemoteNotification);
    PushNotificationIOS.addEventListener(
      "localNotification",
      onLocalNotification
    );

    PushNotificationIOS.requestPermissions().then(
      (data) => {
        console.log("PushNotificationIOS.requestPermissions", data);
      },
      (data) => {
        console.log("PushNotificationIOS.requestPermissions failed", data);
      }
    );

    return () => {
      PushNotificationIOS.removeEventListener("register");
      PushNotificationIOS.removeEventListener("registrationError");
      PushNotificationIOS.removeEventListener("notification");
      PushNotificationIOS.removeEventListener("localNotification");
    };
  }, []);

  const sendLocalNotification = () => {
    PushNotificationIOS.presentLocalNotification({
      alertTitle: "Deep link to profile",
      alertBody: "demo://app/profile/234",
      applicationIconBadgeNumber: 1,
    });
  };

  const sendLocalNotificationWithSound = () => {
    PushNotificationIOS.addNotificationRequest({
      id: "notificationWithSound",
      title: "Notification Deep link",
      subtitle: "Received Deep link",
      body: "demo://app/settings",
      sound: "customSound.wav",
      badge: 1,
    });
  };

  const scheduleLocalNotification = () => {
    PushNotificationIOS.scheduleLocalNotification({
      alertBody: "Scheduled Local Notification",
      fireDate: new Date(new Date().valueOf() + 2000).toISOString(),
    });
  };

  const addNotificationRequest = () => {
    PushNotificationIOS.addNotificationRequest({
      id: "test",
      title: "deep link",
      subtitle: "it will open notifications",
      body: "demo://app/notifications",
      category: "test",
      threadId: "thread-id",
      fireDate: new Date(new Date().valueOf() + 2000),
      repeats: true,
    });
  };

  const onRegistered = (deviceToken) => {
    Alert.alert("Registered For Remote Push", `Device Token: ${deviceToken}`, [
      {
        text: "Dismiss",
        onPress: null,
      },
    ]);
  };

  const onRegistrationError = (error) => {
    console.log(`Error (${error.code}): ${error.message}`);
  };

  const onRemoteNotification = (notification) => {
    const isClicked = notification.getData().userInteraction === 1;

    const result = `
        Title:  ${notification.getTitle()};\n
        Subtitle:  ${notification.getSubtitle()};\n
        Message: ${notification.getMessage()};\n
        badge: ${notification.getBadgeCount()};\n
        sound: ${notification.getSound()};\n
        category: ${notification.getCategory()};\n
        content-available: ${notification.getContentAvailable()};\n
        Notification is clicked: ${String(isClicked)}.`;

    if (notification.getTitle() == undefined) {
      Alert.alert("Silent push notification Received", result, [
        {
          text: "Send local push",
          onPress: sendLocalNotification,
        },
      ]);
    } else {
      Alert.alert("Push Notification Received", result, [
        {
          text: "Dismiss",
          onPress: null,
        },
      ]);
    }
  };

  const onLocalNotification = (notification) => {
    const isClicked = notification.getData().userInteraction === 1;
    Linking.openURL(notification.getMessage());
  };

  const showPermissions = () => {
    PushNotificationIOS.checkPermissions((permissions) => {
      setPermissions({ permissions });
    });
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={sendLocalNotification}
        label="Send local notification deeplink to profile"
      />
      <Button
        onPress={sendLocalNotificationWithSound}
        label="Send local notification deeplink to setting"
      />
      <Button
        onPress={scheduleLocalNotification}
        label="Schedule local notification without deep link"
      />
      <Button
        onPress={addNotificationRequest}
        label="Add Notification Request deeplink to notifications screen"
      />

      <View>
        <Button onPress={showPermissions} label="Show enabled permissions" />
        <Text>{JSON.stringify(permissions)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  button: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLabel: {
    color: "blue",
  },
});

export default PushNotificationScreen;
