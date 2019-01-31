import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
    margin: theme.spacing.unit,
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
    enabled: true
  }

  componentDidMount() {
    // Buscar os Estados, mas colocar os do SUL primeiro
    this._api.getUF().then(ufs => {
      // TODO: Ordenar o array fora desta função          
      const idx = ufs.map(u => u.sigla).indexOf('SP')
      ufs.splice(idx, 1);
      ufs.unshift({ "sigla": "SP", "nome": "SÃO PAULO" })
      this.setState({ ufs })
      const selectedUf = ufs[0].sigla;
      this.setState({ selectedUf });
      this._getCities(selectedUf);      
    });
  }

  _getCities(uf) {
    this._api.getCities(uf).then(cities => {
      const orderedCities = this._reorderCities(cities, uf);
      this.setState({ cities: orderedCities });    
      const selectedCity = cities[0];
      this.setState({selectedCity})
      this._getSpecialities(uf, selectedCity)
    });
  }

  _getSpecialities(selectedUf, selectedCity) {
    this._api.getSpecialities(selectedUf, selectedCity).then(specialities => {
      specialities = specialities.sort((a, b) => a.localeCompare(b));
      this.setState({ specialities });
      this.setState({ selectedSpeciality: specialities[0] })
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
    console.log(selectedSpeciality)
    // Habilita o botao de pesquisar
    // Passa resultados para o main container
    // Muda o componente para o results
  }

  handleResults = () => {
    const { selectedUf, selectedCity, selectedSpeciality } = this.state;
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
      'SAO PAULO', 'RIBEIRAO PIRES', 'MAUA',
      'DIADEMA', 'SAO CAETANO DO SUL', 'SANTO ANDRE', 'SAO BERNARDO DO CAMPO'
    ];

    citiesArray.map((ca, i) => {
      let idx = cities.map(c => c).indexOf(ca);
      cities.splice(idx, 1);
      cities.unshift(ca);
    });
    return cities;
  }

  render() {
    const { classes } = this.props;
    const { ufs, cities, specialities } = this.state;
    return (
      <div className={classes.root}>

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

      </div>
    )
  }
}

FilterContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterContainer);