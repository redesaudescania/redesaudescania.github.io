import React, { Component } from 'react';
import Clinic from '../../components/Clinic';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';

// TODO: Paginação
export default class ResultsContainer extends Component {

  state = {
    clinics: []
  }

  componentWillReceiveProps(props) {
    this.setState({clinics: props.clinics})
  }

  handleReturn = () => {

  }

  render() {

    const { clinics } = this.state;

    return (
      <React.Fragment>
        <div className="return-bar">
          <IconButton onClick={this.props.handleReturn}>
            <ArrowBack />
          </IconButton>
          {/* TITULO DA PESQUISA / ESPECIALIDADE */}
        </div>
        
        {
          clinics.map((c, i) => (<Clinic key={i} clinic={c} />))

        }

      </React.Fragment>
    )
  }
}
