import React, { Component } from 'react';

import { connect } from 'react-redux';

import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import { logout } from './../reducer';

const { FBLogin, FBLoginManager } = require('react-native-facebook-login');

class DrawerContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const icons = ['home', 'shopping-cart', 'payment', 'comment', 'settings', 'power'];

    const { user } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: '#5b1f07' }}>
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <Image
            style={{ width: 128, height: 64 }}
            source={require('./../../static/images/logo.png')}
          />
        </View>

        <View style={{ flex: 1, paddingTop: 40 }}>
          {
            this.props.items.map((item, i) =>
              (
                <TouchableOpacity
                  key={item.key}
                  style={{ padding: 5 }}
                  onPress={
                    () => {
                      if (item.routeName === 'Logout') {
                        return this.props.logout();
                      }
                      return this.props.navigation.navigate(item.routeName);
                    }
                  }
                >
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 50, paddingHorizontal: 20 }}>
                    {!user.fbLogin || (user.fbLogin && item.routeName !== 'Logout') ?
                      <Icon
                        name={icons[i]}
                        color='#fff'
                        size={35}
                        containerStyle={{ flex: 1 }}
                        underlayColor='transparent' /> : null
                    }
                    <View style={{ flex: 4, padding: 7, maxHeight: 50 }}>
                      {user.fbLogin && (item.routeName === 'Logout') ?
                        <FBLogin
                          style={{ alignSelf: 'center', paddingBottom: 30 }}
                        />
                        :
                        <Text style={{ color: 'white', fontSize: 18 }}>{item.routeName}</Text>
                      }
                    </View>
                  </View>
                </TouchableOpacity>
              )
            )
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = (({ user }) => ({ user }));

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);


