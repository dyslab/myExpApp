function testclick() {
    // 测试Javascript增加内容
    var divA = document.getElementById("d1");
    
    divA.innerHTML = divA.innerHTML+'<h3>追加内容为H3字体，点一下加一行。</h3>';

    // 测试JQuery增加内容
    $(document).ready(function(){
        // $('span').append('span元素后加文本');
        $("#d2").append("<b>&nbsp;d2后增加一段文本.&nbsp;</b>");
        $("ol").append("<li>Appended item</li>");
    });
}