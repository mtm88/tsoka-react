import React, { Component } from 'react';
import { View, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Icon, Input, SocialIcon } from 'react-native-elements';

import { connect } from 'react-redux';

import { login } from './../reducer';

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
  };

  setCredentials(credential, detail) {
    this.setState({
      [credential]: detail,
    });
  }

  register() {
    const { login, password } = this.state;
    this.props.login(login, password);
  }

  render() {
    const { user, loading } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: '#f4b44c' }}>
        <View style={{ alignItems: 'center', justifyContent: 'flex-end', paddingTop: 50, paddingBottom: 20 }}>
          <AppText style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 5 }}>REGISTER</AppText>
          <AppText>Please fill in your details</AppText>
        </View>

        <ScrollView
          style={{ flex: 5 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Input
              containerStyle={{ paddingTop: 10, flex: 1 }}
              inputContainerStyle={{
                height: 45,
                width: 135,
                borderRadius: 25,
                borderBottomWidth: 1.5,
                borderTopWidth: 1.5,
                borderLeftWidth: 1.5,
                borderRightWidth: 1.5,
                borderColor: '#5b1f07',
                alignSelf: 'flex-end',
                marginRight: 5,
                paddingLeft: 5,
              }}
              inputStyle={{ fontSize: 20, color: '#5b1f07' }}
              autoCapitalize={'words'}
              autoCorrect={false}
              placeholder='First Name'
              placeholderTextColor="#5b1f07"
              onChangeText={fName => this.setCredentials('fName', fName)}
              errorMessage={this.props.user.failedAuth ? 'Sorry, invalid username or password' : null}
              errorStyle={{ alignSelf: 'center', fontSize: 15 }}
            />

            <Input
              containerStyle={{ flex: 1, paddingTop: 10 }}
              inputContainerStyle={{
                height: 45,
                width: 135,
                borderRadius: 25,
                borderBottomWidth: 1.5,
                borderTopWidth: 1.5,
                borderLeftWidth: 1.5,
                borderRightWidth: 1.5,
                borderColor: '#5b1f07',
                alignSelf: 'flex-start',
                marginLeft: 5,
                paddingLeft: 5,
              }}
              inputStyle={{ fontSize: 20, color: '#5b1f07' }}
              autoCapitalize={'words'}
              autoCorrect={false}
              placeholder='Last Name'
              placeholderTextColor="#5b1f07"
              onChangeText={lName => this.setCredentials('lName', lName)}
              errorMessage={this.props.user.failedAuth ? 'Sorry, invalid username or password' : null}
              errorStyle={{ alignSelf: 'center', fontSize: 15 }}
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
            inputStyle={{ fontSize: 20, color: '#5b1f07' }}
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder='User name'
            placeholderTextColor="#5b1f07"
            onChangeText={userName => this.setCredentials('userName', userName)}
            errorMessage={this.props.user.failedAuth ? 'Sorry, invalid username or password' : null}
            errorStyle={{ alignSelf: 'center', fontSize: 15 }}
          />

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
            inputStyle={{ fontSize: 20, paddingTop: 5, paddingLeft: 5, color: '#5b1f07' }}
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder='Email'
            placeholderTextColor="#5b1f07"
            onChangeText={email => this.setCredentials('email', email)}
          />

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
            inputStyle={{ fontSize: 20, paddingTop: 5, paddingLeft: 5, color: '#5b1f07' }}
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder='Phone'
            placeholderTextColor="#5b1f07"
            onChangeText={phone => this.setCredentials('phone', phone)}
          />

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
            inputStyle={{ fontSize: 20, paddingTop: 5, paddingLeft: 5, color: '#5b1f07' }}
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
            inputStyle={{ fontSize: 20, paddingTop: 5, paddingLeft: 5, color: '#5b1f07' }}
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder='Confirm password'
            placeholderTextColor="#5b1f07"
            onChangeText={cPassword => this.setCredentials('cPassword', cPassword)}
            maxLength={15}
            secureTextEntry={true}
          />

          <TouchableOpacity
            onPress={() => this.login()}
            style={{ width: 265, backgroundColor: '#5f7b86', alignSelf: 'center', alignItems: 'center', marginTop: 30, paddingVertical: 12, borderRadius: 20 }}>
            {loading ?
              (
                <View style={{ flexDirection: 'row' }}>
                  <ActivityIndicator size='small' color='white' style={{ marginRight: 10 }} />
                  <AppText style={{ color: 'white', fontSize: 16 }}>Veryfing Credentials...</AppText>
                </View>
              ) : (
                <AppText style={{ color: 'white', fontSize: 16 }}>{this.props.user.failedAuth ? 'Try again' : 'Sign in'}</AppText>
              )
            }
          </TouchableOpacity>

          <SocialIcon
            style={{ width: 265, alignSelf: 'center', marginTop: 30 }}
            fontStyle={{ fontSize: 16 }}
            iconSize={20}
            title='Sign In With Facebook'
            button
            type='facebook'
          />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (({ user, loading }) => ({ user, loading }));

const mapDispatchToProps = {
  login,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
