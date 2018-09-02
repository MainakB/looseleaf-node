import React from 'react';
import Discussion from '../../components/Discussion';

const Feed = ({ user, projectId }) => (
  <div id="project-page-discussion">
    <h5>Discussion</h5>
    <div className="col s12 m12 l12 user-feed">
    {
      <Discussion
        user={user}
        context='project'
        slug={projectId}
        newPostPlaceholder='Post an update, question, or clarification to this project.'
      />
    }
    </div>
  </div>
);

export default Feed;