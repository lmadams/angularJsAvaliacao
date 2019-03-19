import React, { Component } from 'react';
import { Icon } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { getUsuarios, salvarUsuario } from './store/usuarios-actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from './usuarios-list';
import TextField from '@material-ui/core/TextField';

class Usuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.usuario
    };
  }

  componentDidMount() {
    this.props.getUsuario(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.usuario
    });

    if (nextProps.voltarParaLista) {
      this.onClickBack('/')
    }
  }

  onClickBack = (path) => {
    this.props.history.push(path);
  };

  handleChange = (name) => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    this.props.salvarUsuario(this.state);
  };

  render() {
    return (
      <Paper>
        <Toolbar className="toolbar-usuarios">
          <div>
            <Icon>person</Icon>
            <span>
              {
                this.props.usuario.id ? 'Editar Usuário' : 'Novo Usuário'
              }
            </span>
          </div>

          <div>
            <Button color="default"
                    onClick={() => this.onClickBack('/')}>
              Cancelar
            </Button>
            <Button variant="contained"
                    onClick={(e) => this.submitForm(e)}
                    color="primary">
              Salvar
            </Button>
          </div>
        </Toolbar>

        <form noValidate
              autoComplete="off">

          <div className="row">

            <TextField
              label="Nome"
              className="input-form"
              value={this.state.Nome}
              onChange={this.handleChange('Nome')}
              margin="normal"
              variant="outlined"
            />

            <TextField
              label="Estado"
              className="input-form"
              value={this.state.Estado}
              onChange={this.handleChange('Estado')}
              margin="normal"
              variant="outlined"
            />

          </div>

          <div className="row">
            <TextField
              className="input-form"
              label="E-mail"
              value={this.state.Email}
              onChange={this.handleChange('Email')}
              margin="normal"
              variant="outlined"
            />
          </div>
        </form>

        {/* LOADING */}
        {
          this.props.loading ? (
            <div className="loading-container">
              <CircularProgress color="secondary"/>
            </div>
          ) : null
        }
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.usuariosReducer
});

const mapDispatchToProps = (dispatch) => ({
  getUsuario: (idUsuario) => {
    dispatch(getUsuarios(idUsuario))
  },
  salvarUsuario: (usuario) => {
    dispatch(salvarUsuario(usuario))
  }
});

const UsuarioContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Usuario));

Usuario.propTypes = {
  loading: PropTypes.bool.isRequired,
  usuario: PropTypes.shape({
    id: PropTypes.number,
    Nome: PropTypes.string,
    Estado: PropTypes.string,
    Email: PropTypes.string,
  }).isRequired
};

export default UsuarioContainer;
