import axios from 'axios';
import { API_URL } from '../../../util/constants';

const URL_USUARIOS = `${API_URL}usuarios`;

const UsuarioService = {

  listarUsuarios() {
    return axios.get(URL_USUARIOS);
  },

  adicionarUsuario(usuario) {
    return axios.post(URL_USUARIOS, usuario);
  },

  editarUsuario(usuario) {
    return axios.put(`${URL_USUARIOS}/${usuario.id}`, usuario);
  },

  getUsuario(idUsuario) {
    return axios.get(`${URL_USUARIOS}/${idUsuario}`)
  },

  deleteUsuario(idUsuario) {
    return axios.delete(`${URL_USUARIOS}/${idUsuario}`);
  }
};

export default UsuarioService;