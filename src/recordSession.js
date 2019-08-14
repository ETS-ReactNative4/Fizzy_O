import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { AsyncStorage } from 'react-native'
import moment from "moment";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class RecordSessionScreen extends Component {
  static navigationOptions = { header: null }

  constructor(props) {
    super(props)

    this.state = {
      exercise: "",
      reps: "",
      date: moment(new Date()).format("L")
    }
  }

  _storeDate = async (
    exercise_key,
    exercise_name,
    date_value,
    reps_value
  ) => {
    try {
      await AsyncStorage.setItem(exercise_key, exercise_name)
    } catch (error) {
      // Error saving data
    }
    try {
      await AsyncStorage.setItem(date_value, reps_value)
    } catch (error) {
      // Error saving data
    }
  }

  render() {

    const today = this.state.date;
    const date = moment(today).format("L");

    return (

      <ImageBackground
        source={require('./assets/pictures/G3.jpg')}
        style={styles.container}
      >
        <DismissKeyboard>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
        >
        <Text style={styles.titleText}>Record your session</Text>
        <Text style={styles.textStyling}>{date}</Text>

        <Picker
          style={{ height: 200, width: 400,}}
          itemStyle={{ height: 200,
                      color: 'white',
                      fontFamily: 'HelveticaNeue-Medium' }}
          selectedValue={this.state.exercise}
          onValueChange={( itemValue ) =>
            this.setState({ 
              PickerValue: itemValue,
              exercise: itemValue 
              })
          }
        >     
          <Picker.Item label="↓ Select an exercise ↓" value="" />        
          <Picker.Item label="Low row" value = "Low Row" />
          <Picker.Item label="Sit ups" value = "Sit Ups" />
          <Picker.Item label="Quadriceps Stretch" value = "Quadriceps Stretch" />
          <Picker.Item label="Hamstring Stretch" value = "Hamstring Stretch" />
          <Picker.Item label="Kick backs" value = "KickBacks" />
          <Picker.Item label="Bridging" value = "Bridging" />
          <Picker.Item label="Clam Shell" value = "Clam Shell" />
          <Picker.Item label="Lunges" value = "Lunges" />
        </Picker>

        <Text style={styles.textStyling}>Enter reps</Text>

        <TextInput
          style={styles.textBoxes}
          placeholder="0"
          keyboardType='numeric'
          maxLength={3}
          onChangeText={text => this.setState({ reps: text })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (this.state.exercise == "") {
              console.log("Select an exercise")
            } else {
              this.props.navigation.navigate('UserMain')
              this._storeDate(
                "exercise",
                this.state.exercise,
                this.state.date,
                this.state.reps
              )
            }
          }}>
        <Text style={styles.buttonText}>Submit </Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
        </DismissKeyboard>
      </ImageBackground>  
    )
    }
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textBoxes: {
    margin: 5,
    width: 100,
    height: 40,
    fontSize: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'rgba(255,255,255,0.4)',
    paddingLeft: 40,
  },

  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    width: 150,
    borderRadius: 25,
    padding: 10,
    marginTop: 10,
  },

  buttonText: {
    fontFamily: 'HelveticaNeue-Bold',
    color: '#333333',
    fontSize: 14,
  },

  titleText: {
    fontSize: 25,
    fontFamily: 'HelveticaNeue-Light',
    margin: 20,
    color: 'white',
  },

  textStyling: {
    padding: 20,
    fontFamily: 'HelveticaNeue-Light',
    color: 'white',
    fontSize: 16,
  },
})
