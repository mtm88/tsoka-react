import React, { Component } from 'react';
import { Text, Platform } from 'react-native';

const fontFamily = Platform.OS === 'ios' ? 'Apple SD Gothic Neo' : 'sans-serif';

export default class AppText extends Component {
  constructor({ style = {}, props }) {
    super(style, props);
    this.props = props;
    this.style = style;
  }
  render() {
    return (<Text style={[...{ fontFamily }, this.style]}>{this.props.children}</Text>);
  }
}
