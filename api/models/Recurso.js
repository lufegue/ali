/**
 * Recurso.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nombre: { type: 'string' },

    aforo: { type: 'number' },

    observaciones: { type: 'string' },

    identificador: { type: 'number' },

    funca: { type: 'boolean' }

  },

};

