import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import DatePicker from 'react-native-datepicker'

const datePickerStyle = {
  alignSelf: 'center',
  backgroundColor: '#5b1f07',
  borderRadius: 8,
  paddingVertical: 7,
  paddingHorizontal: 3,
};

const datePickerCustomStyles = {
  dateInput: {
    borderWidth: 0,
  },
  placeholderText: {
    fontSize: 14,
    fontWeight: 'bold',
  }
};

export default class AccommodationModal extends Component {
  render() {
    const { selectedAccommodation, modalVisible, setModalVisible } = this.props;
    const uri = selectedAccommodation && selectedAccommodation.image ? `${serverUrl}/images/accommodation/${selectedAccommodation.image}` : '${serverUrl}/images/default.png';

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}>
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
              <View style={{ flex: 1 }}>
                <Image
                  style={{ height: 200, width: null }}
                  indicator={ProgressBar}
                  indicatorProps={{
                    color: '#5b1f07',
                    progress: 1
                  }}
                  source={{ uri }}
                />
              </View>

              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginHorizontal: 20, marginTop: 50 }}>
                <View style={{ flex: 1 }}>
                  <DatePicker
                    style={datePickerStyle}
                    mode="date"
                    placeholder="Check-In"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    maxDate="2016-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={datePickerCustomStyles}
                    onDateChange={(date) => { this.setState({ date: date }) }}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <DatePicker
                    style={datePickerStyle}
                    mode="date"
                    placeholder="Check-Out"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    maxDate="2016-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={datePickerCustomStyles}
                    onDateChange={(date) => { this.setState({ date: date }) }}
                  />
                </View>
              </View>


              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
        </Modal>
      </View>
    );
  }
}
