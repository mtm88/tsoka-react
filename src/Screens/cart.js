import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';

import { removeFromCart, filterCart, applyToCart, getSingle } from './../reducer';

import AppText from './../components/AppText';
import Spinner from './../components/Spinner';

class Cart extends Component {
  state = {
    fee: 0,
  }

  static navigationOptions = () => ({
    drawerLabel: 'Cart',
  })

  async componentDidMount() {
    await this.props.getSingle('service_fees', 'fee', 1, 'current');

    const {
      cart: { items: { rooms, events, activities, transport } },
      fee,
    } = this.props;

    let total = 0;
    [rooms, events, activities, transport].forEach((type) => {
      type.forEach(({ item: { price, cost_per_night }, startDate, endDate, noOfPeople, noOfRooms, type }) => {
        let nights = moment(endDate, 'DD/MM/YYYY').diff(moment(startDate, 'DD/MM/YYYY'), 'days');
        nights = startDate && endDate ? nights ? nights : 1 : 1;
        const valueProp = price || cost_per_night || 0;

        if (valueProp) {
          const valueToAdd = parseInt(valueProp, 10) * nights;
          if (type === 'rooms') {
            valueToAdd = valueToAdd * noOfRooms;
          } else {
            valueToAdd = valueToAdd * noOfPeople;
          }
          total += valueToAdd;
        }
      });
    });

    if (fee) {
      const feeValue = total * (parseInt(fee[0].value, 10) / 100).toFixed(2);
      total += feeValue;

      this.setState({
        fee: feeValue,
        total: total.toFixed(2),
      });
    }
  }

  async applyCart() {
    const {
      cart: { items: { rooms, events, activities, transport } },
      user,
    } = this.props;

    try {
      await this.props.applyToCart({ rooms, events, activities, transport }, user);
      Alert.alert('Reservation status', 'Your reservation is now being processed. Please wait for an approval from one of the partners.');
    } catch (error) {
      Alert.alert('Reservation status', 'There\'s been a problem with processing your reservation. Please try again or contact Customer Support.');
    }
  }

  render() {
    const {
      navigation,
      cart: { items: { rooms, events, activities, transport }, filter },
      user,
      accomodations,
      fee,
      loading,
    } = this.props;

    const bookingRecordOptions = [
      {
        label: 'Rooms',
        fields: ['Hotel Name', 'Nights', 'People', 'Rooms', 'Price', 'Action'],
      },
      {
        label: 'Events',
        fields: ['Name', 'People', 'Price', 'Action'],
      },
      {
        label: 'Activities',
        fields: ['Name', 'People', 'Price', 'Action'],
      },
      {
        label: 'Transport',
        fields: ['Name', 'People', 'Price', 'Action'],
      },
    ];

    return (
      loading ? <Spinner /> :
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
              bookingRecordOptions.map(({ label, fields }) => {
                return filter === 'All' || filter === label ? (
                  <View key={label} style={{ marginBottom: 20 }}>
                    <View style={{ flex: 1, backgroundColor: '#5b1f07', padding: 5 }}  >
                      <AppText style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{label}</AppText>
                    </View>
                    {this.props.cart.items[label.toLowerCase()].length ? (
                      <Table borderStyle={{ borderWidth: 0, borderColor: '#5b1f07' }}>
                        <Row
                          flexArr={fields.map((field, i) => (i === 0) ? 4 : 2)}
                          data={fields}
                          textStyle={{
                            color: 'white', fontWeight: 'bold', fontSize: 11, textAlign: 'center', padding: 5
                          }}
                          style={{ height: 30, backgroundColor: '#5b1f07' }} />
                        <TableWrapper style={{ backgroundColor: '#FFD99C' }}>
                          <Rows
                            flexArr={fields.map((field, i) => (i === 0) ? 4 : 2)}
                            style={{ height: 30 }}
                            textStyle={{
                              color: 'black', fontWeight: 'bold', fontSize: 11, textAlign: 'center',
                            }}
                            data={
                              this.props.cart.items[label.toLowerCase()].map(({ key, type, item, startDate, endDate, noOfPeople, noOfRooms }, i) => {
                                const relatedAccommodation = accomodations.find(({ id }) => item.acco_id === id);
                                let nights = moment(endDate, 'DD/MM/YYYY').diff(moment(startDate, 'DD/MM/YYYY'), 'days');
                                const nameProperty = type === 'rooms' ? 'hotel_name' : type === 'transport' ? 'route_name' : 'name';
                                const costProperty = type === 'rooms' || type === 'events' ? 'price' : 'cost_per_night';

                                if (label === 'Rooms') {
                                  nights = startDate && endDate ? nights ? nights : 1 : null;
                                } else {
                                  nights = null;
                                }

                                return [
                                  type === 'rooms' ? relatedAccommodation[nameProperty] : item[nameProperty],
                                  nights,
                                  noOfPeople,
                                  noOfRooms ? noOfRooms : null,
                                  `$${noOfRooms ? (item[costProperty] * noOfRooms * nights) : noOfPeople * item[costProperty]}`,
                                  (
                                    <TouchableOpacity
                                      onPress={() => this.props.removeFromCart(label.toLowerCase(), item.id)}
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
                                ].filter(Boolean)
                              })
                            } />
                        </TableWrapper>
                      </Table>
                    ) : (
                        <View style={{ flex: 1, backgroundColor: '#FFD99C', padding: 5, paddingLeft: 10 }}>
                          <AppText>No {label} in the cart just yet.</AppText>
                        </View>
                      )
                    }
                  </View>
                ) : null;
              }).filter(Boolean)
            }

            {fee || fee === 0 ? (
              <View key='serviceFee' style={{ marginBottom: 20 }}>
                <View style={{ flex: 1, backgroundColor: '#5b1f07', padding: 5, paddingLeft: 10, flexDirection: 'row' }}>
                  <AppText style={{ flex: 1, color: 'white', fontWeight: 'bold', fontSize: 18 }}>Service Fee</AppText>
                  <AppText style={{ flex: 1, color: 'white', fontWeight: 'bold', fontSize: 18, paddingRight: 10, textAlign: 'right' }}>${this.state.fee}</AppText>
                </View>
              </View>
            ) : null
            }

            <View key='total' style={{ marginBottom: 20 }}>
              <View style={{ flex: 1, backgroundColor: '#5b1f07', padding: 5, paddingLeft: 10, flexDirection: 'row' }}>
                <AppText style={{ flex: 1, color: 'white', fontWeight: 'bold', fontSize: 18 }}>Total</AppText>
                <AppText style={{ flex: 1, color: 'white', fontWeight: 'bold', fontSize: 18, paddingRight: 10, textAlign: 'right' }}>
                  ${this.state.total}
                </AppText>
              </View>
            </View>
          </ScrollView>
        </View>
      </View >
    );
  }
}

const mapStateToProps = ({ cart, user, accomodations, fee }) => ({ cart, user, accomodations, fee });

const mapDispatchToProps = {
  removeFromCart,
  filterCart,
  applyToCart,
  getSingle,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
