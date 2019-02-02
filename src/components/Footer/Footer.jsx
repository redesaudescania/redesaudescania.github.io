import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = {
  root: {
    flexGrow: 1,    
    display: 'flex',
    borderTop: '0.3rem solid white',
    marginTop: '12.5vh',
    bottom: 0,
    width: '100%',
    
  },
  footer: {
    display: 'flex',
    fontSize: '2.5vh',
    width: '100%',
    margin: 'auto',
    justifyContent: 'flex-end'
  },
  logo: {
    fontFamily: 'Scania Sans Headline Bold'
  }
};

class Footer extends React.Component {

  componentDidMount() {
    const height = document.body.scrollHeight;
    this.setState({ height });
  }

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar style={{ background: '#041E42' }} position="static">
          <Toolbar>
            <div className={classes.footer}>              
              <h1 className={classes.logo}>SCANIA</h1>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);