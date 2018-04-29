import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import { connect } from 'react-redux';
import { list } from './../../reducer';

import Header from './components/header';
import Spinner from './components/spinner';
import AccomodationModal from './components/accommodationModal';

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
          name='place'
          color='#fff'
          size={26}
        />
      );
    },
  };

  componentWillMount() {
    const { id } = this.props.navigation.state.params;
    this.props.list('accommodations', 'place_id', id);
  }

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible,
    });
  }

  setSelectedAccomodation(item) {
    this.setState({
      selectedAccommodation: item,
    });
  }

  render() {
    const { place, accommodations } = this.props;

    if (place.length) {
      return (
        <View style={styles.container}>
          <Header place={place} tab='Accommodation' navigation={this.props.navigation} />

          <AccomodationModal selectedAccommodation={this.state.selectedAccommodation} modalVisible={this.state.modalVisible} setModalVisible={(visible) => this.setModalVisible(visible)} />
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
      <TouchableOpacity
        onPress={() => {
          this.setSelectedAccomodation(item);
          this.setModalVisible(true);
        }}>
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
            <View style={{ flex: 1, backgroundColor: '#FFD99C' }}>
              <AppText style={{ color: '#5b1f07', paddingLeft: 10, paddingTop: 10 }}>Name</AppText>
              <AppText style={{ fontWeight: '700', color: '#5b1f07', paddingLeft: 10, paddingTop: 2, fontSize: 17 }}>{item.hotel_name}</AppText>
              <AppText style={{ color: '#5b1f07', paddingLeft: 10, paddingTop: 10 }}>Price</AppText>
              <AppText style={{ fontWeight: 'bold', color: '#5b1f07', paddingLeft: 10, paddingTop: 2, fontSize: 16 }}>${item.cost_per_night}</AppText>
            </View>
          </View>
        </View >
      </TouchableOpacity>
    )
  };
}

const mapStateToProps = ({ place, accommodations }) => ({
  place,
  accommodations: accommodations ? accommodations.map(acco => ({ ...acco, key: acco.id })) : [],
});

const mapDispatchToProps = {
  list,
};

export default connect(mapStateToProps, mapDispatchToProps)(Accomodation);
