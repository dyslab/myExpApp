function cssAnimate(element, animateClass, ms=2000) {
  try {
    element.classList.add(animateClass);
    setTimeout(() => {
      element.classList.remove(animateClass);
    }, ms);
  } catch(err) {
    console.log(err);
  }
}

function csvPapaParse(file, cb) {
  try {
    window.Papa.parse(file, {
      encoding: 'utf-8',
      header: false,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        // console.log(results); // For debugging
        cb(file, results);
      }
    });
  }
  catch(err) {
    console.error(err);
    cb(file, err);
  }
}

function showCsvFile() {

  function cbShowContent(file, content) {
    const elText = document.getElementById("text");
    elText.textContent = `FIle size: ${file.size} bytes\n\n${content.data.join('\n')}`;
  }

  // 获取文件上传控件的选中文件列表
  const elFilePicker = document.getElementById("fileInput");
  const selectedfile = elFilePicker.files;
  // 检查是否有文件被选中
  if (selectedfile.length > 0) {
    csvPapaParse(selectedfile[0], cbShowContent);
  } else {
    cssAnimate(elFilePicker, 'ani-bounce', 1500);
  }
}

function processOutputTextFile() {

  const convertNumber = (x) => isNaN(Number(x))? null : Number(x);
  const checkNumberType = (d) => isNaN(Number(d))? 'str' : Number.isInteger(Number(d))? 'int' : 'float';
  const toCapital = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const processRowDatas = (r, index) => {
    if (index === 0) {
      return r.map(toCapital)
    } else {
      const newR = r.map(processCellData);
      if (newR.length > 1) newR[0] = `${index}-${r[0]}`;
      return newR;
    } 
  }
  const processCellData = (c) => {
    switch (checkNumberType(c)) {
      case 'int':
      case 'float':
        return `[${checkNumberType(c)}]${convertNumber(c)}`;
      default:
        return c;
    }
  }
  function cbProcessContent(file, content) {
    // 生成当前时间戳的字符串，用于生成文件名
    const now = new Date(Date.now()).toLocaleString('zh-CN', {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const elProcess = document.getElementById("process");
    const elResult = document.createElement("span");
    elProcess.parentElement.appendChild(elResult);
    try {
      let processedJson = content.data.map(processRowDatas);
      // console.log(processedJson);  // For debugging
      // 将处理后的数据转换为文本格式文件
      const returnText = processedJson.join('\n') 
      + `\n\n`
      + '-----------------------------------------------------------------\n'
      + `PS: Source file is [${file.name}]. \n\n`
      + `Modification: Header names were capitalized, the values of column 1 (except header) add increment from 1, all numbers add type info, while rest fields stay unchanged.\n\n`
      + `This file was generated by ${window.location.pathname} at ${now}.\n`;
      // console.log(returnTextArray);  // For debugging
      // 生成一个新的文件对象，包含处理后的数据和初始文件名
      const returnTextFilename = `output-${now}.txt`;
      downloadFile(returnTextFilename, returnText);
      elResult.innerText = 'File generated. ✔️';
    } catch(err) {
      console.log(err);
      elResult.innerText = 'Processing failed ❌';
    }
    finally {
      setTimeout(() => {
        elResult.remove();
      }, 3000);
    }
  }
  function downloadFile(filename, content, useFileObjectURL=true) {
    /* 
      根据参数 useFileObjectURL 的值选择不同方式下载文件：
        true: 使用 File Object URL 对象下载文件
        false: 使用文本内容直接下载文件
    */
    const hidden_a = document.createElement('a'); 
    hidden_a.setAttribute('download', filename); 
    const returnFile = new File([content], filename, {
      type: "text/plain;charset=utf-8",
    });
    const returnFileURL = URL.createObjectURL(returnFile);
    if (useFileObjectURL) {
      hidden_a.setAttribute('href', returnFileURL); 
    } else {
      hidden_a.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`); 
    }
    document.body.appendChild(hidden_a); 
    // Dispatch click event on the hidden_a in order to be compatible with firefox
    // hidden_a.click() // NOTE: method 'hidden_a.click()' doesn't work on the latest firefox
    hidden_a.dispatchEvent(
      new MouseEvent('click', { 
        bubbles: true, 
        cancelable: true, 
        view: window 
      })
    );
    setTimeout(()=> {
      document.body.removeChild(hidden_a);
      window.URL.revokeObjectURL(returnFileURL);
    }, 500);
  }

  // 获取文件上传控件的选中文件列表
  const elFilePicker = document.getElementById("fileInput");
  const selectedfile = elFilePicker.files;
  // 检查是否有文件被选中
  if (selectedfile.length > 0) {
    csvPapaParse(selectedfile[0], cbProcessContent);
  } else {
    cssAnimate(elFilePicker, 'ani-bounce', 1500);
  }
}
