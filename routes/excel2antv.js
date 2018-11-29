var express = require('express');
var router = express.Router();

var xlxsfilename = '.\\public\\bufferdata\\salesdata.xlsx';
var result = { 'chart_title': 'error_gen' };

// Object for AntV HBar and VBar
function AntVData(type, value) {
    this.type = type;
    this.value = value;
}

// Object for AntV Pie
function AntVDataPie(item, count, percent) {
    this.item = item;
    this.count = count;
    this.percent = percent;
}

router.get('/', function(req, res, next){
    try {
        var XLSX = require('xlsx');
        var wb = XLSX.readFile(xlxsfilename);
        
        // Data number: Get the cell value of "B1" in Sheet "Summary"
        var ws = wb.Sheets['Summary'];
        var cell1 = ws['B1'], cell2 = '';
        var rowcount = (cell1? cell1.v : -1);

        // Chart Title: Get the cell value of "B3" in Sheet "Summary"
        var ctv = ws['B3'];

        // Chart Datas: Get the cell values from "A1","B1".... in Sheet "Data"
        var csdArray = new Array(new AntVData());
        var cvMax = 0;
        var tmpValue = 0;
        var tmpCount = 0;

        // Manipulate the records since second row. Note: the first row is the name of data series.
        ws = wb.Sheets['Data'];
        for (var i=1; i<=rowcount; i++) {
            cell1 = ws['A' + String(i+1)];
            cell2 = ws['B' + String(i+1)];

            tmp = new AntVData();
            tmp.type = (cell1? cell1.v : undefined);
            tmp.value = (cell2? cell2.v : undefined);
            csdArray[i-1] = tmp;

            // Get the maximum value
            // console.log(tmp.value);
            tmpValue = parseInt(tmp.value);
            tmpCount += tmpValue;
            if ((i > 0) && (tmpValue > cvMax)) {
                cvMax = tmpValue;
            }
        }

        // Get Max Value
        cvMax = parseInt(cvMax * 1.1);

        // Create Chart Data Object 
        result = JSON.stringify(csdArray);

        // Export Data to Chart
        var result_fixed;
        var result_json;

        console.log(req.query.antv_type);
        if (req.query.antv_type=='pie') {
            // Generate data for AntV Pie Chart 
            var csdArrayPie = new Array(new AntVDataPie());
            for (var i=0; i<csdArray.length; i++) {
                tmp = new AntVDataPie();
                tmp.item = csdArray[i].type;
                tmp.count = csdArray[i].value;
                //tmp.percent = (parseInt(tmp.count) / tmpCount);
                tmp.percent = parseFloat((parseInt(tmp.count) / tmpCount).toFixed(2));

                csdArrayPie[i] = tmp;
            }

            // Create Pie Chart Data Object 
            // console.log(csdArrayPie);
            result = JSON.stringify(csdArrayPie);
            result_fixed = result.toString().replace(/"item":/g, 'item:').replace(/"count":/g,'count:').replace(/"percent":/g,'percent:').replace(/"/g,'\'');
            result_json = { charttitle: (ctv? ctv.v : 'undefined'), chartmaxvalue: cvMax, chartdata: result_fixed };
        }
        else {
            result_fixed = result.toString().replace(/"type":/g, 'type:').replace(/"value":/g,'value:').replace(/"/g,'\'');
            result_json = { charttitle: (ctv? ctv.v : 'undefined'), chartmaxvalue: cvMax, chartdata: result_fixed };
        }
        // Note: you must send a JSON Object to Pug template
        console.log(result_json);

        switch (req.query.antv_type) {
            case 'hbar':    // Draw AntV HBar Chart
                res.render('section3-antv-hbar', result_json);
                break;
            case 'vbar':    // Draw AntV VBar Chart
                res.render('section3-antv-vbar', result_json);
                break;
            case 'pie':     // Draw AntV Pie Chart
                res.render('section3-antv-pie', result_json);
                break;
            default:
                console.log('Invalid Parameter: antv_type.');
        }
    }
    catch(e) {
        console.log(e);
        res.send('Processing Error or Invalid Parameter.');
    }
});

module.exports = router;