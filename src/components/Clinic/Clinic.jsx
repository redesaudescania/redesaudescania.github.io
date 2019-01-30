import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 300,
    margin: 'auto',
    marginTop: '1.2%',
    marginBottom: '1.2%'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 4,
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

        <Typography variant="h5" component="h5">
          {clinic['NOME-REF']}
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          Endereço: {clinic['RUA-REF']}, {+clinic.NUM}, {clinic['BAIRRO-REF']}
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          Tel 1: <a href={clinic['TEL1-REF']}> {clinic['TEL1-REF']} </a>
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          Tel 2: <a href={clinic['TEL2-REF']}> {clinic['TEL2-REF']} </a>
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