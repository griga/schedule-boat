

const HeaderController = function($scope, $state) {
    const self = this;
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

angular.module('app.layout').controller('HeaderController', HeaderController)
