//  JQuery: 
//  Generate a XLSX file on server side then return a download link. 
$(document).ready(function(){
    $("#btnGenFileLink").click(function(){
        // Ajax POST method
        $.post("/excel/file",{textA:$("#textA").val()},function( data ){
            $("#divLink").fadeOut(500);
            if (data != "NULL") 
                $("#divLink").html("Excel file generated. <a href='" + data
                            + "' style='fonst-size:13pt'>Click HERE to download.</a>")
            else 
                $("#divLink").html("File not found.");
            $("#divLink").fadeIn(500);
        });
    });
});