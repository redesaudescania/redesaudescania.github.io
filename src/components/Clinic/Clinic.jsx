import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: '100%',
    maxWidth: '100%',    
    margin: 'auto',
    marginTop: '1.2%',
    marginLeft: '5%%',
    marginRight: '5%%',
    marginBottom: '1.2%'
  },
  title: {
    fontSize: 12,
  },
  nomeRef: {
    fontFamily: 'Scania Sans Headline'
  },
  pos: {
    marginBottom: 4,
    fontFamily: 'Scania Sans Condensed'
  },
};

function Clinic(props) {
  const { classes } = props;
  const { clinic } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {clinic.CIDADE} - {clinic.UF}
        </Typography>

        <Typography variant="h6" component="h6" className={classes.nomeRef} >
          {clinic['NOME-REF']}
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          Endereço: {clinic['RUA-REF']}, {+clinic.NUM}, {clinic['BAIRRO-REF']}
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          Tel 1: <a href={"tel:"+(+clinic['TEL1-REF'])}> {+clinic['TEL1-REF']} </a>
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
        {
          (+clinic['TEL2-REF']) > 0 &&
          <span>Tel 2: <a href={"tel:"+(+clinic['TEL2-REF'])}> {+clinic['TEL2-REF']} </a> </span>
        }
          
        </Typography>

        <Typography component="p">
          Referência: {clinic['TIPO-REF']}
        </Typography>

      </CardContent>

    </Card>
  );
}

Clinic.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Clinic);