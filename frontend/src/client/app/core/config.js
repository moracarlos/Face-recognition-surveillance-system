(function() {
  'use strict';

  var core = angular.module('app.core');

  core.config(toastrConfig);

  toastrConfig.$inject = ['toastr'];
  /* @ngInject */
  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
  }

  var config = {
    appErrorPrefix: '[frontend Error] ',
    appTitle: 'Sistema de Seguridad'
  };

  core.value('config', config);

  core.run(run);

  /* @ngInject */
  function run($rootScope) {
    /************************** [INIT WEBSOCKET] ****************************/
    var wsuri,
      ip = '127.0.0.1:8080';

    if (document.location.origin === 'file://') {
      wsuri = 'ws://' + ip + '/ws';
      console.log('option 1');
    } else {
      wsuri = (document.location.protocol === 'http:' ? 'ws:' : 'wss:') + '//' + ip + '/ws';
    }
    console.log(wsuri);

    // the WAMP connection to the Router
    var connection = new autobahn.Connection({
      url: wsuri,
      realm: 'realm1'
    });

    // timers
    var t1, t2;

    // 'onopen' handler will fire when WAMP session has been established ..
    connection.onopen = function(session, details) {
      console.log('session established!');

      // SUBSCRIBE to a topic and receive events
      function onFrame(args) {
        var frame = args[0];
        var mJSON = JSON.parse(frame);
        var imgSrc = 'data:image/jpeg;base64,' + mJSON.image;
        $rootScope.$apply(function () {
          $rootScope.frame = mJSON;
          $rootScope.imgSrc = imgSrc;
          $rootScope.date = new Date();
        });
      }

      session.subscribe('com.example.onframe', onFrame).then(
        function(sub) {
          console.log('subscribed to topic');
        },
        function(err) {
          console.log('failed to subscribe to topic', err);
        }
      );

      // PUBLISH an event every second
      session.publish('com.example.oncreate', ['Hello from JavaScript (browser)']);
      console.log('published to topic \'com.example.oncreate\'');
    };

    // fired when connection was lost (or could not be established)
    connection.onclose = function(reason, details) {
      console.log('Connection lost: ' + reason);
      if (t1) {
        clearInterval(t1);
        t1 = null;
      }
      if (t2) {
        clearInterval(t2);
        t2 = null;
      }
    };

    // now actually open the connection
    connection.open();
    /************************** [END WEBSOCKET] ****************************/
  }

  core.config(configure);

  configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider'];
  /* @ngInject */
  function configure($logProvider, routerHelperProvider, exceptionHandlerProvider) {
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    routerHelperProvider.configure({ docTitle: config.appTitle + ': ' });
  }
})();
