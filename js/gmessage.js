$(document).ready(function(){
    $("#alerta").hide()
    $("#guardar").click(function(){
        
        guardarInformacionMessage()
    })

    $("#alerta").click(function(){
        $("#alerta").hide()
    })
    
})

function guardarInformacionMessage(){
    let var3 = {
        idMessage:$("#idMessage").val(),
        messageText:$("#messageText").val(),
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var3),
        
        url:"http://150.230.86.51:8080/api/Message/save",
       
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");    
        }
        });
}