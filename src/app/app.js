angular.module('app', [
        'ngAnimate',
        'ngMessages',
        'ngAria',
        'ngMaterial',
        'app.layout',
        'app.dashboard'
    ])

    //.config((ezfbProvider) => {
    //    ezfbProvider.setInitParams({
    //        appId: '1878919549000954',
    //    });
    //})

    .config(($mdThemingProvider) => {
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo', {
                'default': '400', // by default use shade 400 from the orange palette for primary intentions
                'hue-1': '300', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
            })
            .accentPalette('orange');
    })
    .run(()=> {
        console.log('run')
    })
