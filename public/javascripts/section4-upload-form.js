// Predefined variables
const limitedSizeMB = 10;
const limitedExt = ".png / .jpg / .jpeg / .csv / .xlsx";
var selectedFiles = [];

const setHtmlByElementID = (id, text) => {
    document.getElementById(id).innerHTML = text;
}

const focusOnUploadBox = () => {
    const elements = document.getElementsByClassName('upload_box');
    for(var i = 0; i < elements.length; i++) {
        elements[i].classList.add("upload_box_on_dragndrop");
    }
}

const unfocusOnUploadBox = () => {
    const elements = document.getElementsByClassName('upload_box');
    for(var i = 0; i < elements.length; i++) {
        elements[i].classList.remove("upload_box_on_dragndrop");
    }
}

const setUploadBoxButtonEnable = (enable) => {
    if (enable) focusOnUploadBox();
    else        unfocusOnUploadBox();
    const elements = document.getElementsByClassName('upload_box_button');
    for(var i = 0; i < elements.length; i++) {
        elements[i].disabled = !enable;
    }
}

const setSelectedFiles = (files) => {
    if (files.length>0) {
        selectedFiles = files;
        let selectedFilesDescription = "";
        for(let i=0; i<files.length; i++)
            selectedFilesDescription += `${i>0? " <B>/</B> ": ""}<I>${files[i].name}</I>`;
        setHtmlByElementID("selectedFilesDescription", selectedFilesDescription);
        setUploadBoxButtonEnable(true);
    }
}

const inputFilesChange = (event) => {
    setSelectedFiles(event.target.files);
    event.preventDefault();
}

const clearUploadBox = () => {
    setHtmlByElementID("selectedFilesDescription", "");
    setUploadBoxButtonEnable(false);
}

const clearUploadResult = () => {
    setHtmlByElementID("uploadResult", "");
}

const validateUploadFile = (file) => {
    if (file.size > limitedSizeMB*1024*1024) return false;
    console.log('file size: ', file.size, 'bytes ok.');
    const extname = /.+\.(\w+)/g.exec(file.name);
    console.log(limitedExt.toLocaleLowerCase(), 'file ext: ', extname);
    if (extname === null || limitedExt.toLocaleLowerCase().indexOf(extname[1].toString().toLocaleLowerCase()) < 0) return false;
    return true;
}

const appendUploadResult = (html) => {
    const html_node = document.createElement('span');
    html_node.innerHTML = html;
    html_node.classList.add("upload_result");
    const br_node = document.createElement('br');
    const upoadResultDiv = document.getElementById("uploadResult")
    upoadResultDiv.appendChild(html_node);
    upoadResultDiv.appendChild(br_node);
}

const postFilesToServerOneByOne = (files) => {
    clearUploadResult();
    for(let i=0; i<files.length; i++) {
        if (validateUploadFile(files[i])) {
            const formData = new FormData();
            formData.append("file", files[i]);
            fetch("/upload/handler", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(response_json => {
                if (response_json.code === 200) {
                    const link = `${window.location.origin}${response_json.uploaded_file_path}`;
                    appendUploadResult(`${files[i].name} [${files[i].size} Bytes] 上传成功！点击 <a href="${link}" target="_blank">这里</a> 查看文件。`);
                } else {
                    appendUploadResult(`[服务端错误] ${files[i].name} [${files[i].size} Bytes] 上传失败！`);
                }
            })
            .catch(error => {
                appendUploadResult(`[客户端异常] ${files[i].name} [${files[i].size} Bytes] 上传出错！${error}`);
            })
        } else {
            appendUploadResult(`${files[i].name} [${files[i].size} Bytes] 不符合上传条件，跳过！`);
        }
    }
    clearUploadBox();
}

const uploadFiles = () => {
    // TODO: upload files to server
    if (selectedFiles.length>0) {
        postFilesToServerOneByOne(selectedFiles);
    } else {
        clearUploadResult();
        appendUploadResult('请先选择上传文件！');
    }
}

const onUploadBoxDragOver = (event) => {
    event.preventDefault();
}

const onUploadBoxDrop = (event) => {
    setSelectedFiles(event.dataTransfer.files);
    event.preventDefault();
}

window.onload = () => {
    setHtmlByElementID("inputFilesDescription", `注：上传文件类型仅限于 <I>${limitedExt.toLocaleUpperCase()}</I> 文件，单文件大小限制在 <I>${limitedSizeMB}MB</I> 以下`);
    setUploadBoxButtonEnable(false);
}
