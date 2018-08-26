/* @flow */
import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as COLOR from "../../config/colors";

class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: "",
      emailInput: "",
      passwordInput: "",
      securePassword: true
    };
  } // constructor

  register(){
    let {usernameInput, emailInput, passwordInput} = this.state;
    if (usernameInput===""||emailInput===""||passwordInput==="") return null;

    return fetch(`https://zacsbooks.com/api/user/register`, {
        headers: {'Content-Type':'application/json'},
        method:'POST',
        body: JSON.stringify({'name':usernameInput, 'pass':passwordInput, 'mail':emailInput})
      }).then(response => response.json())
      .then(responseJson => {
        const{uid, uri} = responseJson;
        if (uid!==undefined){
          console.log('success');
          this.registerSuccess();
        } else {
          const{form_errors} = responseJson;
          console.log('failure', form_errors);
          this.registerFailed(form_errors);
        }
    })
    .catch(error => {this.registerFailed({name:'Network Error'})});
  }

  registerFailed(error){
    let {name='', mail=''} = error;
    return Alert.alert(
      "Registration Failed",
      `${name}\n${mail}`,
      [{ text: "OK", onPress: () => null }],
      { cancelable: true }
    );
  }

  registerSuccess(){
    return Alert.alert(
      "Successfully registered",
      ``,
      [{ text: "OK", onPress: () => null }],
      { cancelable: true }
    );
  }

  render() {
    return (
      <View
        style={{
          padding: 16,
          margin: 16
        }}
      >
        <View
          style={{
            marginBottom: 4
          }}
        >
          <Text
            style={{
              color: COLOR.PRIMARY_TEXT_LIGHT,
              fontSize: 12,
              fontWeight: "bold"
            }}
          >
            {`USERNAME`}
          </Text>
          <TextInput
            style={{ height: 36, color: COLOR.PRIMARY_TEXT_LIGHT }}
            underlineColorAndroid={COLOR.PRIMARY_TEXT_LIGHT}
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor={COLOR.PLACEHOLDER_TEXT_LIGHT}
            onChangeText={usernameInput => this.setState({ usernameInput })}
            value={this.state.usernameInput}
            placeholder="user"
          />
        </View>

        <View
          style={{
            marginBottom: 4
          }}
        >
          <Text
            style={{
              color: COLOR.PRIMARY_TEXT_LIGHT,
              fontSize: 12,
              fontWeight: "bold"
            }}
          >
            {`EMAIL`}
          </Text>
          <TextInput
            style={{ height: 36, color: COLOR.PRIMARY_TEXT_LIGHT }}
            underlineColorAndroid={COLOR.PRIMARY_TEXT_LIGHT}
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor={COLOR.PLACEHOLDER_TEXT_LIGHT}
            onChangeText={emailInput => this.setState({ emailInput })}
            value={this.state.emailInput}
            placeholder="email@domain.com"
          />
        </View>

        <View
          style={{
            marginBottom: 16
          }}
        >
          <Text
            style={{
              color: COLOR.PRIMARY_TEXT_LIGHT,
              fontSize: 12,
              fontWeight: "bold"
            }}
          >
            {`PASSWORD`}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={{ height: 36, flex: 1, color: COLOR.PRIMARY_TEXT_LIGHT }}
              underlineColorAndroid={COLOR.PRIMARY_TEXT_LIGHT}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={COLOR.PLACEHOLDER_TEXT_LIGHT}
              onChangeText={passwordInput => this.setState({ passwordInput })}
              placeholder="********"
              value={this.state.passwordInput}
              secureTextEntry={this.state.securePassword}
            />

            <View
              style={{
                width: 40,
                backgroundColor: COLOR.WHITE,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({
                    securePassword: !this.state.securePassword
                  });
                }}
              >
                {this.state.securePassword ? (
                  <Icon name="eye" size={24} color={COLOR.ICON} />
                ) : (
                  <Icon name="eye-off" size={24} color={COLOR.ICON} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.5} onPress={()=> this.register()}>
          <View
            style={{
              height: 48,
              backgroundColor: COLOR.TINT,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: COLOR.BUTTON_TEXT,
                fontWeight: "bold"
              }}
            >
              REGISTER
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  } // render
} // RegisterView

export default RegisterView;
