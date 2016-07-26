(function() {
  'use strict';

  angular
    .module('app.core', [
      'ngAnimate', 'ngSanitize', 'vxWamp', 'ngWebSocket', 'ngStorage',
      'blocks.exception', 'blocks.logger', 'blocks.router',
      'ui.router', 'ngplus', 'lodash', 'ui.bootstrap'
    ]);
})();
