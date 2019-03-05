import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Error from '../../components/Error';

import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';

import RedeScaniaApi from '../../api/redescaniaApi';

import styles from './styles';

class FilterContainer extends React.Component {

  _api = new RedeScaniaApi();

  state = {
    selected: {
      uf: undefined,
      city: localStorage.getItem('selectedCity') || '',
      hospital: localStorage.getItem('selectedHospital') || '',
      type: null,
      speciality: localStorage.getItem('selectedSpeciality') || ''
    },
    filterType: localStorage.getItem('filterType') || 'speciality',
    ufs: [],
    cities: [],
    specialities: [],
    hospitals: [],
    enabled: true,
    error: false,
    loading: true,
    reloadTime: 0
  }

  componentDidMount() {

    this._api.getUF()
      .then(data => {
        const ufs = this._renderSP(data);
        this.setState({ ufs });
        this._getUF();
      })
      .catch(err => {
        console.error(err);
        this.setState({ error: true })
      });
  }

  _getUF() {
    const selectedUF = localStorage.getItem('selectedUF');
    if (selectedUF === null) {
      localStorage.setItem('selectedUF', 'SP');
      window.location.reload();
    }
    const selected = Object.assign({}, this.state.selected);
    selected.uf = selectedUF;
    this.setState({ selected })
    this._getCities(selectedUF);
  }

  _getCities(uf) {
    localStorage.removeItem('selectedCity');
    this._api.getCities(uf).then(cities => {
      const orderedCities = this._reorderCities(cities, uf);
      this.setState({ cities: orderedCities });
      const selectedCity = orderedCities[0];
      const selected = Object.assign({}, this.state.selected);
      selected.city = selectedCity;
      localStorage.setItem('selectedCity', selectedCity);
      this.setState({ selected });
      this._getSpecialities(uf, selectedCity);
      this._getHospitals(uf, selectedCity);
    });
  }

  _getSpecialities(selectedUF, selectedCity) {
    localStorage.removeItem('selectedHospital');
    localStorage.removeItem('selectedSpeciality');
    this._api.getSpecialities(selectedUF, selectedCity).then(specialities => {
      const orderedSpecialities = specialities.sort((a, b) => a.localeCompare(b));
      this.setState({ specialities: orderedSpecialities });
      const selectedSpeciality = orderedSpecialities[0];
      const selected = Object.assign({}, this.state.selected);
      selected.speciality = selectedSpeciality;
      this.setState({ selected });
      localStorage.setItem('selectedSpeciality', selectedSpeciality);
      this.setState({ loading: false })
    });
  }

  _getHospitals(selectedUf, selectedCity) {
    localStorage.removeItem('selectedHospital');
    localStorage.removeItem('selectedSpeciality');
    this._api.getHospitals(selectedUf, selectedCity).then(hospitals => {
      const sortedHospitals = hospitals.sort((a, b) => a.localeCompare(b));
      this.setState({ hospitals: sortedHospitals });
      const selectedHospital = hospitals[0];
      const selected = Object.assign({}, this.state.selected);
      selected.hospital = selectedHospital;
      this.setState({ selected });
      this.setState({ loading: false });
    });
  }

  handleFilterType = (e) => {
    const filterType = e.target.value;
    this.setState({ filterType });
    this._getCities(this.state.selected.uf);
    localStorage.setItem('filterType', filterType);
  }

  handleSelectUF = (e) => {
    const selectedUF = e.target.value;
    const selected = Object.assign({}, this.state.selected);
    selected.uf = selectedUF;
    localStorage.setItem('selectedUF', selectedUF);
    this.setState({ selected });
    this._getCities(selectedUF);
  }

  handleSelectCity = (e) => {
    const { uf } = this.state.selected;
    const { filterType } = this.state;
    const selectedCity = e.target.value;
    const selected = Object.assign({}, this.state.selected);
    selected.city = selectedCity;

    localStorage.setItem('selectedCity', selectedCity);

    switch (filterType) {

      case 'hospital':
        this._api.getHospitals(uf, selectedCity).then(hospitals => {
          const sortedHospitals = hospitals.sort((a, b) => a.localeCompare(b));
          this.setState({ hospitals: sortedHospitals });
          selected.hospital = sortedHospitals[0];
        });
        break;

      case 'speciality':
        this._api.getSpecialities(uf, selectedCity).then(specialities => {
          const sortedSpecialities = specialities.sort((a, b) => a.localeCompare(b));
          this.setState({ specialities: sortedSpecialities });
          selected.speciality = sortedSpecialities[0];
        });
        break;

      default:
        return null;
    }

    this.setState({ selected });

  }

  handleSelectSpeciality = (e) => {
    this.setState({ enabled: true });
    const selectedSpeciality = e.target.value;
    const selected = Object.assign({}, this.state.selected);
    selected.speciality = selectedSpeciality;
    localStorage.setItem('selectedSpeciality', selectedSpeciality);
    this.setState({ selected });
  }

