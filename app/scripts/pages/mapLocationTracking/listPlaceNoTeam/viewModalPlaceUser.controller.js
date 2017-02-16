(function(){
    'use strict';

    angular
        .module('Urbamapp.main')
        .controller('viewModalPlaceUserCtrl', viewModalPlaceUserCtrl);
        viewModalPlaceUserCtrl.$inject = ['$uibModalInstance','$uibModal', 'data', 'LoopBackAuth','UserPlace','Place','urlImg'];
        function viewModalPlaceUserCtrl($uibModalInstance, $uibModal, data, LoopBackAuth, UserPlace, Place,  urlImg){
            var viewModalPlaceUser = this;
            viewModalPlaceUser.listPlace =[];
            viewModalPlaceUser.data = data;
            viewModalPlaceUser.url = urlImg;
            viewModalPlaceUser.listVerify = [{id:'',name:'Todos'},{id:'01',name:'Aprobados'},{id:'00',name:'Revisar'}];
            viewModalPlaceUser.selctVerify = viewModalPlaceUser.listVerify[0];
            viewModalPlaceUser.viewPlace = viewPlace;
            viewModalPlaceUser.verifyPlace = verifyPlace;
            viewModalPlaceUser.numPlace = 0;
            viewModalPlaceUser.verificados = 0;



            init();
            function init(){
                searchPlace(viewModalPlaceUser.data.idUser);
            }

            function searchPlace(idUser){
              UserPlace.getMapped({userId:idUser}).$promise
                    .then(function(listPlace,responseHeaders){
                        angular.forEach(listPlace.places, function(itemPlace){
                              if(angular.isUndefined(itemPlace.place) !== true){
                                  itemPlace.place.principalUrl = angular.isUndefined(itemPlace.place.principalUrl) ? "../../../img/camara.png" : viewModalPlaceUser.url  + itemPlace.place.principalUrl +"?access_token=" + LoopBackAuth.accessTokenId;
                                  if(itemPlace.place.statusId == '01')
                                     viewModalPlaceUser.verificados ++;

                                  viewModalPlaceUser.numPlace ++;
                                  viewModalPlaceUser.listPlace.push(itemPlace);
                              }
                        });
                          console.log("place",viewModalPlaceUser.listPlace);
                    });
            }

            function  verifyPlace(item){
              var filter = {
                placeId:item.placeId,
                editorId:LoopBackAuth.currentUserId
              };

              Place.verify(filter).$promise
                      .then(function(valor,responseHeaders){
                         item.place.statusId ='01';
                      });
            }

            function viewPlace(item){

              var modalInstance = $uibModal.open({
                          animation: true,
                          templateUrl:'scripts/pages/negocios/detallesNegocio/viewPlacesPopup.html',
                          controller:'viewPlacePopupCtrl',
                          controllerAs:'detallesNegocio',
                          size: 'lg',
                          resolve: {
                            data:{
                              idNegocio:item.placeId,
                              urlImg :urlImg,
                            }
                        }
                    });
                    modalInstance.result.then(function (result) {
                        if(result.tipo == 'approve') verifyPlace(item);
                        if(result.tipo == 'edit') editPlace(result.data);
                    });
          }

          function editPlace(item){
            var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl:'scripts/pages/negocios/editarNegocio/editPlacePopup.html',
                        controller:'editPlacePopupCtrl',
                        controllerAs:'editarNegocio',
                        size: 'lg',
                        resolve: {
                          data:{
                            objeto:item,
                          }
                      }
                  });
                  modalInstance.result.then(function (result) {
                      viewPlace(result);
                  });
          }




        }


}());
