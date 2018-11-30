//  JQuery: 
var chart = new G2.Chart({
    container: 'divChart',
    forceFit: true,
    height: 200,
    padding: [ 20, 0, 30, 50 ]
});

function InitChart(data) {
    chart.source(data);

    chart.scale('value', {
        min: 0,
        alias : "销量"
    });
    chart.scale('month', { 
        alias : "时间"
    });
    chart.tooltip({
        crosshairs: {
            type: 'line'
        }
    });
    chart.line().position('month*value');
    chart.point().position('month*value').size(4).shape('circle').style({
        stroke: '#fff',
        lineWidth: 1
    });
    chart.render();
}

$(document).ready(function(){
    // Generate a new title row for Table.
    function genTitleRowHTML(s1, s2) {
        return "<TR class='dataRow'><TD class='tdContent' align='center'></TD><TD class='tdContent' align='center'><input type='text' class='s1' readonly='readonly' value='" + s1 + "'></TD><TD class='tdContent' align='center'><input type='text' class='s2' readonly='readonly' value='" + s2 + "'></TD><TD class='tdContent' align='center'><button class='addRow'>+</button></TD></TR>";
    }

    // Generate a new data row for Table.
    function genDataRowHTML(s1, s2) {
        return "<tr class='dataRow'><td class='tdContent' align='center'><button class='removeRow'>-</button></td><td class='tdContent' align='center'><input type='text' class='s1' value='" + s1 + "'></td><td class='tdContent' align='center'><input type='text' class='s2' value='" + s2 + "'></td><td class='tdContent' align='center'><button class='addRow'>+</button></td></tr>";
    }
    
    // Generate an array in JSON object format for Chart and Export.
    function genChartDataFromTable() {
        var tmpData = [];
        var tmpS1 = $("input.s1");
        var tmpS2 = $("input.s2");
        
        // Get chart data from "1" of Array. Skip the title data.
        for (var p, i=1; i<tmpS1.length; i++) {
            p = parseInt(tmpS2.eq(i).val());
            if (p && p != 'NaN')
                tmpData.push({ month: tmpS1.eq(i).val(), value: p });
            else
                tmpData.push({ month: tmpS1.eq(i).val(), value: 0 });
        }

        return tmpData;
    }

    // read data from "export_sample.json" file then show data in table and chart.
    $.getJSON("./bufferdata/export_sample.json", function(json) {
        var tArr = [], dataArr = [];

        // Initialize data for table
        $.each(json, function(key, value) {
            if (key === 0) {
                tArr.push(genTitleRowHTML(value.s1,value.s2));
            } else {
                tArr.push(genDataRowHTML(value.s1,value.s2));
                dataArr.push({ month: value.s1, value: value.s2 });
            }
        });

        // Initialize the Table and Chart.
        $(".tbContent").html(tArr.join(""));
        InitChart(dataArr);

        // Insert a new row in table
        $(".tbContent").on("click", "button.addRow", function(){
            $(this).parents().map(function(){
                if(this.className === "dataRow") return this
                else return null;
            }).after(genDataRowHTML("",""));

            $("button.")
        });

        // Remove a row from table
        $(".tbContent").on("click", "button.removeRow", function(){
            if (window.confirm("是否真的要删除该行数据？")) {
                // Remove this row if "yes"
                $(this).parents().map(function(){
                    if(this.className === "dataRow") return this
                    else return null;
                }).remove();
            }
        });

        // When the span with class "refreshChart" was clicked.
        $("span.refreshChart").click( function(){
            // Refresh chart
            chart.changeData(genChartDataFromTable());
        });

        $("#btnExportJSON").click( function(){
            // Form POST method
            var postForm = $("<form method='POST' action='/export/json'></form>");
            postForm.appendTo( "body" );
            postForm.append("<input type='hidden' name='jsondata' value='" + JSON.stringify(genChartDataFromTable()) + "'>");
            postForm.submit();

            /* Ajax POST method
                $.post("/export/json", { jsondata: JSON.stringify(genChartDataFromTable()) }, function(data, status, xhr) {
                    // POST data goes fine.
                    // window.alert("Get Data : " + xhr.getResponseHeader("Content-Disposition"));
                }).fail(function(){
                    window.alert("Data Transport Error.");
                });
            */
        });
    });
});