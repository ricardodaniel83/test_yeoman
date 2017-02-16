(function(){
    'use strict';

    angular
        .module('Urbamapp.main')
        .controller('detallesNegocioCtrl', detallesNegocioCtrl)

    detallesNegocioCtrl.$inject = ['placeService', '$state', '$stateParams', 'LoopBackAuth'];
    
    function detallesNegocioCtrl(placeService, $state, $stateParams, LoopBackAuth){
        var detallesNegocio = this;
        detallesNegocio.token = LoopBackAuth.accessTokenId;
        detallesNegocio.getPlaceData = getPlaceData;
        detallesNegocio.idPlace = $stateParams.idNegocio;
        detallesNegocio.editar = editar;
        detallesNegocio.data;
        detallesNegocio.fotos;
        detallesNegocio.fotosFin = [];
        detallesNegocio.editarGaleria = editarGaleria;

        detallesNegocio.precio = {
            min: 0,
            max: 0
        }
        
        init();

        function init(){
            console.log("Aqui va el detalle del place");
            getPlaceData(detallesNegocio.idPlace);
        }


        function getPlaceData(idPlace){
            placeService.getById(idPlace).then(successCallback, errorCallback);
            function successCallback(response){
                console.log("Bieeeeeen")
                detallesNegocio.data = response[0];
                detallesNegocio.fotos = response[1];
                console.log("Data");
                console.log(detallesNegocio.data);
                console.log("Fotos");
                console.log(detallesNegocio.fotos);
                
                detallesNegocio.data.price_range[0] ? detallesNegocio.precio.min = detallesNegocio.data.price_range[0] : detallesNegocio.precio.min = 0;
                detallesNegocio.data.price_range[1] ? detallesNegocio.precio.max = detallesNegocio.data.price_range[1] : detallesNegocio.precio.max = 0;
                
                detallesNegocio.fotos.forEach(function(foto) {
                    detallesNegocio.fotosFin.push('http://191.234.185.80/'+foto.url+'?access_token='+detallesNegocio.token);
                }, this);

                if(detallesNegocio.fotosFin.length === 0){
                    detallesNegocio.fotosFin.push('https://placeholdit.imgix.net/~text?txtsize=33&txt=Urbamapp&w=550&h=150');
                }

                console.log("Fotos Aqui Van");
                console.log(detallesNegocio.fotosFin);
      }
            function errorCallback(error){
                console.log("Maaaaaaal");
                console.log('Error al solicitar el place: '+idPlace);
                console.log(error);
                return error;
            }
        }


        function editar(){
            console.log("Editar");
            $state.go('main.editarNegocio', {data: detallesNegocio.data});
        }

        function editarGaleria(){
            console.log("Editar Galeria");
            $state.go('main.editarGaleria', {fotos: detallesNegocio.fotos});
        }

    }

}());