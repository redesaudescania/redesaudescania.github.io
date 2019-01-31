import React, { Component } from 'react';
import Clinic from '../../components/Clinic';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  returnBar: {
    display: 'flex',
    width: '100%'
  },
  title: {
    width: '70%',    
    alignSelf: 'center',
    textAlign: 'center', 
    fontSize: '2.5vh',
    fontFamily: 'Scania Sans Condensed Italic'
  }, 
  clinicsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '90%',
    margin: 'auto',
    justifyContent: 'center'
  }  
}

// TODO: Paginação
class ResultsContainer extends Component {

  state = {
    clinics: []
  }

  componentWillReceiveProps(props) {
    this.setState({ clinics: props.clinics })
  }

  handleReturn = () => {

  }

  render() {
    const { classes, resultTitle } = this.props;
    const { clinics } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.returnBar}>          
            <IconButton onClick={this.props.handleReturn}>
              <ArrowBack />
            </IconButton>
          
          <div className={classes.title}>BUSCA POR: {resultTitle}</div>
          {/* TITULO DA PESQUISA / ESPECIALIDADE */}
        </div>
        <div className={classes.clinicsContainer}>
        {
          clinics.map((c, i) => (<Clinic key={i} clinic={c} />))
        }
        </div>
      </div>

    )
  }
}

export default withStyles(styles)(ResultsContainer);
