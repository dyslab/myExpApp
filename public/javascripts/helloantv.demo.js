// G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
const data = [
    { genre: '第一单元', sold: 189 },
    { genre: '2nd Floor', sold: 250 },
    { genre: 'Sports', sold: 175 },
    { genre: 'Strategy', sold: 315 },
    { genre: 'Action', sold: 220 },
    { genre: 'Shooter', sold: 150 },
    { genre: '中文测试1', sold: 108 },
    { genre: '中文测试2', sold: 228 },
    { genre: 'Other', sold: 50 }
];

// Step 1: 创建 Chart 对象
const chart = new G2.Chart({
    container: 'c1', // 指定图表容器 ID
    width : 800, // 指定图表宽度
    height : 400 // 指定图表高度
});

// Step 2: 载入数据源
chart.source(data);

// Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
chart.interval().position('genre*sold').color('genre')

// Step 4: 渲染图表
chart.render();
