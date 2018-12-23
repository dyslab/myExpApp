$(document).ready(function () {
    function racing() {
        var nexttr = Math.floor(Math.random() * 1000)
        setTimeout(() => {
            $.get('/racinggame/racing', (data) => {
                var tno = Math.floor(Math.random() * 4)
                $('span#spTrack:eq(' + tno + ')').append(data)
                var cw = $('span#spTrack:eq(' + tno + ')').width()
                var pw = $('span#spTrack:eq(' + tno + ')').parent().width()
                if (cw + 30 >= pw) stop(tno)
                else racing()
            })
        }, nexttr)
    }

    function stop(winner) {
        var result
        var msg = 'The winner is ' 
                + $("input[name=rdBet]:radio:eq(" + winner + ")").val() 
                + '. You bet on ' + $("input[name=rdBet]:radio:checked").val()
        if ($("input[name=rdBet]:radio:eq(" + winner + ")").val() === $("input[name=rdBet]:radio:checked").val()) {
            msg += '\n\nYou won.'
            result = 'win'
        } else {
            msg += '\n\nYou lost.'
            result = 'lose'
        }

        $.get('/racinggame/stop', { result: result }, (data) => {
            window.alert(msg)
            $("#divResult").append(data)
            $("#btnStart").show()
        })
    }

    $("#btnStart").click(function () {
        if ($("input[name=rdBet]:radio:checked").val() !== undefined) {
            $.get('/racinggame/start', (data) => {
                $('span#spTrack').text('')
                $("#btnStart").hide()
                racing();
            })
        } else {
            window.alert("Boss, you didn't select a track.")
        }
    })
})