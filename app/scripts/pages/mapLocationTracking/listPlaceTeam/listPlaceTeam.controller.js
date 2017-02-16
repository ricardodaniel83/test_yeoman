(function(){
    'use strict';

    angular
        .module('Urbamapp.main')
        .controller('listPlaceTeamCtrl', listPlaceTeamCtrl);
        listPlaceTeamCtrl.$inject = ['LoopBackAuth','UserPlace', 'Team', 'Place','$stateParams','$state','$uibModal','$q','$filter','urlImg'];

        function listPlaceTeamCtrl(LoopBackAuth, UserPlace, Team, Place, $stateParams, $state, $uibModal, $q, $filter, urlImg ){
          var listPlaceTeam = this;
          listPlaceTeam.params = $stateParams;
          listPlaceTeam.url = urlImg;
          listPlaceTeam.users = [];
          listPlaceTeam.listPlace =[];
          listPlaceTeam.listVerify = [{id:'',name:'Todos'},{id:'01',name:'Aprobados'},{id:'00',name:'Revisar'}];
          listPlaceTeam.selctVerify = listPlaceTeam.listVerify[0];
          listPlaceTeam.selectUser = '';
          listPlaceTeam.verifyPlace = verifyPlace;
          listPlaceTeam.viewPlace = viewPlace;
          listPlaceTeam.init = init;
          listPlaceTeam.filterPlaceUser = filterPlaceUser;
          listPlaceTeam.listUserCategory = [
                {
                  idUser:"582646b61a36c43a3ffab115",
                  idCategory:"1001"
                },
                {
                  idUser:"587bd534265f0e959134a8a4",
                  idCategory:"1002"
                }
          ];
          listPlaceTeam.filterUserCategory ={};


          init();
          //filterPlace();
          function init(){
            if(listPlaceTeam.params.idTeam == null)
              $state.go('main.listTeam');
            viewCategoryUser().then(function(valor){
                  listPlaceTeam.filterUserCategory = valor;

                  var filter ={
                        teamId:listPlaceTeam.params.idTeam,
                        member:true
                  }
                  searchUsersTeam(filter);

            });

          }


          function viewCategoryUser(){
            var result = null;
            var defered = $q.defer();
            var promise = defered.promise;
              angular.forEach(listPlaceTeam.listUserCategory, function(item){
                  if( item.idUser == LoopBackAuth.currentUserId)
                      result = item;
              });
              defered.resolve(result );
              return promise;
          }

          function searchUsersTeam(filter){
            Team.filterTeam(filter).$promise
                    .then(function(value, responseHeaders){
                      listPlaceTeam.users = value;
                      if(listPlaceTeam.users.length > 0)
                          searchPlacesUser(listPlaceTeam.users[0].user.id,0);
                    });
          };

          function  searchPlacesUser(userId, count){
            listPlaceTeam.users[count] .verificados =0
            listPlaceTeam.users[count].numPlace =0
            listPlaceTeam.users[count].user.principalUrl = angular.isUndefined(listPlaceTeam.users[count].user.principalUrl) ? "../../../img/nofoto.png" : listPlaceTeam.url + listPlaceTeam.users[count].user.principalUrl +"?access_token=" + LoopBackAuth.accessTokenId;
              UserPlace.getMapped({userId: userId}).$promise
                           .then(function(listPlace,responseHeaders){
                              angular.forEach(listPlace.places,function(itemPlace, index){

                                if(angular.isUndefined(itemPlace.place) !== true){
                                      itemPlace.place.principalUrl = angular.isUndefined(itemPlace.place.principalUrl) ? "../../../img/camara.png" : listPlaceTeam.url + itemPlace.place.principalUrl +"?access_token=" + LoopBackAuth.accessTokenId;
                                      itemPlace.place.user ='';
                                      angular.forEach(listPlaceTeam.params.obj.users, function(user){
                                          if(user.id == itemPlace.userId)
                                            itemPlace.place.user = user;
                                      });


                                      if(listPlaceTeam.filterUserCategory){
                                          if(angular.isUndefined(itemPlace.place.categories) !== true )
                                              if(itemPlace.place.categories[0].id == listPlaceTeam.filterUserCategory.idCategory)
                                                listPlaceTeam.listPlace.push(itemPlace);
                                      } else{
                                         if(itemPlace.place.statusId == '01')
                                            listPlaceTeam.users[count] .verificados ++;

                                         listPlaceTeam.users[count].numPlace ++;
                                         listPlaceTeam.listPlace.push(itemPlace);
                                      }
                                }
                              })
                              if(count >= (listPlaceTeam.users.length - 1)){
                                  console.log(listPlaceTeam.listPlace);
                                return;
                              }
                              else{
                                count++;
                                if(angular.isUndefined(listPlaceTeam.users[count].user)) count++;
                                searchPlacesUser(listPlaceTeam.users[count].user.id, count);
                              }
                           });
          };



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

        function filterPlaceUser(user){
            listPlaceTeam.selectUser = user.id
        }
    }

}());
