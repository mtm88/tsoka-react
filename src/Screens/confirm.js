import React, { Component } from 'react';
import { View, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

import { connect } from 'react-redux';

import { confirmRegistrationCode } from './../reducer';

import AppText from './../components/AppText';
import Sinner from './../components/Spinner';

const borderStyles = {
  borderColor: '#5b1f07',
  borderWidth: 2,
  borderRadius: 30,
  width: 50,
  height: 50,
  alignSelf: 'center',
  textAlign: 'center',
  fontSize: 25,
};

class Confirm extends Component {
  state = {
    first: null,
    second: null,
    third: null,
    fourth: null,
    fifth: null,

    verificationError: false,
  };

  processInput(value, position, code) {
    this.setState({
      [value]: code,
    });

    this[`${position}TextInput`].focus();
  }

  async confirmCode(fifthValue) {
    const { first, second, third, fourth } = this.state;

    const code = `${first}${second}${third}${fourth}${fifthValue}`;
    const results = await this.props.confirmRegistrationCode({ login: this.props.user.login, code });

    if (!results.error) {
      this.props.navigation.navigate('InitialRoute');
    } else {
      this.setState({
        verificationError: true,
        first: null,
        second: null,
        third: null,
        fourth: null,
        fifth: null,
      });
    }
  }

  render() {
    const { loading } = this.props;
    if (loading) {
      return <Spinner />
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#f4b44c' }}>
        <View style={{ alignItems: 'center', paddingTop: 50, paddingBottom: 20 }}>
          <AppText style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 15 }}>CONFIRMATION</AppText>
          <AppText style={{ paddingHorizontal: 30, paddingVertical: 20, }}>Enter confirmation code. A veryfication is sent to provided contact number/email, please enter that code here:</AppText>
        </View>
        <View style={{ flex: 1, marginHorizontal: 35, flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ flex: 1, alignItems: 'center' }}  >
            <TextInput onChangeText={(value) => this.processInput('first', 'second', value)}
              blurOnSubmit={false}
              underlineColorAndroid='rgba(0,0,0,0)'
              style={{ ...borderStyles }} maxLength={1} secureTextEntry={true} value={this.props.first} />
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}  >
            <TextInput onChangeText={(value) => this.processInput('second', 'third', value)}
              ref={(input) => { this.secondTextInput = input; }}
              blurOnSubmit={false}
              underlineColorAndroid='rgba(0,0,0,0)'
              style={{ ...borderStyles }} maxLength={1} secureTextEntry={true} value={this.props.second} />
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}  >
            <TextInput onChangeText={(value) => this.processInput('third', 'fourth', value)}
              ref={(input) => { this.thirdTextInput = input; }}
              blurOnSubmit={false}
              underlineColorAndroid='rgba(0,0,0,0)'
              style={{ ...borderStyles }} maxLength={1} secureTextEntry={true} value={this.props.third} />
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}  >
            <TextInput onChangeText={(value) => this.processInput('fourth', 'fifth', value)}
              ref={(input) => { this.fourthTextInput = input; }}
              blurOnSubmit={false}
              underlineColorAndroid='rgba(0,0,0,0)'
              style={{ ...borderStyles }} maxLength={1} secureTextEntry={true} value={this.props.fourth} />
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}  >
            <TextInput onChangeText={(fifthValue) => this.confirmCode(fifthValue)}
              ref={(input) => { this.fifthTextInput = input; }}
              blurOnSubmit={false}
              underlineColorAndroid='rgba(0,0,0,0)'
              style={{ ...borderStyles }} maxLength={1} secureTextEntry={true} value={this.props.fifth} />
          </View>
        </View>
        <View style={{ flex: 5, alignItems: 'center' }}>
          {this.state.verificationError &&
            <AppText style={{ color: 'red', fontSize: 16 }}>Sorry, incorrect code. Please try again.</AppText>
          }
        </View>

      </View>
    );
  }
}

const mapStateToProps = (({ user, loading }) => ({ user, loading }));

const mapDispatchToProps = {
  confirmRegistrationCode,
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
