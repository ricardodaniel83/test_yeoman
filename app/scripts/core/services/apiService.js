(function(){
    'use strict';

    angular
        .module('Urbamapp.service')
        .factory('UrbamappApi', UrbamappApi)


    UrbamappApi.$inject = ['$window'];

    /** @ngInject */
    function UrbamappApi($window){
       //var urlServidor = 'http://192.168.1.16:3333/'; //local
            var urlServidor = 'http://191.234.185.80/'; //developmnet
            //var urlServidor = 'http://191.235.91.22/'; //production
            var urlApi = urlServidor + 'api/';

            var userTokken;
            var urlTokken;        
            var apiUserId;
            var apiUserRole;

            return {
                apiTemp: apiTemp,
                getApiUrl: getApiUrl,
                getTokken: getTokken,
                userDataApi: userDataApi,
                getUserId: getUserId,
                userLogOut: userLogOut,
                getFavorites: getFavorites,
                geturlServidor: geturlServidor,
                updateUser: updateUser,
                setTokken: setTokken,
                setUserId: setUserId,
                setUserRole: setUserRole,
                getUserRole: getUserRole,
                getHeader: getHeader
            }

            function setTokken(tokken){
                userTokken = tokken;
            }

            function setUserId(userId){
                console.log('apiService: '+ userId);
                apiUserId = userId;
            }

            function setUserRole(userRole){
                console.log('User Role: '+ userRole);
                apiUserRole = userRole;
            }


            function geturlServidor(){
                return urlServidor;
            }

            function getApiUrl(){
                return urlApi;
            }        

            function apiTemp(name){            
                var finalUrl = urlApi + name;
                console.log(finalUrl);
                return finalUrl;
            }    

            function getTokken(){
                return userTokken;
            }

            function getUserId(){
                return apiUserId;
            }

            function getUserRole(){
                return apiUserRole;
            }

            function userDataApi(ext){
                //var url = urlApi + ext + apiUserId + '?access_token=' + userTokken;
                var url = urlApi + ext;
                console.log("User Data Api: ",url);
                return url;
            }

            function userLogOut(ext){
                var url = urlApi + ext + '?access_token=' + userTokken;
                console.log("User Data Api: ",url);
                return url;
            }   

            function updateUser(ext){
                console.log("Entro en API Service");
                var url = urlApi + ext + apiUserId;
                return url;
            }

            function getFavorites(){
                var url = urlApi + "UsersPlaces/favorites";
                return url
            }

            function getHeader(){

                var parseHeaders = {
                    'Content-Type': 'application/json',
                    'Authorization': getTokken()
                };

                var header = {headers: parseHeaders};
                return header;
            }

        }

}());