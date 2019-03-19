import * as TYPES from './usuarios-action-types';
import UsuarioService from './usuarios-service';

export const getUsuariosList = () => {
  return dispatch => {
    dispatch(loading());
    UsuarioService
      .listarUsuarios()
      .then(list => {
        dispatch(setLista(list.data));
      })
      .catch(err => {
        console.error(err);
      });
  }
};

export const deleteUsuario = (idUsuario) => {
  return dispatch => {
    dispatch(loading());
    UsuarioService
      .deleteUsuario(idUsuario)
      .then(list => {
        dispatch(getUsuariosList());
      })
      .catch(err => {
        console.error(err);
      });
  }
};

export const getUsuarios = (idUsuario) => {
  return dispatch => {
    dispatch(loading());
    if (idUsuario !== 'novo') {
      UsuarioService
        .getUsuario(idUsuario)
        .then(usuario => {
          dispatch(setUsuario(usuario.data));
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      dispatch(novoUsuario())
    }
  }
};

export const salvarUsuario = (usuario) => {
  return dispatch => {
    dispatch(loading());
    if (usuario.id !== null) {
      UsuarioService
        .editarUsuario(usuario)
        .then(() => {
          dispatch(usuarioSalvo());
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      UsuarioService
        .adicionarUsuario(usuario)
        .then(() => {
          dispatch(usuarioSalvo());
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};

const loading = () => {
  return {
    type: TYPES.LOADING
  }
};

const setLista = (lista) => {
  return {
    type: TYPES.LISTAR,
    lista
  }
};

const setUsuario = (usuario) => {
  return {
    type: TYPES.EDITAR,
    usuario
  }
};

const novoUsuario = () => {
  return {
    type: TYPES.NOVO
  }
};

const usuarioSalvo = () => {
  return {
    type: TYPES.SALVO
  }
};