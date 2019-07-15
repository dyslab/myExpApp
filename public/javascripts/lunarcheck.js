$(document).ready(() => {
    var returnLunarHtml = (jsondata) => {
        var return_html = ""; // JSON.stringify(jsondata);
        if ((jsondata.status == "200") && (jsondata.message == "success")) {
            return_html += "<p>" +
                `<span class="lunar-inline-space">公历：${jsondata.data.year}年${jsondata.data.month}月${jsondata.data.day}日 ${jsondata.data.week}</span>` +
                `<span class="lunar-inline-space">农历：${jsondata.data.cnyear}${jsondata.data.hyear}年${jsondata.data.cnmonth}月${jsondata.data.cnday}</span>` + 
                `<span class="lunar-inline-space">生肖：${jsondata.data.animal}</span>` +
                "</p><p>" +
                `<span class="lunar-good">宜：${jsondata.data.suit.replace(/,/g, ' · ')}</span>` +
                "</p><p>" +
                `<span class="lunar-bad">忌：${jsondata.data.taboo.replace(/,/g, ' · ')}</span>` +
                "</p>";
            if (jsondata.data.festivalList.length > 0) {
                return_html += `<p>今天是 ${jsondata.data.festivalList.join('　')}。</p>`;
            }
            return_html += "<p>本月节气：";
            for (let key in jsondata.data.jieqi) {
                return_html += `<span class="lunar-inline-space">${key}日：${jsondata.data.jieqi[key]}</span>`;
            }
            return_html += "</p>";
        } else {
            return_html += `<p>JSON数据获取失败。</p>`
            return_html += `<p>data.status：${jsondata.status}</p>`
            return_html += `<p>data.message：${jsondata.message}</p>`
        }

        return return_html;
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