(function(){
    'use strict';

    angular
        .module('Urbamapp.main')
        .controller('PerfilCtrl', PerfilCtrl)

    PerfilCtrl.$inject = ['LoopBackAuth', 'User', 'userService'];

    /** @ngInject */
    function PerfilCtrl(LoopBackAuth, User, userService){
        var perfil = this;
        perfil.data = {};
        perfil.mainFoto = ""
        perfil.token = LoopBackAuth.accessTokenId;
        perfil.negocios = [];
        perfil.totalNegocios = 0;

        init();

        function init(){
            console.log("Este es el Perfil");
            userService.getData().then(function(response){
                console.log("Data Perfil");
                perfil.data = response;
                perfil.mainFoto = armarFoto(perfil.data);
                console.log(perfil.data);
            })


            userService.getMisNegocios().then(function(response){
                angular.forEach(response.places, function(item, index){
                    if(angular.isUndefined(item.place) !== true){
                        perfil.negocios.push(item);
                    }
                });
                
                perfil.totalNegocios = perfil.negocios.length;
            })
        }


        function armarFoto(foto){
            var api = 'http://191.234.185.80/'
            var token = '?access_token='+perfil.token
            var fotoUrl = api+foto.principalUrl+token;
            return fotoUrl;        
        }


    }

}());