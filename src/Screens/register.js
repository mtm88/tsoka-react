import React, { Component } from 'react';
import { View, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Icon, Input, SocialIcon } from 'react-native-elements';

import { connect } from 'react-redux';

import { login } from './../reducer';

import AppText from './../components/AppText';

class Register extends Component {
  state = {
    login: null,
    password: null,
  };

  setCredentials(credential, detail) {
    this.setState({
      [credential]: detail,
    });
  }

  login() {
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
          <Input
            containerStyle={{ alignSelf: 'center', paddingTop: 30 }}
            inputContainerStyle={{
              height: 45,
              width: 280,
              borderRadius: 25,
              borderBottomWidth: 1.5,
              borderTopWidth: 1.5,
              borderLeftWidth: 1.5,
              borderRightWidth: 1.5,
              borderColor: '#5b1f07',
              alignSelf: 'center'
            }}
            inputStyle={{ fontSize: 20, paddingTop: 7, color: '#5b1f07' }}
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder='Email'
            placeholderTextColor="#5b1f07"
            leftIcon={
              <Icon
                type='font-awesome'
                name='envelope'
                color='#5b1f07'
                size={28}
                containerStyle={{ alignSelf: 'center' }} />
            }
            onChangeText={login => this.setCredentials('login', login)}
            errorMessage={this.props.user.failedAuth ? 'Sorry, invalid username or password' : null}
            errorStyle={{ alignSelf: 'center', fontSize: 15 }}
          />

          <Input
            containerStyle={{ alignSelf: 'center', paddingTop: 20 }}
            inputContainerStyle={{
              height: 45,
              width: 280,
              borderRadius: 25,
              borderBottomWidth: 1.5,
              borderTopWidth: 1.5,
              borderLeftWidth: 1.5,
              borderRightWidth: 1.5,
              borderColor: '#5b1f07',
              alignSelf: 'center'
            }}
            inputStyle={{ fontSize: 20, paddingTop: 5, paddingLeft: 5, color: '#5b1f07' }}
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder='Password'
            placeholderTextColor="#5b1f07"
            leftIcon={
              <Icon
                type='font-awesome'
                name='lock'
                color='#5b1f07'
                size={28}
                containerStyle={{ paddingLeft: 5, alignSelf: 'center' }} />
            }
            onChangeText={password => this.setCredentials('password', password)}
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
            style={{ width: 265, alignSelf: 'center', marginTop: 50 }}
            fontStyle={{ fontSize: 16 }}
            iconSize={20}
            title='Sign In With Facebook'
            button
            type='facebook'
          />

          <View style={{ alignItems: 'center', paddingTop: 20 }}>
            <AppText style={{ color: 'black', fontSize: 16 }}>Don't have an account yet?</AppText>
            <TouchableOpacity onPress={() => alert('test')}>
              <AppText style={{ fontWeight: 'bold', fontSize: 16 }}> Sign up</AppText>
            </TouchableOpacity>
          </View>

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
