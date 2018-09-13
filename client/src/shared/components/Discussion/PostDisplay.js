import React from 'react';
import PropTypes from 'prop-types';
import { CompositeDecorator, convertFromRaw, Editor, EditorState } from 'draft-js';
import { dateFormatted } from '../../../lib/helpers';
import PostEditMenu from './PostEditMenu';

const Reactions = () => (
  <div>
    <a href="">Interesting</a>
    <a href="">Clap</a>
    <a href="">Response</a>
  </div>
);

// Following code based on:
// https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/link/link.html
const Link = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a rel="nofollow noreferrer" href={url} target="_blank">
      {props.children}
    </a>
  );
};

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

const decorator = new CompositeDecorator([{
  strategy: findLinkEntities,
  component: Link
}]);

// TODO: import the below code from draftjsHelpers
const convertToEditorState = (editorContent) => {
  const content = convertFromRaw(JSON.parse(editorContent));
  const editorState = EditorState.createWithContent(content, decorator);
  return editorState;
};

const PostDisplay = ({
  handleToggleEditMode,
  userDisplayName,
  userPic,
  username,
  userId,
  postId,
  editedOn,
  loggedinUser,
  deletePost,
  createdAt,
  editorContent }) => (
  editorContent &&
    <div className="card feed">
      <div className="card-content">
        {
          loggedinUser && loggedinUser._id === userId ?
            <PostEditMenu
              postId={postId}
              deletePost={deletePost}
              handleToggleEditMode={handleToggleEditMode}
            />
            :
            null
        }
        <div className="row feed-user">
          <div className="col">
            <img className="circle" src={userPic} alt="" />
          </div>
          <div className="col" style={{marginLeft: -18}}>
            <span>
              <a href={`/@${username}`}>{userDisplayName}</a>
            </span>
            <p style={{paddingLeft: 15, fontSize: 14}}>
              {dateFormatted(createdAt)}
            </p>
          </div>
          {
            editedOn &&
            <div className="col">
              <p style={{marginLeft: 12, paddingTop: 5}}>Edited</p>
            </div>
          }
        </div>
        <div className="draft-js-editor">
          <Editor
            editorState={convertToEditorState(editorContent)}
            readOnly
          />
        </div>
      </div>
      {
        <div className="card-action">
          <Reactions />
        </div>
      }
    </div>
);

PostDisplay.propTypes = {
  userDisplayName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  userPic: PropTypes.string.isRequired,
  editorContent: PropTypes.string
};
PostDisplay.defaultProps = {
  editorContent: null
};

export default PostDisplay;