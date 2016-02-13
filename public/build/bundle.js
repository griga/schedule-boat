'use strict';

angular.element(document).ready(function () {
    angular.bootstrap(document, ['app'], {
        //strictDi: true
    });
});
'use strict';

angular.module('app', ['ngAnimate', 'ngMessages', 'ngAria', 'ngMaterial']).run(function () {
  console.log('run');
});