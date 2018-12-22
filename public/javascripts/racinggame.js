$(document).ready(function () {
    $("#btnStart").click(function () {
        if ($("input[name=rdBet]:radio:checked").val() !== undefined) {
            window.alert("Boss, we are ready go now.")
        } else {
            window.alert("Boss, you didn't select a track.")
        }
    })
})