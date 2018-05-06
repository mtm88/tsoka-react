import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Avatar } from 'react-native-elements';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import { list, setSelection } from './../reducer';
import Spinner from './../components/Spinner';
import AppText from './../components/AppText';

class BlogList extends Component {

  componentWillMount() {
    this.props.list('blog_posts');
  }

  dispatchSelectionAndNavigate(item) {
    this.props.setSelection('blog', item);
    this.props.navigation.navigate('BlogDetails');
  }

  render() {
    const { blog_posts, loading, navigation } = this.props;

    if (!loading) {
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
              <AppText style={{ color: '#fff', fontSize: 20 }}>Travel Blog</AppText>
            </View>
            <View style={{ flex: 2 }}>
            </View>
          </View>

          <View style={{ backgroundColor: '#f4b44c', flex: 2 }}>
            <FlatList
              styles={{ backgroundColor: '#f4b44c' }}
              data={blog_posts}
              renderItem={this.renderItem}
            />
          </View>
        </View>
      );
    }

    return (<Spinner />);
  }

  renderItem = ({ item }) => {
    const uri = `${serverUrl}/images/blog/${item.image}`;
    const avatarUri = `${serverUrl}/images/avatars/${item.avatar}`;

    const shortContent = item.content.length > 100 ? `${item.content.slice(0, 100)}...` : item.content;

    return (
      <View
        key={item.key}
        style={{
          flex: 1,
          marginTop: 20,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 10,
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
        <View style={{ flex: 1, backgroundColor: '#5b1f07', zIndex: 0 }}>
          <Avatar
            style={{ position: 'absolute', right: 50, bottom: 50 }}
            large
            rounded
            source={{uri: avatarUri }}
            activeOpacity={0.7}
          />
          <AppText style={{ color: 'white', padding: 8, fontSize: 18, fontWeight: 'bold' }}>{item.author}</AppText>
        </View>

        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <AppText style={{ color: '#768f98', padding: 12, fontSize: 14 }}>{shortContent}</AppText>
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 2, backgroundColor: 'white' }}>
            </View>
          <TouchableOpacity
            onPress={() => this.dispatchSelectionAndNavigate(item)}  
            style={{ flex: 1, backgroundColor: '#5b1f07', marginRight: 10, marginBottom: 10, padding: 5, borderRadius: 6, alignItems: 'center' }}>
              <AppText style={{ color: 'white', fontSize: 12 }}>READ MORE...</AppText>
            </TouchableOpacity>
        </View>
      </View>
    )
  };
}

const mapStateToProps = (({ blog_posts, loading }) => ({
  blog_posts: blog_posts ? blog_posts.map(post => ({ ...post, key: post.id })) : [],
  loading,
}));

const mapDispatchToProps = {
  list,
  setSelection,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);


