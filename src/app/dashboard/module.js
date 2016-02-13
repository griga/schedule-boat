'use strict';


angular.module('app.dashboard', [
    'ui.router',
]);



angular.module('app.dashboard')
    .config(($stateProvider) => {
        $stateProvider
            .state('app.dashboard', {
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
            })

    });
