import React, { Component } from "react";
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { List, ListItem } from "react-native-elements";
import { getScheduleDatas } from "../networking/networking";

export default class DisplayMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authenticationToken: null,
      data: [],
      page: 1,
      refreshing: false
    };
  }

  componentDidMount() {
    if (this.state.authenticationToken === null) {
      AsyncStorage.getItem("AuthenticationToken").then(token => {
        getScheduleDatas(token, this.getServerUrl()).then(responseJson => {
          this.setState({
            loading: false,
            data: [...this.state.data, ...responseJson.data],
            authenticationToken: token
          });
        });
      });
    } else {
      getScheduleDatas(
        this.state.authenticationToken,
        this.getServerUrl()
      ).then(responseJson => {
        this.setState({
          data: [...this.state.data, ...responseJson.data]
        });
      });
    }
  }

  getServerUrl = () => {
    let { page } = this.state;
    console.log("page: ---" + page);
    return (
      "https://www.classpro.in/api/v5/admins/schedules?branch_id=8113&start_date=2018-01-02&end_date=2018-09-26&page=" +
      page
    );
  };

  onLogout = async () => {
    try {
      await AsyncStorage.removeItem("AuthenticationToken");
      this.props.navigation.navigate("Login");
    } catch (error) {
      console.log(error.error);
    }
  };

  renderHeader = () => {
    return <Button title="Logout" onPress={this.onLogout} />;
  };

  onRefresh = () => {
    let { authenticationToken } = this.state;
    this.setState(
      {
        page: 1,
        refreshing: true
      },
      () => {
        if (authenticationToken != null) {
          getScheduleDatas(authenticationToken, this.getServerUrl()).then(
            responseJson => {
              this.setState({
                data: [...responseJson.data],
                refreshing: false
              });
            }
          );
        }
      }
    );
  };

  onEndReached = () => {
    console.log("called");
    let { page, authenticationToken } = this.state;
    this.setState(
      {
        page: page + 1,
        refreshing: true
      },
      () => {
        if (authenticationToken != null) {
          getScheduleDatas(authenticationToken, this.getServerUrl()).then(
            responseJson => {
              this.setState({
                data: [...this.state.data, ...responseJson.data],
                refreshing: false
              });
            }
          );
        }
      }
    );
  };

  render() {
    return (
      <List>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              title={item.faculty_name}
              subtitle={item.subjects[0].name}
            />
          )}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={this.renderHeader}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onEndThreshold={0}
        />
        {this.state.loading && <ActivityIndicator />}
      </List>
    );
  }
}
