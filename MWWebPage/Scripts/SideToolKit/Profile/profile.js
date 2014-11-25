
function Profile() {
    var self = this;

    //Default input value disabled
    $('.disable_info').prop('disabled', true);
    $('.setting_input').prop('disabled', true);

    //Default save and cancel button hide
    $('#profile_save_btn').hide();
    $('#profile_cancel_btn').hide();

    //Default button div
    $('#setting_info').hide();
    $('#change_password').hide();


    $('button[name="profile_option_btn"]').click(function () {

        $('button[name="profile_option_btn"]').removeClass('active_color');
        $(this).addClass('active_color');

    });

    $('#profile_btn').click(function () {
        $('#profile_info').show();
        $('#setting_info').hide();
    });

    $('#setting_btn').click(function () {
        $('#profile_info').hide();
        $('#setting_info').show();

    });

    $('#help_btn').click(function () {


    });

    $('#logout_btn').click(function () {
        $.ajax({
            url: '/MWAuthorization/Logoff',
            method: 'Get',
            dateType: 'json',
            contentType: 'application/json, charset=utf-8',
            success: function (data) {
                window.location.href = "/MWAuthorization/Login"
            },
            erro: function (xhr, status, error) {
                alert(error);
            }
        });

    });

    $('#profile_edit_btn').click(function () {
        $(this).css("color", "#4fbbf9");
        //$(this).css('background-color', '#E6E6E6');
        $('.disable_info').prop('disabled', false);
        //$('#profile_edit_btn').hide();
        $('#profile_save_btn').slideDown("slow");
        $('#profile_cancel_btn').slideDown("slow");

        $('.border_modify').css("border", "1px solid black");

    });

    $('#profile_save_btn').click(function () {
        //$(this).css('background-color', '#E6E6E6');
        $('.disable_info').prop('disabled', true);
        $('#profile_save_btn').slideUp("slow");
        $('#profile_cancel_btn').slideUp("slow");

        $('.border_modify').css("border", "0px");
        $('#profile_edit_btn').css("color", "#000000");
    });

    $('#profile_cancel_btn').click(function () {
        $('.disable_info').prop('disabled', true);
        $('#profile_save_btn').slideUp("slow");
        $('#profile_cancel_btn').slideUp("slow");
        $('.border_modify').css("border", "0px");
        $('#profile_edit_btn').css("color", "#000000");
    });

    $('#upload').click(function () {
        $(this).toggleClass('active_color');
    });



    $('#switch_delete').switchButton({
        labels_placement: "right",
        on_label: 'Delete all sessions when logout',
        off_label: 'Delete all sessions when logout',
        width: 30,
    });

    $('#switch_ask').switchButton({
        labels_placement: "right",
        on_label: 'Do not ask me to tag when collecting item into wardrobe',
        off_label: 'Do not ask me to tag when collecting item into wardrobe',
        width: 30,
    });

    $('#switch_pswd_change').switchButton({
        labels_placement: "right",
        on_label: 'Send me an email when password is changed',
        off_label: 'Send me an email when password is changed',
        width: 30,
    });

    $('#change_pswd_btn').click(function () {
        $(this).toggleClass('active_color');
        $('#change_password').slideToggle();
    });

    $('#password_save_btn').click(function () {
        $('#change_password').hide(500);
    });


    $('#password_cancel_btn').click(function () {
        $('#change_password').hide(500);
    });

    //this part is for choose the birthday!!!!!
    for (var i = 1940; i < 2014; i++) {
        var a = $("#profile_PY")[0];
        a.options.add(new Option(i, i));
    }
    for (var i = 1; i <= 12; i++) {
        var a = $("#profile_PM")[0];
        a.options.add(new Option(i, i));
    }
    for (var i = 1; i <= 31; i++) {
        var a = $("#profile_PD")[0];
        a.options.add(new Option(i, i));
    }

    $("#profile_PM").change(function () {
        self.changeDayList();
    });
    $("#profile_PY").change(function () {
        self.changeFebDayList();
    });
    $('#facebook_profile').one("click",function () {
        $('#switch_facebook').switchButton({
            labels_placement: "right",
            on_label: 'Login with Facebook',
            off_label: 'Login with Facebook',
            width: 30,
        });
    });
    $('#pinterest_profile').one("click",function () {
        $('#switch_pinterest').switchButton({
            labels_placement: "right",
            on_label: 'Login with Pinterest',
            off_label: 'Login with Pinterest',
            width: 30,
        });
    });
    $('#twitter_profile').one("click",function () {
        $('#switch_twitter').switchButton({
            labels_placement: "right",
            on_label: 'Login with Twitter',
            off_label: 'Login with Twitter',
            width: 30,
        });
    });
    $('#instagram_profile').one("click",function () {
        $('#switch_instagram').switchButton({
            labels_placement: "right",
            on_label: 'Login with Instagram',
            off_label: 'Login with Instagram',
            width: 30,
        });
    });
    //$("#help_btn").click(function () {
    //    alert("asd");
    //    $("#help_info").show();

    //});
    //upload picture
    //$("#upload").upload({
    //    action: "",
    //    fileName: "file",
    //    params: {},     
    //    accept: ".jpg,.png",
    //    complete: function () {
    //        alert("complete");
    //    },
    //    submit: function () {
    //        alert("submit");
    //    }
    //});
}

