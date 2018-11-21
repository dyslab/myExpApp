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