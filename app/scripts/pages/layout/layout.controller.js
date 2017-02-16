(function(){
    'use strict';

    angular
        .module('Urbamapp.main')
        .controller('LayoutCtrl', LayoutCtrl)

    LayoutCtrl.$inject = ['$state', 'LoopBackAuth', 'User'];

    /** @ngInject */
    function LayoutCtrl($state, LoopBackAuth, User){
        var layout = this;
        
        init();

        function init(){
            console.log("Este es el Layout");
            if(User.isAuthenticated() === false){
                $state.go('login');
            }
            else{
                console.log("Estas autenticado");
            }
            
        }

    }

}());