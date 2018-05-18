import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, ScrollView, TouchableOpacity, Alert, ActivityIndicator, WebView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';

import { fetchPayments, fetchClientToken } from './../reducer';

import AppText from './../components/AppText';

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

  async processPayment() {
    try {
      await this.props.fetchClientToken();

      this.setState({
        ongoingPayment: true,
      });

    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { navigation, user: { payments }, loading } = this.props;

    const awaiting = payments.filter(({ status }) => parseInt(status, 10) === paymentIds.awaiting);
    const accepted = payments.filter(({ status }) => parseInt(status, 10) === paymentIds.accepted);

    if (loading) {
      return <Spinner />
    }

    if (this.state.ongoingPayment) {
    }

    const html = `
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Simple todo with React</title>
    </head>
    <body>
      <div>TEST</div>
        <div id="dropin-container"></div>
    </body>
    </html>
`;

    return (
      <View style={{ flex: 1, backgroundColor: '#f4b44c' }}>
        <WebView source={{ html }}
          style={{ flex: 1 }} />
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
          }
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView style={{ marginTop: 20, marginBottom: 20, paddingTop: 10, paddingHorizontal: 10 }}>

            <View style={{ flex: 1, marginHorizontal: 20, padding: 8 }} >
              <View style={{ backgroundColor: '#5b1f07', width: 160 }}  >
                <AppText style={{ color: 'white', fontSize: 17, fontWeight: 'bold', padding: 6 }}>Awaiting payment</AppText>
              </View>

              <Table borderStyle={{ borderWidth: 0, borderColor: '#5b1f07' }}>
                <Row
                  flexArr={[3, 3, 2, 2, 2]}
                  data={['Check In', 'Check out', 'Rooms', 'Guests', 'Pay']}
                  textStyle={{
                    color: 'white', fontWeight: 'bold', fontSize: 11, textAlign: 'center', padding: 5
                  }}
                  style={{ height: 30, backgroundColor: '#5b1f07' }} />
                <TableWrapper style={{ backgroundColor: '#FFD99C' }}>
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
                            onPress={() => { this.processPayment() }}
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
              <View style={{ backgroundColor: '#5b1f07', width: 95 }}  >
                <AppText style={{ color: 'white', fontSize: 17, fontWeight: 'bold', padding: 6 }}>Approved</AppText>
              </View>

              <Table borderStyle={{ borderWidth: 0, borderColor: '#5b1f07' }}>
                <Row
                  flexArr={[3, 3, 2, 2]}
                  data={['Check In', 'Check out', 'Rooms', 'Guests']}
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
      </View >
    );
  }
}

const mapStateToProps = ({ user, loading }) => ({ user, loading });

const mapDispatchToProps = {
  fetchPayments,
  fetchClientToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
