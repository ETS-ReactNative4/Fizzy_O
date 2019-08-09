import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native';
import {AsyncStorage} from 'react-native';

export default class App extends Component<{}> {

  constructor(props){
      super(props);

      this.state = {
        username: ""
      }
    }

    _storeData = async (key, value) => {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        // Error saving data
      }
    };

    _retrieveData = async (search_word) => {
      try {
        const value = await AsyncStorage.getItem(search_word);
        if (value !== null) {
          // We have data!!
          console.log(value);
        } else {
          console.log("That value does not exist");
        }
      } catch (error) {
        // Error retrieving data
      }
    };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder = "username"
          onChangeText={(text) => this.setState({username: text})}
        />
      <Button
        onPress = {() => this._storeData('Username',this.state.username)}
        title="submit"
      />
      <Button
        onPress = {() => this._retrieveData('Username')}
        title="submit"
      />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
