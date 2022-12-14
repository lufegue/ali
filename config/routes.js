/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /': 'PrincipalController.inicio',

  '/acerca-de': {
    view: 'pages/acerca_de'
  },

  'GET /registro': 'SesionController.registro',
  
  'POST /procesar-registro': 'SesionController.procesarRegistro',
  
  'GET /inicio-sesion': 'SesionController.inicioSesion',
  
  'GET /cerrar-sesion': 'SesionController.cerrarSesion',

  'GET /listo': 'SesionController.listo',

  'GET /homeplace': 'SesionController.homeplace',

  'POST /procesar-inicio-sesion': 'SesionController.procesarInicioSesion',
  
  'GET /reservas': 'SesionController.reservas',

  'GET /mis-reservas/:reservaId': 'CompraController.misReservas',

  'GET /agregar-carro-compra/:fotoId': 'CompraController.agregarCarroCompra',

  'GET /carro-de-compra': 'CompraController.carroCompra',

  'GET /eliminar-carro-compra/:fotoId': 'CompraController.eliminarCarroCompra',

  'GET /comprar': 'CompraController.comprar',

  'GET /top-vendidas': 'PrincipalController.topVendidas',
  
  'GET /agregar-lista-deseo/:fotoId': 'CompraController.agregarListaDeseo',

  'GET /lista-deseo': 'CompraController.listaDeseo',

  'GET /eliminar-lista-deseo/:fotoId': 'CompraController.eliminarListaDeseo',

  'GET /admin/inicio-sesion': 'AdminController.inicioSesion',

  'POST /admin/procesar-inicio-sesion': 'AdminController.procesarInicioSesion',

  'GET /admin/principal': 'AdminController.principal',

  'GET /admin/cerrar-sesion': 'AdminController.cerrarSesion',

  'GET /admin/agregar-foto': 'AdminController.agregarFoto',

  'POST /admin/procesar-agregar-foto': 'AdminController.procesarAgregarFoto',

  'GET /admin/desactivar-foto/:fotoId': 'AdminController.desactivarFoto',

  'GET /admin/activar-foto/:fotoId': 'AdminController.activarFoto',

  'GET /admin/lista-cliente': 'AdminController.listaCliente',

  'GET /admin/lista-cliente/:ordenId': 'CompraController.ordenDeCompra',

  'GET /admin/lista-admin': 'AdminController.listaAdmin',

  'GET /admin/reporte': 'AdminController.reporte',

  'GET /admin/desactivar-admin/:adminId': 'AdminController.desactivarAdmin',

  'GET /admin/activar-admin/:adminId': 'AdminController.activarAdmin',

  'GET /admin/desactivar-cliente/:clienteId': 'AdminController.desactivarCliente',

  'GET /admin/activar-cliente/:clienteId': 'AdminController.activarCliente',

  'GET /admin/ordenes-clientes/:clienteId': 'AdminController.ordenesClientes'

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝



  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
