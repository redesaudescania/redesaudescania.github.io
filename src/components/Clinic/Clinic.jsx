import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 300,
    margin: 'auto',
    marginTop: '1%',
    marginBottom: '1%'
  },  
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 4,
  },
};

function SimpleCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          CIDADE - ESTADO
        </Typography>

        <Typography variant="h5" component="h2">
        NOME DO HOSPITAL
        </Typography>

        <Typography className={classes.pos} color="textSecondary">    
          Endereço: Rua José Odorizzi, 151, Vila Euro   
        </Typography>
        <Typography className={classes.pos} color="textSecondary">    
          Tel 1: (011) 1111 - 2222
        </Typography>
        <Typography className={classes.pos} color="textSecondary">    
          Tel 2: (011) 1111 - 2222
        </Typography>
        
        <Typography component="p">
          Referencia  
        </Typography>

      </CardContent>
      
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);