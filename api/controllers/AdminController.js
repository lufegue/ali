const path = require('path')
const fs = require('fs')
const Cliente = require('../models/Cliente')

/**
 * SesionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  inicioSesion: async (peticion, respuesta) => {
    respuesta.view('pages/admin/inicio_sesion')
  },

  procesarInicioSesion: async (peticion, respuesta) => {
    let admin = await Admin.findOne({ email: peticion.body.email, contrasena: peticion.body.contrasena })
    if (admin.activo === true) {
      if (admin) {
        peticion.session.admin = admin
        peticion.session.cliente = undefined
        peticion.addFlash('mensaje', 'Sesión de Administrador iniciada')
        return respuesta.redirect("/admin/principal")
      }
      else {
        peticion.addFlash('mensaje', 'Email o contraseña invalidos')
        return respuesta.redirect("/admin/inicio-sesion");
      }
    }
    else {
      peticion.addFlash('mensaje', 'No tienes acceso. Tú usuario no esta ACTIVO!')
      return respuesta.redirect("/admin/inicio-sesion");
    }
  },

  principal: async (peticion, respuesta) => {
    if (!peticion.session || !peticion.session.admin) {
      peticion.addFlash('mensaje', 'Sesión inválida')
      return respuesta.redirect("/admin/inicio-sesion")
    }
    let fotos = await Foto.find().sort("id")
    respuesta.view('pages/admin/principal', { fotos })
  },

  cerrarSesion: async (peticion, respuesta) => {
    peticion.session.admin = undefined
    peticion.addFlash('mensaje', 'Sesión finalizada')
    return respuesta.redirect("/");
  },

  agregarFoto: async (peticion, respuesta) => {
    respuesta.view('pages/admin/agregar_foto')
  },

  procesarAgregarFoto: async (peticion, respuesta) => {
    let foto = await Foto.create({
      titulo: peticion.body.titulo,
      activa: true
    }).fetch()

    peticion.file('foto').upload({}, async (error, archivos) => {
      if (archivos && archivos[0]) {
        let upload_path = archivos[0].fd
        let ext = path.extname(upload_path)

        await fs.createReadStream(upload_path).pipe(fs.createWriteStream(path.resolve(sails.config.appPath, `assets/images/fotos/Foto${foto.id}${ext}`)))
        await Foto.update({ id: foto.id }, { contenido: `Foto${foto.id}${ext}` })
        peticion.addFlash('mensaje', 'Foto agregada')
        return respuesta.redirect("/admin/principal")
      }
      peticion.addFlash('mensaje', 'No hay foto seleccionada')
      return respuesta.redirect("/admin/agregar-foto")
    })
  },

  desactivarFoto: async (peticion, respuesta) => {
    await Foto.update({ id: peticion.params.fotoId }, { activa: false })
    peticion.addFlash('mensaje', 'Foto desactivada')
    return respuesta.redirect("/admin/principal")
  },

  activarFoto: async (peticion, respuesta) => {
    await Foto.update({ id: peticion.params.fotoId }, { activa: true })
    peticion.addFlash('mensaje', 'Foto activada')
    return respuesta.redirect("/admin/principal")
  },

  listaCliente: async (peticion, respuesta) => {

    var NAMES_OF_CLIENTES_SQL = `
    SELECT cliente.id, cliente.alias, cliente.nombre, cliente.email, cliente.activo
    FROM cliente
    ORDER BY cliente.id ASC
    `;
    var clientes = await sails.sendNativeQuery(NAMES_OF_CLIENTES_SQL, [])
    respuesta.view('pages/admin/lista-cliente', { clientes: clientes.rows })
  },

  listaAdmin: async (peticion, respuesta) => {

    var NAMES_OF_ADMINS_SQL = `
    SELECT admin.id, admin.nombre, admin.email, admin.activo
    FROM admin
    `;
    var admins = await sails.sendNativeQuery(NAMES_OF_ADMINS_SQL, [])
    respuesta.view("pages/admin/lista-admin", { admins: admins.rows })

  },

  desactivarAdmin: async (peticion, respuesta) => {
    await Admin.update({ id: peticion.params.adminId }, { activo: false })
    peticion.addFlash('mensaje', 'Administrador desactivado')
    respuesta.redirect("admin/lista-admin")
  },

  activarAdmin: async (peticion, respuesta) => {
    await Admin.update({ id: peticion.params.adminId }, { activo: true })
    peticion.addFlash('mensaje', 'Administrador activado')
    respuesta.redirect("admin/lista-admin")
  },

  desactivarCliente: async (peticion, respuesta) => {

    await Cliente.update({ id: parseInt(peticion.params.clienteId) }, { activo: false })
    peticion.addFlash('mensaje', 'Cliente desactivado');
    respuesta.redirect("admin/lista-cliente")
  },

  activarCliente: async (peticion, respuesta) => {
    await Cliente.update({ id: parseInt(peticion.params.clienteId) }, { activo: true })
    peticion.addFlash('mensaje', 'Cliente activado');
    respuesta.redirect("admin/lista-cliente")
  },

  reporte: async (peticion, respuesta) => {

    const REPORTECLIENTES_SQL = `
    SELECT count(*) as Total_Clientes
    FROM cliente
    `;
    const tclientes = await sails.sendNativeQuery(REPORTECLIENTES_SQL, [])
    // const REPORTEFOTOS_SQL = `
    // SELECT count(*) as Total_Fotos
    // FROM foto
    // `;
    // const tfotos = await sails.sendNativeQuery(REPORTEFOTOS_SQL, [])
    // const REPORTEADMIN_SQL = `
    // SELECT count(*) as Total_Administradores
    // FROM admin
    // `;
    // const tadmin = await sails.sendNativeQuery(REPORTEADMIN_SQL, [])
    // const REPORTEORDENES_SQL = `
    // SELECT count(*) as Total_Ordenes
    // FROM orden
    // `;
    // const torden = await sails.sendNativeQuery(REPORTEORDENES_SQL, [])

    //const finalResult = Object.assign(tclientes,tfotos);

    respuesta.view("pages/admin/reporte", { tclientes: tclientes.rows })
  },


};
