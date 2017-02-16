(function(){
    'use strict';

    angular
        .module('Urbamapp.main')
        .controller('editarGaleriaCtrl',editarGaleriaCtrl)

    
    editarGaleriaCtrl.$inject = ['$state', '$stateParams', 'userService', 'LoopBackAuth', 'placeModel', 'placeService'];

    function editarGaleriaCtrl($state, $stateParams, userService, LoopBackAuth, placeModel, placeService){
        var editarGaleria = this;
        editarGaleria.fotosTemp = $stateParams.fotos;
        editarGaleria.token = LoopBackAuth.accessTokenId;
        editarGaleria.fotos = [];
    
        init();

        function init(){
            console.log("Aqui se edita la galeria");
            editarGaleria.fotosTemp.forEach(function(foto) {
                editarGaleria.fotos.push(fotoCompleta(foto));
            }, this);
            console.log("Fotos Completas");
            console.log(editarGaleria.fotos);
        }


        function fotoCompleta(foto){
            var api = 'http://191.234.185.80/'
            var token = '?access_token='+editarGaleria.token
            var fotoUrl = api+foto.url+token;
            console.log(fotoUrl); 
            return fotoUrl;        
        }




    }

}());