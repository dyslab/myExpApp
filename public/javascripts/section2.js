// 测试传统方式采用Javascript增加内容
function testclick() {
    var divA = document.getElementById("d1");
    
    divA.innerHTML = divA.innerHTML+'<b>点一下加一句。</b>';
}
    
// 测试JQuery方式增加内容
$(document).ready(function() {
    $("#btn1").click(function(){
        $("span").append("#span元素后加文本");
        $("#d2").append("<b>&nbsp;对象d2后增加文本。&nbsp;</b>");
        $("ol").append("<li>Appended item</li>");
    });
});