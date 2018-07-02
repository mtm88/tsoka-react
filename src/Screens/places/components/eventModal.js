import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import DatePicker from 'react-native-datepicker'
import { Select, Option } from 'react-native-chooser';
import AppText from './../../../components/AppText';

import moment from 'moment';

export default class EventModal extends Component {
  state = {
    noOfPeople: null,
  };

  onSelect(prop, value) {
    const newState = {};
    newState[prop] = value;

    this.setState(newState);
    this.props.resetError();
  }

  render() {
    const { selectedEvent, modalVisible, setModalVisible, addToCartAndHide, displayError } = this.props;
    const { noOfPeople } = this.state;
    const uri = selectedEvent && selectedEvent.image ? `${serverUrl}/images/events/${selectedEvent.image}` : `${serverUrl}/images/default.png`;

    return (
      <View>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => { }}>
          <View style={{
            flex: 5,
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'rgba(111, 112, 114, 0.8)'
          }}>
            <View style={{ flex: 1 }}></View>
            <View style={{
              flex: 3,
              backgroundColor: '#ebebeb',
            }}>
              <View style={{ flex: 3 }}>
                <Image
                  style={{ flex: 2, height: null, width: null }}
                  indicator={ProgressBar}
                  indicatorProps={{
                    color: '#5b1f07',
                    progress: 1
                  }}
                  source={{ uri }}
                />
              </View>

              <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 20 }}>
                <View style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 10, marginTop: 15 }}>
                  <AppText style={{ fontWeight: 'bold', paddingBottom: 3 }}>No. of People</AppText>
                  <Select
                    onSelect={(value) => this.onSelect('noOfPeople', value)}
                    transparent={true}
                    style={selectStyles}
                    textStyle={selectTextStyle}
                    backdropStyle={selectBackdropStyle}
                    optionListStyle={selectOptionListStyle}
                    selectedStyle={selectSelectedStyle}
                    selected={this.state.noOfPeople}
                  >
                    {
                      [...Array.from({ length: 10 }, (v, i) => ({ key: i + 1 }))].map(({ key }) =>
                        <Option value={key} key={key} style={selectOptionStyle} styleText={selectOptionTextStyle}>{key.toString()}</Option>
                      )
                    }
                  </Select>
                </View>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {
                  displayError && <AppText style={{ color: 'red', fontWeight: 'bold', fontSize: 15 }}>Please select all options before proceeding.</AppText>
                }
              </View>
              <View style={{ flex: 1, flexDirection: 'row', borderTopColor: '#5b1f07', borderTopWidth: 1 }}>
                <TouchableOpacity style={{ flex: 1, borderRightColor: '#5b1f07', borderRightWidth: 0.7 }} onPress={() => setModalVisible(!modalVisible)}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <AppText style={{ fontSize: 17, fontWeight: 'bold', color: '#5b1f07' }}>Cancel</AppText>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => addToCartAndHide({ noOfPeople })}>
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <AppText style={{ fontSize: 17, fontWeight: 'bold', color: '#5b1f07' }}>Add to Cart</AppText>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
        </Modal>
      </View >
    );
  }
}

const datePickerStyle = {
  alignSelf: 'center',
  backgroundColor: '#5b1f07',
  borderRadius: 8,
  paddingVertical: 7,
};

const datePickerCustomStyles = {
  dateInput: {
    borderWidth: 0,
  },
  placeholderText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
};

const selectStyles = {
  borderRadius: 8,
  backgroundColor: '#5b1f07',
  width: null,
  alignItems: 'center',
};

const selectTextStyle = {
  color: 'white',
};

const selectBackdropStyle = {
  backgroundColor: 'rgba(111, 112, 114, 0.8)',
}

const selectOptionListStyle = {
  backgroundColor: '#f4b44c',
  padding: 5,
}

const selectOptionTextStyle = {
  fontSize: 18,
  color: 'white',
  fontWeight: 'bold',
}
const selectOptionStyle = {
  paddingVertical: 10,
  paddingHorizontal: 10,
  alignItems: 'center'
}

const selectSelectedStyle = {
  backgroundColor: '#5b1f07',
}
