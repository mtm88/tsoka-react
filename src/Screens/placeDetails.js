import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getSingle } from './../reducer';

class PlaceDetails extends Component {
  static navigationOptions = {
    title: 'Place Details',
  };

  componentDidMount() {
    this.props.getSingle('places', 'place', 1);
  }

  render() {
    const { placeDetails, loading } = this.props;

    if (loading) {
      return <Text>Loading...</Text>;
    }

    return (
      <View>
        <Text></Text>
      </View>
    );
  }
}

const mapStateToProps = ({ placeDetails, loading }) => ({
  placeDetails,
  loading,
});

const mapDispatchToProps = {
  getSingle,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetails);
