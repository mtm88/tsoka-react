import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getMember } from './../reducer';

class Settings extends Component {
  static navigationOptions = () => ({
    drawerLabel: 'Settings',
  });

  componentDidMount() {
    this.props.getMember(1);
  }

  render() {
    const { member, loading } = this.props;

    if (loading) {
      return <Text>Loading...</Text>;
    }

    return (
      <View>
        <Text>Name: {member}</Text>
      </View>
    );
  }
}

const mapStateToProps = ({ member, loading }) => ({
  member,
  loading,
});

const mapDispatchToProps = {
  getMember,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
