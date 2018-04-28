import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import Header from './components/header';
import Spinner from './components/spinner';
import styles from './styles';
import { connect } from 'react-redux';
import { getSingle } from './../../reducer';

class Events extends Component {
  static navigationOptions = {
    tabBarIcon: () => {
      return (
        <Icon
          name='event-available'
          color='#fff'
          size={26}
        />
      );
    },
  };

  componentWillMount() {
    const { key } = this.props.navigation.state.params;
    this.props.getSingle('places', 'place', 1);
  }

  render() {
    const { place, loading } = this.props;

    if (place.length) {
      return (
        <View style={styles.container}>
          <Header place={place} tab='Events' navigation={this.props.navigation} />

          <View style={styles.content}>
          </View>
        </View>
      );
    }
    return (
      <Spinner />
    );
  }
}

const mapStateToProps = ({ place, loading }) => ({
  place,
  loading,
});

const mapDispatchToProps = {
  getSingle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
