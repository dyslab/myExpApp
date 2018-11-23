var express = require('express');
var router = express.Router();

const xlxsfilename = __dirname + '\\bufferdata\\salesdata.xlsx';
var result = { 'chart_title': 'error_gen' };

function ChartSalesData(name, value) {
    this.aname = name;
    this.avalue = value;
}

function ChartData(title, data) {
    this.chart_title = title;
    this.chart_data = data;
}

router.get('/', function(req, res, next){
    try {
        var XLSX = require('xlsx');
        var wb = XLSX.readFile(xlxsfilename);
        
        // Data number: Get the cell value of "B1" in Sheet "Summary"
        var ws = wb.Sheets['Summary'];
        var cell1 = ws['B1'], cell2 = '';
        var rowcount = (cell1? cell1.v : -1);

        // Chart Title: Get the cell value of "A3" and "B3" in Sheet "Summary"
        var ctv = ws['B3'];

        // Chart Datas: Get the cell values from "A1","B1".... in Sheet "Data"
        var csdArray = new Array(new ChartSalesData());
        ws = wb.Sheets['Data'];
        console.log(ws['!ref']);

        for (var i=0; i<=rowcount; i++) {
            cell1 = ws['A' + String(i+1)];
            cell2 = ws['B' + String(i+1)];

            tmp = new ChartSalesData();
            tmp.aname = (cell1? cell1.v : undefined);
            tmp.avalue = (cell2? cell2.v : undefined);
            csdArray[i] = tmp;

            console.log(csdArray[i]);
        }

        // Create Chart Data Object 
        var cdtitle = new ChartData((ctv? ctv.v : undefined), csdArray);

        result = JSON.stringify(cdtitle);
    }
    catch(e) {
        console.log('Excel file processing: error happened');
    }

    console.log(req.query.type);
    switch (req.query.type) {
        case '101': 
            // Send to Pug template as a JSON Object.
            res.render('section3-1', JSON.parse(result));
            break;
        case '102': 
            // Send to Pug template as a JSON String.
            res.render('section3-1', { 'jsonstring': result.toString() } );
            break;
        default:
            // It's an invalid output type parameter.
            res.send('Invalid parameter: type.');
            break;
    }
});

module.exports = router;