import React, { Component } from 'react';
import { Paper } from '@material-ui/core';


import FilterContainer from '../FilterContainer/FilterContainer';
import ResultsContainer from '../ResultsContainer';
// Enquanto nao carrega exibir o Spinner
// Tipo de Pesquisa: Cidade, Especialidade, Clinica

// Especialidade: Sua pesquisa retornará muitos resultados,
// __Deseja completar com um filtro para a cidade?

import './MainContainer.css';

export default class MainContainer extends Component {

    state = {
        page: 'filter',
        results: [],
        resultTitle: ''
    }

    handleResults = (results, resultTitle) => {
        this.setState({ results });
        this.setState({ resultTitle });
        this.setState({ page: 'results' });
    }

    handleReturn = () => {
        this.setState({ page: 'filter' });
        this.setState({ resultTitle: '' });
        const results = [...this.state.results];
        results.length = 0;
        this.setState({ results });
    }

    componentDidMount() {
        
    }

    render() {
        const { results, resultTitle } = this.state;
        let page;

        switch (this.state.page) {
            case 'results':
                page = <ResultsContainer resultTitle={resultTitle} handleReturn={this.handleReturn} clinics={results} />
                break;
            case 'filter':
                page = <FilterContainer handleResults={this.handleResults} />
                break;
            default: break;
        }

        return (
            <div className="main-container">

                <Paper className='paper'>
                    {page}
                </Paper>

            </div>
        )
    }
}
