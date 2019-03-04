const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%'
    },
    formControl: {
      minWidth: 120,
      width: '75%',
      margin: 'auto',
      marginTop: '2vh'
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    selectFilter: {
  
    },
    selectUf: {
      display: 'flex',
      width: '100%'
    },
    searchButton: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '7.5%',
      marginBottom: '2%'
    },
    hidden: {
      display: 'none'
    },
    progress: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '52.5vh',
      width: '100%'
    },
    error: {
      display: 'flex',
      margin: 'auto',
      width: '70%',
      flexWrap: 'wrap'
    },
    errorTitle: {
      textAlign: 'center',
      width: '100%',
    },
    reloadButton: {
      textAlign: 'center',
      border: '1px solid red',
      margin: 'auto',
      display: 'flex',
      marginTop: '2%',
      marginBottom: '2%'
    }
  });

module.exports = styles;