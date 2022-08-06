/**
 * Reserva.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id_cli: { type: 'number'},

    fecha: { type: 'string' },

    pedido: { type: 'string' },

    tiempo: { type: 'number' },

    tiempo_max: { type: 'number' }

  },

};

