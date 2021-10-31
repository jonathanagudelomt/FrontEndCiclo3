$(document).ready(function(){
    $("#alerta").hide()
    traerInformacionAuditorios()



    $("#actualizar").click(function(){
        editarAudience()
    })
})

function traerInformacionAuditorios(){
    $.ajax({
        url:"http://150.230.86.51:8080/api/Audience/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaAuditorios(respuesta);
        }
    });
}

function pintarRespuestaAuditorios(respuesta){

    let myTable="";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td><strong>"+respuesta[i].id+"</strong></td>";
        myTable+="<td><strong>"+respuesta[i].name+"</strong></td>";
        myTable+="<td><strong>"+respuesta[i].owner+"</strong></td>";
        myTable+="<td><strong>"+respuesta[i].capacity+"</strong></td>";
        myTable+="<td><strong>"+respuesta[i].description+"</strong></td>";
        myTable+="<td>"+
        "<button class='btn btn-warning' data-toggle='modal' data-target='#myModal'"+
        "onclick=\"ver('"+respuesta[i].id+"','"+respuesta[i].name+"','"+respuesta[i].owner+"','"+respuesta[i].capacity+"','"+respuesta[i].description+"')\""+
        ">Actualizar</button>"+
        "<button class='btn btn-danger ml-1' "+
        "onclick=\"eliminar('"+respuesta[i].id+"')\""+
        ">Eliminar</button>"+
        "</td>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}
function ver(id,name,owner,capacity,description){   
    $("#id").val(id)
    $("#name").val(name)
    $("#owner").val(owner)
    $("#capacity").val(capacity)
    $("#description").val(description)
}

function editarAudience(){

    let audience={
        id:$("#id").val(),
        name:$("#name").val(),
        owner:$("#owner").val(),
        capacity:$("#capacity").val(),
        description:$("#description").val()
    }
    
    datajson=JSON.stringify(audience)
   
    $.ajax({

        url:"http://150.230.86.51:8080/api/Audience/update",
        type:'PUT',
        data:datajson,
        dataType:'json',
        contentType:"application/json",
        complete:function(data){
            console.log(data.status)
            let mensaje=""
            if(data.status=="201"){
                mensaje="Actualizo Auditorio con Exito!!"
            }   
            else{
                mensaje="Problemas al Actualizar en BD consulte con el Administrador"
            }
            
            $("#alerta").show()
            $("#mensaje").html(mensaje)
            traerInformacionAuditorios()
            
        }

    })



}


function eliminar(id){

    $.ajax({

        url:"http://150.230.86.51:8080/api/Audience/"+id,
        type:'DELETE',
        dataType:'json',
        contentType:"application/json",
        complete:function(data){
         
            traerInformacionAuditorios()
            alert("Se ha borrado correctamente el auditorio "+id)
            
        }

    })
   
}



