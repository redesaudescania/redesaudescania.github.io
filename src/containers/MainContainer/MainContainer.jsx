import React, { Component } from 'react';
import { Paper } from '@material-ui/core';

import Clinic from '../../components/Clinic/Clinic';

import './MainContainer.css';
import FilterContainer from '../FilterContainer/FilterContainer';

// Enquanto nao carrega exibir o Spinner
// Tipo de Pesquisa: Cidade, Especialidade, Clinica

// Especialidade: Sua pesquisa retornará muitos resultados,
// __Deseja completar com um filtro para a cidade?


export default class MainContainer extends Component {

    state = {
        results: [],
        page: 'filter' // quando realizar pesquisa, alterar para results
    }

    handleResults = (results) => {
        this.setState({page: 'results'});
        
    }

    render() {
        return (
            <div className="main-container">

                <Paper className='paper'>
                   <FilterContainer handleResults={this.handleResults} />                
                </Paper>

            </div>
        )
    }
}
