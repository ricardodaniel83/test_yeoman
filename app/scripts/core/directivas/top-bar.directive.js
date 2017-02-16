(function () {
    'use strict';


    angular.module('testAngularApp')
    .directive('topBar', topBar);

        function topBar(){

        function topBarCtrl(LoopBackAuth, User, $state){
            var topBar = this;
            topBar.logout = logout;



            init();

            function init(){
                console.log("Este es el Top Bar");
            }


            function logout(){
                User.logout().$promise
                .then(function(value, responseHeaders){
                    console.log("Estas Logout");
                    LoopBackAuth.clearUser();
                    LoopBackAuth.clearStorage();
                    $state.go('login');
                })
                .catch(function(err){
                    console.log("Error en el logout");
                });
            }

        }

                return {
                    bindToController: true,
                    controller: topBarCtrl,
                    controllerAs: 'topBar',
                    restrict: 'AE',
                    templateUrl: 'core/directivas/top-bar.html'
                }


        }


} ());
