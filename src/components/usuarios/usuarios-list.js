import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { deleteUsuario, getUsuariosList } from './store/usuarios-actions';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Toolbar from '@material-ui/core/Toolbar';
import { Icon, IconButton } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TextField from '@material-ui/core/TextField';

const headerCell = [
  {id: 1, label: 'Id'},
  {id: 2, label: 'Estado'},
  {id: 3, label: 'Nome'},
  {id: 4, label: 'Email'},
  {id: 5, label: ''},
];

const _getOrder = (oldOrder) => {
  if (oldOrder === 'asc') {
    return 'desc';
  }
  return 'asc';
};

const _validaOrder = (order, colunaId) => {
  if (order === 'asc') {
    return 0;
  }
  return colunaId;
};

const _sortStringByAttribute = (a, b, order, attribute) => {
  const valueA = a[attribute].toUpperCase();
  const valueB = b[attribute].toUpperCase();

  console.log(order);
  if (order === 'asc') {
    if (valueA < valueB) {
      return 1
    }
    if (valueA > valueB) {
      return -1
    }
  } else {
    if (valueA < valueB) {
      return -1
    }
    if (valueA > valueB) {
      return 1
    }
  }

  return 0
};

class UsuariosList extends Component {
  state = {
    showAlerta: false,
    usuarioSelecionado: '',
    colunaId: 0,
    order: 'desc',
    search: ''
  };

  componentDidMount() {
    this.props.getList();
  }

  alertaDialogClose = () => {
    this.setState({
      showAlerta: false,
      usuarioSelecionado: ''
    });
  };

  onClickRemoveUsuario = (e, usuario) => {
    e.preventDefault();
    this.setState({
      showAlerta: true,
      usuarioSelecionado: usuario
    });
  };

  alertaDialogConfirm = () => {
    this.props.removeUsuario(this.state.usuarioSelecionado.id);
    this.setState({
      showAlerta: false,
      usuarioSelecionado: ''
    });
  };

  onClickUsuario = (path) => {
    this.props.history.push(path);
  };

  createSortHandler = (colunaId) => {
    this.setState({
      colunaId: this.state.colunaId === colunaId ? _validaOrder(
        this.state.order, colunaId
      ) : colunaId,
      order: this.state.colunaId === colunaId ? _getOrder(this.state.order) : this.state.order
    });
  };

  handleChange = (name) => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  aplicaOrdenacoes = (lista) => {
    const {colunaId, order} = this.state;
    if (colunaId === 0) {
      return this.props.lista;
    }
    if (colunaId !== 1) {
      return lista.sort((a, b) => _sortStringByAttribute(a, b, order, headerCell[colunaId - 1].label));
    }
    return lista;
  };

  aplicaFiltrosLista = (lista) => {
    if (!this.state.search) {
      return lista;
    }

    return lista.filter(usuario => {
      if (usuario.Estado.toLowerCase().includes(this.state.search.toLowerCase())) {
        return true;
      }
      if (usuario.Nome.toLowerCase().includes(this.state.search.toLowerCase())) {
        return true;
      }
      if (usuario.Email.toLowerCase().includes(this.state.search.toLowerCase())) {
        return true;
      }
    });
  };

  render() {
    const {colunaId, order} = this.state;
    const listaOrdenada = this.aplicaOrdenacoes([].concat(this.props.lista));
    const listaFiltrada = this.aplicaFiltrosLista(listaOrdenada);

    return (
      <Paper>
        <Toolbar className="toolbar-usuarios">
          <div>
            <Icon>person</Icon>
            <span>Usuários</span>
          </div>

          <div>
            <TextField
              label="Pesquisa"
              value={this.state.search}
              onChange={this.handleChange('search')}
              margin="normal"
            />
            <Button variant="contained"
                    onClick={() => this.onClickUsuario('/usuario/novo')}
                    color="primary">
              Novo Usuário
            </Button>
          </div>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              {headerCell.map(row => (
                  <TableCell
                    key={row.id}
                    sortDirection={colunaId === row.id ? order : false}>
                    <TableSortLabel
                      active={colunaId === row.id}
                      direction={order}
                      onClick={() => this.createSortHandler(row.id)}>
                      {row.label}
                    </TableSortLabel>
                  </TableCell>
                ),
                this,
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              listaFiltrada.map(usuario => (
                <TableRow key={usuario.id}>
                  <TableCell component="th" scope="row">
                    {usuario.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {usuario.Estado}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {usuario.Nome}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {usuario.Email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <IconButton onClick={() => this.onClickUsuario(`/usuario/${usuario.id}`)}>
                      <Icon>edit</Icon>
                    </IconButton>
                    <IconButton onClick={(e) => this.onClickRemoveUsuario(e, usuario)}>
                      <Icon>delete</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>

        {/* DIALOD DE CONFIRMACAO */}
        <Dialog
          open={this.state.showAlerta}
          onClose={this.handleClose}
        >
          <DialogTitle id="alert-dialog-title">
            {"Excluir usuário"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deseja remover o usuario <strong>{this.state.usuarioSelecionado.Nome}</strong>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.alertaDialogClose}
                    color="primary">
              Cancelar
            </Button>
            <Button onClick={this.alertaDialogConfirm}
                    variant="contained"
                    color="secondary"
                    autoFocus>
              Excluir
            </Button>
          </DialogActions>
        </Dialog>

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
  getList: () => {
    dispatch(getUsuariosList())
  },
  removeUsuario: (idUsuario) => {
    dispatch(deleteUsuario(idUsuario))
  }
});

const UsuariosListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UsuariosList));

UsuariosList.propTypes = {
  loading: PropTypes.bool.isRequired,
  lista: PropTypes.array.isRequired,
};


export default UsuariosListContainer;
