import React from 'react';
import TopNav from '../TopNav';
import { page } from '../routes';
import { getApiData } from '../../../lib/helpers';
import { apiLink } from '../../data/apiLinks';
import Users from '../../components/Collection/Users';

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
      <div className="section-white">
        <TopNav route={this.props.route} user={this.props.user} community={this.props.community} />
        <div className="community-page container">
          <div className="row">
            <div id={page(this.props.community).three.slug} className="col s12">
              <h3>People</h3>
              <Users users={this.state.users} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
