function toUrlBase64Data() {
  // 获取文件上传控件的选中文件列表
  const selectedfile = document.getElementById("fileInput").files;
  // 检查是否有文件被选中
  if (selectedfile.length > 0) {
    // 获取选中的第一个文件
    const sheetFile = selectedfile[0];
    // 创建一个FileReader对象，用于读取文件
    const fileReader = new FileReader();
    // 定义FileReader对象的onload事件处理函数
    fileReader.onload = function(fileLoadedEvent) {
      // 获取读取文件后的结果，即文件的内容
      const srcData = fileLoadedEvent.target.result;
      const elTxt = document.getElementById("base64");
      elTxt.innerText = srcData;
    }
    // 以Data URL的格式读取文件内容
    fileReader.readAsDataURL(sheetFile);
  }
}

async function getJsonFromXlsxBySheetJS(file) {

  async function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }
    
  try {
    const fileArrayData = await readFileAsArrayBuffer(file);
    const workbook = window.XLSX.read(fileArrayData, {
      type: 'binary',
      codepage: 65001,
      cellDates: true,
      cellText: false,
    });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    // const html = window.XLSX.utils.sheet_to_html(worksheet);
    return window.XLSX.utils.sheet_to_json(worksheet, {header: 1});
  }
  catch(err) {
    console.error(err);
    return [err];
  }
}

function cssAnimateFlash(element) {
  try {
    element.classList.add('ani-flash');
    setTimeout(() => {
      element.classList.remove('ani-flash');
    }, 2000);
  } catch(err) {
    console.log(err);
  }
}

async function readXlsxOrCsv() {
  // 获取文件上传控件的选中文件列表
  const elFilePicker = document.getElementById("fileInput");
  const selectedfile = elFilePicker.files;
  // 检查是否有文件被选中
  if (selectedfile.length > 0) {
    // 获取选中的第一个文件
    const sheetFile = selectedfile[0];
    const elText = document.getElementById("text");
    elText.innerText = '';
    (await getJsonFromXlsxBySheetJS(sheetFile)).forEach(r => elText.innerText += `${r}\n`);
  } else {
    cssAnimateFlash(elFilePicker);
  }
}

async function processOutputTextFile() {

  const convertNumber = (x) => isNaN(Number(x))? null : Number(x);
  const checkNumberType = (d) => isNaN(Number(d))? 'str' : Number.isInteger(Number(d))? 'int' : 'float';
  const processRowDatas = (r) => {
    return r.map(processCellData);
  }
  const processCellData = (c) => {
    switch (checkNumberType(c)) {
      case 'int':
        return convertNumber(c) + 100;
      case 'float':
        return (convertNumber(c) + 1111.1111).toFixed(4);
      default:
        return c;
    }
  }

  // 获取文件上传控件的选中文件列表
  const elFilePicker = document.getElementById("fileInput");
  const selectedfile = elFilePicker.files;
  // 检查是否有文件被选中
  if (selectedfile.length > 0) {
    const elProcess = document.getElementById("process");
    const elResult = document.createElement("span");
    elProcess.parentElement.appendChild(elResult);
    try {
      // 获取选中的第一个文件
      const sheetFile = selectedfile[0];
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
      // 读取文件内容为 aoa （Array of Arrays）数据
      const sourceJson = await getJsonFromXlsxBySheetJS(sheetFile);
      // 处理并获取结果数据（类型：aoa）
      let processedJson = sourceJson.map(processRowDatas);
      // console.log(processedJson);  // For debugging
      // 将处理后的数据转换为文本格式文件
      const returnTextArray = [processedJson.join('\n')];
      returnTextArray.push(
        '\n\n',
        '-----------------------------------------------------------------\n',
        `PS: Source file is [${sheetFile.name}]. All integers in source file are increased by 100, all floats are increased by 1111.1111, and all strings stay unchanged.\n`,
        `说明: 源文件是 [${sheetFile.name}]。源文件中所有整数类型的数值增加 100，所有浮点数类型的数值增加 1111.1111，所有字符串类型的数值不变。\n`,
        '\n\n',
        `This file was generated by ${window.location.pathname} at ${now}.\n`
      );
      // console.log(returnTextArray);  // For debugging
      // 生成一个新的文件对象，包含处理后的数据和初始文件名
      const returnTextFile = new File(returnTextArray, "output.txt", {
        type: "text/plain",
      });
      const returnTextFileURL = URL.createObjectURL(returnTextFile);
      const download = document.getElementById('download');
      download.href = returnTextFileURL;
      download.download = `${now}.txt`;
      download.innerText = `Output File: ${now}.txt`;
      elResult.innerText = 'File generated. ✔️';
    }
    catch(err) {
      console.log(err);
      elResult.innerText = 'Processing failed ❌';
    }
    finally {
      setTimeout(() => {
        elResult.remove();
      }, 3000);
    }
  } else {
    cssAnimateFlash(elFilePicker);
  }
}
