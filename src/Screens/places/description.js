import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import Header from './components/header';
import Spinner from './components/spinner';
import styles from './styles';
import { connect } from 'react-redux';
import { getSingle } from './../../reducer';

class Description extends Component {
  static navigationOptions = {
    tabBarIcon: () => {
      return (
        <Icon
          name='description'
          color='#fff'
          size={26}
        />
      );
    },
  };

  componentWillMount() {
    const { id } = this.props.navigation.state.params;
    this.props.getSingle('places', 'place', id);
    this.props.getSingle('place_description', 'place_description', id, 'place_id');
  }

  render() {
    const { place, place_description, loading } = this.props;

    if (!loading) {
      return (
        <View style={styles.container}>
          <Header place={place} tab='Description' navigation={this.props.navigation} />
          <View style={styles.content}>
            <View style={{ backgroundColor: '#c7a249', paddingTop: 15, paddingHorizontal: 25 }}>
              <Text style={styles.descriptionText}>{place_description && place_description[0] && place_description[0].teaser || 'There is no description available'}</Text>
              <Text style={styles.descriptionText}>{place_description && place_description[0] && place_description[0].full || ''}</Text>
            </View>
          </View>
        </View>
      );
    }
    return (
      <Spinner />
    );
  }
}

const mapStateToProps = ({ place, place_description, loading }) => ({
  place,
  place_description,
  loading,
});

const mapDispatchToProps = {
  getSingle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Description);
