$(document).ready(function(){
    $("#alerta").hide()
    traerInformacionCategorias()



    $("#actualizar").click(function(){
        editarCategory()
    })
})

function traerInformacionCategorias(){
    $.ajax({
        url:"http://150.230.86.51:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaCategorias(respuesta);
        }
    });
}

function pintarRespuestaCategorias(respuesta){

    let myTable="";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td><strong>"+respuesta[i].id+"</strong></td>";
        myTable+="<td><strong>"+respuesta[i].name+"</strong></td>";
        myTable+="<td><strong>"+respuesta[i].description+"</strong></td>";
        myTable+="<td>"+
        "<button class='btn btn-warning' data-toggle='modal' data-target='#myModal'"+
        "onclick=\"ver('"+respuesta[i].id+"','"+respuesta[i].name+"','"+respuesta[i].description+"')\""+
        ">Actualizar</button>"+
        "<button class='btn btn-danger ml-1' "+
        "onclick=\"eliminar('"+respuesta[i].id+"')\""+
        ">Eliminar</button>"+
        "</td>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}

function ver(id,name,description){   
    $("#id").val(id)
    $("#name").val(name)
    $("#description").val(description)
}

function editarCategory(){

    let tabla={
        id:$("#id").val(),
        name:$("#name").val(),
        description:$("#description").val()
    } 
    datajson=JSON.stringify(tabla)
    $.ajax({
        url:"http://150.230.86.51:8080/api/Category/update",
        type:'PUT',
        data:datajson,
        dataType:'json',
        contentType:"application/json",
        complete:function(data){
            console.log(data.status)
            let mensaje=""
            if(data.status=="201"){
                mensaje="Actualizo Categoria con Exito!!"
            }   
            else{
                mensaje="Problemas al actualizar en. \n Consulte con el Administrador"
            } 
            $("#alerta").show()
            $("#mensaje2").html(mensaje)
            traerInformacionCategorias()
            
        }
    })
}

function eliminar(id){

    $.ajax({

        url:"http://150.230.86.51:8080/api/Category/"+id,
        type:'DELETE',
        dataType:'json',
        contentType:"application/json",
        complete:function(data){
            traerInformacionCategorias()
            alert("Se ha borrado correctamente la categoria "+id)
            
        }
    })
}