import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../logo.svg';

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
    flexWrap: 'wrap'
  },
  header: {
    display: 'flex',
    width: '90%'
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    width: '90%',
    fontSize: '2.7vh',
    fontFamily: 'Scania Sans Headline',
    marginTop: '0.5rem'
  },
  subTitle: {
    fontSize: '2.2vh',
    fontFamily: 'Scania Sans Condensed Italic',
    marginTop: '0.75rem'
  },
  logoBox: {
    width: '10%'
  },
  logo: {
    width: '100%',
    maxWidth: '80px'
  }
};

class Header extends React.Component {

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar style={{background: '#041E42'}} position="static">
          <Toolbar>
            <div className={classes.header}>
              <div className={classes.title}>PLANO TNES <br/> REDE CREDENCIADA </div>
              <div className={classes.subTitle}>EXCLUSIVO SCANIA</div>
            </div>
            <div className={classes.logoBox}>
              <img className={classes.logo} src={logo} alt="logo"/>   
            </div>
            {/* <Typography component="p">
              REDE CREDENCIADA PLANO TNES
            </Typography>
            <Typography component="p">
              EXCLUSIVO - SCANIA
            </Typography>
            <img className={classes.logo} src={logo} alt="logo"/> */}
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