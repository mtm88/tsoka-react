import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import { connect } from 'react-redux';
import { list, setSelection } from './../../reducer';

import Header from './components/header';
import Spinner from './../../components/Spinner';
import RoomModal from './components/roomModal';

import styles from './styles';
import AppText from './../../components/AppText';

class Accomodation extends Component {
  state = {
    modalVisible: false,
    selectedAccommodation: null,
  };

  static navigationOptions = {
    tabBarIcon: () => {
      return (
        <Icon
          name='hotel'
          color='#fff'
          size={26}
        />
      );
    },
  };

  componentWillMount() {
    const { id } = this.props.place;
    this.props.list('accommodations', 'place_id', id);
  }

  dispatchSelectionAndNavigate(item) {
    this.props.setSelection('accommodation', item);
    this.props.navigation.navigate('Rooms', { id: item.key })
  }

  render() {
    const { place, accommodations } = this.props;

    if (place) {
      return (
        <View style={styles.container}>
          <Header place={place} tab='Accommodation' navigation={this.props.navigation} />

          <View style={{ flex: 1, backgroundColor: '#f4b44c' }}>
            <FlatList
              data={this.props.accommodations}
              renderItem={this.renderItem}
            />
          </View>
        </View>
      );
    }
    return (
      <Spinner />
    );
  }

  renderItem = ({ item }) => {
    const uri = item && item.image ? `${serverUrl}/images/accommodation/${item.image}` : '${serverUrl}/images/default.png';
    return (
      <View style={{ flex: 1, marginVertical: 15, paddingHorizontal: 25 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Image
              style={{ height: 120, width: null }}
              indicator={ProgressBar}
              indicatorProps={{
                color: '#5b1f07',
                progress: 1
              }}
              source={{ uri }}
            />
          </View>
          <View style={{ flex: 1, backgroundColor: '#FFD99C', flexDirection: 'column' }}>
            <View style={{ flex: 1 }}>
              <AppText style={{ fontWeight: '700', color: '#5b1f07', paddingLeft: 10, paddingTop: 6, fontSize: 17 }}>{item.hotel_name}</AppText>
              <AppText style={{ fontWeight: 'normal', color: '#5b1f07', paddingLeft: 10, paddingTop: 10, fontSize: 16 }}>${item.cost_per_night}</AppText>
            </View>
            <TouchableOpacity onPress={() => this.dispatchSelectionAndNavigate(item)}>
              <View style={{ flex: 1, backgroundColor: '#5b1f07', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                <View style={{ flex: 1 }}>
                  <Icon
                    name='place'
                    color='white'
                    size={20}
                    underlayColor='transparent' />
                </View>
                <View style={{ flex: 3 }}>
                  <AppText style={{ fontWeight: 'bold', fontSize: 17, color: 'white' }}>View Rooms</AppText>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View >
    )
  };
}

const mapStateToProps = ({ selections: { place }, accommodations }) => ({
  place,
  accommodations: accommodations ? accommodations.map(acco => ({ ...acco, key: acco.id })) : [],
});

const mapDispatchToProps = {
  list,
  setSelection,
};

export default connect(mapStateToProps, mapDispatchToProps)(Accomodation);
