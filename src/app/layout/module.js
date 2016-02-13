"use strict";

angular.module('app.layout', ['ui.router'])

    .config(($stateProvider, $urlRouterProvider)=> {
        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    root: {
                        templateUrl: 'app/layout/views/layout.html'
                    }
                },
                //resolve: {
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
            })
            .state('app.welcome', {
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

