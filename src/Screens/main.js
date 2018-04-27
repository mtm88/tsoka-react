import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Platform, Image, ImageBackground } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { connect } from 'react-redux';

import { list } from './../reducer';

class AccomodationList extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawerLabel: 'Home',
    headerStyle: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      backgroundColor: 'transparent',
    },
    headerLeft: (
      <Icon
        name='menu'
        color='#fff'
        size={35}
        containerStyle={{ paddingLeft: 20 }}
        onPress={() => navigation.navigate('DrawerToggle')} />
    ),
  })

  componentDidMount() {
    this.props.list('places', 'top', 1);
  }

  renderItem = ({ item }) => {
    const uri = `${serverUrl}/images/places/${item.image}`;
    return (
      <View style={styles.item}>
        <View style={{ overflow: 'hidden', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
          <Image
            style={{ height: 120, width: null }}
            source={{ uri }}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 15, paddingBottom: 15 }}>
          <Text style={{
            ...fontFamily, color: '#4c0f00', fontSize: 18, paddingTop: 15, fontWeight: 'bold'
          }}>{item.name}</Text>
          <Text style={{ color: '#ffb41d', fontSize: 15, paddingTop: 15 }}>{`${Math.floor(Math.random() * (40 - 2 + 1)) + 2} Things To Do`}</Text>

          <View style={{ flexDirection: 'row', paddingTop: 15 }}>
            <Text style={{ ...fontFamily, color: '#597580', fontSize: 21 }}>${item.cost_per_night ? parseInt(item.cost_per_night, 10).toFixed() : Math.floor(Math.random() * (200 - 30 + 1)) + 30}</Text>
            <Text style={{ ...fontFamily, color: '#597580', fontSize: 17, paddingTop: 3 }}> per person</Text>
          </View>
        </View>
      </View >
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{ flex: 1, width: null, height: null }}
          source={require('./../../static/images/home.jpg')}>

          <View pointerEvents='none' style={{
            backgroundColor: 'rgba(83,60,49,0.5)',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
          }}></View>

          <View style={{ flex: 1 }}>
            <Image
              style={{ width: 128, height: 64, alignSelf: 'center' }}
              source={require('./../../static/images/logo.png')}
            />
          </View>

          <Input
            containerStyle={{ flex: 1, alignSelf: 'center' }}
            inputContainerStyle={{ backgroundColor: 'rgba(244,180,76,1)', height: 45, borderRadius: 8, alignSelf: 'center' }}
            inputStyle={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}
            placeholder='Where to?'
            placeholderTextColor="#fff"
            rightIcon={
              <Icon
                name='search'
                color='#fff'
                size={35}
                containerStyle={{ paddingRight: 20 }}
                onPress={() => navigation.navigate('DrawerToggle')} />
            }
            onChangeText={text => this.props.list('places', 'name', text)}
          />
        </ImageBackground>

        <View style={styles.flatList}>
          <FlatList
            styles={styles.container}
            data={this.props.places}
            renderItem={this.renderItem}
          />
        </View>
      </View >
    );
  }
}

const fontFamily = {
  fontFamily: Platform.OS === 'ios' ? 'Apple SD Gothic Neo' : 'sans-serif',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSearchStyle: {
    overlayColor: '#461700',
    flex: 1,
  },
  flatList: {
    backgroundColor: '#f4b44c',
    flex: 3,
  },
  item: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

const mapStateToProps = ({ places = [] }) => {
  return {
    places: places.map(place => ({ key: place.id, ...place })),
  };
}

const mapDispatchToProps = {
  list,
}

export default connect(mapStateToProps, mapDispatchToProps)(AccomodationList);
