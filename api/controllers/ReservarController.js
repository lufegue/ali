/**
 * CompraController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  agregarCarroCompra: async (peticion, respuesta) => {
    let foto = await CarroCompra.findOne({ foto: peticion.params.fotoId, cliente: peticion.session.cliente.id })
    if (foto) {
      peticion.addFlash('mensaje', 'La foto ya había sido agregada al carro de compra')
    }
    else {
      await CarroCompra.create({
        cliente: peticion.session.cliente.id,
        foto: peticion.params.fotoId
      })
      peticion.session.carroCompra = await CarroCompra.find({ cliente: peticion.session.cliente.id })
      peticion.addFlash('mensaje', 'Foto agregada al carro de compra')
    }
    return respuesta.redirect("/")
  },

  carroCompra: async (peticion, respuesta) => {
    if (!peticion.session || !peticion.session.cliente){
      return respuesta.redirect("/")
    }
    let elementos = await CarroCompra.find({ cliente: peticion.session.cliente.id }).populate('foto')
    respuesta.view('pages/carro_de_compra', {elementos})
  },

  eliminarCarroCompra: async (peticion, respuesta) => {
    let foto = await CarroCompra.findOne({ foto: peticion.params.fotoId, cliente: peticion.session.cliente.id })
    if (foto) {
      await CarroCompra.destroy({
        cliente: peticion.session.cliente.id,
        foto: peticion.params.fotoId
      })
      peticion.session.carroCompra = await CarroCompra.find({ cliente: peticion.session.cliente.id })
      peticion.addFlash('mensaje', 'Foto eliminada del carro de compra')
    }
    return respuesta.redirect("/carro-de-compra")
  },


  comprar: async (peticion, respuesta) => {
    let orden = await Orden.create({
      fecha: new Date(),
      cliente: peticion.session.cliente.id,
      total: peticion.session.carroCompra.length
    }).fetch()
    for(let i=0; i< peticion.session.carroCompra.length; i++){
      await OrdenDetalle.create({
        orden: orden.id,
        foto: peticion.session.carroCompra[i].foto
      })
    }
    await CarroCompra.destroy({cliente: peticion.session.cliente.id})
    peticion.session.carroCompra = []
    peticion.addFlash('mensaje', 'La compra ha sido realizada')
    return respuesta.redirect("/")
  },

  reservar: async (peticion, respuesta) => {

    let consulta = `
    SELECT
      cli.id,
      cli.nombre,
      rec.id,
      rec.nombre,
      rec.aforo,
      rec.identificador,
      rec.funca,
      res.fecha,
      res.pedido,
      res.tiempo,
      res.tiempo_max
    FROM
      RESERVA res,
      CLIENTE cli, 
      RECURSO rec
    WHERE res.id_cli = cli.id
    AND res.id_rec = rec.id
    AND rec.funca = true
    ORDER BY res.id ASC
    LIMIT 3
    `

    await Reserva.query(consulta, [], (errores, resultado) => {
      let reservas = resultado.rows
      console.log(reservas)
      return respuesta.view("pages/reservar", { reservas })
    })


  },

  procesarReserva: async (peticion, respuesta) => {

    let turno = await Reserva.create({
      cliente: peticion.session.cliente.id,
      fecha: new Date(),
      pedido: 'TEXT1',
      tiempo: 1,
      tiempo_max: 1,
      recurso: id
    })
    peticion.addFlash('mensaje', 'La reserva esta guardada')
    console.log(turno)
    return respuesta.redirect("/")

  },


  ordenDeCompra: async (peticion, respuesta) => {
    if (!peticion.session || !peticion.session.Cliente) {
      return respuesta.redirect("/")
    }
    let orden = await Orden.findOne({ cliente: peticion.session.cliente.id, id: peticion.params.ordenId }).populate('detalles')

    if (!orden) {
      return respuesta.redirect("/mis-ordenes")
    }

    if (orden && orden.detalles == 0) {
      return respuesta.view('pages/orden', { orden })
    }

    orden.detalles = await OrdenDetalle.find({ orden: orden.id }).populate('foto')
    return respuesta.view('pages/orden', { orden })
  },

  agregarListaDeseo: async (peticion, respuesta) => {
    let foto = await ListaDeseo.findOne({ foto: peticion.params.fotoId, cliente: peticion.session.cliente.id })
    if (foto) {
      peticion.addFlash('mensaje', 'La foto ya había sido agregada a la lista de deseo')
    }
    else {
      await ListaDeseo.create({
        cliente: peticion.session.cliente.id,
        foto: peticion.params.fotoId
      })
      peticion.addFlash('mensaje', 'Foto agregada a la lista de deseo')
    }
    return respuesta.redirect("/")
  },

  listaDeseo: async (peticion, respuesta) => {
    if (!peticion.session || !peticion.session.cliente) {
      return respuesta.redirect("/")
    }
    let elementos = await ListaDeseo.find({ cliente: peticion.session.cliente.id }).populate('foto')
    respuesta.view('pages/lista_deseo', { elementos })
  },

  eliminarListaDeseo: async (peticion, respuesta) => {
    let foto = await ListaDeseo.findOne({ foto: peticion.params.fotoId, cliente: peticion.session.cliente.id })
    if (foto) {
      await ListaDeseo.destroy({
        cliente: peticion.session.cliente.id,
        foto: peticion.params.fotoId
      })
      peticion.addFlash('mensaje', 'Foto eliminada de la lista de deseo')
    }
    return respuesta.redirect("/lista-deseo")
  },

};

