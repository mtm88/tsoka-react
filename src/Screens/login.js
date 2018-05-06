import React, { Component } from 'react';
import { View, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Icon, Input } from 'react-native-elements';

import { connect } from 'react-redux';

import { login } from './../reducer';

import AppText from './../components/AppText';

class Login extends Component {
  state = {
    login: null,
    password: null,
  };

  setCredentials(credential, detail) {
    this.setState({
      [credential]: detail,
    });
  }

  async login() {
    const { login, password } = this.state;
    const loginResults = await this.props.login(login, password);

    if (loginResults.payload.data) {
      return this.props.updateStatus(true);
    }
    return this.props.updateStatus(false);
  }

  render() {
    const { user, loading } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: '#f4b44c' }}>
        <View style={{ alignItems: 'center', justifyContent: 'flex-end', paddingTop: 50, paddingBottom: 20 }}>
          <Image
            style={{ width: 128, height: 64 }}
            source={require('./../../static/images/logo.png')}
          />
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
            errorMessage={this.props.failedAuth ? 'Sorry, invalid username or password' : null}
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
                  <AppText style={{ color: 'white', fontSize: 16 }}> Veryfing Credentials...</AppText>
                </View>
              ) : (
                <AppText style={{ color: 'white', fontSize: 16 }}>{this.props.failedAuth ? 'Try again' : 'Sign in'}</AppText>
              )
            }
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (({ user, loading }) => ({ user, loading }));

const mapDispatchToProps = {
  login,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
