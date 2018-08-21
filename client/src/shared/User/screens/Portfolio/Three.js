import React from 'react';
import Collection from './Collection';
import { getApiData } from '../../../../lib/helpers';
import { apiLink } from '../../../data/apiLinks';
import Users from '../../../components/Collection/Users';

export default class Three extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    };
  }
  componentDidMount() {
    this.fetchUsers();
  }
  fetchUsers() {
    const setApiData = data => this.setState({ users: data });
    getApiData(apiLink.users, setApiData);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <h3>Followers</h3>
          <Users users={this.state.users} />
        </div>
      </div>
    );
  }
}
