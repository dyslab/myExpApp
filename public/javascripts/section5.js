//  JQuery: 
$(document).ready(function(){
    var clockIntervalHandler;

    // -----------------------------------------------------------------------------------------
    // Show an interval clock on page.
    function startIntervalClock() {
        var clock = new Date();
        $("#spanClock").text(clock.toLocaleString());
    }

    function toggleClock() {
        if($("#toggleInterval").text().search(/stop/i)>=0) {
            $("#toggleInterval").text("Start Interval Clock");
            clearInterval(clockIntervalHandler);
        } else {
            $("#toggleInterval").text("Stop Interval Clock");
            clockIntervalHandler = setInterval(function(){
                startIntervalClock();
            }, 1000);
        }
    }

    toggleClock();  // Initialize Clock button.
    $("#toggleInterval").click(function(){ toggleClock(); });

    // -----------------------------------------------------------------------------------------
    // Simple Project Notepad
    // Using JQuery Ajax GET for Load notes from Server File
    $.get("/spn/todo/read", function(data) {
        $("#taTodo").val(data);
    });
    $.get("/spn/inprogress/read", function(data) {
        $("#taInprogress").val(data);
    });
    $.get("/spn/done/read", function(data) {
        $("#taDone").val(data);
    });

    // Using JQuery Ajax POST for saving note's content for each tag when changed.
    function showupResult(tag) {
        $("#divResponse").text("Note:["+ tag +"] automatically saved.")
        $("#divResponse").fadeIn(500).delay(1000).fadeOut(500);
    }

    $("#taTodo").change(function() {
        $.post("/spn/todo/write", { textA: $("#taTodo").val() }, function(data) {
            if (data === "ok") showupResult("To do")
        });
    });

    $("#taInprogress").change(function() {
        $.post("/spn/inprogress/write", { textA: $("#taInprogress").val() }, function(data) {
            if (data === "ok") showupResult("In progress")
        });
    });

    $("#taDone").change(function() {
        $.post("/spn/done/write", { textA: $("#taDone").val() }, function(data) {
            if (data === "ok") showupResult("Done")
        });
    });

    // -----------------------------------------------------------------------------------------
    // Test Promise, Timeout, File stream reading and writing.
    $("#btnTest").click(function(){ 
        $("#divTest").html("Waiting for response...<br><br>Note: Since the file stream may be jammed on Server side, sometimes you might wait a few seconds before acquiring the response.");
        $.get("/spn/test/test", function(data) {
            $("#divTest").html(data);
        });
    });
});