$(document).ready(function(){
    $("#alerta").hide()
    $("#guardar").click(function(){
        
        guardarInformacionReservation()
    })

    $("#alerta").click(function(){
        $("#alerta").hide()
    })
    
})

function guardarInformacionReservation(){
    let var3 = {
        idReservation:$("#idReservation").val(),
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var3),
        
        url:"http://150.230.86.51:8080/api/Reservation/save",
       
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