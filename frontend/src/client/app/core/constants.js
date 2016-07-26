/* global toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('SERVICE_URL', 'http://localhost:3000/')
    .constant('toastr', toastr)
    .constant('moment', moment);
})();
