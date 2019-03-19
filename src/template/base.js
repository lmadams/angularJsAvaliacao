import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Base extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6"
                      color="inherit"
                      noWrap>
            Sistema
          </Typography>
        </Toolbar>

      </AppBar>
    );
  }
}

export default Base;
