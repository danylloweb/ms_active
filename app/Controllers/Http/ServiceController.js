'use strict'
const client = use('request-promise');

/**
 * ServiceController
 */
class ServiceController {
  /**
   * constructor
   * @param urlDestiny
   * @param prefix
   */
  constructor({urlDestiny}) {
    this.urlDestiny = urlDestiny;
  }



  /**
   * sendGet
   * @param url
   * @param header
   * @returns {Promise<*>}
   */
  async sendGet(url, header)
  {
    return await client({method: 'GET', url: url, headers:header, json: true, rejectUnauthorized: false});
  }

  /**
   *
   * @param url
   * @param method
   * @param header
   * @param body
   * @returns {Promise<*>}
   */
  async send(url, method, header, body)
  {
    return await client({method: method, url: url, headers: header, body: body, json: true, rejectUnauthorized: false});
  }
}

module.exports = ServiceController
