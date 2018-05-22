import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Platform, ImageBackground, Image as RNImage, TouchableOpacity } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import { list, setSelection } from './../reducer';

class Home extends Component {
  static navigationOptions = () => ({
    drawerLabel: 'Home',
  })

  componentWillMount() {
    // fetch top places, which means flag top = 1
    this.props.list('places', 'top', 1);
  }

  dispatchSelectionAndNavigate(item) {
    this.props.setSelection('place', item);
    this.props.navigation.navigate('Details', { id: item.key })
  }

  renderItem = ({ item }) => {
    const uri = `${serverUrl}/images/places/${item.image}`;

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.dispatchSelectionAndNavigate(item)}>
        <View style={{ overflow: 'hidden', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
          <Image
            style={{ height: 120, width: null }}
            indicator={ProgressBar}
            indicatorProps={{
              color: '#5b1f07',
              progress: 1,
            }}
            source={{ uri }}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 15, paddingBottom: 5 }}>
          <Text style={{ ...fontFamily, color: '#4c0f00', fontSize: 20, paddingTop: 14, fontWeight: 'bold' }}>{item.name}</Text>
          <Text style={{ ...fontFamily, color: '#ffb41d', fontSize: 15, paddingTop: 16 }}>{`${Math.floor(Math.random() * (40 - 2 + 1)) + 2} Things To Do`}</Text>

          <View style={{ flexDirection: 'row', paddingTop: 5 }}>
            <Text style={{ ...fontFamily, color: '#597580', fontSize: 21 }}>${item.cost_per_night ? parseInt(item.cost_per_night, 10).toFixed() : Math.floor(Math.random() * (200 - 30 + 1)) + 30}</Text>
            <Text style={{ ...fontFamily, color: '#597580', fontSize: 17, paddingTop: 3 }}> per person</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          resizeMode='stretch'
          style={{ flex: 1, width: null, height: null, minHeight: 30, alignItems: 'center' }}
          source={require('./../../static/images/home.jpg')}>

          <View style={{
            backgroundColor: 'rgba(126,67,41,0.5)',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
          }}></View>

          <View style={{ flex: 1, position: 'absolute', top: 8, left: 8, backgroundColor: 'transparent' }}>
            <Icon
              name='menu'
              color='white'
              size={35}
              underlayColor='transparent'
              onPress={() => this.props.navigation.navigate('DrawerToggle')} />
          </View>

          <View style={{ flex: 5, justifyContent: 'flex-end', paddingBottom: 15 }}>
            <RNImage
              style={{ width: 128, height: 64 }}
              source={require('./../../static/images/logo.png')}
            />
          </View>

          <Input
            containerStyle={{ flex: 3, alignSelf: 'center' }}
            inputContainerStyle={{
              backgroundColor: 'rgba(244,180,76,0.6)',
              width: 280,
              borderRadius: 8,
              borderBottomWidth: 0,
              alignSelf: 'center',
              padding: 5,
            }}
            inputStyle={{ fontSize: 20, fontWeight: 'bold', color: 'white', paddingVertical: 5 }}
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder='Where to?'
            placeholderTextColor="#fff"
            rightIcon={
              <Icon
                name='search'
                color='#fff'
                size={35}
                containerStyle={{ paddingRight: 20 }} />
            }
            onChangeText={text => this.delayQuery(text)}
          />
        </ImageBackground>

        <View style={styles.flatList}>
          <FlatList
            styles={styles.container}
            data={this.props.places}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }

  delayQuery(searchText) {
    this.setState({
      searchText,
    });
    setTimeout(() => {
      if (this.state.searchText === searchText) {
        this.props.list('places', 'name', searchText);
      }
    }, 800);
  }
}

const fontFamily = {
  fontFamily: Platform.OS === 'ios' ? 'Apple SD Gothic Neo' : 'sans-serif',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  topSearchStyle: {
    overlayColor: '#461700',
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

const mapStateToProps = ({ places }) => {
  places = places ? places.map(place => ({ key: place.id, ...place })).filter(({ image }) => image) : [];

  return {
    places,
  };
}

const mapDispatchToProps = {
  list,
  setSelection,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
