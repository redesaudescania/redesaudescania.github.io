import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


/*
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
*/



const styles = {
  root: {
    flexGrow: 1,
    display: 'flex'
  },
  grow: {
    flexGrow: 1,
  },
  footer: {
    display: 'flex',
    fontSize: '2.5vh',    
    width: '100%',
    margin: 'auto',    
    justifyContent: 'flex-end'
  }
};

class Header extends React.Component {

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar style={{background: '#041E42'}} position="static">
          <Toolbar>
            <div className={classes.footer}>
              <h1 style={{fontFamily:'Scania Sans Headline Bold'}}>SCANIA</h1>          
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);