import React, { Component } from 'react';
import { Paper } from '@material-ui/core';

import Clinic from '../../components/Clinic/Clinic';

import './MainContainer.css';

// Enquanto nao carrega exibir o Spinner
// Tipo de Pesquisa: Cidade, Especialidade, Clinica

// Especialidade: Sua pesquisa retornará muitos resultados,
// __Deseja completar com um filtro para a cidade?


export default class MainContainer extends Component {

    render() {
        return (
            <div className="main-container">

                <Paper className='paper'>
                    <Clinic />
                    <Clinic />
                    <Clinic />                    
                </Paper>

            </div>
        )
    }
}
