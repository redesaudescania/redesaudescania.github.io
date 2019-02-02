import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';

import RedeScaniaApi from '../../api/redescaniaApi';

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
    marginTop: '7.5%'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  selectUf: {
    fontSize: '1.2rem',
    display: 'flex',
    width: '100%'
  },
  searchButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10%',
    marginBottom: '2.5%'
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


class FilterContainer extends React.Component {

  _api = new RedeScaniaApi();

  state = {
    ufs: [],
    selectedUf: "",
    cities: [],
    selectedCity: "",
    specialities: [],
    selectedSpeciality: "",
    enabled: true,
    error: false,
    loading: true,
    reloadTime: 0
  }

  componentDidMount() {
    this._api.getUF().then(ufs => {
      const idx = ufs.map(u => u.sigla).indexOf('SP')
      ufs.splice(idx, 1);
      ufs.unshift({ "sigla": "SP", "nome": "SÃO PAULO" })
      this.setState({ ufs })
      const selectedUf = ufs[0].sigla;
      this.setState({ selectedUf });
      this._getCities(selectedUf);
    })
      .catch(() => {
        this.setState({ error: true })
      });
  }

  _getCities(uf) {
    this._api.getCities(uf).then(cities => {
      const orderedCities = this._reorderCities(cities, uf);
      this.setState({ cities: orderedCities });
      const selectedCity = cities[0];
      this.setState({ selectedCity })
      this._getSpecialities(uf, selectedCity)
    });
  }

  _getSpecialities(selectedUf, selectedCity) {
    this._api.getSpecialities(selectedUf, selectedCity).then(specialities => {
      specialities = specialities.sort((a, b) => a.localeCompare(b));
      this.setState({ specialities });
      this.setState({ selectedSpeciality: specialities[0] })
      this.setState({ loading: false })
    });
  }

  handleSelectUF = (e) => {
    const selectedUf = e.target.value;
    this.setState({ selectedUf });
    this._api.getCities(selectedUf).then(cities => {
      const orderedCities = this._reorderCities(cities, selectedUf);
      this.setState({ cities: orderedCities });
      // this.setState({selectedCity: cities[0]})
    });
  }

  handleSelectCity = (e) => {
    const selectedUf = this.state.selectedUf;
    const selectedCity = e.target.value;
    this.setState({ selectedCity });
    this._api.getSpecialities(selectedUf, selectedCity).then(specialities => {
      specialities = specialities.sort((a, b) => a.localeCompare(b));
      this.setState({ specialities });
      this.setState({ selectedSpeciality: specialities[0] })
    });
  }

  handleSelectSpeciality = (e) => {
    this.setState({ enabled: true });
    const selectedSpeciality = e.target.value;
    this.setState({ selectedSpeciality })    
  }

  handleResults = () => {
    const { selectedUf, selectedCity, selectedSpeciality } = this.state;
    this.setState({loading: true})
    this.props.handleResults('results');
    this._api.getByParameters(selectedUf, selectedCity, selectedSpeciality).then(r => {
      this.props.handleResults(r, selectedSpeciality);
    })
  }

  _reorderCities(cities, selectedUf) {
    cities = cities.sort((a, b) => a.localeCompare(b))
    if (selectedUf !== 'SP') {
      return cities;
    }
    const citiesArray = [
      'SAO PAULO', 'SANTOS', 'RIBEIRAO PIRES', 'MAUA',
      'DIADEMA', 'SAO CAETANO DO SUL', 'SANTO ANDRE', 'SAO BERNARDO DO CAMPO'
    ];

    citiesArray.map((ca, i) => {
      let idx = cities.map(c => c).indexOf(ca);
      cities.splice(idx, 1);
      cities.unshift(ca);
      return ca;
    });
    return cities;
  }

  render() {
    const { classes } = this.props;
    const { ufs, cities, specialities, loading, error } = this.state;

    const content = (
      <React.Fragment>
        <FormControl className={classes.formControl}>
          <NativeSelect
            value={this.state.selectedUf}
            name="uf"
            onChange={this.handleSelectUF}
            className={classes.selectUf}
          >
            {
              ufs.map((u, i) => (<option key={i} value={u.sigla}>{u.sigla} - {u.nome}</option>))
            }

          </NativeSelect>
          <FormHelperText>Selecione um estado</FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl}>
          <NativeSelect
            value={this.state.selectedCity}
            name="city"
            onChange={this.handleSelectCity}
          >
            {
              cities.map((c, i) => (<option key={i} value={c}>{c}</option>))
            }

          </NativeSelect>
          <FormHelperText>Selecione uma cidade</FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl}>
          <NativeSelect
            value={this.state.selectedSpeciality}
            name="speciality"
            onChange={this.handleSelectSpeciality}
          >
            {/* <option selected>SELECIONE</option> */}
            {
              specialities.map((s, i) => (<option key={i} value={s}>{s}</option>))
            }

          </NativeSelect>
          <FormHelperText>Selecione uma Especialidade</FormHelperText>
        </FormControl>

        <div className={classes.searchButton}>
          {this.state.enabled && <Button size="medium" variant="contained" color="primary" onClick={this.handleResults}>BUSCAR</Button>}
        </div>
      </React.Fragment>
    )

    return (
      <div className={classes.root}>



        {
          loading ?
            (
              <div className={classes.progress}>
                <CircularProgress thickness={5} size={100} />
              </div>
            ) :
            content
        }
        {
          error &&
          <div className={classes.error}>
            <div className={classes.errorTitle}>
              ERRO: VERIFIQUE SUA CONEXÃO COM A INTERNET E TENTE NOVAMENTE
            </div>
            <div onClick={() => window.location.reload()} className={classes.reloadButton}>
              <Button variant="contained" color="secondary">RECARREGAR</Button>
            </div>
          </div>
        }




      </div>
    )
  }
}

FilterContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterContainer);