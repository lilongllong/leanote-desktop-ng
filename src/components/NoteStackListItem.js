import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import NestedList from './NestedList';

import Icon from '../components/Icon';
import Link from '../components/Link';

function getStyles(props, state) {
  let paddingLeft = 5 + props.nestedLevel * 12;
  if (props.nestedItems.length === 0) {
    paddingLeft += 17;
  }
  return {
    innerDiv: {
      // Extra padding so that ripples will span the entire container
      paddingLeft,
    }
  }
}

class NotebookListItem extends Component {
  static propTypes = {
    icon: PropTypes.string,
		type: PropTypes.string,
		id: PropTypes.string.isRequired,
    nestedItems: PropTypes.arrayOf(PropTypes.element),
    nesetdLevel: PropTypes.number,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    text: PropTypes.string,
  };

  static defaultProps = {
    nestedItems: [],
    nestedLevel: 0,
    onClick: () => {},
    selected: false,
  };

  state = {
    open: this.props.nestedLevel === 0 ? true : false,
  };

  toggleNestedList = (event) => {
    this.setState({
      open: !this.state.open,
    });
		event.stopPropagation();
  };

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
		this.toggleNestedList(event);
		if (this.props.nestedItems.length > 0) {
			event.preventDefault();
		}
  }

  pushElement(children, element, additionalProps) {
    if (element) {
      children.push(
        React.cloneElement(element, {
          key: children.length,
          ...additionalProps,
        })
      );
    }
  }

  renderNestedElements() {
    const {
      nestedItems,
      nestedLevel,
    } = this.props;
    if (nestedItems.length > 0) {
      return (
        <NestedList
          open={this.state.open}
          nestedLevel={nestedLevel}
          className="nested-list"
        >
          {nestedItems}
        </NestedList>
      );
    }
  }

  render() {
    const {
      children,
      className,
      icon,
			id,
      nestedItems,
      nestedLevel,
      selected,
      text,
			type,
    } = this.props;
    const contentChildren = [children];
    const hasNestedListItems = nestedItems.length > 0;
    if (hasNestedListItems) {
      const expandIconElement = (
        <Icon iconName="chevron-right" className="expand-icon" />
      );
      this.pushElement(contentChildren, expandIconElement);
    }
    if (icon) {
      this.pushElement(contentChildren, <Icon iconName={icon} />);
    }
    this.pushElement(contentChildren, <span className="text">{text}</span>);

    return (
      <div className={classNames('list-item', { folder: hasNestedListItems }, { open:this.state.open }, { selected: selected }, className)}>
        <Link
					to={`/${type}/${id}/notes/`}
          className="content"
          onClick={this.handleClick}
          style={getStyles(this.props, this.state).innerDiv}
        >
          {contentChildren}
        </Link>
        {this.renderNestedElements()}
      </div>
    )
  }
}

export default NotebookListItem;
