'use strict'
const ServiceController = require("./ServiceController");
const Env               = use('Env');

/**
 * CheckoutRestController
 */
class ActiveController extends ServiceController {

  /**
   * constructor
   */
  constructor() {
    super({urlDestiny:Env.get('ACTIVE_API_URL')})
    this.urlDestiny = Env.get('ACTIVE_API_URL');
    this.tokenApi   = Env.get('ACTIVE_API_TOKEN');
  }

  /**
   *
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async store({request, response}){
    try {
      const data = request.only(['email', 'name','id']);

      let body = JSON.stringify({
        "contact": {
          "email":     data.email,
          "firstName": data.name,
          "lastName":  data.id
        }});

     return await this.send(this.urlDestiny + '/api/3/contact/sync', request.method(),{'Api-Token': this.tokenApi, 'Content-Type': 'application/json'}, body);

    } catch (error) {
      return response.status(422).send({error:true, messages:error});
    }
  }

  /**
   *
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async storeList({request, response}){
    try {
      const data = request.only(['idLista', 'idContato','status']);

      let body = JSON.stringify({
        "contactList": {
          "list":    data.idLista,
          "contact": data.idContato,
          "status":  data.status
        }});

      return await this.send(this.urlDestiny + '/api/3/contactLists', request.method(),{'Api-Token': this.tokenApi, 'Content-Type': 'application/json'}, body);

    } catch (error) {
      return response.status(422).send({error:true, messages:error});
    }
  }
}

module.exports = ActiveController
