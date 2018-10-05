import React, { Component } from "react";
import Login from "./components/login";
import { AsyncStorage } from "react-native";
import { SignedIn, SignedOut } from "./navigator/switchNavigator";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogedIn: false,
      isLoginStatusChecked: false
    };
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  checkLoginStatus = () => {
    AsyncStorage.getItem("AuthenticationToken").then(token => {
      if (token != null) {
        this.setState({
          isLogedIn: true,
          isLoginStatusChecked: true
        });
      } else {
        console.log("null");
        this.setState({
          isLoginStatusChecked: true
        });
      }
    });
  };

  render() {
    let { isLogedIn, isLoginStatusChecked } = this.state;
    if (!isLoginStatusChecked) {
      return null;
    }

    if (isLogedIn) {
      return <SignedIn />;
    }
    return <SignedOut />;
  }
}
