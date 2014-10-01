rippleGatewayApp.factory('GatewayTransactionsModel', ['Restangular', function(Restangular) {
  "use strict";

  var model = {},
      mainRoute = Restangular.all('v1/gateway_transactions'),
      collection = mainRoute.getList().$object,
      getModelIndex;

  getModelIndex = function(collection, model) {
    return collection.indexOf(model);
  };

  model.get = function() {
    return collection;
  };

  model.fetch = function() {
    return mainRoute.getList().then(function(masterCollection) {
      collection = masterCollection;
    });
  };

  model.create = function(newModel) {
    return mainRoute.post(newModel).then(function(restangularizedModel) {
      collection.push(restangularizedModel);
    });
  };

  model.update = function(updatedModel) {
    return updatedModel.put().then(function() {
      collection[getModelIndex(collection, updatedModel)] = updatedModel;
    });
  };

  model.delete = function(targetModel) {
    return targetModel.remove().then(function() {
      collection.splice(getModelIndex(collection, targetModel), 1);
    });
  };

  return model;
}]);
