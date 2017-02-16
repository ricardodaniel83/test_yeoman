(function(){
    'use strict';

    angular
        .module('Urbamapp.service')
        .factory('userService', userService)

    userService.$inject = ['$http', 'UrbamappApi', '$window', 'LoopBackAuth'];

    /** @ngInject */
    function userService($http, UrbamappApi, $window, LoopBackAuth){

        return {
            getData: getData,
            getMisNegocios: getMisNegocios
        }



        function getData(){

            var tokken = UrbamappApi.getTokken();
            var parseHeaders = {
                'Content-Type': 'application/json'
            };

            var promise = $http.get(UrbamappApi.userDataApi('users/'+LoopBackAuth.currentUserId+ '?access_token=' + LoopBackAuth.accessTokenId), {headers: parseHeaders}).then(successGetData, errorGetData);
            function successGetData(response){
                return response.data;
            }
            function errorGetData(error){
                return error;
            }
            return promise;
        }


           function getMisNegocios(){
                console.log("Mis negocios");
                var urlService = 'http://191.234.185.80/api/UsersPlaces/business?userId=' + LoopBackAuth.currentUserId + '&access_token=' + LoopBackAuth.accessTokenId ;

                var promise = $http.get(urlService)
                    .then(function(response){
                        console.log("Bieeeeen");
                        return response.data;
                    })
                    .catch(function(err){
                        console.log("Maaaalll");
                        console.log(err);
                        return err;
                    });
                return promise;
        }

    }

}());