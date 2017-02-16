(function(){
    'use strict';

    angular
        .module('Urbamapp.service')
        .factory('placeService', placeService)

        placeService.$inject = ['$window', '$rootScope', '$http', 'LoopBackAuth', 'urlImg'];

    /** @ngInject */
    function placeService($window, $rootScope, $http, LoopBackAuth, urlImg){

        return {
            nuevo:nuevo,
            getById: getById,
            getAll: getAll,
            getUrlsFotos: getUrlsFotos,
            guardarFotos: guardarFotos,
            actualizar: actualizar,
            updateFotos: updateFotos,
            getUrlsFotosForUpdateModule: getUrlsFotosForUpdateModule
        }

        function nuevo(placeData){

            var apiUrl = UrbamappApi.getApiUrl();
            var tempTokken = UrbamappApi.getTokken();
            var url = apiUrl + "Places/mapping";

            var parseHeaders = {
                'Content-Type': 'application/json',
                'Authorization': tempTokken
            };

            var promise = $http.post(url, placeData, {headers: parseHeaders}).then(successCallback, errorCallback);

            function successCallback(response){
                return response.data;
            }

            function errorCallback(error){
                console.log('Error al guardar el place');
                console.log(error);
                return error;
            }

            return promise;
        }


        function guardarFotos(){
            var resultado = false;
            var promise = new Promise(
                function(resolve, reject) {
                    resultado = true;
                    window.setTimeout(function() {resolve(resultado)}, Math.random() * 2000 + 1000);
            });
            return promise;
        }


        function getById(idPlace){
            var url = urlImg + "api/Places/full?placeId="+ idPlace + "&access_token=" + LoopBackAuth.accessTokenId;
            var parseHeaders = {
                'Content-Type': 'application/json'
            };
            var promise = $http.get(url).then(successCallback, errorCallback);

            function successCallback(response){
                return response.data;
            }
            function errorCallback(error){
                console.log('Error al solicitar el place: '+idPlace);
                console.log(error);
                return error;
            }
            return promise;
        }


        function getAll(){
            console.log("Hola Get All");
            var url = 'http://191.234.185.80/api/Places';
            var parseHeaders = {
                'Content-Type': 'application/json'
            };
            var promise = $http.get(url,{headers: parseHeaders}).then(successCallback, errorCallback);

            function successCallback(response){
                return response.data;
            }
            function errorCallback(error){
                console.log('Error al solicitar los places');
                console.log(error);
                return error;
            }
            return promise;
        }

        function getAll(){
            var url = ""
        }


        function getUrlsFotosForUpdateModule(fotos){


            var apiUrl = UrbamappApi.getApiUrl();
            console.log('length: '+ fotos.length);
            if(fotos.length != 0){
                angular.forEach(fotos, function(foto, indice){
                    var finalUrl = apiUrl + 'Containers/' + foto.container + "/download/" + foto.name + "?access_token=" + UrbamappApi.getTokken();
                    foto.url = finalUrl;
                });
            }else{
                fotos.push({url: 'img/nofoto.png'});
            }

            return fotos;

        }

        function getUrlsFotos(fotos){
            var fotosUrls = [];
            var apiUrl = UrbamappApi.getApiUrl();
            console.log('length: '+ fotos.length);
            if(fotos.length != 0){
                angular.forEach(fotos, function(foto, indice){
                    var finalUrl = apiUrl + 'Containers/' + foto.container + "/download/" + foto.name + "?access_token=" + UrbamappApi.getTokken();
                    fotosUrls.push({url: finalUrl, id: foto.id});
                });
            }else{
                fotosUrls.push({url: 'img/nofoto.png'});
            }
            console.log(fotosUrls);
            return fotosUrls;
        }


        function actualizar(data){

            var finalData = {place:data[0]};


            var updateurl = "http://191.234.185.80/api/Places?access_token=" + LoopBackAuth.accessTokenId ;
            console.log("Este es la URL:");
            console.log(updateurl);

            var parseHeaders = {
                'Content-Type': 'application/json'
            };

            var promise = $http.put(updateurl, finalData, {headers: parseHeaders})
            .then(function(respuesta){
                return respuesta.data;
            })
            .catch(function(err){
                return err;
            });

            return promise;

           /*var thisUrl =  UrbamappApi.getApiUrl() + 'Places';
            console.log("Este es la URL:");
            console.log(thisUrl);

            var parseHeaders = {
                'Content-Type': 'application/json',
                'Authorization': UrbamappApi.getTokken()
            };

            console.log(JSON.stringify(data[0]));

            var finalData = {place:data[0]};

            var promise = $http({
                method: 'PUT',
                url: thisUrl,
                data: finalData,
                headers: parseHeaders
            }).then(successCallback, errorCallback);
            function successCallback(response){
                console.log(response);
                return response.data;
            }
            function errorCallback(error){
                console.log(error);
                return error;
            }
            return promise;*/
        }

        function updateFotos(data){
            var stringData = JSON.stringify(data);
            console.log(stringData);
            var thisUrl =  UrbamappApi.getApiUrl() + 'Files/files';
            console.log("Este es la URL:");
            console.log(thisUrl);

            var parseHeaders = {
                'Authorization': UrbamappApi.getTokken()
            };

            var promise = $http.put(thisUrl,{files:stringData} , {headers: parseHeaders})
            .then(function(respuesta){
                return respuesta.data;
            })
            .catch(function(err){
                return err;
            });

            return promise;

        }

    }
}());

/* ------- Ejemplo de uso del servicio --------- */
/*
    placeService.getAll().then(function(places){
        console.log(places);
    });

    placeService.getById('57dc6e2b76987922a4c2c441').then(function(lugar){
        console.log(lugar);
    });
*/

/* ------- Codigo simular promise ----------- */

/*var promise = new Promise(
    function(resolve, reject) {
        resultado = true;
        window.setTimeout(function() {resolve(resultado)}, Math.random() * 2000 + 1000);
});
return promise;*/
