import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Header from './components/header';
import Spinner from './../../components/Spinner';
import styles from './styles';
import { connect } from 'react-redux';
import { list, setSelection, addToCart } from './../../reducer';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import AppText from './../../components/AppText';
import ActivityModal from './components/activityModal';

class Activities extends Component {
  state = {
    modalVisible: false,
    displayError: false,
  };

  static navigationOptions = {
    tabBarIcon: () => {
      return (
        <Icon
          name='local-activity'
          color='#fff'
          size={26}
        />
      );
    },
  };

  componentWillMount() {
    const { id } = this.props.place;
    this.props.list('activities', 'place_id', id);
  }

  resetError() {
    this.setState({
      displayError: false,
    });
  }

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible,
    });
  }

  dispatchSelectionAndToggleModal(item) {
    this.props.setSelection('activity', item);
    this.setModalVisible(true);
  }

  addToCartAndHide({ startDate, endDate, noOfPeople }) {
    if (!noOfPeople) {
      this.setState({
        displayError: true
      });
    } else {
      this.props.addToCart({
        type: 'activities',
        item: this.props.activity,
        startDate, endDate, noOfPeople,
      })
      this.setState({
        displayError: false,
        modalVisible: !this.state.modalVisible,
      });
    }
  }

  render() {
    const { place, loading, activities, activity } = this.props;
    const { displayError } = this.state;

    if (!loading) {
      return (
        < View style={styles.container} >
          <ActivityModal selectedActivity={activity} displayError={displayError} resetError={() => this.resetError()} modalVisible={this.state.modalVisible} setModalVisible={(visible) => this.setModalVisible(visible)} addToCartAndHide={({ startDate, endDate, noOfPeople }) => this.addToCartAndHide({ startDate, endDate, noOfPeople })} />

          {
            activities.length ? (
              <View style={{ flex: 1 }}>
                <Header place={place} tab='Activities' navigation={this.props.navigation} />

                <View style={{ flex: 1, backgroundColor: '#f4b44c' }}>
                  <FlatList
                    data={activities}
                    renderItem={this.renderItem}
                  />
                </View>
              </View>
            ) :
              (
                <View style={{ backgroundColor: '#c7a249', paddingVertical: 15, paddingHorizontal: 25 }}>
                  <AppText>Sorry there's currently no activities for selected accommodation.</AppText>
                </View>
              )
          }
        </View>
      );
    }
    return (
      <Spinner />
    );
  }

  renderItem = ({ item }) => {
    const uri = item && item.image ? `${serverUrl}/images/activities/${item.image}` : `${serverUrl}/images/default.png`;
    return (
      <View key={item.key}
        style={{ flex: 1, marginVertical: 15, paddingHorizontal: 25 }}>
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
              <AppText style={{ fontWeight: '700', color: '#5b1f07', paddingLeft: 10, paddingTop: 6, fontSize: 17 }}>{item.name}</AppText>
              {/* <AppText style={{ fontWeight: '700', color: '#5b1f07', paddingLeft: 10, paddingTop: 6, fontSize: 17 }}>{item.guide_name}</AppText> */}
              <AppText style={{ fontWeight: 'normal', color: '#5b1f07', paddingLeft: 10, paddingTop: 10, fontSize: 16 }}>${item.cost_per_night}</AppText>
            </View>
            <TouchableOpacity onPress={() => this.dispatchSelectionAndToggleModal(item)}>
              <View style={{ flex: 1, backgroundColor: '#5b1f07', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                <View style={{ flex: 1 }}>
                  <Icon
                    name='place'
                    color='white'
                    size={20}
                    underlayColor='transparent' />
                </View>
                <View style={{ flex: 3 }}>
                  <AppText style={{ fontWeight: 'bold', fontSize: 17, color: 'white' }}>Book now</AppText>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  };
}

const mapStateToProps = ({ selections: { place, activity }, activities, loading }) => ({
  place,
  activity,
  activities: activities ? activities.map(act => ({ ...act, key: act.id })) : [],
  loading,
});

const mapDispatchToProps = {
  list,
  setSelection,
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
