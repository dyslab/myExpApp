var dom1 = document.getElementById("container1");
var dom2 = document.getElementById("container2");
var myChart1 = echarts.init(dom1);
var myChart2 = echarts.init(dom2);
var app = {};

option1 = null;
option2 = null;

var weatherIcons = {
    'Sunny': '/images/sunny_128.png',
    'Cloudy': '/images/cloudy_128.png',
    'Showers': '/images/showers_128.png'
};

option1 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: { color: '#999' }
        }
    },
    toolbox: {
        feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    legend: {
        data: ['蒸发量', '降水量', '温度']
    },
    xAxis: [
        {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisPointer: { type: 'shadow' }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '降水量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: { formatter: '{value} 毫升' }
        },
        {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: { formatter: '{value} 摄氏度' }
        }
    ],
    series: [
        {
            name: '蒸发量',
            type: 'bar',
            tooltip: {
                valueFormatter: function (value) { return value + ' 毫升'; }
            },
            data: [62.0, 34.9, 17.0, 23.2, 45.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name: '降水量',
            type: 'bar',
            tooltip: {
                valueFormatter: function (value) { return value + ' 毫升'; }
            },
            data: [52.6, 35.9, 19.0, 26.4, 48.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name: '温度',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
                valueFormatter: function (value) { return value + ' 摄氏度'; }
            },
            data: [13.0, 10.2, 7.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
    ]
};

option2 = {
    title: {
        text: '天气情况统计',
        subtext: '虚构数据',
        left: 'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        // orient: 'vertical',
        // top: 'middle',
        bottom: 10,
        left: 'center',
        data: ['西凉', '益州','兖州','荆州','幽州']
    },
    series : [
        {
            name: '天气系列',
            type: 'pie',
            radius : '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data:[
                {
                    value:948,
                    name: '幽州',
                    label: {
                        normal: {
                            formatter: [
                                '{title|{b}}{abg|}',
                                '  {weatherHead|天气}{valueHead|天数}{rateHead|占比}',
                                '{hr|}',
                                '  {Sunny|}{value|202}{rate|55.3%}',
                                '  {Cloudy|}{value|142}{rate|38.9%}',
                                '  {Showers|}{value|21}{rate|5.8%}'
                            ].join('\n'),
                            backgroundColor: '#eee',
                            borderColor: '#777',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                title: {
                                    color: '#eee',
                                    align: 'center'
                                },
                                abg: {
                                    backgroundColor: '#333',
                                    width: '100%',
                                    align: 'right',
                                    height: 25,
                                    borderRadius: [4, 4, 0, 0]
                                },
                                Sunny: {
                                    height: 30,
                                    align: 'left',
                                    backgroundColor: {
                                        image: weatherIcons.Sunny
                                    }
                                },
                                Cloudy: {
                                    height: 30,
                                    align: 'left',
                                    backgroundColor: {
                                        image: weatherIcons.Cloudy
                                    }
                                },
                                Showers: {
                                    height: 30,
                                    align: 'left',
                                    backgroundColor: {
                                        image: weatherIcons.Showers
                                    }
                                },
                                weatherHead: {
                                    color: '#333',
                                    height: 24,
                                    align: 'left'
                                },
                                hr: {
                                    borderColor: '#777',
                                    width: '100%',
                                    borderWidth: 0.5,
                                    height: 0
                                },
                                value: {
                                    width: 20,
                                    padding: [0, 20, 0, 30],
                                    align: 'left'
                                },
                                valueHead: {
                                    color: '#333',
                                    width: 20,
                                    padding: [0, 20, 0, 30],
                                    align: 'center'
                                },
                                rate: {
                                    width: 40,
                                    align: 'right',
                                    padding: [0, 10, 0, 0]
                                },
                                rateHead: {
                                    color: '#333',
                                    width: 40,
                                    align: 'center',
                                    padding: [0, 10, 0, 0]
                                }
                            }
                        }
                    }
                },
                {value:535, name: '荆州'},
                {value:510, name: '兖州'},
                {value:634, name: '益州'},
                {value:735, name: '西凉'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}

if (option1 && typeof option1 === "object") {
    myChart1.setOption(option1, true);
}

if (option2 && typeof option2 === "object") {
    myChart2.setOption(option2, true);
}
