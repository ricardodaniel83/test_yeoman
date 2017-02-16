angular
    .module('Urbamapp.main')
    .controller('listTeamCategoryCtrl', listTeamCategoryCtrl);

    listTeamCategoryCtrl.$inject = ['LoopBackAuth', 'Team', 'Place', 'Category','UserPlace'];

    function listTeamCategoryCtrl(LoopBackAuth, Team, Place , Category, UserPlace){
        var listTeamCategory = this;
        listTeamCategory.listCategory =[];
        listTeamCategory.selectCategory ={};
        listTeamCategory.listTeam =[];
        listTeamCategory.userTeam =[];
        listTeamCategory.loadUserCategory = loadUserCategory;
        listTeamCategory.orderBy = orderBy;
        listTeamCategory.datoOrder = {};

        init();
        function init(){
            searchCategory();

        }

        function searchCategory(){
          Category.find().$promise
             .then(function(value, responseHeaders){
                 listTeamCategory.listCategory = value;
                 listTeamCategory.selectCategory = listTeamCategory.listCategory[0];
                 searchTeams();
             });
        }

        function searchTeams(){
          Team.find().$promise
             .then(function(value, responseHeaders){
                listTeamCategory.listTeams = value;
                if(listTeamCategory.listTeams.length > 0)
                   searchUsersTeam(listTeamCategory.listTeams[0],0);

             });
        }

        function searchUsersTeam(item, count){
           var filter ={teamId:item.id,member:true};
           Team.filterTeam(filter).$promise
                   .then(function(value, responseHeaders){
                     angular.forEach(value, function(userTeam, index){
                       if(angular.isUndefined(userTeam.user) !== true){
                           userTeam.user.teamName = item.name;
                           listTeamCategory.userTeam.push(userTeam.user);
                       }
                     });
                     if(count >= (listTeamCategory.listTeams.length - 1)){
                        if(listTeamCategory.userTeam.length > 0)
                              searchPlaceCategory(listTeamCategory.userTeam[0],0)
                       return;
                     }
                     else{
                       count++;
                       searchUsersTeam(listTeamCategory.listTeams[count], count);
                     }
                 });

        }


        function searchPlaceCategory(user, count){
            user.verificados = 0;
            user.numPlace = 0;
            UserPlace.getMapped({userId: user.id}).$promise
                 .then(function(listPlace,responseHeaders){
                   angular.forEach(listPlace.places,function(itemPlace){
                      if(angular.isUndefined(itemPlace.place) !== true ){
                        if(angular.isUndefined(itemPlace.place.categories) !== true && itemPlace.place.categories.length > 0 && itemPlace.place.categories[0].id == listTeamCategory.selectCategory.id){
                          if(itemPlace.place.statusId == '01')
                             user.verificados ++;

                          user.numPlace ++;
                        }
                      }
                   });

                    if(count >= listTeamCategory.userTeam.length -1){
                        console.log("userTeam",listTeamCategory.userTeam);
                        return ;
                    }else{
                      count ++;
                      searchPlaceCategory(listTeamCategory.userTeam[count],count);
                    }


                 });
        }

        function loadUserCategory(){
            listTeamCategory.userTeam =[];
            searchTeams()
        }

        function orderBy(campo){
            listTeamCategory.datoOrder = campo;
        }

    }
