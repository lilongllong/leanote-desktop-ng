import 'react-treeview/react-treeview.css';
import React, { Component } from 'react';
import TreeView from 'react-treeview';
// import { List, ListItem } from 'material-ui/List';

import ListItem from './ListItem';
import SelectableList from './SelectableList';

class NotebookTree extends Component {
  state = {
    notebooks: [],
    selected: 'SentMail',
  }

  componentWillMount() {
    service.notebook.getNotebooks(res => {
      this.setState({ notebooks: res });
    });
  }

  handleSelectionChange = (event, value) => {
    console.log("select", value);
    this.setState({
      selected: value,
    });
  }

  render() {
    return (
      <SelectableList 
        onChange={this.handleSelectionChange}
        value={this.state.selected}
      >
        <ListItem
          primaryText="Sent mail"
          value="SentMail"
        />
        <ListItem
          primaryText="Drafts"
          value="Drafts"
        />
        <ListItem
          primaryText="Inbox"
          value="Inbox"
          initiallyOpen={true}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Starred"
              value="Starred"
            />,
            <ListItem
              key={2}
              primaryText="Notebook"
              value="Notebook"
            />,
          ]}
        />
      </SelectableList>
    );
  }
}

export default NotebookTree;
