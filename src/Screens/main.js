import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Platform } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { connect } from 'react-redux';

import { listAccomodations } from './../reducer';

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
        size='35'
        containerStyle={{ paddingLeft: 20, marginTop: -25 }}
        onPress={() => navigation.navigate('DrawerToggle')} />
    ),
  })

  componentDidMount() {
    this.props.listAccomodations();
  }

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={{ overflow: 'hidden', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
        <Image
          style={{ height: 120, width: null }}
          source={{ uri: `${serverUrl}/images/accommodation/${item.image}` }}
        />
      </View>
      <View style={{ flex: 1, paddingLeft: 15, paddingBottom: 15 }}>
        <Text style={{...fontFamily, color: '#4c0f00', fontSize: 18, paddingTop: 15, fontWeight: 'bold'
        }}>{item.hotel_name}</Text>
        <Text style={{ color: '#ffb41d', fontSize: 15, paddingTop: 15 }}>{`${Math.floor(Math.random() * (40 - 2 + 1)) + 2} Things To Do`}</Text>

        <View style={{ flexDirection: 'row', paddingTop: 15 }}>
          <Text style={{...fontFamily, color: '#597580', fontSize: 21 }}>${parseInt(item.cost_per_night, 10).toFixed()}</Text>
          <Text style={{...fontFamily, color: '#597580', fontSize: 17, paddingTop: 3 }}> per person</Text>
        </View>
      </View>
    </View >
  );

  render() {
    const { accomodations } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.topSearchStyle}>
          <View style={{ flex: 1 }}>

          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Input
              containerStyle={{ flex: 1, paddingTop: 20 }}
              inputContainerStyle={{ backgroundColor: 'rgba(244,180,76,1)', height: 50, borderRadius: 8 }}
              inputStyle={{ marginLeft: 20, color: '#fff', fontSize: 20, fontWeight: 'bold' }}
              placeholder='Where to?'
              placeholderTextColor="#fff"
              rightIcon={
                <Icon
                  name='search'
                  color='#fff'
                  size='35'
                  containerStyle={{ paddingRight: 20 }}
                  onPress={() => navigation.navigate('DrawerToggle')} />
              }
            />
          </View>
        </View>
        <View style={styles.flatList}>
          <FlatList
            styles={styles.container}
            data={accomodations}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

const fontFamily = {
  fontFamily: Platform.OS === 'ios' ? 'San Francisco' : 'sans-serif',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSearchStyle: {
    backgroundColor: '#461700',
    flex: 1,
  },
  flatList: {
    backgroundColor: '#f4b44c',
    flex: 2,
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

const mapStateToProps = ({ accomodations }) => {
  return {
    accomodations: accomodations.map(acco => ({ key: acco.id, ...acco })),
  };
}

const mapDispatchToProps = {
  listAccomodations,
}

export default connect(mapStateToProps, mapDispatchToProps)(AccomodationList);
