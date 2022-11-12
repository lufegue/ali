/**
 * PrincipalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  inicio: async (peticion, respuesta) => {
    let recursos = await Recurso.find({ funca: true })
    //console.log("inicio principalcontroler",peticion)
    respuesta.view('pages/principal', {recursos})
  },


};

