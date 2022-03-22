'use strict';
const View = use('View');
/**
 * HomeController
 */
class HomeController {
  /**
   *
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
    async unauthorized({request}){
       return View.render('snippet');
    }
}
module.exports = HomeController;
