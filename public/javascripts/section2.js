// 测试传统方式采用Javascript增加内容
function testclick() {
    var divA = document.getElementById("d1");
    
    divA.innerHTML = divA.innerHTML+'<b>点一下加一句。</b>';
}
 
$(document).ready(function() {
    // 测试JQuery方式增加内容
    $("#btn1").click(function(){
        $("span.test").append("#span.test元素后加文本");
        $("#d2").append("<b>&nbsp;对象d2后增加文本。&nbsp;</b>");
        $("ol").append("<li>Appended item</li>");
    });

    // 测试解析字符串
    $("button#btnParse").click(function(){
        var src = $("input#strParseText").val();

        // Parsing...
        var pos = 0;
        var cmd_flag = false;
        var cmd_str = "";
        var tmp_str = "";
        var src_char = "";
        var result_array = [];
        while (pos < src.length) {
            src_char =  src.charAt(pos);
            switch (src_char) {
                case "{":
                    pos++;
                    src_next_char = src.charAt(pos);
                    if (src_next_char === "{") {
                        cmd_flag = true;
                        // manipulate the previous command.
                        if (cmd_str !== "") {
                            result_array.push(
                                {
                                    command: cmd_str.toLowerCase(),
                                    content: tmp_str
                                }
                            );
                        }
                        cmd_str = "";
                        tmp_str = "";
                    } else {
                        if (cmd_flag) cmd_str = src_char + src_next_char;
                        else          tmp_str = src_char + src_next_char;
                    }
                    break;
                case "}":
                    pos++;
                    src_next_char = src.charAt(pos);
                    if (src_next_char === "}") {
                        cmd_flag = false;
                    } else {
                        if (cmd_flag) cmd_str = src_char + src_next_char;
                        else          tmp_str = src_char + src_next_char;
                    }
                    break;
                default:
                    if (cmd_flag) cmd_str += src_char;
                    else          tmp_str += src_char;
                    break;
            }
            pos++;
        }
        if (cmd_str !== "") {
            result_array.push(
                {
                    command: cmd_str,
                    content: tmp_str
                }
            );
        }

        // Construct HTML
        var resultHTML = "";
        for (var id = 0; id < result_array.length; id++) {
            switch (result_array[id].command) {
                case "image":
                    resultHTML += "<div><img src=\"" +
                    result_array[id].content + "\"><div>";
                    break;
                case "text":
                    resultHTML += "<div><span class=\"custom-text\">" +
                    result_array[id].content + "</span><div>";
                    break;
                case "caption":
                    resultHTML += "<div><span class=\"custom-caption\">" +
                    result_array[id].content + "</span><div>";
                    break;
                default:
                    break;
            }
        }

        $("div#strParseResult").children().remove();
        $("div#strParseResult").append($(resultHTML));
    });
});