import React from 'react';
import Header from './Header'

const style = {
    padding: '16px'
};

export default () => (
  <div>
    <Header />
    <div className="ui main text container">
      <div style={style}>
          <h1>Sorry!</h1>
          <p>Something went horribly wrong…</p>
      </div>
    </div>
  </div>
);
