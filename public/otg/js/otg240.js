//  JQuery: 
//  Generate a XLSX file on server side then return a download link. 
$(document).ready(function(){

    function getHTML(link) {
        // Ajax POST method
        $.get("/otg/240", { link: link }, function(data) {
           if (data) {
                $("#divRes").append("<br>Get HTML ok...<br>");
                $("#divRes").append(data);
            }
            else 
                $("#divRes").append("<br>Get HTML failed...");
        });
    }

    $("#btnGo").click(function(){
        $("#divRes").html("Start...");
        getHTML($("#txtGo").val());
    });
});