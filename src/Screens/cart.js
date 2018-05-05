import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';

import { removeFromCart, filterCart } from './../reducer';

import AppText from './../components/AppText';

class Cart extends Component {
  static navigationOptions = () => ({
    drawerLabel: 'Cart',
  })

  render() {
    const { navigation, cart: { items: { rooms, events, activities, transport }, filter } } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: '#f4b44c' }}>
        <View style={{ backgroundColor: '#5b1f07', flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
          <Icon
            name='menu'
            color='#fff'
            size={35}
            containerStyle={{ flex: 2 }}
            underlayColor='transparent'
            onPress={() => navigation.navigate('DrawerToggle')} />
          <View style={{ flex: 6, alignItems: 'center' }}>
            <AppText style={{ color: '#fff', fontSize: 20 }}>Cart</AppText>
          </View>
          <View style={{ flex: 2 }}>
            <Icon
              type='foundation'
              name='filter'
              color='white'
              size={35}
              underlayColor='transparent'
              onPress={() => this.toggleFilteringModal()} />
          </View>
        </View>

        { /* FILTERING PANEL */}

        <View style={{ height: 35, backgroundColor: '#5b1f07', flexDirection: 'row', }}  >
          {
            ['All', 'Rooms', 'Events', 'Activities', 'Transport'].map((filterOp) => {
              return (
                <TouchableOpacity key={filterOp} onPress={() => this.props.filterCart(filterOp)}
                  style={{
                    flex: 1,
                    borderBottomWidth: filter === filterOp ? 5 : 0,
                    borderBottomColor: filter === filterOp ? '#FFD99C' : '#5b1f07',
                    alignItems: 'center', justifyContent: 'center'
                  }}>
                  <AppText style={{ color: 'white' }}>{filterOp}</AppText>
                </TouchableOpacity>
              );
            })
          }
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView style={{ marginTop: 20, marginBottom: 20, paddingTop: 10, paddingHorizontal: 10 }}>
            {
              ['Rooms', 'Events', 'Activities', 'Transport'].map((filterOp) => {
                return filter === 'All' || filter === filterOp ? (
                  <View key={filterOp} style={{ marginBottom: 20 }}>
                    <View style={{ flex: 1, backgroundColor: '#5b1f07', padding: 5, paddingLeft: 10 }}  >
                      <AppText style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{filterOp}</AppText>
                    </View>
                    {this.props.cart.items[filterOp.toLowerCase()].length ? (
                      <Table borderStyle={{ borderWidth: 0, borderColor: '#5b1f07' }}>
                        <Row
                          flexArr={[3, 3, 2, 2, 2, 2]}
                          data={['Start Date', 'End Date', 'People', 'Rooms', 'Price', 'Action']}
                          textStyle={{
                            color: 'white', fontWeight: 'bold', fontSize: 11, textAlign: 'center', padding: 5
                          }}
                          style={{ height: 30, backgroundColor: '#5b1f07' }} />
                        <TableWrapper style={{ backgroundColor: '#FFD99C' }}>
                          <Rows
                            flexArr={[3, 3, 2, 2, 2, 2]}
                            style={{ height: 30 }}
                            textStyle={{
                              color: 'black', fontWeight: 'bold', fontSize: 11, textAlign: 'center',
                            }}
                            data={
                              this.props.cart.items[filterOp.toLowerCase()].map(({ key, item, startDate, endDate, noOfPeople, noOfRooms }, i) => {
                                return [
                                  startDate,
                                  endDate,
                                  noOfPeople,
                                  noOfRooms,
                                  item.price,
                                  (
                                    <TouchableOpacity
                                      onPress={() => this.props.removeFromCart(filterOp.toLowerCase(), item.id)}
                                      style={{ flex: 1 }}>
                                      <View style={{ flex: 1 }}>
                                        <Icon
                                          name='remove'
                                          color='red'
                                          size={30}
                                          underlayColor='transparent' />
                                      </View>
                                    </TouchableOpacity>
                                  )
                                ]
                              })
                            } />
                        </TableWrapper>
                      </Table>
                    ) : (
                        <View style={{ flex: 1, backgroundColor: '#FFD99C', padding: 5, paddingLeft: 10 }}>
                          <AppText>No {filterOp} in the cart just yet.</AppText>
                        </View>
                      )
                    }
                  </View>
                ) : null;
              }).filter(Boolean)
            }
          </ScrollView>
        </View>
      </View >
    );
  }
}

const mapStateToProps = ({ cart }) => ({ cart });

const mapDispatchToProps = {
  removeFromCart,
  filterCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
