import React, { useState } from "react";
import { StartStyles } from "../styles";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Image,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LeagueLogo, StartBackground, MSBold, MSLight } from "../../assets";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

function StartScreen({ navigation }) {

  const getStarted = () => {
    if (textInput.length === 0) {
      return;
    }
    navigation.navigate("Profile", { name: textInput });
  };

  const [textInput, onChangeText] = useState("");

  let [fontsLoaded] = useFonts({
    'MSBold': MSBold,
    'MSLight': MSLight,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <KeyboardAvoidingView style={StartStyles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={StartStyles.header}>
        <Image source={LeagueLogo} />
        <Text style={StartStyles.fontTitle}>League Tracker</Text>
      </View>
      <View style={StartStyles.body}>
        <ImageBackground
          source={StartBackground}
          imageStyle={{ resizeMode: "stretch" }}
          style={StartStyles.image}
        >
          <Text style={StartStyles.fontBody}>Enter your summoner name</Text>
          <View style={StartStyles.horizontalBox}>
            <TextInput
              style={StartStyles.input}
              placeholder="summoner name"
              value={textInput}
              onChangeText={(text) => onChangeText(text)}
            ></TextInput>
            <TouchableOpacity style={StartStyles.button} onPress={getStarted}>
              <Text style={StartStyles.fontBody}>GO</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
}

export default StartScreen;
