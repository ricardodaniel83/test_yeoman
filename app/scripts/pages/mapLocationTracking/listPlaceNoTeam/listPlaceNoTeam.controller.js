angular
  .module('Urbamapp.main')
  .controller('listNoTeamCtrl',listNoTeamCtrl);

  listNoTeamCtrl.$inject = ['LoopBackAuth', 'Team', 'Place', 'User','UserPlace','$uibModal'];

  function  listNoTeamCtrl(LoopBackAuth, Team, Place , User, UserPlace, $uibModal){
        var listNoTeam = this;
        listNoTeam.user = [];
        listNoTeam.todosUser = [];
        listNoTeam.userTeam =[];
        listNoTeam.listTeams = [];

        listNoTeam.modalViewPlace = modalViewPlace;

        init();

        function  init(){
            searchUserNoTeam();
        }

        function searchUserNoTeam(){
            Team.without().$promise
                  .then(function(value, responseHeaders){
                      listNoTeam.user  = value.users;
                  });
        }

        function modalViewPlace(item){

              var modalInstance = $uibModal.open({
                      animation: true,
                      templateUrl:'scripts/pages/mapLocationTracking/listPlaceNoTeam/viewModalPlaceUser.html',
                      controller:'viewModalPlaceUserCtrl',
                      controllerAs:'viewModalPlaceUser',
                      size: 'lg',
                      resolve: {
                        data:{
                          idUser:item.id,
                          item:item,
                        }
                    }
                });
                modalInstance.result.then(function (result) {

                });
        }
  }
