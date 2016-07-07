(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger', '$websocket'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger, $websocket) {
    // Open a WebSocket connection
    var dataStream = $websocket('ws://127.0.0.1:8080/ws'),
      collection = [];

    dataStream.onMessage(function(message) {
      collection.push(JSON.parse(message.data));
    });

    var service = {
      getPeople: getPeople,
      getMessageCount: getMessageCount,
      getWebSocket: getWebSocket
    };

    return service;

    function getWebSocket() {
      dataStream.send(JSON.stringify({ action: 'get' }));
    }

    function getMessageCount() { return $q.when(72); }

    function getPeople() {
      return $http.get('/api/people')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getPeople')(e);
      }
    }
  }
})();
