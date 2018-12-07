//  JQuery: 
//  Generate a XLSX file on server side then return a download link. 
$(document).ready(function(){

    // Get the base link of "http://...".
    function getBaseLink(link) {
        var tmpLinkArr = link.split(/\//);
        return tmpLinkArr.slice(0,3).join('/');
    }

    // Grab online txt.
    function grabee(link, counter, number) {
        if (counter<=number) {
            // Ajax POST method
            $.get("/otg/240", { link: link }, function(json) {
                res = JSON.parse(json);
                if (res.errcode === 0) {
                    $("#taRes").val(">>> file [" + res.filename + "] saved.\r\n" + $("#taRes").val());
                    $("#taRes").val(">>> ready to process the next link [" + res.nextlink + "]\r\n" + $("#taRes").val());
                    grabee(getBaseLink(link) + res.nextlink, counter+1, number);
                }
                else {
                    $("#taRes").val(">>> Finish.\r\n>>> process failed. (Note: It may be the last chapter.)\r\n>>> errcode = " + res.errcode + ", Abort!\r\n" + $("#taRes").val());
                }
            });
        }
        else {
            $("#taRes").val(">>> Finish.\r\n>>> Congrats! fetched " + (counter-1) + " files successfully.\r\n" + $("#taRes").val());
        }
    }
    
    $("#btnGo").click(function(){
        $("#taRes").val(">>> go...");
        grabee($("#txtGo").val(), 1, $("#maxPages").val());
    });
});