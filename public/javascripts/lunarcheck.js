$(document).ready(() => {
    var returnLunarHtml = (data) => {
        return JSON.stringify(data);
    };

    $("button#lunarcheck").click(() => {
        if ($("input#datepicker").val() != "") {
            $.post( "/lunar/json", { date: $("input#datepicker").val() }, ( data ) => {
                $( "div#lunarday" ).html( returnLunarHtml(data) );
              });
        } else {
            alert("请先选择日期。");
        }
    });
});