import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import { connect } from 'react-redux';
import { list, setSelection, addToCart } from './../../reducer';

import Header from './components/header';
import Spinner from './../../components/Spinner';
import RoomModal from './components/roomModal';

import styles from './styles';
import AppText from './../../components/AppText';

class Rooms extends Component {
  state = {
    modalVisible: false,
    displayError: false,
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
    const { id } = this.props.accommodation;
    this.props.list('acco_rooms', 'acco_id', id);
  }

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible,
    });
  }

  resetError() {
    this.setState({
      displayError: false,
    });
  }

  dispatchSelectionAndToggleModal(item) {
    this.props.setSelection('room', item);
    this.setModalVisible(true);
  }

  addToCartAndHide({ startDate, endDate, noOfPeople, noOfRooms }) {
    if (!noOfPeople || !noOfRooms) {
      this.setState({
        displayError: true
      });
    } else {
      this.props.addToCart({
        type: 'rooms',
        item: this.props.room,
        startDate, endDate, noOfPeople, noOfRooms,
      })
      this.setState({
        displayError: false,
        modalVisible: !this.state.modalVisible,
      });
    }
  }

  render() {
    const { place, accommodation, room, rooms, navigation, loading } = this.props;
    const { displayError } = this.state;
    return (
      <View style={styles.container}>
        <Header accommodation={accommodation} tab='Rooms' navigation={navigation} navigateTo='Hotels' />

        <RoomModal selectedRoom={room} displayError={displayError} resetError={() => this.resetError()} modalVisible={this.state.modalVisible} setModalVisible={(visible) => this.setModalVisible(visible)} addToCartAndHide={({ startDate, endDate, noOfPeople, noOfRooms }) => this.addToCartAndHide({ startDate, endDate, noOfPeople, noOfRooms })} />

        {
          place && rooms.length > 0 ?
            (
              <View style={{ flex: 1, backgroundColor: '#f4b44c' }}>
                <FlatList
                  data={rooms}
                  renderItem={this.renderItem}
                />
              </View>
            ) :
            loading ? (<Spinner />)
              :
              (
                <View style={{ backgroundColor: '#c7a249', paddingVertical: 15, paddingHorizontal: 25 }}>
                  <AppText>Sorry there's currently no rooms available at this accommodation.</AppText>
                </View>
              )
        }
      </View>
    );
  }

  renderItem = ({ item }) => {
    const uri = item && item.image ? `${serverUrl}/images/rooms/${item.image}` : `${serverUrl}/images/default.png`;
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
              <AppText style={{ fontWeight: 'normal', color: '#5b1f07', paddingLeft: 10, paddingTop: 6, fontSize: 14 }}>{item.description}</AppText>
              <AppText style={{ fontWeight: '700', color: '#5b1f07', paddingLeft: 10, paddingTop: 10, fontSize: 16 }}>${item.price}</AppText>
            </View>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => this.dispatchSelectionAndToggleModal(item)}>
              <View style={{ flex: 1, backgroundColor: '#5b1f07', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                <View style={{ flex: 1 }}>
                  <Icon
                    name='room-service'
                    color='white'
                    size={20}
                    underlayColor='transparent' />
                </View>
                <View style={{ flex: 2 }}>
                  <AppText style={{ fontWeight: 'bold', fontSize: 17, color: 'white' }}>Bookings</AppText>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View >
    )
  };
}

const mapStateToProps = ({ selections: { place, accommodation, room }, acco_rooms, loading }) => ({
  place,
  accommodation,
  room,
  loading,
  rooms: acco_rooms ? acco_rooms.map(room => ({ ...room, key: room.id, partner_id: accommodation.offered_by_id })) : [],
});

const mapDispatchToProps = {
  list,
  setSelection,
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
