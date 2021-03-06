import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { parseUrl } from '../util/RouteUtil';

// Deprecated
class Match extends Component {
  static propTypes = {
		component: PropTypes.func.isRequired,
		navigator: PropTypes.object.isRequired,
    pattern: PropTypes.string.isRequired,
  };

  render() {
		const {
			component: Component,
			navigator,
			pattern,
			...others,
		} = this.props;
		const params = parseUrl(pattern, navigator.path);
		if (params) {
			return <Component {...params} {...others}/>;
		}
		return null;
  }
}

function mapStateToProps(state) {
	return {
		navigator: state.navigator,
	};
}

export default connect(mapStateToProps)(Match);
