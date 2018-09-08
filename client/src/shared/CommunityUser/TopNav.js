import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { communityPage as page }  from '../data/appPage';
import { getPageName, postToApiData } from '../../lib/helpers';
import { image } from '../data/assetLinks';
import { apiLink } from '../data/apiLinks';
import appRoute from '../data/appRoute';
import UserDropdown from '../components/TopNavUser/UserDropdown';

export default class TopNav extends React.Component {
  // constructor(props) {
  //   super(props);
    // TODO: I don't know why having the lines below make handleJoinClick get called
    // Does this happen elsewhere? Gotta check all the handle functions elsewhere
    // to see if this is happening
    // four times upon initial mount
    // this.handleLeaveClick = this.handleLeaveClick.bind(this);
    // this.handleJoinClick = this.handleJoinClick.bind(this);
  // }
  componentDidMount() {
    $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: 0.5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '80px' // Ending top style attribute
    });

    $('ul.tabs').tabs();

    this.initializeSticky();
  }
  initializeSticky() {
    let categories = $('nav .categories-container');
    if (categories.length) {
      categories.pushpin({
        top: categories.offset().top
      });
    }
  }
  closeModal(modalId) {
    $(modalId).modal('close');
  }
  handleCtaClick(userId, updatedCommunities) {
    const url = apiLink.userCommunities(userId);
    const data = {formFields: updatedCommunities}
    const cbFailure = () => {};

    const cbSuccess = () =>  {
      this.props.actions.getLoggedinUserData(this.props.user.username);
      this.props.updateState();
    }

    postToApiData(url, data, cbFailure, cbSuccess);
  }
  renderJoinBtn(label, id, userId, updatedCommunities) {
    return (
      <button id={id}
         onClick={this.handleCtaClick.bind(this, userId, updatedCommunities)}
         className="btn cta-btn">
        {label}
      </button>
    );
  }
  renderLeaveBtn(userId, updatedCommunities) {
    return (
      <button
         onClick={this.handleCtaClick.bind(this, userId, updatedCommunities)}
         className="btn cta-btn">
        Leave
      </button>
    );
  }
  renderCta(userId, userCommunities, communitySlug) {
    // If user is a member of the community
    if (!userCommunities.includes(communitySlug)) {
      return this.renderJoinBtn(
        'Join This Community',
        'signup-btn-header',
        userId,
        userCommunities.concat(communitySlug)
      );
    }
    // If user is not a member of the community
    return (
      <div id='community-cta'>
        <p>You are a member of this community.<br/>
        {
          this.renderLeaveBtn(
            userId,
            userCommunities.filter(a => a !== communitySlug)
          )
        }
        </p>
      </div>
    );
  }
  renderNavHeader(userId, userCommunities, community) {
    return (
      <div className="nav-header center">
        <h4>{community.name}</h4>
        <div className="tagline">
          {community.desc}
        </div>
        { this.renderCta(userId, userCommunities, community.slug) }
      </div>
    );
  }
  renderPrimaryNavInner(selected, user, redirPath) {
    return (
      <div className="nav-wrapper-white nav-text-links">
        <div className="brand-logo">
          <a className="navbar-brand" href={appRoute('userHome')}>
            <img src={image.logo} alt="LooseLeaf" />
          </a>
        </div>
        { user &&
          <div>
            <ul className="right">
              <UserDropdown
                username={user.username}
                userPic={user.picture}
                redirPath={redirPath}
              />
            </ul>
          </div>
        }
      </div>
    );
  }
  renderPrimaryNavExtended(selected, community, user, redirPath) {
    return (
      <div id="looseleaf-section-header">
        <nav className="nav-extended grey lighten-4">
          <div className="nav-background">
            <div className="pattern active"></div>
          </div>
          { this.renderPrimaryNavInner(selected, user, redirPath) }
          { this.renderNavHeader(user._id, user.communities, community) }
        </nav>
      </div>
    );
  }
  renderTabs(selected, userId, userCommunities, communitySlug) {
    const style = {
      top: 0
    };
    const noMarginBottom = {
      marginBottom: 0
    };
    const styleHeight = {
      height: '48px'
    };
    return (
      <nav className="filter-navbar" style={styleHeight}>
        <div className="categories-wrapper">
          <div className="categories-container pin-top" style={style}>
            <div className="categories grey lighten-4 row" style={noMarginBottom}>
              <div className="col l12 m12 s12">
                <ul id="nav-tabs" className="tabs grey lighten-4">
                  <li className='tab'>
                    <Link
                      id={`tab-one`}
                      className={selected === page(communitySlug).one.slug ? 'active' : ''}
                      to={page(communitySlug).one.link}>
                      {page(communitySlug).one.name}
                    </Link>
                  </li>
                  <li className='tab'>
                    <Link
                      id={`tab-two`}
                      className={selected === page(communitySlug).two.slug ? 'active' : ''}
                      to={page(communitySlug).two.link}>
                      {page(communitySlug).two.name}
                    </Link>
                  </li>
                  <li className='tab'>
                    <Link
                      id={`tab-three`}
                      className={selected === page(communitySlug).three.slug ? 'active' : ''}
                      to={page(communitySlug).three.link}>
                      {page(communitySlug).three.name}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  render() {
    let selected = (typeof this.props.route.path === 'string')
                    ? getPageName(this.props.route.path) : '';
    const redirPath = (typeof this.props.route.path === 'string') ? this.props.route.path : '/';
    return (
      <div>
        {
          this.renderPrimaryNavExtended(selected, this.props.community, this.props.user, redirPath)
        }
        {
          this.renderTabs(selected, this.props.user._id, this.props.user.communities, this.props.community.slug)
        }
      </div>
    );
  }
}

TopNav.propTypes = {
  extended: PropTypes.bool,
  updateState: PropTypes.func,
}
TopNav.defaultProps = {
  extended: false
}
