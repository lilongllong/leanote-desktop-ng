import React, { Component, PropTypes } from 'react';

import LoginFormContainer from '../containers/LoginFormContainer';
import TitleBar from '../components/TitleBar';

class Login extends Component {
  render() {
    return (
      <TitleBar className="login-page">
        <div className="logo" >
          <img src="images/leanote-icon-en.png" alt="leanote" />
        </div>
        <LoginFormContainer />
      </TitleBar>
    );
  }
}

export default Login;
