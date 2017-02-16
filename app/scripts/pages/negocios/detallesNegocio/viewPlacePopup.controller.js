(function(){
    'use strict';

    angular
        .module('Urbamapp.main')
        .controller('viewPlacePopupCtrl', viewPlacePopupCtrl);
        viewPlacePopupCtrl.$inject = ['$uibModalInstance', 'data','placeService', 'LoopBackAuth','mapaService'];
        function viewPlacePopupCtrl($uibModalInstance, data, placeService, LoopBackAuth, mapaService){
            var detallesNegocio = this;
            detallesNegocio.token = LoopBackAuth.accessTokenId;
            detallesNegocio.idPlace = data.idNegocio;
            detallesNegocio.urlImg = data.urlImg
            //detallesNegocio.editar = editar;
            detallesNegocio.data =[];
            detallesNegocio.fotos = [];
            detallesNegocio.fotosFin = [];
            //detallesNegocio.editarGaleria = editarGaleria;
            detallesNegocio.precio = {
                min: 0,
                max: 0
            }

            detallesNegocio.getPlaceData = getPlaceData;
            detallesNegocio.close = close;
            detallesNegocio.approve = approve;
            detallesNegocio.editar = editar;
            detallesNegocio.cargarMapp = cargarMapp;


            init();

            function init(){
                getPlaceData(detallesNegocio.idPlace);

            }

            function cargarMapp(lat, lng, categoria){
              console.log(categoria);
              mapaService.searchIcon(categoria).then(function(myIcono){
                console.log(myIcono);
                var map = Urbamapp.map('mapid',{
                     zoom: 16,
                     minZoom: 3,
                     maxZoom: 18
                 }).setView([lat,lng]);

                Urbamapp.tileLayer.estilo('Urbamapp').addTo(map);
                Urbamapp.marker([lat, lng],{icon:myIcono}).addTo(map);
              });



            }

            function getPlaceData(idPlace){
                placeService.getById(idPlace).then(successCallback, errorCallback);
                function successCallback(response){
                    detallesNegocio.data = response[0];
                    detallesNegocio.fotos = response[1];                    

                    if(angular.isUndefined(detallesNegocio.data.principalUrl) !== true)
                       detallesNegocio.fotosFin.push(detallesNegocio.urlImg + detallesNegocio.data.principalUrl+'?access_token='+detallesNegocio.token)

                    if(angular.isUndefined(detallesNegocio.data.price_range) == true || detallesNegocio.data.price_range.length == 0)
                        detallesNegocio.data.price_range = [0,0];

                    detallesNegocio.fotos.forEach(function(foto) {
                        detallesNegocio.fotosFin.push(detallesNegocio.urlImg + foto.url+'?access_token='+detallesNegocio.token);
                    });

                    setTimeout(function() {
                        detallesNegocio.cargarMapp(detallesNegocio.data.coord.lat,detallesNegocio.data.coord.lng,detallesNegocio.data.categories[0].name);
                    }, 1000);

          }
                function errorCallback(error){
                    console.log("Maaaaaaal");
                    console.log('Error al solicitar el place: '+idPlace);
                    console.log(error);
                    return error;
                }
            }

            function close(){
              $uibModalInstance.dismiss('cancel');
            }

            function editar(){
                //alert('entre');
                $uibModalInstance.close({tipo:'edit',data: detallesNegocio.data});
            }
            function approve(){
                $uibModalInstance.close({tipo:'approve',data:""});
            }

        }



}());
