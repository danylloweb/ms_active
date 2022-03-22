'use strict';
const Route = use('Route');

  Route.post('addContact', 'ActiveController.store');
  Route.post('addContactList', 'ActiveController.storeList');
  Route.get('/login', 'HomeController.unauthorized');
  Route.any('/', 'HomeController.unauthorized');
  Route.any('*', 'HomeController.unauthorized');
