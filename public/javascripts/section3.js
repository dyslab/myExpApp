//  JQuery: 
//  "/excel?type=???" URL Query Parameter Reference
//  type:
//      101 --- output JSON Object, 
//      102 --- output JSON String,
$(document).ready(function(){
    $("#btnA").click(function(){
        var frameA = document.getElementById("frameExcelChart");
        frameA.contentWindow.location.href = "/excel?type=101";
    });

    $("#btnB").click(function(){
        var frameA = document.getElementById("frameExcelChart");
        frameA.contentWindow.location.href = "/excel?type=102";
    });

    $("#btnC").click(function(){
        var formA = document.getElementById("formAntV");
        formA.submit();
    });

    $("#btnGeoA").click(function(){
        var frameA = document.getElementById("frameExcelChart");
        frameA.contentWindow.location.href = "/antv-geo-sample1.html";
    });

    $("#btnGeoB").click(function(){
        var frameA = document.getElementById("frameExcelChart");
        frameA.contentWindow.location.href = "/antv-geo-sample2.html";
    });

    $("#btnGeoC").click(function(){
        var frameA = document.getElementById("frameExcelChart");
        frameA.contentWindow.location.href = "/antv-geo-sample3.html";
    });
});