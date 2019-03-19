import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Base from './base';
import UsuariosList from '../components/usuarios/usuarios-list';
import Usuario from '../components/usuarios/usuario';

const Rotas = () => {
  return (
    <BrowserRouter>
      <Base/>
      <div className="conteudo-container">
        <Route path="/" exact={true} component={UsuariosList}/>
        <Route path="/usuario/:id" component={Usuario}/>
      </div>
    </BrowserRouter>
  );
};

export default Rotas;
