// @flow weak

import React from 'react';
import {
  Route,
  Switch
 }                              from 'react-router';
 
import {
  ///// necesarias para el sitio /////
  Home,
  PageNotFound,
  Ingresar,

  /////// administrador ///////
  actionPrueba,
  actionPregunta,
  actionUsuario,
  actionCategoria,

  /////// site ///////
  actionPruebaSite,
  actionPreguntaSite
}                               from '../views';

const MainRoutes = () => {
  return (
    <Switch>
      {/*////////////////////NECESARIAS//////////////////////////////*/}
      <Route exact path="/" component={Home} />
      <Route exact path="/ingresar" component={Ingresar} />

      {/*////////////////////ADMINISTRADOR//////////////////////////////*/}
      <Route exact path="/prueba"   component={actionPrueba} />
      <Route exact path="/pregunta" component={actionPregunta} />
      <Route exact path="/usuario"  component={actionUsuario} />
      <Route exact path="/categoria"  component={actionCategoria} />


      {/*////////////////////SITE//////////////////////////////*/}
      <Route exact path="/site_prueba" component={actionPruebaSite} />
      <Route exact path="/site_pregunta" component={actionPreguntaSite} />
       
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
};

export default MainRoutes;
