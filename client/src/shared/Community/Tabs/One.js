import React from 'react';
import TopNav from '../TopNav';
import UserListing from './UserListing';
import { tabs } from '../routes';

export default ( {route} ) => (
  <div>
    <TopNav route={route} extended={true}/>
    <div className="container main">
      <div id={tabs.one} className="col s12">
        <h3>Projects</h3>
      </div>
    </div>
  </div>
);