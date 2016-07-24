(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('tableDirective', tableDirective);

  /* @ngInject */
  function tableDirective($compile) {
    //Usage:
    // <table-directive
    //     people='vm.people'
    // />

    var directive = {
      restrict: 'AE',
      replace: false,
      terminal: true,
      templateUrl: 'app/widgets/table.html',
      bindToController: {
        people: '=',
        logs: '='
      },
      scope: {},
      controller: TableController,
      controllerAs: 'vm'
    };
    return directive;
  }

  /* @ngInject */
  function TableController($scope) {
    var vm = this;
    vm.getFaceSquare = getFaceSquare;

    function getFaceSquare(p, index) {
      /*Face Canvas*/
      var faceCanvas = document.getElementById('faceCanvas-' + index);
      var imgCanvas = new Image();

      //console.log(p);
      imgCanvas.src = p.picture;

      if (faceCanvas != null) {
        var faceContext = faceCanvas.getContext('2d');

        faceContext.clearRect(0, 0, faceCanvas.width, faceCanvas.height);

        faceContext.beginPath();

        faceContext.drawImage(imgCanvas, p.person.x, p.person.y, p.person.w + 30, p.person.h + 30,
          0, 0, p.person.w, p.person.h);
        faceContext.stroke();

        faceContext.closePath();
      }
    }
  }
})();
