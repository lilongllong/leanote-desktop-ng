import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBox from '../components/SearchBox';
import TitleBar from '../components/TitleBar';

class Header extends Component {
  render() {
    return (
      <TitleBar className="header">
        <SearchBox />
      </TitleBar>
    );
  }
}

export default Header;
