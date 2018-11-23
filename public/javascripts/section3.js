// JQuery: 
$("document").ready(function(){
    $("#btnA").click(function(){
        var frameA = document.getElementById("frameExcelChart");
        
        // Parameter reference
        //  type:
        //      101 --- output JSON Object, 
        //      102 --- output JSON String,
        frameA.contentWindow.location.href = "/excel?type=101";
    });

    $("#btnB").click(function(){
        var frameA = document.getElementById("frameExcelChart");
        
        // Parameter reference
        //  type:
        //      101 --- output JSON Object, 
        //      102 --- output JSON String,
        frameA.contentWindow.location.href = "/excel?type=102";
    });
});