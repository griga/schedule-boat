'use strict';

angular.element(document).ready(function () {
    angular.bootstrap(document, ['app'], {
        //strictDi: true
    });
});
'use strict';

angular.module('app', ['ngAnimate', 'ngMessages', 'ngAria', 'ngMaterial', 'app.layout', 'app.dashboard'])

//.config((ezfbProvider) => {
//    ezfbProvider.setInitParams({
//        appId: '1878919549000954',
//    });
//})

.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('indigo', {
        'default': '400', // by default use shade 400 from the orange palette for primary intentions
        'hue-1': '300', // use shade 100 for the <code>md-hue-1</code> class
        'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    }).accentPalette('orange');
}).run(function () {
    console.log('run');
});
'use strict';

angular.module('app.dashboard', ['ui.router']);

angular.module('app.dashboard').config(function ($stateProvider) {
    $stateProvider.state('app.dashboard', {
        url: '/dashboard',
        views: {
            "content@app": {
                controller: 'DashboardController as dashboard',
                templateUrl: 'app/dashboard/views/dashboard.html'
            }
        },
        data: {
            title: 'Dashboard'
        }
    });
});
"use strict";

angular.module('app.layout', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app', {
        abstract: true,
        views: {
            root: {
                templateUrl: 'app/layout/views/layout.html'
            }
        }
    }). //resolve: {
    //    loginStatus: ($q, ezfb, FBAuth) => {
    //        let dfd = $q.defer();
    //        ezfb.$ready().then(()=>{
    //            FBAuth.updateLoginStatus().then((status)=>{
    //                dfd.resolve(status)
    //            }, dfd.reject)
    //        }, dfd.reject);
    //        return dfd.promise;
    //    }
    //}
    state('app.welcome', {
        url: '/welcome',
        views: {
            "content@app": {
                controller: 'WelcomeController as welcome',
                templateUrl: 'app/layout/views/welcome.html'
            }
        },
        data: {
            title: 'Dashboard'
        }
    });

    $urlRouterProvider.otherwise('/dashboard');
});
"use strict";

angular.module("app").run(["$templateCache", function ($templateCache) {
  $templateCache.put("app/dashboard/views/dashboard.html", "<md-content class=\"overflow-hidden\" flex layout-padding layout=\"column\">\n\n    <div id=\"app-toolbar\">\n\n\n        <md-button ng-if=\"dashboard.freeCells > 0\" photo-selector on-select=\"dashboard.addPictures(ids)\" max-selection=\"dashboard.freeCells\">\n            Select multiple photos <md-icon md-menu-align-target md-font-set=\"material-icons\">photo_library</md-icon>\n        </md-button>\n\n        <!--<md-button ng-click=\"dashboard.render()\">Debug Render <md-icon md-menu-align-target md-font-set=\"material-icons\">photo</md-icon></md-button>-->\n    </div>\n\n    <div id=\"app-viewport\" flex layout=\"column\" layout-align=\"center center\">\n\n\n        viewport\n    </div>\n</md-content>");
  $templateCache.put("app/layout/views/header.html", "<md-toolbar ng-controller=\"HeaderController as header\">\n    <div class=\"md-toolbar-tools\">\n        <span>Schedule Boat</span>\n        <span flex></span>\n        <!--<md-menu md-position-mode=\"target-right target\" >\n            <md-button aria-label=\"Open demo menu\" class=\"md-icon-button\" ng-click=\"$mdOpenMenu($event)\">\n                <md-icon md-font-set=\"material-icons\">more_vert</md-icon>\n            </md-button>\n            <md-menu-content width=\"4\" >\n                <md-menu-item ng-cloak ng-if=\"header.loggedIn\">\n                    <md-button ng-click=\"header.revoke()\">\n                        <div layout=\"row\">\n                            <p flex>Revoke access from Facebook</p>\n                            <md-icon md-menu-align-target md-font-set=\"material-icons\">eject</md-icon>\n                        </div>\n                    </md-button>\n                </md-menu-item>\n                <md-menu-item ng-cloak ng-if=\"header.loggedIn\">\n                    <md-button ng-click=\"header.logout()\">\n                        <div layout=\"row\">\n                            <p flex>Logout</p>\n                            <md-icon md-menu-align-target md-font-set=\"material-icons\">exit_to_app</md-icon>\n                        </div>\n                    </md-button>\n                </md-menu-item>\n                <md-menu-item ng-cloak ng-if=\"!header.loggedIn\">\n                    <md-button  ng-click=\"header.login()\">\n                        <div layout=\"row\">\n                            <p flex>Login</p>\n                            <md-icon md-menu-align-target md-font-set=\"material-icons\">exit_to_app</md-icon>\n                        </div>\n                    </md-button>\n                </md-menu-item>\n            </md-menu-content>\n        </md-menu>-->\n    </div>\n</md-toolbar>");
  $templateCache.put("app/layout/views/layout.html", "<ng-include src=\"\'app/layout/views/header.html\'\"></ng-include>\n\n<div data-ui-view=\"content\" id=\"content\" layout=\"column\" flex data-autoscroll=\"false\"></div>\n");
  $templateCache.put("app/layout/views/welcome.html", "<md-content layout=\"column\" flex layout-align=\"center center\">\n    <section >\n        <md-button style=\"padding: 1rem 2rem;\" ng-click=\"welcome.login()\" class=\"md-raised md-primary\">Login with Facebook</md-button>\n    </section>\n</md-content>");
}]);
'use strict';

/**
 * Created by griga on 1/25/16.
 */

var DashboardController = function DashboardController($scope, $mdDialog) {};

angular.module('app.dashboard').controller('DashboardController', DashboardController);
'use strict';

var HeaderController = function HeaderController($scope, $state) {
    var self = this;
    /* self.revoke = ()=>{
         FBAuth.revoke().then(()=>{
             $state.go('app.welcome')
         }, (error)=>{
             console.log('error', error)
         })
     };
     self.logout = ()=>{
         FBAuth.logout().then(()=>{
             $state.go('app.welcome')
         })
     };
     self.login = ()=>{
         FBAuth.login().then(()=>{
             $state.go('app.dashboard')
         })
     };
      self.state = FBAuth.getState();
      FBAuth.updateLoginStatus().then((auth) => {
         if(auth && auth.status !== 'connected'){
             self.loggedIn = false;
             ($state.$current.name !== 'app.welcome') && $state.go('app.welcome');
         } else {
             self.loggedIn = true;
         }
     });
      $scope.$on('fbLoggedOut', ()=>{
         self.loggedIn = false;
     });
     $scope.$on('fbLoggedIn', ()=>{
         self.loggedIn = true;
     });*/
};

angular.module('app.layout').controller('HeaderController', HeaderController);
'use strict';

/**
 * Created by griga on 1/27/16.
 */

var WelcomeController = function WelcomeController() {};

angular.module('app.layout').controller('WelcomeController', WelcomeController);