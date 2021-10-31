$(document).ready(function(){
    $("#alerta").hide()
    traerInformacionClient()



    $("#actualizar").click(function(){
        editarClient()
    })
})

function traerInformacionClient(){
    $.ajax({
        url:"http://150.230.86.51:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClient(respuesta);
        }
    });
}

function pintarRespuestaClient(respuesta){

    let myTable="";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td><strong>"+respuesta[i].idClient+"</strong></td>";
        myTable+="<td><strong>"+respuesta[i].name+"</strong></td>";
        myTable+="<td><strong>"+respuesta[i].age+"</strong></td>";
        myTable+="<td><strong>"+respuesta[i].email+"</strong></td>";
        myTable+="<td><strong>"+respuesta[i].password+"</strong></td>";
        myTable+="<td>"+
        "<button class='btn btn-warning' data-toggle='modal' data-target='#myModal'"+
        "onclick=\"ver('"+respuesta[i].idClient+"','"+respuesta[i].name+"','"+respuesta[i].age+"','"+respuesta[i].email+"','"+respuesta[i].password+"')\""+
        ">Actualizar</button>"+
        "<button class='btn btn-danger ml-1' "+
        "onclick=\"eliminar('"+respuesta[i].idClient+"')\""+
        ">Eliminar</button>"+
        "</td>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);
}

function ver(idClient,name,age,email,password){   
    $("#idClient").val(idClient);
    $("#name").val(name);
    $("#age").val(age);
    $("#email").val(email);
    $("#password").val(password);
}

function editarClient(){

    let tabla={
        idClient:$("#idClient").val(),
        name:$("#name").val(),   
        age:$("#age").val(),
        email:$("#email").val(),
        password:$("#password").val()
    } 
    datajson=JSON.stringify(tabla)
    $.ajax({
        url:"http://150.230.86.51:8080/api/Client/update",
        type:'PUT',
        data:datajson,
        dataType:'json',
        contentType:"application/json",
        complete:function(data){
            console.log(data.status)
            let mensaje=""
            if(data.status=="201"){
                mensaje="Actualizo Cliente con Exito!!"
            }   
            else{
                mensaje="Problemas al actualizar en. \n Consulte con el Administrador"
            } 
            $("#alerta").show()
            $("#mensaje3").html(mensaje)
            traerInformacionClient()
            
        }
    })
}

function eliminar(id){

    $.ajax({

        url:"http://150.230.86.51:8080/api/Client/"+id,
        type:'DELETE',
        dataType:'json',
        contentType:"application/json",
        complete:function(data){
            traerInformacionClient()
            alert("Se ha borrado correctamente el cliente "+id)
            
        }
    })
}