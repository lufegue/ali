/**
 * PrincipalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  inicio: async (peticion, respuesta) => {
    respuesta.view('pages/principal', {})
  },

  productos: async (peticion, respuesta) => {
    respuesta.view('pages/productos',{})
  },

  testimonios: async (peticion, respuesta) => {
    respuesta.view('pages/testimonios',{})
  },

  contactanos: async (peticion, respuesta) => {
    respuesta.view('pages/contactanos',{})
  }


};

