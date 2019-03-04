import React from 'react';
import Button from '@material-ui/core/Button';

export default function Error(props) {
  return (
    <div className={props.classes.error}>
    <div className={props.classes.errorTitle}>
      ERRO: VERIFIQUE SUA CONEXÃO COM A INTERNET E TENTE NOVAMENTE
    </div>
    <div onClick={() => window.location.reload()} className={props.classes.reloadButton}>
      <Button variant="contained" color="secondary">RECARREGAR</Button>
    </div>
  </div>
  )
}
