'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Contact extends Model {

  /**
   *
   * @returns {T[]}
   */
  static get dates() {
    return super.dates.concat(['created_at','updated_at'])
  }

  /**
   *
   * @param field
   * @param value
   * @returns {*}
   */
  static castDates(field, value) {
    if (field === 'created_at') {
      return value.format('Y-MM-D HH:mm:ss')
    }
    if (field === 'updated_at') {
      return value.format('Y-MM-D HH:mm:ss')
    }
  }
}

module.exports = Contact
