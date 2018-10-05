import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  AsyncStorage
} from "react-native";
import { verifyLoginCredentials } from "../networking/networking";

const screenHeight = Dimensions.get("window").height;
const inputBoxHeight = screenHeight / 15;
const textSize = inputBoxHeight / 2;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null
    };
  }

  onUsernameChange = value => {
    this.setState({
      username: value
    });
  };

  onPasswordChange = value => {
    this.setState({
      password: value
    });
  };

  onLoginButtonPressed = async () => {
    let { username, password } = this.state;
    try {
      let responseJson = await verifyLoginCredentials(username, password);
      console.log(responseJson);
      await AsyncStorage.setItem(
        "AuthenticationToken",
        responseJson.auth_token
      );
      this.props.navigation.navigate("DisplayMessage");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome, Please log in !!</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Username"
          underlineColorAndroid="transparent"
          placeholderTextColor="#cccccc"
          value={this.state.username}
          onChangeText={value => this.onUsernameChange(value)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Password"
          underlineColorAndroid="transparent"
          placeholderTextColor="#cccccc"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={value => this.onPasswordChange(value)}
        />
        <View style={styles.button}>
          <Button
            buttonStyle
            title="Login"
            onPress={this.onLoginButtonPressed}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    margin: 5,
    backgroundColor: "#ffffff"
  },
  welcomeText: {
    alignSelf: "center",
    fontSize: textSize,
    color: "#0E4D92",
    marginBottom: 15
  },
  inputBox: {
    borderWidth: 2,
    borderColor: "#008EFF",
    borderRadius: 5,
    alignSelf: "stretch",
    height: inputBoxHeight,
    fontSize: textSize,
    marginBottom: 10
  },
  button: {
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "darkblue"
  }
});
