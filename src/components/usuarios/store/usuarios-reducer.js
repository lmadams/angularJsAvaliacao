import * as TYPES from './usuarios-action-types';

const usuarioInitial = {
  id: null,
  Nome: '',
  Estado: '',
  Email: ''
};

const usuariosInitial = {
  lista: [],
  loading: false,
  voltarParaLista: false,
  usuario: {...usuarioInitial}
};

export const usuariosReducer = (state = usuariosInitial, action) => {
  switch (action.type) {
    case TYPES.LOADING:
      return Object.assign({}, state, {
        loading: true
      });

    case TYPES.LISTAR:
      return Object.assign({}, state, {
        lista: [].concat(action.lista),
        voltarParaLista: false,
        loading: false
      });

    case TYPES.NOVO:
      return Object.assign({}, state, {
        usuario: {...usuarioInitial},
        voltarParaLista: false,
        loading: false
      });

    case TYPES.EDITAR:
      return Object.assign({}, state, {
        usuario: {...action.usuario},
        voltarParaLista: false,
        loading: false
      });

    case TYPES.SALVO:
      return Object.assign({}, state, {
        usuario: {...usuarioInitial},
        voltarParaLista: true,
        loading: false
      });

    default:
      return state
  }
};