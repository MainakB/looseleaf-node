import React from 'react';
import PropTypes from 'prop-types';
import {
  convertToRaw,
  EditorState,
  RichUtils
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';

import { convertToEditorState, newPlugins } from './draftjsHelpers';
const { plugins, inlineToolbarPlugin } = newPlugins();
const { InlineToolbar } = inlineToolbarPlugin;

export default class PostEditor extends React.Component {
  static defaultProps = {
    placeholder: 'Write something...'
  }
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      clientModeOn: false
    };
    // Functions called by the render function
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.renderPlaceholder = this.renderPlaceholder.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    // TODO: Is there a way to increase the height of the input area
    // when on focus?
    this.focus = () => this.refs.editor.focus();
  }
  componentDidMount() {
    this.setState({ clientModeOn: true });
    if(this.props.editorContent) {
      const newEditorState = convertToEditorState(this.props.editorContent);
      this.setState({
        editorState: newEditorState
      })
    }
  }
  clearEditor() {
    this.setState({
      editorState: EditorState.createEmpty()
    })
  }
  // Here, we are passing a command (like bold or underline) as an argument,
  // which will get passed to the RichUtils.handleKeyCommand, which handles
  // key commands out of the box, along with the current EditorState object.
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  handlePost() {
    const content = this.state.editorState.getCurrentContent();
    // content to save to the db
    const contentToSave = JSON.stringify(convertToRaw(content));
    this.props.handlePost(contentToSave);
  }
  handleCancel() {
    this.props.handleToggleEditMode(false);
  }
  hasContent(editorState) {
    const contentState = editorState.getCurrentContent();
    return contentState.hasText();
  }
  hasContentAndStyle(editorState) {
    const contentState = editorState.getCurrentContent();
    return contentState.hasText() || contentState.getBlockMap().first().getType() !== 'unstyled';
  }
  renderPlaceholder(placeholder, editorState) {
    return this.hasContentAndStyle(editorState) ? '' : placeholder;
  }
  renderPostBtn(editorState) {
    return (
      this.hasContent(editorState) ?
        <button className="btn" onClick={this.handlePost}>
          Post
        </button>
        :
        <button className="btn disabled">
          Post
        </button>
    );
  }
  renderCancelBtn() {
    return (
      <button style={{marginLeft: 20}} className="btn red lighten-2" onClick={this.handleCancel}>
        Cancel
      </button>
    );
  }
  renderEditor() {
    if (!this.state.clientModeOn) {
      return null;
    }
    return (
      <div className="card feed">
        <div className="card-content">
          <div className="row feed-user">
            <div className="col">
              <img className="circle" src={this.props.userPic} alt=""/>
            </div>
            <div className="col">
              <p>{this.props.userDisplayName}</p>
            </div>
          </div>
          <div className="draft-js-editor">
            <Editor
              editorState={this.state.editorState}
              plugins={plugins}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              placeholder={this.renderPlaceholder(this.props.placeholder, this.state.editorState)}
              ref={(element) => { this.editor = element; }}
            />
            <InlineToolbar />
          </div>
        </div>
        <div className="card-action">
          {this.renderPostBtn(this.state.editorState)}
          {this.renderCancelBtn()}
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>{ this.renderEditor() }</div>
    );
  }
}

PostEditor.propTypes = {
  handlePost: PropTypes.func.isRequired,
  userDisplayName: PropTypes.string.isRequired,
  userPic: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};