Profile.prototype.changeDayList = function () {
    var day = $("#profile_PD")[0].value;
    if ($("#profile_PM")[0].value == "4" || $("#profile_PM")[0].value == "6" || $("#profile_PM")[0].value == "9" || $("#profile_PM")[0].value == "11") {

        $("#profile_PD").empty();
        $("#profile_PD")[0].options.add(new Option("Day", "Day"));
        this.AddDay(30);
        if (day != "31")
            $("#profile_PD")[0].value = day;
    }
    if ($("#profile_PM")[0].value == "Mon") {
        $("#profile_PD").empty();
        $("#profile_PD")[0].options.add(new Option("Day", "Day"));
        this.AddDay(31);
        $("#profile_PD")[0].value = day;
    }

    if ($("#profile_PM")[0].value == "1" || $("#profile_PM")[0].value == "3" || $("#profile_PM")[0].value == "5" || $("#profile_PM")[0].value == "7" || $("#profile_PM")[0].value == "8" || $("#profile_PM")[0].value == "10" || $("#profile_PM")[0].value == "12") {
        $("#profile_PD").empty();
        $("#profile_PD")[0].options.add(new Option("Day", "Day"));
        this.AddDay(31);
        $("#profile_PD")[0].value = day;
    }

    if ($("#profile_PM")[0].value == "2") {
        $("#profile_PD").empty();
        $("#profile_PD")[0].options.add(new Option("Day", "Day"));
        this.AddDay(29);
        if (day != "30" && day !== "31")
            $("#profile_PD")[0].value = day;
    }
}

Profile.prototype.AddDay = function (i) {
    for (var day = 1; day <= i; day++) {
        $("#profile_PD")[0].options.add(new Option(day, day));
    }
}

Profile.prototype.judgeLeapYear = function () {
    var y = $("#profile_PY")[0].value;
    return y % 100 == 0 ? y % 400 == 0 : y % 4 == 0;
}

Profile.prototype.changeFebDayList = function () {
    var day = $("#profile_PD")[0].value;
    if ($("#profile_PM")[0].value == "2") {
        if (!this.judgeLeapYear()) {
            $("#profile_PD").empty();
            $("#profile_PD")[0].options.add(new Option("Day", "Day"));
            this.AddDay(28);
            if (day != "29")
                $("#profile_PD")[0].value = day;
        }
        else {
            $("#profile_PD").empty();
            $("#profile_PD")[0].options.add(new Option("Day", "Day"));
            this.AddDay(29);
            $("#profile_PD")[0].value = day;
        }
    }
}