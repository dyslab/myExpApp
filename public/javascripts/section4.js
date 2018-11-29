//  JQuery: 
$("document").ready(function(){
    // hide all panels in the content area.
    function hideAllPanel() {
        $("#ecPanel_hbar").hide();
        $("#ecPanel_vbar").hide();
        $("#ecPanel_pie").hide();
        $("#uploadPanel").hide();
        $("#exportPanel").hide();
    }

    $("#btnA").click(function(){
        // set chart's bar data here
        var chartdata = {
            title: {
                // 图表标题
                text: "销量发货量对比柱状图",
                subtext: "本图表采用虚拟数据"
            },
            legend: {
                // 图例名称，须与下面的series数组name属性相符
                data:["销量","发货量"]
            },
            axis: {
                //  轴坐标数据
                data:["1月","2月","3月","4月","5月","6月"]
            },
            series: 
            //  The value corresponding to the xAxis data. 对应轴坐标数据的值
            [{
                name: "销量",
                data: [110,120,230,215,335,125]
            }, {
                name: "发货量",
                data: [110,120,130,175,285,75]
            }]
        };

        // Series data constructor for Bar.
        function setSeriesData(name, type, data) {
            this.name = name;
            this.type = type;
            this.data = data;
        }
        
        var tmp_series = new Array();
        var ect = $("#ec_type").val();
        console.log(ect);

        // Hide all panels at first.
        hideAllPanel();

        // Set chart options depending on the value of "ec_type".
        switch (ect) {
            case "vbar":
                $("#ecPanel_vbar").show();

                for (var i=0; i<chartdata.series.length; i++) {
                    tmp_series[i] = new setSeriesData(chartdata.series[i].name, "bar", chartdata.series[i].data)
                };

                var ec_vbar = echarts.init(document.getElementById("ecPanel_vbar"));
                var ecoption_vbar = {
                    title: {
                        text: chartdata.title.text,
                        subtext: chartdata.title.subtext
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: chartdata.legend.data
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: chartdata.axis.data
                    },
                    series: tmp_series
                };

                ec_vbar.setOption(ecoption_vbar);
                break;
            case "pie":
                // set chart's pie data here
                var chartdata_pie = {
                    title: {
                        // 图表标题
                        text: "月度销量对比花瓣饼图（南丁格尔图）",
                        subtext: "本图表采用虚拟数据"
                    },
                    // 图表统计名称
                    name: "月度",
                    data: 
                    // 饼图数据
                    [
                        {value:2350, name:"1月"},
                        {value:2230, name:"2月"},
                        {value:2450, name:"3月"},
                        {value:3250, name:"4月"},
                        {value:1860, name:"5月"},
                    ] 
                };

                $("#ecPanel_pie").show();

                var ec_pie = echarts.init(document.getElementById("ecPanel_pie"));
                var ecoption_pie = {
                    backgroundColor: '#ececec',
                    title: {
                        text: chartdata_pie.title.text,
                        subtext: chartdata_pie.title.subtext
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    itemStyle: {
                        shadowBlur: 30,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        emphasis: {
                            shadowBlur: 100,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    series : [
                        {
                            name: chartdata_pie.name,
                            type: 'pie',
                            radius: '80%',
                            roseType: 'angle',
                            data: chartdata_pie.data
                        }
                    ]
                };

                ec_pie.setOption(ecoption_pie);
                break;
            default:    // It means you chose "hbar"
                $("#ecPanel_hbar").show();

                for (var i=0; i<chartdata.series.length; i++) {
                    tmp_series[i] = new setSeriesData(chartdata.series[i].name, "bar", chartdata.series[i].data)
                };

                var ec_hbar = echarts.init(document.getElementById("ecPanel_hbar"));
                var ecoption_hbar = {
                    title: {
                        text: chartdata.title.text,
                        subtext: chartdata.title.subtext
                    },
                    tooltip: {},
                    legend: {
                        data: chartdata.legend.data
                    },
                    xAxis: {
                        data: chartdata.axis.data
                    },
                    yAxis: {
                    },
                    series: tmp_series
                };

                ec_hbar.setOption(ecoption_hbar);
                break;
        }
    });

    $("#btnB").click(function(){
        hideAllPanel();

        $("#uploadPanel").show(0, function(){
            // window.alert("ready to upload.");
            // $("#frameUpload").attr("src", "/upload/form");
        });
    });

    $("#btnC").click(function(){
        hideAllPanel();

        $("#exportPanel").show(0, function(){
            // window.alert("ready to export.");
        });
    });
});