(function(){
    'use strict';

    angular
        .module('Urbamapp.modelos')
        .factory('placeModel', placeModel);
    
    placeModel.$inject = ['UrbamappApi', 'LoopBackAuth'];

    /** @ngInject */
    function placeModel(UrbamappApi, LoopBackAuth){
        var token = LoopBackAuth.accessTokenId;

        return {
            build: build,
            estandariza: estandariza,
            forUpdateFotos: forUpdateFotos 
        }

        function build(data){
            if(!data){ return null; }
           /* console.log("Data");
            console.log(data.place);*/
            var lugar = {
                id: data.id,
                name: data.name,
                lastUpdated: data.lastUpdated,
                urlPortada:  checkPrincipalUrl(data)
            };

            if (angular.isUndefined(data.categories) === true || data.categories.length === 0){
                lugar.categories = [{name: 'otros'}];
            }else {
                lugar.categories = data.categories
            }

            return lugar;
        }

        function checkPrincipalUrl(data){
            if (angular.isUndefined(data.principalUrl) === true || data.principalUrl === ''){
                return 'https://placeholdit.imgix.net/~text?txtsize=33&txt=Urbamapp&w=200&h=200';
            }else{
                return UrbamappApi.geturlServidor() + data.principalUrl + "?access_token=" + token;
            }
        }

        function estandariza(data){
            if(angular.isArray(data)){
                return data.map(build).filter(Boolean);
            }

            return build(data);
        }

        function forUpdateFotos(data){
            var fotosUpdate = [];
            angular.forEach(data, function(foto, indice){
                fotosUpdate.push({id:foto.id, statusId:foto.statusId, principal: foto.principal});
            });
            return fotosUpdate;
        }

    }

}());