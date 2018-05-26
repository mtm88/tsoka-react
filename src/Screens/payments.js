import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, ScrollView, TouchableOpacity, Alert, ActivityIndicator, WebView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';

import { fetchPayments, fetchClientToken, createTransaction, updatePayment } from './../reducer';

import AppText from './../components/AppText';

const BTClient = require('react-native-braintree-xplat');

class Payments extends Component {
  state = {
    ongoingPayment: false,
  };

  static navigationOptions = () => ({
    drawerLabel: 'Cart',
  })

  componentWillMount() {
    const { user: { id } } = this.props;
    this.props.fetchPayments(id);
  }

  async processPayment(record) {
    try {
      await this.props.fetchClientToken();

      BTClient.setup(this.props.user.braintree.clientToken);
      const nonce = await BTClient.showPaymentViewController();
      const paymentResults = await this.props.createTransaction({ nonce, amount: record.costs });

      if (paymentResults.payload.data.success) {
        Alert.alert('Payment successfull', 'Thank you. Your payment has been processed and your reservation is now approved');
        return this.props.updatePayment(record);
      }

      return Alert.alert('Payment Error', 'We\'re sorry, but there was a problem with processing your payment. Please try again.')
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { navigation, user: { payments }, loading } = this.props;

    const awaiting = payments.filter(({ status }) => parseInt(status, 10) === paymentIds.awaiting);
    const accepted = payments.filter(({ status }) => parseInt(status, 10) === paymentIds.accepted);

    if (loading) {
      return <Spinner />;
    }

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
            <AppText style={{ color: '#fff', fontSize: 20 }}>Payments</AppText>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView style={{ marginTop: 20, marginBottom: 20, paddingTop: 10, paddingHorizontal: 10 }}>

            <View style={{ flex: 1, marginHorizontal: 20, padding: 8 }} >
              <View style={{ backgroundColor: '#5b1f07', paddingHorizontal: 20, paddingVertical: 8 }}>
                <AppText style={{ color: 'white', fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>Awaiting payment</AppText>
              </View>

              <Table borderStyle={{ borderWidth: 0, borderColor: '#5b1f07' }}>
                <Row
                  flexArr={[3, 3, 2, 2, 2]}
                  data={['Check In', 'Check out', 'Rooms', 'Guests', 'Pay']}
                  textStyle={{
                    color: 'white', fontWeight: 'bold', fontSize: 11, textAlign: 'center', padding: 5
                  }}
                  style={{ height: 30, backgroundColor: '#5b1f07' }} />
                <TableWrapper style={{ backgroundColor: '#FFD99C', minHeight: 30 }}>
                  <Rows
                    flexArr={[3, 3, 2, 2, 2]}
                    style={{ height: 30 }}
                    textStyle={{
                      color: 'black', fontWeight: 'bold', fontSize: 11, textAlign: 'center',
                    }}
                    data={awaiting.map((record) => {
                      return [
                        record.check_in,
                        record.check_out,
                        record.rooms,
                        record.guests,
                        (
                          <TouchableOpacity
                            onPress={() => { this.processPayment(record) }}
                            style={{ flex: 1 }}>
                            <View style={{ flex: 1, padding: 2 }}>
                              <Icon
                                name='paypal'
                                type='foundation'
                                color='blue'
                                size={25}
                                underlayColor='transparent' />
                            </View>
                          </TouchableOpacity>
                        )

                      ];
                    })}
                  />
                </TableWrapper>
              </Table>
            </View>

            <View style={{ flex: 1, marginHorizontal: 20, marginTop: 35, padding: 8 }} >
              <View style={{ backgroundColor: '#5b1f07', paddingHorizontal: 20, paddingVertical: 8 }}>
                <AppText style={{ color: 'white', fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>Approved</AppText>
              </View>

              <Table borderStyle={{ borderWidth: 0, borderColor: '#5b1f07' }}>
                <Row
                  flexArr={[3, 3, 2, 2]}
                  data={['Check In', 'Check out', 'Rooms', 'Guests']}
                  textStyle={{
                    color: 'white', fontWeight: 'bold', fontSize: 11, textAlign: 'center', padding: 5
                  }}
                  style={{ height: 30, backgroundColor: '#5b1f07' }} />
                <TableWrapper style={{ backgroundColor: '#FFD99C', minHeight: 30 }}>
                  <Rows
                    flexArr={[3, 3, 2, 2, 2, 2]}
                    style={{ height: 30 }}
                    textStyle={{
                      color: 'black', fontWeight: 'bold', fontSize: 11, textAlign: 'center',
                    }}
                    data={accepted.map((record) => {
                      return [
                        record.check_in,
                        record.check_out,
                        record.rooms,
                        record.guests,
                      ];
                    })}
                  />
                </TableWrapper>
              </Table>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ user, loading }) => ({ user, loading });

const mapDispatchToProps = {
  fetchPayments,
  fetchClientToken,
  createTransaction,
  updatePayment,
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
