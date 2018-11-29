//  JQuery: 
$("document").ready(function(){
    // Set CSS properties for Button which its classname is "export".
    $("button.export").css({
        "font-family": "Cambria, Aria, Calibri",
        "font-size": "16pt",
        "cursor": "pointer",
        "color":"#222222",
        "background": "#A8C0C3",
        "width": "180px", 
        "height": "35px"
    });

    $("button.export").hover(function(){
        $(this).css("color","#DDDDDD");
        $(this).css("background","#284045");
    },function() {
        $(this).css("color","#222222");
        $(this).css("background","#A8C0C3");
    });

    // read data from "export_sample.json" file then show data in table and chart.
    $.getJSON("./bufferdata/export_sample.json", function(json) {
        var tArr = [];
        
        $.each(json, function(key, value) {
            if (key === 0) {
                tArr.push("<TR><TD class='tdContent'></TD><TD class='tdContent'>" + value.s1 + "</TD><TD class='tdContent'>" + value.s2 + "</TD><TD class='tdContent'><button id='addRow'>+</button></TD></TR>");
            } else {
                tArr.push("<tr><td class='tdContent'><button id='removeRow'>-</button></td><td class='tdContent'><input type='text' id='s1' value='" + value.s1 + "'></td><td class='tdContent'><input type='text' id='s2' value='" + value.s2 + "'></td><td class='tdContent'><button id='addRow'>+</button></td></tr>");
            }
        });

        $("#tbContent").html(tArr.join(""));

        // Set CSS properties for "#tbContent" and ".tdContent".
        $("#tbContent").attr({
            border: "0",
            cellspacing: "1", 
            cellpadding: "1",
            align: "center"
        });
        $("#tbContent").css({
            "background": "#AAAACC"
        });
        $(".tdContent").attr({
            align: "center"
        });
        $(".tdContent").css({
            "background": "#FFFFFF"
        });

        // Set CSS properties for "input".
        $(":text").css({
            "border": "0",
            "font-family": "Cambria, Aria, Calibri",
            "font-size": "10pt"
        });
        
    });
});