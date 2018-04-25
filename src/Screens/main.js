import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { listAccomodations } from './../reducer';

class AccomodationList extends Component {
  componentDidMount() {
    this.props.listAccomodations();
  }

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.hotel_name}</Text>
      <Image
        style={{ width: 150, height: 150 }}  
        source={{ uri: `${serverUrl}/images/accommodation/${item.image}` }}
      />
    </View>
  );

  render() {
    const { accomodations } = this.props;
    return (
      <FlatList
        styles={styles.container}
        data={accomodations}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

const mapStateToProps = ({ accomodations }) => {
  return {
    accomodations: accomodations.map(acco => ({ key: acco.id, ...acco })),
  };
}

const mapDispatchToProps = {
  listAccomodations,
}

export default connect(mapStateToProps, mapDispatchToProps)(AccomodationList);
