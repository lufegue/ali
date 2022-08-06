/**
 * SesionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  registro: async (peticion, respuesta) => {
    respuesta.view('pages/registro')
  },

  procesarRegistro: async (peticion, respuesta) => {
    let clientes = await Cliente.findOne({ alias: peticion.body.alias, email: peticion.body.email });
    console.log('Procesar Registro: ',peticion)
    if (clientes) {
      peticion.addFlash('mensaje', 'Email o Alias duplicado')
      return respuesta.redirect("/registro");
    }
    else {
      let clientes = await Cliente.create({
        alias: peticion.body.alias,
        email: peticion.body.email,
        nombre: peticion.body.nombre,
        contrasena: peticion.body.contrasena,
        activo: true
      })
      peticion.session.Cliente = clientes;
      peticion.addFlash('mensaje', 'Cliente registrado')
      return respuesta.redirect("/listo");
    }
  },

  inicioSesion: async (peticion, respuesta) => {
    respuesta.view('pages/inicio_sesion')
  },

  procesarInicioSesion: async (peticion, respuesta) => {
    let clientes = await Cliente.findOne({ email: peticion.body.email, contrasena: peticion.body.contrasena })
    if (clientes.activo === true) {
      if (clientes) {
        peticion.session.cliente = clientes
        peticion.addFlash('mensaje', 'Sesión iniciada')
        return respuesta.redirect("/homeplace")
        
      }
      else {
        peticion.addFlash('mensaje', 'Email o contraseña invalidos')
        return respuesta.redirect("/inicio-sesion")
      }
    }
    else {
      peticion.addFlash('mensaje', 'No tienes acceso. Tú usuario no esta ACTIVO!')
      return respuesta.redirect("/inicio-sesion")
    }
  },


  homeplace: async (peticion, respuesta) => {
    respuesta.view('pages/homeplace')
  },

  listo: async (peticion, respuesta) => {
    respuesta.view('pages/listo')
  },

  cerrarSesion: async (peticion, respuesta) => {
    peticion.session.cliente = undefined
    peticion.addFlash('mensaje', 'Sesión finalizada')
    respuesta.view('pages/cerrar_sesion')
  },
  
  
};
