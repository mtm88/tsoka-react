import { StackNavigator } from 'react-navigation';
import BlogList from './../Screens/blogList';
import BlogDetails from './../Screens/blogDetails';

export default BlogNavigator = StackNavigator({
  BlogList: {
    screen: BlogList,
  },
  BlogDetails: {
    screen: BlogDetails,
  },
}, {
    headerMode: 'none',
});
