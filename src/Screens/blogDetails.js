import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Avatar } from 'react-native-elements';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import Spinner from './../components/Spinner';
import AppText from './../components/AppText';

class BlogDetails extends Component {

  render() {
    const { blog, loading, navigation } = this.props;
    const uri = `${serverUrl}/images/blog/${blog.image}`;
    const avatarUri = `${serverUrl}/images/avatars/${blog.avatar}`;

    if (!loading) {
      return (
        <View style={{ flex: 1, backgroundColor: '#f4b44c' }}>
          <View style={{ backgroundColor: '#5b1f07', flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
            <Icon
              name='arrow-back'
              color='#fff'
              size={26}
              containerStyle={{ flex: 2 }}
              underlayColor='transparent'
              onPress={() => navigation.navigate('BlogList')} />

            <View style={{ flex: 6, alignItems: 'center' }}>
              <AppText style={{ color: '#fff', fontSize: 20 }}>{blog.author}</AppText>
            </View>

            <View style={{ flex: 2 }}>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              borderRadius: 10,
              backgroundColor: 'white',
            }}>
            <View style={{ overflow: 'hidden', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
              <Image
                style={{ height: 120, width: null }}
                indicator={ProgressBar}
                indicatorProps={{
                  color: '#5b1f07',
                  progress: 1
                }}
                source={{ uri }}
              />
            </View>

            <Avatar
              style={{ position: 'absolute', right: 50, top: 95, zIndex: 100 }}
              large
              rounded
              source={{ uri: avatarUri }}
              activeOpacity={0.7}
            />

            <View style={{ backgroundColor: 'white' }}>
              <AppText style={{ color: '#768f98', marginTop: 20, paddingHorizontal: 25, fontSize: 15 }}>{blog.content}</AppText>
            </View>

          </View>
        </View>
      );
    }

    return (<Spinner />);
  }
}

const mapStateToProps = (({ selections: { blog }, loading }) => ({
  blog,
  loading,
}));

export default connect(mapStateToProps)(BlogDetails);


