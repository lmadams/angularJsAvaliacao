import { combineReducers } from 'redux';
import { usuariosReducer } from '../components/usuarios/store/usuarios-reducer';

const rootReducer = combineReducers({
  usuariosReducer
});

export default rootReducer;
