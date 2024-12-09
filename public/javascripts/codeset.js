// QRcodes function 
function submitQRcode() {
    var formA = document.getElementById("QRform");

    document.getElementById("bQRSave").value = "false";
    formA.submit();
}

function submitQRsave() {
    var formA = document.getElementById("QRform");

    document.getElementById("bQRSave").value = "true";
    formA.submit();
}

// Barcodes function 
function showBarcode() {
    var bcA = document.getElementById("strBarcode").value;

    try {
        // JsBarcode("#barcode", bcA);
        JsBarcode("#barcode", bcA, {
            font: "Cambria",
            width: 4,
            height: 120,
            displayValue: true
        });
    }
    catch (e) {
        bcA.value="Calling fail";
    }
}

function submitBarcode() {
    var formA = document.getElementById("Barform");

    formA.submit();
}

async function fetchQRcodeViaPublicApi() {
    const strQRCode = document.getElementById("strQRCode").value;
    const intQRCodeSize = 180;
    const resp = await fetch(`https://api.apgy.in/qr/?data=${encodeURIComponent(strQRCode)}&size=${intQRCodeSize}`);
    if (resp.ok) {
        const blob = await resp.blob();
        const img = document.getElementById("imgApiQRCode");
        img.src = URL.createObjectURL(blob);
    } else {
        console.log(resp);
        throw new Error("Network response was not ok");
    }
}
