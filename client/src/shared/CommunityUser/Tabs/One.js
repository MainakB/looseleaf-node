import React from 'react';
import TopNav from '../TopNav';
import { page } from '../routes';
import { getApiData } from '../../../lib/helpers';
import { staticApiLink } from '../../data/apiLinks';
import Projects from '../../components/Collection/Projects';

export default class One extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null
    };
  }
  componentDidMount() {
    const setApiData = data => this.setState({ projects: data });
    const apiLink = staticApiLink.projects;
    getApiData(apiLink, setApiData);
  }
  render() {
    return (
      <div className="section-white">
        <TopNav route={this.props.route} user={this.props.user} community={this.props.community} />
        <div className="community-page container">
          <div className="row">
            <div id={page(this.props.community).one.slug} className="col s12">
              <h3>Projects</h3>
              <Projects projects={this.state.projects} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
