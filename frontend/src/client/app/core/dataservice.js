(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger', '$websocket',
    '$sessionStorage', 'SERVICE_URL'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger, $websocket,
    $sessionStorage, SERVICE_URL) {
    // Open a WebSocket connection
    var dataStream = $websocket('ws://127.0.0.1:8080/ws'),
      collection = [];

    dataStream.onMessage(function(message) {
      collection.push(JSON.parse(message.data));
    });

    //FIX ME --------------------
    var config = {
      'headers': {
        'Authorization': 'Basic ' + $sessionStorage.Authorization //bW9yYWNhcmxvczlAZ21haWwuY29tOjEyMzQ'
      }
    };

    var service = {
      //People
      getPerson: getPerson,
      getPeople: getPeople,
      addPeople: addPeople,
      updatePeople: updatePeople,
      deletePeople: deletePeople,
      //Users
      getUser: getUser,
      getUsers: getUsers,
      addUser: addUser,
      updateUser: updateUser,
      deleteUser: deleteUser,
      //WebSocket
      getWebSocket: getWebSocket
    };

    return service;

    //////////////////////////////////////
    function getWebSocket() {
      dataStream.send(JSON.stringify({ action: 'get' }));
    }
    /////////////////////////////////////

    /*********[INIT SUCCESS AND FAIL]*********/
    function success(response) {
      return response.data;
    }

    function fail(error) {
      return error;
    }
    /*********[END SUCCESS AND FAIL]*********/

    /*********[INIT PEOPLE]*********/
    function getPerson(username) {
      //FIX ME --------------------
      var config = {
        'headers': {
          'Authorization': 'Basic ' + $sessionStorage.Authorization //bW9yYWNhcmxvczlAZ21haWwuY29tOjEyMzQ'
        }
      };

      return $http.get(SERVICE_URL + 'people/' + username, config)
        .then(success)
        .catch(fail);
    }

    function getPeople(username) {
      return $http.get(SERVICE_URL + 'people/' + username, config)
        .then(success)
        .catch(fail);
    }

    function addPeople(username) {
      return $http.post(SERVICE_URL + 'people', config)
        .then(success)
        .catch(fail);
    }

    function updatePeople(username) {
      return $http.put(SERVICE_URL + 'people/' + username, config)
        .then(success)
        .catch(fail);
    }

    function deletePeople(username) {
      return $http.delete(SERVICE_URL + 'people/' + username, config)
        .then(success)
        .catch(fail);
    }
    /*********[END PEOPLE]*********/

    /*********[INIT USERS]*********/
    function getUser(username) {
      //FIX ME --------------------
      var config = {
        'headers': {
          'Authorization': 'Basic ' + $sessionStorage.Authorization //bW9yYWNhcmxvczlAZ21haWwuY29tOjEyMzQ'
        }
      };

      return $http.get(SERVICE_URL + 'users/' + username, config)
        .then(success)
        .catch(fail);
    }

    function getUsers(username) {
      //FIX ME --------------------
      var config = {
        'headers': {
          'Authorization': 'Basic ' + $sessionStorage.Authorization //bW9yYWNhcmxvczlAZ21haWwuY29tOjEyMzQ'
        }
      };

      return $http.get(SERVICE_URL + 'users/' + username, config)
        .then(success)
        .catch(fail);
    }

    function addUser(params) {
      //FIX ME --------------------
      var config = {
        'headers': {
          'Authorization': 'Basic ' + $sessionStorage.Authorization //bW9yYWNhcmxvczlAZ21haWwuY29tOjEyMzQ'
        }
      };

      return $http.post(SERVICE_URL + 'users', params, config)
        .then(success)
        .catch(fail);
    }

    function updateUser(username, params) {
      //FIX ME --------------------
      var config = {
        'headers': {
          'Authorization': 'Basic ' + $sessionStorage.Authorization //bW9yYWNhcmxvczlAZ21haWwuY29tOjEyMzQ'
        }
      };

      return $http.put(SERVICE_URL + 'users/' + username, params, config)
        .then(success)
        .catch(fail);
    }

    function deleteUser(username) {
      return $http.delete(SERVICE_URL + 'users/' + username, config)
        .then(success)
        .catch(fail);
    }
    /*********[END USERS]*********/

  }
})();
