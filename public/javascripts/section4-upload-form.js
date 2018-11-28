//  JQuery: 
$("document").ready(function(){
    // set the limited maximun size and ext filename of upload file here (size unit: MB)
    var nLimitedSize = 2;
    var sLimitedExtName = "JSON/XLS/XLSX";  // must be uppercase.

    $("form").submit(function(e){
        // Validate the upload file's suffix name and size.
        // Merely accept : .JSON/.XLS/.XLSX file format.
        var return_code = 0;
        var src_file = $("#srcFile")[0];

        // upload file validating
        if (typeof(src_file.files[0]) === "object") {
            var src_file_size = src_file.files[0].size;
            var src_file_fullname = $("#srcFile").val();
            var src_file_extname = src_file_fullname.substring(src_file_fullname.lastIndexOf('.') + 1, src_file_fullname.length).toLocaleUpperCase();
            
            // Judge the extended name
            if (sLimitedExtName.indexOf(src_file_extname)<0) return_code = -2;

            // Judge the file size
            if (src_file_size>nLimitedSize*1024*1024) return_code = -3;
        }
        else return_code = -1;

        // Return Code Processing. 
        switch (return_code) {
            case -1:
                // file is empty.
                window.alert("温馨提示：请先选择你要上传的文件。");
                break;
            case -2:
                // extended filename is illegal.
                window.alert("温馨提示：必须上传格式为"+sLimitedExtName+"的文件。");
                break;
            case -3:
                // over the limited size.
                window.alert("温馨提示：上传文件不能大于"+nLimitedSize+"M。");
                break;
            default:
                break;
        }
        if (return_code<0) e.preventDefault();
    });
});