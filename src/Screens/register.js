import React, { Component } from 'react';
import { View, Platform, ScrollView, Image, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { Icon, Input, SocialIcon } from 'react-native-elements';

import { connect } from 'react-redux';

import { register } from './../reducer';

import AppText from './../components/AppText';

class Register extends Component {
  state = {
    fName: null,
    lName: null,
    userName: null,
    email: null,
    phone: null,
    password: null,
    cPassword: null,
    terms: false,

    validationError: null,
  };

  setCredentials(credential, detail) {
    this.setState({
      [credential]: detail,
    });
  }

  async register() {
    this.setState({
      validationError: null,
    });

    let newValidationError = '';

    const { fName, lName, userName, email, phone, password, cPassword } = this.state;

    if (!fName || !lName || !userName || !email || !phone || !password || !cPassword) {
      newValidationError = 'Please fill all fields.';
    }

    if (password !== cPassword) {
      newValidationError = 'Sorry, passwords don\'t match.';
    }

    if (password.length < 3) {
      newValidationError = 'Sorry, password needs to be at least 3 characters long.';
    }

    if (newValidationError) {
      return this.setState({
        validationError: newValidationError,
      });
    }

    const registerResults = await this.props.register(this.state);

    if (!registerResults.error) {
      this.props.navigation.navigate('Confirm');
    }
  }

  render() {
    const { user, loading } = this.props;
    const { validationError } = this.state;

    return (
      <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1, backgroundColor: '#f4b44c' }}>
        <View style={{ alignItems: 'center', justifyContent: 'flex-end', paddingTop: 20, paddingBottom: 20 }}>
          <AppText style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 5 }}>REGISTER</AppText>
          <AppText>Please fill in your details</AppText>
        </View>

        <View style={{ flex: 5 }}>
          <ScrollView>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Input
                containerStyle={{ flex: 1, paddingTop: 10 }}
                inputContainerStyle={{
                  ...topInputsStyle,
                  alignSelf: 'flex-end',
                }}
                inputStyle={{ fontSize: 20, color: '#5b1f07', paddingVertical: 5 }}
                autoCapitalize={'words'}
                autoCorrect={false}
                placeholder='First Name'
                placeholderTextColor="#5b1f07"
                onChangeText={fName => this.setCredentials('fName', fName)}
              />

              <Input
                containerStyle={{ flex: 1, paddingTop: 10 }}
                inputContainerStyle={{
                  ...topInputsStyle,
                  alignSelf: 'flex-start',
                }}
                inputStyle={{ fontSize: 20, color: '#5b1f07', paddingVertical: 5 }}
                autoCapitalize={'words'}
                autoCorrect={false}
                placeholder='Last Name'
                placeholderTextColor="#5b1f07"
                onChangeText={lName => this.setCredentials('lName', lName)}
              />
            </View>

            <Input
              containerStyle={{ alignSelf: 'center', paddingTop: 10 }}
              inputContainerStyle={{
                height: 45,
                width: 280,
                borderRadius: 25,
                borderBottomWidth: 1.5,
                borderTopWidth: 1.5,
                borderLeftWidth: 1.5,
                borderRightWidth: 1.5,
                borderColor: '#5b1f07',
                alignSelf: 'center',
                paddingLeft: 5,
              }}
              inputStyle={{ fontSize: 20, color: '#5b1f07', paddingVertical: 5 }}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder='User name'
              placeholderTextColor="#5b1f07"
              onChangeText={userName => this.setCredentials('userName', userName)}
            />

            <Input
              containerStyle={{ alignSelf: 'center', paddingTop: 10 }}
              inputContainerStyle={inputsStyle}
              inputStyle={{ fontSize: 20, paddingVertical: 5, color: '#5b1f07' }}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder='Email'
              placeholderTextColor="#5b1f07"
              onChangeText={email => this.setCredentials('email', email)}
            />

            <Input
              containerStyle={{ alignSelf: 'center', paddingTop: 10 }}
              inputContainerStyle={inputsStyle}
              inputStyle={{ fontSize: 20, paddingVertical: 5, color: '#5b1f07' }}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder='Phone'
              placeholderTextColor="#5b1f07"
              onChangeText={phone => this.setCredentials('phone', phone)}
            />

            <Input
              containerStyle={{ alignSelf: 'center', paddingTop: 10 }}
              inputContainerStyle={inputsStyle}
              inputStyle={{ fontSize: 20, paddingVertical: 5, color: '#5b1f07' }}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder='Password'
              placeholderTextColor="#5b1f07"
              onChangeText={password => this.setCredentials('password', password)}
              maxLength={15}
              secureTextEntry={true}
            />

            <Input
              containerStyle={{ alignSelf: 'center', paddingTop: 10 }}
              inputContainerStyle={inputsStyle}
              inputStyle={{ fontSize: 20, paddingVertical: 5, color: '#5b1f07' }}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder='Confirm password'
              placeholderTextColor="#5b1f07"
              onChangeText={cPassword => this.setCredentials('cPassword', cPassword)}
              maxLength={15}
              secureTextEntry={true}
              errorMessage={validationError || user.error || null}
              errorStyle={{ alignSelf: 'center', fontSize: 15, paddingTop: 10 }}

            />

            <TouchableOpacity
              onPress={() => this.register()}
              style={{ width: 265, backgroundColor: '#5f7b86', alignSelf: 'center', alignItems: 'center', marginTop: 30, paddingVertical: 12, borderRadius: 20 }}>
              {loading ?
                (
                  <View style={{ flexDirection: 'row' }}>
                    <ActivityIndicator size='small' color='white' style={{ marginRight: 10 }} />
                    <AppText style={{ color: 'white', fontSize: 16 }}>Checking Credentials...</AppText>
                  </View>
                ) : (
                  <AppText style={{ color: 'white', fontSize: 16 }}>Register</AppText>
                )
              }
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={{ paddingVertical: 20 }}></View>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = (({ user, loading }) => ({ user, loading }));

const mapDispatchToProps = {
  register,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const topInputsStyle = {
  height: 45,
  width: 135,
  borderRadius: 25,
  borderBottomWidth: 1.5,
  borderTopWidth: 1.5,
  borderLeftWidth: 1.5,
  borderRightWidth: 1.5,
  borderColor: '#5b1f07',
  marginRight: 5,
  paddingLeft: 5,
};

const inputsStyle = {
  height: 45,
  width: 280,
  borderRadius: 25,
  borderBottomWidth: 1.5,
  borderTopWidth: 1.5,
  borderLeftWidth: 1.5,
  borderRightWidth: 1.5,
  borderColor: '#5b1f07',
  alignSelf: 'center',
  paddingLeft: 5,
};
