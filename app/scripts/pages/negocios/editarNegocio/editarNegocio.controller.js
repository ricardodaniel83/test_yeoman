(function(){
    'use strict';

    angular
        .module('Urbamapp.main')
        .controller('editarNegocioCtrl', editarNegocioCtrl)

    editarNegocioCtrl.$inject = ['placeService', 'categoryService' , '$state', '$stateParams' ];
    
    function editarNegocioCtrl(placeService, categoryService, $state, $stateParams){
        var editarNegocio = this;
        editarNegocio.guardar = guardar;
        editarNegocio.cancelar = cancelar;
        editarNegocio.data = $stateParams.data;
        editarNegocio.agregarTag = agregarTag;
        editarNegocio.eliminarTag = eliminarTag;
        editarNegocio.agregarTelf = agregarTelf;
        editarNegocio.eliminarTelf = eliminarTelf;
        editarNegocio.newTag = "";
        editarNegocio.newTelf = "";
        editarNegocio.horaInicio = "";
        editarNegocio.horaSalida = "";
        editarNegocio.categorias;
        editarNegocio.categoriasN;
        editarNegocio.agregarDia = agregarDia;
        editarNegocio.agregarHorario = agregarHorario;
        editarNegocio.eliminarHorario = eliminarHorario;
        editarNegocio.actualizarRangoPrecios = actualizarRangoPrecios;
        editarNegocio.agregarServicio = agregarServicio;
        editarNegocio.eliminarServicio = eliminarServicio;

        editarNegocio.price = {
            min: "",
            max: ""
        }

        editarNegocio.servicioNuevo = {
            name: "",
            description: "",
            price: ""
        };

       editarNegocio.dias = [{
            nombre: 'Lu',
            check: false
        },
        {
            nombre: 'Ma',
            check: false
        },
        {
            nombre: 'Mi',
            check: false
        },
        {
            nombre: 'Ju',
            check: false
        },
        {
            nombre: 'Vi',
            check: false
        },
        {
            nombre: 'Sa',
            check: false
        },
        {
            nombre: 'Do',
            check: false
        }];
               

        editarNegocio.socialProfile = [{
            name: "facebook",
            href: "",
            icon: "facebook",
            id: "01"
            },
            {
            name: "twitter",
            href: "",
            icon: "twitter",
            id: "02"
            },
            {
            name: "instagram",
            href: "",
            icon: "instagram",
            id: "03"
        }];




        init();

        function init(){
            console.log("Aqui se edita place");
            console.log(editarNegocio.data)
            
            categoryService.getAll().then(function(categorias){
            console.log("Categorias");
            var i = categorias.indexOf(editarNegocio.data.categories[0].name);
            categorias.splice(i,1);
            editarNegocio.categorias = categorias;
            console.log(editarNegocio.categorias);
        });

            actualizarSocialProfile();
            actualizarRangoPrecios();

        }

        function agregarTag(){
            console.log("Agregando Tag");
            if(editarNegocio.newTag != ""){
                console.log("Agregando Tag: ", editarNegocio.newTag);
                editarNegocio.data.tags.push({name: editarNegocio.newTag});
                editarNegocio.newTag = "";
            }
        }

        function eliminarTag(tag){
            console.log(tag);
            var i = editarNegocio.data.tags.indexOf(tag);
            editarNegocio.data.tags.splice(i,1);
            console.log("Tag deleted");
        }


       function agregarTelf(){
            console.log("Agregando Telf");
            if(editarNegocio.newTelf != ""){
                console.log("Agregando Telf: ", editarNegocio.newTelf);
                editarNegocio.data.telephones.push(editarNegocio.newTelf);
                editarNegocio.newTelf = "";
            }
        }

        function eliminarTelf(telf){
            console.log(telf);
            var i = editarNegocio.data.telephones.indexOf(telf);
            editarNegocio.data.telephones.splice(i,1);
            console.log("Telf deleted");
        }


                // Agregar o remover dias del objeto
        function agregarDia(dia){
            console.log(dia);
            switch (dia) {
                // Dia Lunes
                case 'lunes':
                    editarNegocio.dias[0].check ? editarNegocio.dias[0].check = false : editarNegocio.dias[0].check = true;
                break;
                
                // Dia Martes
                case 'martes': 
                    editarNegocio.dias[1].check ? editarNegocio.dias[1].check = false : editarNegocio.dias[1].check = true;
                break;

                //Dia Miercoles
                case 'miercoles':
                    editarNegocio.dias[2].check ? editarNegocio.dias[2].check = false : editarNegocio.dias[2].check = true;
                break;

                //Dia Jueves
                case 'jueves':
                    editarNegocio.dias[3].check ? editarNegocio.dias[3].check = false : editarNegocio.dias[3].check = true;
                break;

                //Dia Viernes
                case 'viernes':
                    editarNegocio.dias[4].check ? editarNegocio.dias[4].check = false : editarNegocio.dias[4].check = true;
                break;

                //Dia Sabado
                case 'sabado':
                    editarNegocio.dias[5].check ? editarNegocio.dias[5].check = false : editarNegocio.dias[5].check = true;
                break;

                //Dia Domingo
                case 'domingo':
                    editarNegocio.dias[6].check ? editarNegocio.dias[6].check = false : editarNegocio.dias[6].check = true;
                break;  

                default:
                    break;
            }

            console.log(editarNegocio.dias);
        }


        function agregarHorario(){
            if (editarNegocio.horaInicio === "" || editarNegocio.horaSalida === ""){
                console.log("Vacio");
                }
            else{
                var diasSeleccionados = [];
                var horas = [];
                angular.forEach(editarNegocio.dias, function(dia, indice){
                    if(dia.check === true){
                    diasSeleccionados.push(dia.nombre);
                    }
                });

                var dias = diasSeleccionados.toString();
                
                dias === "Lu,Ma" ? dias = "Lu-Ma" : console.log("Error en dia");
                dias === "Lu,Ma,Mi" ? dias = "Lu-Mi" : console.log("Error en dia");
                dias === "Lu,Ma,Mi,Ju" ? dias = "Lu-Ju" : console.log("Error en dia");
                dias === "Lu,Ma,Mi,Ju,Vi" ? dias = "Lu-Vi" : console.log("Error en dia");
                dias === "Lu,Ma,Mi,Ju,Vi,Sa" ? dias = "Lu-Sa" : console.log("Error en dia");
                dias === "Lu,Ma,Mi,Ju,Vi,Sa,Do" ? dias = "Lu-Do" : console.log("Error en dia");
                dias === "Sa,Do" ? dias = "Sa-Do" : console.log("Error en dia");
                dias === "Ma,Mi" ? dias = "Ma-Mi" : console.log("Error en dia");
                dias === "Ma,Mi,Ju" ? dias = "Ma-Ju" : console.log("Error en dia");
                dias === "Ma,Mi,Ju,Vi" ? dias = "Ma-Vi" : console.log("Error en dia");
                dias === "Ma,Mi,Ju,Vi,Sa" ? dias = "Ma-Sa" : console.log("Error en dia");
                dias === "Ma,Mi,Ju,Vi,Sa,Do" ? dias = "Ma-Do" : console.log("Error en dia");
                dias === "Mi,Ju" ? dias = "Mi-Ju" : console.log("Error en dia");
                dias === "Mi,Ju,Vi" ? dias = "Mi-Vi" : console.log("Error en dia");
                dias === "Mi,Ju,Vi,Sa" ? dias = "Mi-Sa" : console.log("Error en dia");
                dias === "Mi,Ju,Vi,Sa,Do" ? dias = "Mi-Do" : console.log("Error en dia");
                dias === "Ju,Vi" ? dias = "Ju-Vi" : console.log("Error en dia");
                dias === "Ju,Vi,Sa" ? dias = "Ju-Sa" : console.log("Error en dia");
                dias === "Ju,Vi,Sa,Do" ? dias = "Ju-Do" : console.log("Error en dia");
                dias === "Vi,Sa" ? dias = "Vi-Sa" : console.log("Error en dia");
                dias === "Vi,Sa,Do" ? dias = "Vi-Do" : console.log("Error en dia");
                dias === "Sa,Do" ? dias = "Sa-Do" : console.log("Error en dia");

                console.log('Dias:');
                console.log(dias);
                editarNegocio.data._time_table.push({days:dias, start: editarNegocio.horaInicio, end: editarNegocio.horaSalida});
                console.log("Horario");
                console.log(editarNegocio.data);
                reiniciarVariablesHorario();
            }
        }





        function eliminarHorario(horario){
            var index = editarNegocio.data._time_table.indexOf(horario);
            editarNegocio.data._time_table.splice(index,1);
            console.log(editarNegocio.data._time_table);
        }

        function reiniciarVariablesHorario(){
            angular.forEach(editarNegocio.dias, function(dia, indice){
                if(dia.check === true){
                    dia.check = false;
                }
            });

            editarNegocio.horaInicio = "";
            editarNegocio.horaSalida = "";
        }


        function actualizarSocialProfile(){
            editarNegocio.data._social_profiles[0] != null ? editarNegocio.socialProfile[0].href = editarNegocio.data._social_profiles[0].href : editarNegocio.socialProfile[0].href = "";
            editarNegocio.data._social_profiles[1] != null ? editarNegocio.socialProfile[1].href = editarNegocio.data._social_profiles[1].href : editarNegocio.socialProfile[1].href = "";
            editarNegocio.data._social_profiles[2] != null ? editarNegocio.socialProfile[2].href = editarNegocio.data._social_profiles[2].href : editarNegocio.socialProfile[2].href = "";
        }

       function actualizarRangoPrecios(){
            editarNegocio.data.price_range[0] != null ? editarNegocio.price.min = editarNegocio.data.price_range[0] : editarNegocio.price.min = "";
            editarNegocio.data.price_range[1] != null ? editarNegocio.price.max = editarNegocio.data.price_range[1] : editarNegocio.price.max = "";
        }




       function agregarServicio(){
            if(editarNegocio.servicioNuevo.name === "" || editarNegocio.servicioNuevo.description === "" || editarNegocio.servicioNuevo.prrice === ""){
                    console.log("Servicio Vacio");
            }
            else{
                console.log("Añadiendo Servicios:");
                editarNegocio.data._services.push({name: editarNegocio.servicioNuevo.name, description: editarNegocio.servicioNuevo.description, price: editarNegocio.servicioNuevo.price});
                editarNegocio.data.services = editarNegocio.servicios;
                console.log(editarNegocio.data._services);
                reiniciarVariablesServicios();
            }
        }


       function eliminarServicio(servicio){
            var index = editarNegocio.data._services.indexOf(servicio);
            editarNegocio.data._services.splice(index,1);
            console.log(editarNegocio.data._services);
        }

        function reiniciarVariablesServicios(){
            editarNegocio.servicioNuevo.name = "";
            editarNegocio.servicioNuevo.description = "";
            editarNegocio.servicioNuevo.price = ""
        }


        function guardar(){
            console.log("Guardando");
            console.log('antes de enviar');
            console.log(editarNegocio.data);


            var data = [];
            data[0] = editarNegocio.data;


            console.log("Estas son las redes sociales");
            console.log(editarNegocio.socialProfile);
            

            if (data[0].hasOwnProperty('price_range')){
                data[0].price_range = [];
            }
            data[0].price_range.push(editarNegocio.price.min);
            data[0].price_range.push(editarNegocio.price.max);


            if (data[0].hasOwnProperty('_social_profiles')){
                    data[0]._social_profiles = [];
            }
            
            data[0]._social_profiles.push({
                    name: editarNegocio.socialProfile[0].name,
                    href: editarNegocio.socialProfile[0].href,
                    icon: editarNegocio.socialProfile[0].icon,
                    id: editarNegocio.socialProfile[0].id
                },
                {
                    name: editarNegocio.socialProfile[1].name,
                    href: editarNegocio.socialProfile[1].href,
                    icon: editarNegocio.socialProfile[1].icon,
                    id: editarNegocio.socialProfile[1].id
                },
                {
                    name: editarNegocio.socialProfile[2].name,
                    href: editarNegocio.socialProfile[2].href,
                    icon: editarNegocio.socialProfile[2].icon,
                    id: editarNegocio.socialProfile[2].id
                });

                 angular.forEach(editarNegocio.servicios, function(item){
                data[0]._services.push({name: item.name, description: item.description, price: item.price});
            });

            if (data[0].hasOwnProperty('created')){
                delete data[0].created;
            }
            console.log(data[0]);
         

           if (data[0].hasOwnProperty('view_count')){
                delete data[0].view_count;
            }
           if (data[0].hasOwnProperty('lastUpdated')){
                delete data[0].lastUpdated;
            }
            angular.forEach(data[0]._time_table, function(item){
                delete item.$$hashKey;
            });

            angular.forEach(data[0]._services, function(item){
                delete item.$$hashKey;
            });
            console.log(data[0]);
            delete data[0].favorite_count;
            delete data[0].shared_count;
            delete data[0].recommended_count;
            //delete data[0].tags;
            //delete data[0].categories;
            placeService.actualizar(data).then(function(respuesta){
                console.log('actualizado: '+ respuesta);
                $state.go('main.detallesNegocio', {idNegocio: editarNegocio.data.id});
            }).catch(function(error){
                console.log('hubo un error: '+error);
            });



        }

        function cancelar(){
            $state.go('main.detallesNegocio', {idNegocio: editarNegocio.data.id});
        }


    }

}());