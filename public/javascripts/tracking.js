function changeCom() {
    var strNo = document.getElementById("trackingNo").value;
    var lenNo = strNo.length;
    
    if (lenNo==18) {
        document.getElementById("comName").value = "yuantong";
    }
    else if (lenNo>=13) {
        document.getElementById("comName").value = "shentong";
    }
}

function do17Track() {
    var num = document.getElementById("YQNum").value;
    
    if(num===""){
        alert("Enter your number."); 
        return;
    }
    YQV5.trackSingle({
        //必须，指定承载内容的容器ID。
        YQ_ContainerId : "YQContainer",
        //可选，指定查询结果高度，最大为800px，默认为560px。
        YQ_Height:560,
        //可选，指定运输商，默认为自动识别。
        YQ_Fc:"0",
        //可选，指定UI语言，默认根据浏览器自动识别。
        YQ_Lang:"en",
        //必须，指定要查询的单号。
        YQ_Num:num
    });
}
