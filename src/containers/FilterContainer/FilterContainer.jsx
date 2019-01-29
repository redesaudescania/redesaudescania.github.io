import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
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
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
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
    enabled: false
  }

  componentDidMount() {
    // Buscar os Estados, mas colocar os do SUL primeiro
    this._api.getUF().then(ufs => {
      this.setState({ufs})
    });
  }

  handleSelectState = (e) => {
    const selectedUf = e.target.value;
    this.setState({selectedUf});
    this._api.getCities(selectedUf).then(cities => {
      this.setState({cities});
    });
  }

  handleSelectCity = (e) => {
    const selectedUf = this.state.selectedUf;
    const selectedCity = e.target.value;
    this.setState({selectedCity});
    this._api.getSpecialities(selectedUf, selectedCity).then(specialities => {
      this.setState({specialities});
      this.setState({selectedSpeciality: specialities[0]})
    });
  }

  handleSelectSpeciality = (e) => {
    this.setState({enabled: true});    
    const selectedSpeciality = e.target.value;
    this.setState({selectedSpeciality})
    console.log(selectedSpeciality)
    // Habilita o botao de pesquisar
    // Passa resultados para o main container
    // Muda o componente para o results
  }

  handleResults = () => {
    const { selectedUf, selectedCity, selectedSpeciality } = this.state;
    this.props.handleResults('results');
    this._api.getByParameters(selectedUf, selectedCity, selectedSpeciality).then(r =>{
      console.log(r);
    })
  }

  render() {
    const { classes } = this.props;
    const { ufs, cities, specialities } = this.state;
    return (
      <React.Fragment>

        <FormControl>
          <NativeSelect
            value={this.state.selectedUf}
            name="uf"
            onChange={this.handleSelectState}
          >
            {
              ufs.map((u,i) => (<option key={i} value={u}>{u}</option>))
            }

          </NativeSelect>
          <FormHelperText>Selecione um estado</FormHelperText>
        </FormControl>

        <FormControl>
          <NativeSelect
            value={this.state.selectedCity}
            name="city"
            onChange={this.handleSelectCity}
          >
            {
              cities.map((c,i) => (<option key={i} value={c}>{c}</option>))
            }

          </NativeSelect>
          <FormHelperText>Selecione uma cidade</FormHelperText>
        </FormControl>

        <FormControl>
          <NativeSelect
            value={this.state.selectedSpeciality}
            name="speciality"
            onChange={this.handleSelectSpeciality}
          >
            {
              specialities.map((s,i) => (<option key={i} value={s}>{s}</option>))
            }

          </NativeSelect>
          <FormHelperText>Selecione uma Especialidade</FormHelperText>
        </FormControl>

        <div>
          { this.state.enabled && <Button onClick={this.handleResults}>BUSCAR</Button>}
        </div>

      </React.Fragment>
    )
  }
}

FilterContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterContainer);