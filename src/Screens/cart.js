import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';

import { removeFromCart, filterCart, applyToCart } from './../reducer';

import AppText from './../components/AppText';

class Cart extends Component {
  static navigationOptions = () => ({
    drawerLabel: 'Cart',
  })

  async applyCart() {
    const {
      navigation,
      cart: { items: { rooms, events, activities, transport }, filter },
      user,
    } = this.props;

    try {
      await this.props.applyToCart({ rooms, events, activities, transport }, user);
      Alert.alert('Reservation status', 'Your reservation is now being processed. Please wait for an approval from one of the partners.');
    } catch (error) {
      Alert.alert('Reservation status', 'There\'s been a problem with processing your reservation. Please try again or contact support.');
    }
  }

  render() {
    const {
      navigation,
      cart: { items: { rooms, events, activities, transport }, filter },
      user,
      accomodations,
    } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: '#f4b44c' }}>
        <View style={{ backgroundColor: '#5b1f07', flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
          <Icon
            name='menu'
            color='#fff'
            size={35}
            containerStyle={{ flex: 1 }}
            underlayColor='transparent'
            onPress={() => navigation.navigate('DrawerToggle')} />
          <View style={{ flex: 3, alignItems: 'center' }}>
            <AppText style={{ color: '#fff', fontSize: 20 }}>Cart</AppText>
          </View>
          {(rooms.length || events.length || activities.length || transport.length) ?
            (
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}  >
                  <Icon
                    name='send'
                    type='font-awesome'
                    color='#fff'
                    size={20}
                    containerStyle={{ flex: 1 }}
                    underlayColor='transparent' />
                </View>
                <TouchableOpacity style={{ flex: 3 }} onPress={() => this.applyCart()} >
                  <AppText style={{ color: 'white', fontWeight: '700', fontSize: 11, padding: 5 }}>SUBMIT</AppText>
                </TouchableOpacity>
              </View>
            ) : <View style={{ flex: 1 }}></View>
          }
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
                          flexArr={[4, 2, 2, 2, 2, 2]}
                          data={['Hotel Name', 'Nights', 'People', 'Rooms', 'Price', 'Action']}
                          textStyle={{
                            color: 'white', fontWeight: 'bold', fontSize: 11, textAlign: 'center', padding: 5
                          }}
                          style={{ height: 30, backgroundColor: '#5b1f07' }} />
                        <TableWrapper style={{ backgroundColor: '#FFD99C' }}>
                          <Rows
                            flexArr={[4, 2, 2, 2, 2, 2]}
                            style={{ height: 30 }}
                            textStyle={{
                              color: 'black', fontWeight: 'bold', fontSize: 11, textAlign: 'center',
                            }}
                            data={
                              this.props.cart.items[filterOp.toLowerCase()].map(({ key, item, startDate, endDate, noOfPeople, noOfRooms }, i) => {
                                const relatedAccommodation = accomodations.find(({ id }) => item.acco_id === id);
                                const nights = moment(endDate, 'DD/MM/YYYY').diff(moment(startDate, 'DD/MM/YYYY'), 'days');
                                return [
                                  relatedAccommodation.hotel_name,
                                  nights,
                                  noOfPeople,
                                  noOfRooms,
                                  `${item.price * noOfRooms}$`,
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

const mapStateToProps = ({ cart, user, accomodations }) => ({ cart, user, accomodations });

const mapDispatchToProps = {
  removeFromCart,
  filterCart,
  applyToCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
