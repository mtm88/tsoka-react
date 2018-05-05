import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';

import { addToCart, removeFromCart, filterCart } from './../reducer';

import AppText from './../components/AppText';

class Cart extends Component {
  static navigationOptions = () => ({
    drawerLabel: 'Cart',
  })

  toggleFilteringModal() {

  }

  render() {
    const { navigation, cart: { items: { rooms, events, activities, transport } } } = this.props;

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
        <View style={{ flex: 1 }}>
          <ScrollView style={{ marginTop: 20, marginBottom: 20, paddingTop: 10, paddingHorizontal: 10 }}>
            {/* ROOMS */}
            <View style={{ marginBottom: 20 }}>
              <View style={{ flex: 1, backgroundColor: '#5b1f07', padding: 5, paddingLeft: 10 }}  >
                <AppText style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Rooms</AppText>
              </View>
              {rooms.length ? (
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
                        rooms.map(({ key, item, startDate, endDate, noOfPeople, noOfRooms }, i) => {
                          return [
                            startDate,
                            endDate,
                            noOfPeople,
                            noOfRooms,
                            item.price,
                            (
                              <TouchableOpacity
                                onPress={() => this.props.removeFromCart('rooms', item.id)}
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
                    <AppText>No rooms in the cart just yet.</AppText>
                  </View>
                )
              }
            </View>
            {/* ROOMS END */}

            {/* EVENTS */}
            <View style={{ marginBottom: 20 }}>
              <View style={{ flex: 1, backgroundColor: '#5b1f07', padding: 5, paddingLeft: 10 }}  >
                <AppText style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Events</AppText>
              </View>
              {events.length ? (
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
                        rooms.map(({ key, item, startDate, endDate, noOfPeople, noOfRooms }, i) => {
                          return [
                            startDate,
                            endDate,
                            noOfPeople,
                            noOfRooms,
                            item.price,
                            (
                              <TouchableOpacity
                                onPress={() => this.props.removeFromCart('rooms', item.id)}
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
                    <AppText>No events in the cart just yet.</AppText>
                  </View>
                )
              }
            </View>
            {/* EVENTS END */}

            {/* ACTIVITIES */}
            <View style={{ marginBottom: 20 }}>
              <View style={{ flex: 1, backgroundColor: '#5b1f07', padding: 5, paddingLeft: 10 }}  >
                <AppText style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Activities</AppText>
              </View>
              {events.length ? (
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
                        rooms.map(({ key, item, startDate, endDate, noOfPeople, noOfRooms }, i) => {
                          return [
                            startDate,
                            endDate,
                            noOfPeople,
                            noOfRooms,
                            item.price,
                            (
                              <TouchableOpacity
                                onPress={() => this.props.removeFromCart('rooms', item.id)}
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
                    <AppText>No activities in the cart just yet.</AppText>
                  </View>
                )
              }
            </View>
            {/* ACTIVITIES END */}

            {/* TRANSPORT */}
            <View style={{ marginBottom: 20 }}>
              <View style={{ flex: 1, backgroundColor: '#5b1f07', padding: 5, paddingLeft: 10 }}  >
                <AppText style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Transport</AppText>
              </View>
              {events.length ? (
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
                        rooms.map(({ key, item, startDate, endDate, noOfPeople, noOfRooms }, i) => {
                          return [
                            startDate,
                            endDate,
                            noOfPeople,
                            noOfRooms,
                            item.price,
                            (
                              <TouchableOpacity
                                onPress={() => this.props.removeFromCart('rooms', item.id)}
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
                    <AppText>No transport in the cart just yet.</AppText>
                  </View>
                )
              }
            </View>
            {/* TRANSPORT END */}


          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ cart }) => ({ cart });

const mapDispatchToProps = {
  addToCart,
  removeFromCart,
  filterCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
