(function(){
    'use strict';

    angular
        .module('Urbamapp.service')
        .factory('categoryService', categoryService)

        categoryService.$inject = ['$http', 'LoopBackAuth'];

    /** @ngInject */
    function categoryService($http, LoopBackAuth){


       return {
            getAll: getAll,
            getByID: getByID
        };

        function getAll(){
            console.log('holasssss');
            var apiUrl = 'http://191.234.185.80/api/'
            var token = LoopBackAuth.accessTokenId;
            console.log(token);
            var url = apiUrl+"Categories?access_token="+token;
            console.log(url);
            
            var parseHeaders = {
                'Content-Type': 'application/json'
            };
            
            var promise = $http.get(url, {headers: parseHeaders}).then(successCallback, errorCallback);

            function successCallback(response){
                return response.data;
            }

            function errorCallback(error){
                console.log('Error al solicitar categorias');
                console.log(error);
            }

            return promise;
        }

        function getByID(){

        }
    }

}());