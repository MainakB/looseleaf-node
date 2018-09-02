import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Posts from './Collection/Posts';
import PostEditor from './Form/PostEditor';
import { apiLink } from '../data/apiLinks';
import { getApiData } from '../../lib/helpers';

const constructContext = (context, slug) => {
  const project = context ==='project' ? slug : null
  const community = context ==='community' ? slug : null
  return {project, community}
}

export default class Discussion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: null,
      posts: null
    };
  }
  componentWillMount() {
    this.fetchPosts();
  }
  fetchPosts() {
    const context = this.props.context;
    const slug = this.props.slug;
    const link = apiLink.postsByContext(context, slug);
    const setApiData = data => this.setState({ posts: data });
    getApiData(link, setApiData);
  }

    // Returns True if successful post. False Otherwise.
  handlePost(d) {
    // The d received here are in the format that can be saved to the DB
    this.setState({
      editorContent: d
    });
    const userId = this.props.user.info._id;
    const content = d;
    const context = constructContext(this.props.context, this.props.slug)

    // TODO: Move this to helper file
    axios.post(apiLink.posts, { content, userId, context })
      .then(res => {
        if (res.statusText === 'error') {
          // If there's error, do something
        } else if (res.statusText === 'OK') {
          this.fetchPosts();
        }
      // Perform action based on response, such as flashing error notif
      })
      .catch((error) => {
        console.log(error);
       //Perform action based on error
      });
  }
  render() {
    return (
      <div>
        {
          this.props.user && this.props.user.info &&
            <PostEditor
              handlePost={d => this.handlePost(d)}
              userDisplayName={this.props.user.info.displayName}
              userPic={this.props.user.info.picture}
              placeholder={this.props.newPostPlaceholder}
            />
        }
        <Posts posts={this.state.posts} />
      </div>
    );
  }
}
// Example:
// context = {project: <projectId>, community: <communityName>}
//
// newPostPlaceholder:
// "Post an announcement, question, or insight to this community.
// "Post an update, question, or clarification to this project."
Discussion.propTypes = {
  user: PropTypes.object,
  newPostPlaceholder: PropTypes.string,
  slug: PropTypes.string,
  context: PropTypes.string
};