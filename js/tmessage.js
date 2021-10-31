$(document).ready(function(){
    $("#alerta").hide()
    traerInformacionMessage()



    $("#actualizar").click(function(){
        editarMessage()
    })
})

function traerInformacionMessage(){
    $.ajax({
        url:"http://150.230.86.51:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMessage(respuesta);
        }
    });
}

function pintarRespuestaMessage(respuesta){

    let myTable="";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td><strong>"+respuesta[i].idMessage+"</strong></td>";
        myTable+="<td><strong>"+respuesta[i].messageText+"</strong></td>";
        myTable+="<td>"+
        "<button class='btn btn-warning' data-toggle='modal' data-target='#myModal'"+
        "onclick=\"ver('"+respuesta[i].idMessage+"','"+respuesta[i].messageText+"')\""+
        ">Actualizar</button>"+
        "<button class='btn btn-danger ml-1' "+
        "onclick=\"eliminar('"+respuesta[i].idMessage+"')\""+
        ">Eliminar</button>"+
        "</td>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado5").html(myTable);
}

function ver(idMessage,messageText){   
    $("#idMessage").val(idMessage);
    $("#messageText").val(messageText);
}

function editarMessage(){

    let tabla={
        idMessage:$("#idMessage").val(),
        messageText:$("#messageText").val(),
    } 
    datajson=JSON.stringify(tabla)
    $.ajax({
        url:"http://150.230.86.51:8080/api/Message/update",
        type:'PUT',
        data:datajson,
        dataType:'json',
        contentType:"application/json",
        complete:function(data){
            console.log(data.status)
            let mensaje=""
            if(data.status=="201"){
                mensaje="¡Actualizo mensaje con exito!"
            }   
            else{
                mensaje="Problemas al actualizar en. \n Consulte con el Administrador"
            } 
            $("#alerta").show()
            $("#mensaje4").html(mensaje)
            traerInformacionMessage()
            
        }
    })
}

function eliminar(idMessage){

    $.ajax({

        url:"http://150.230.86.51:8080/api/Message/"+idMessage,
        type:'DELETE',
        dataType:'json',
        contentType:"application/json",
        complete:function(data){
            traerInformacionMessage()
            alert("Se ha borrado correctamente el Message "+idMessage)
            
        }
    })
}