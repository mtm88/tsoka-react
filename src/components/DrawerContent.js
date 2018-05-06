import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';

export default class DrawerContent extends Component {
  render() {
    const icons = ['home', 'shopping-cart', 'comment', 'settings', 'power'];

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
                  onPress={() => this.props.navigation.navigate(item.routeName)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 50, paddingHorizontal: 20 }}>
                    <Icon
                      name={icons[i]}
                      color='#fff'
                      size={35}
                      containerStyle={{ flex: 1 }}
                      underlayColor='transparent' />
                    <View style={{ flex: 4, padding: 7 }}>
                      <Text style={{ color: 'white', fontSize: 18 }}>{item.routeName}</Text>
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