  handleSelectHospital = (e) => {
    const selectedHospital = e.target.value;
    const selected = Object.assign({}, this.state.selected);
    selected.hospital = selectedHospital;
    localStorage.setItem('selectedHospital', selectedHospital);
    this.setState({ selected });
  }

  handleResults = () => {

    const { filterType, selected } = this.state;

    this.setState({ loading: true });

    this.props.handleResults('results');

    this._api.getByPar(filterType, selected).then(r => {
      return this.props.handleResults(r, selected[filterType]);
    });

    return;

  }

  _renderSP(ufs) {
    const modifiedUfs = [...ufs];
    const idx = modifiedUfs.map(u => u.sigla).indexOf('SP');
    modifiedUfs.splice(idx, 1);
    modifiedUfs.unshift({ "sigla": "SP", "nome": "SÃO PAULO" });
    return modifiedUfs;
  }

  _reorderCities(cities, selectedUF) {
    const sortedCities = cities.sort((a, b) => a.localeCompare(b))
    if (selectedUF !== 'SP') {
      return sortedCities;
    }
    const citiesArray = [
      'SAO PAULO', 'SANTOS', 'RIBEIRAO PIRES', 'MAUA',
      'DIADEMA', 'SAO CAETANO DO SUL', 'SANTO ANDRE', 'SAO BERNARDO DO CAMPO'
    ];

    citiesArray.map((ca, i) => {
      const idx = sortedCities.map(c => c).indexOf(ca);
      sortedCities.splice(idx, 1);
      sortedCities.unshift(ca);
      return ca;
    });
    return sortedCities;
  }

  render() {
    const { classes } = this.props;
    const { selected, ufs, cities, specialities, hospitals, loading, error, filterType } = this.state;

    const FilterHospital = () => {
      return (
        <FormControl className={classes.formControl}>
          <NativeSelect
            value={selected.hospital}
            name="hospital"
            onChange={this.handleSelectHospital}
          >
            {
              hospitals.map((h, i) => (<option key={i} value={h}>{h}</option>))
            }
          </NativeSelect>
          <FormHelperText>Selecione um Hospital</FormHelperText>
        </FormControl>
      )
    };
    const FilterSpeciality = () => {
      return (
        <FormControl className={classes.formControl}>
          <NativeSelect
            value={selected.speciality}
            name="speciality"
            onChange={this.handleSelectSpeciality}
          >
            {
              specialities.map((s, i) => (<option key={i} value={s}>{s}</option>))
            }
          </NativeSelect>
          <FormHelperText>Selecione uma Especialidade</FormHelperText>
        </FormControl>
      )
    }

    const FilterForm = (props) => {

      let filter;

      switch (props.filterType) {
        case 'hospital':
          filter = <FilterHospital />;
          break;
        case 'speciality':
          filter = <FilterSpeciality />;
          break;
        default:
          return null;
      }
      return filter;
    };

    const Content = (props) => (
      <React.Fragment>

        <FormControl className={classes.formControl}>
          <NativeSelect
            value={filterType}
            name="filterType"
            onChange={this.handleFilterType}
            className={classes.selectFilter}
          >
            <option value="speciality">ESPECIALIDADE</option>
            <option value="hospital">CLINICA / HOSPITAL</option>
          </NativeSelect>
          <FormHelperText>Tipo de pesquisa</FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl}>
          <NativeSelect
            value={selected.uf}
            name="uf"
            onChange={this.handleSelectUF}
            className={classes.selectUf}
          >
            {
              ufs.map((u, i) => (<option key={i} value={u.sigla}>{u.sigla} - {u.nome}</option>))
            }

          </NativeSelect>
          <FormHelperText>Selecione um Estado</FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl}>
          <NativeSelect
            value={selected.city}
            name="city"
            onChange={this.handleSelectCity}
          >

            {
              cities.map((c, i) => (<option key={i} value={c}>{c}</option>))
            }

          </NativeSelect>
          <FormHelperText>Selecione uma Cidade</FormHelperText>
        </FormControl>

        <FilterForm filterType={filterType} />

        <div className={classes.searchButton}>
          {this.state.enabled && <Button size="medium" variant="contained" color="primary" onClick={this.handleResults}>BUSCAR</Button>}
        </div>

      </React.Fragment>
    );

    const Progress = (props) => {
      return (
        <div className={classes.progress}>
          <CircularProgress thickness={props.size} size={50} />
        </div>
      );
    }

    return (

      <div className={classes.root} >
        {
          !loading ? <Content /> : <Progress />
        }
        {
          error && <Error classes={classes} />
        }

      </div >
    )
  }
}

FilterContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterContainer);