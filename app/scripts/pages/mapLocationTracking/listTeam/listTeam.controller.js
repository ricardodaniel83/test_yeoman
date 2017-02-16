(function(){
    'use strict';

    angular
        .module('Urbamapp.main')
        .controller('listTeamCtrl', listTeamCtrl);
        listTeamCtrl.$inject = ['$state','LoopBackAuth','Place', 'Team','urlImg'];
        /** @ngInject */
        function listTeamCtrl($state,LoopBackAuth, Place, Team, urlImg){
           var listTeam = this;
           listTeam.listTeams =[];
           listTeam.listUserTeam=[];
           listTeam.titulo = 'Seguimiento de Place';
           listTeam.url = urlImg;
           listTeam.viewPlaceTeam = viewPlaceTeam;
           listTeam.viewPlaceUser = viewPlaceUser;

           init();

           function init(){
             searchTeams();
           }

           function searchTeams(){
             Team.find().$promise
                .then(function(value, responseHeaders){
                  angular.forEach(value, function(item, index){
                      item.principalUrl = angular.isUndefined(item.principalUrl) ? "../../../img/nofoto.png" : listTeam.url + item.principalUrl +"?access_token=" + LoopBackAuth.accessTokenId;
                  });
                   listTeam.listTeams = value;
                   if(listTeam.listTeams.length > 0)
                      searchUsersTeam(listTeam.listTeams[0],0);

                })
           }
           function searchUsersTeam(item, count){
              var filter ={teamId:item.id,member:true};
              Team.filterTeam(filter).$promise
                      .then(function(value, responseHeaders){
                        var listUser = [];
                        var totalVerify = 0;
                        angular.forEach(value, function(userTeam, index){

                          if(angular.isUndefined(userTeam.user) !== true){
                              userTeam.user.principalUrl = angular.isUndefined(userTeam.user.principalUrl) ? "../../../img/nofoto.png" : listTeam.url + userTeam.user.principalUrl +"?access_token=" + LoopBackAuth.accessTokenId;

                              if(angular.isUndefined(userTeam.user._profile) !== true && angular.isUndefined(userTeam.user._profile.created_count) !== true)
                                totalVerify = totalVerify + parseInt(userTeam.user._profile.created_count);

                              listUser.push(userTeam.user);
                          }
                        });
                        listTeam.listTeams[count].users = listUser;
                        listTeam.listTeams[count].totalVerify = totalVerify;
                        if(count >= (listTeam.listTeams.length - 1)){

                          return;
                        }
                        else{
                          count++;
                          searchUsersTeam(listTeam.listTeams[count], count);
                        }
                    });

           }


            function viewPlaceTeam(item){

                $state.go('main.listPlaceTeam', {idTeam: item.id,idUser:null,obj:item});
            }

            function viewPlaceUser(item, idUser){
              console.log(userTeam.user);
              //$state.go('main.listPlaceTeam', {idTeam: item.id, idUser:idUser});
            }



        }

}());
