import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getAccoDetails } from './../reducer';

class AccoDetails extends Component {
  static navigationOptions = {
    title: 'Accommodation Details',
  };

  componentDidMount() {
    this.props.getAccoDetails(1);
  }

  render() {
    const { accoDetails, loading } = this.props;

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

const mapStateToProps = ({ accoDetails, loading }) => ({
  accoDetails,
  loading,
});

const mapDispatchToProps = {
  getAccoDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccoDetails);
