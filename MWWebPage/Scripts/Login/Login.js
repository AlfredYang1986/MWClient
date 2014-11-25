var requiredEmail = "Email                                  required";
var requiredPassword = "Password                            required";
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function IsPassword(password) {
    if (password.length < 6)
        return false;
    else return true;
}
function nomalInput(obj) {
    
        $(obj).prev().css("visibility", "hidden");
        $(obj).prev().children("span").hide();
        $(obj).css("borderColor", "#555");
        $(obj).prev().css("color", "black");
}
function validation(obj) {

    if ($(obj).attr("type") == "email") {
        if ($(obj).val().length == 0) {
            if ($(obj).prev().children("span").is(":visible")) {
                nomalInput(obj);
            }
            $(obj).addClass("required-input ");
            $(obj).val(requiredEmail);
        }
        else {
            if(!IsEmail($(obj).val()))
            {
                $(obj).prev().children("span").show();
                $(obj).prev().children("span").text("incorrect format");
                $(obj).css("borderColor", "#ee5858");
                $(obj).prev().css("color", "#ee5858");
            }
        }
        if ($(obj).css('borderColor').replace(/\s+/g, '') == 'rgb(85,158,32)')
        {
            $(obj).css("borderColor", "#555");
            $(obj).prev().css("color", "#555");
            $(obj).prev().children("span").text("");
        }
    }

    if ($(obj).attr("type") == "password")
    {
        if ($(obj).val().length == 0) {
            if ($(obj).prev().children("span").is(":visible")) {
                nomalInput(obj);
            }
            $(obj).get(0).type = 'text';
            $(obj).addClass("required-input ");
            $(obj).val(requiredPassword);
        }
        else {
            if (!IsPassword($(obj).val()))
            {
                $(obj).prev().children("span").show();
                $(obj).prev().children("span").text("password is too short");
                $(obj).css("borderColor", "#ee5858");
                $(obj).prev().css("color", "#ee5858");
            }
        }
        if ($(obj).css('borderColor').replace(/\s+/g, '') == 'rgb(85,158,32)') {
            $(obj).css("borderColor", "#555");
            $(obj).prev().css("color", "#555");
            $(obj).prev().children("span").text("");
        }
    } 
    if ($(obj).val() == "")
    {
        $(obj).addClass("required-select");
    }
}
function validationTips(obj) {
    if ($(obj).attr("type") == "email") {
        if ($(obj).prev().children("span").is(":visible")) {
            if (IsEmail($(obj).val())) {
                $(obj).prev().children("span").text("correct");
                $(obj).css("borderColor", "#559e20");
                $(obj).prev().css("color", "#559e20");
            }
        }
    }
    if ($(obj).attr("type") == "password")
    {
        if ($(obj).prev().children("span").is(":visible")) {
            if (IsPassword($(obj).val()))
            {
                $(obj).prev().children("span").text("correct");
                $(obj).css("borderColor", "#559e20");
                $(obj).prev().css("color", "#559e20");

            }
        }
    }
}

$('#inputEmail').focusin(function () {
    //$(this).prev().css("visibility", "visible");
    if ($(this).val() == requiredEmail)
    {
        $(this).val("");
        $(this).removeClass("required-input");
    }
});
$('#inputEmail').keyup(function () {
    validationTips(this);
    if ($(this).val().length > 0)
        $(this).prev().css("visibility", "visible");
    else
        $(this).prev().css("visibility", "hidden");
    
});

$('#inputPassword').focusin(function () {
    //$(this).prev().css("visibility", "visible");
    if ($(this).val() == requiredPassword) {
        $(this).val("");
        $(this).removeClass("required-input ");
    }
    $(this).get(0).type = 'password';
});

$('#inputPassword').keyup(function () {
    validationTips(this);
    if ($(this).val().length > 0)
        $(this).prev().css("visibility", "visible");
    else
        $(this).prev().css("visibility", "hidden");
    //$(this).prev().css("visibility", "visible");
});

$("#inputGender").focusin(function () {
    $(this).removeClass("required-select");
});
$("#BirthdayDay").focusin(function () {
    $(this).removeClass("required-select");
});
$("#BirthdayMonth").focusin(function () {
    $(this).removeClass("required-select");
});
$("#BirthdayYear").focusin(function () {
    $(this).removeClass("required-select");
});

$("#inputEmail").focusout(function () {
    validation(this);
});
$("#inputPassword").focusout(function () {
    validation(this);
});
$("#inputGender").focusout(function () {
    validation(this);
});
$("#BirthdayDay").focusout(function () {
    validation(this);
});
$("#BirthdayMonth").focusout(function () {
    validation(this);
});
$("#BirthdayYear").focusout(function () {
    validation(this);
});
$('#login-email').change(function () {
    if ($(this).val().length > 0) 
        $(this).prev().css("visibility", "visible");
    else
        $(this).prev().css("visibility", "hidden");

});
$('#login-email').keyup(function () {
    if ($(this).val().length > 0)
        $(this).prev().css("visibility", "visible");
    else
        $(this).prev().css("visibility", "hidden");

});
$('#login-password').keyup(function () {
    if ($(this).val().length > 0) 
        $(this).prev().css("visibility", "visible");
    else
        $(this).prev().css("visibility", "hidden");
});
$('#login-password').change(function () {
    if ($(this).val().length > 0)
        $(this).prev().css("visibility", "visible");
    else
        $(this).prev().css("visibility", "hidden");
});

function changebutton() {
    document.getElementById("arrow_up").style.visibility = "visible";
    document.getElementById("Lmore").style.visibility = "hidden";
}

function showMoreAndUparrow() {
    $("#Lmore").css("visibility", "visible");
    $("#arrow_up").css("visibility", "hidden");
}

function hiddenMoreAndUparrow() {
    $("#Lmore").css("visibility", "hidden");
    $("#arrow_up").css("visibility", "visible");
}

function createAccount() {
    $("#createAccount").click(function (e) {

        //Extract data
        var u = $("#inputEmail").val();
        var p = $("#inputPassword").val();
        var g = $("#inputGender option:selected").val();
        var bd = $("#BirthdayDay option:selected").val();
        var bm = $("#BirthdayMonth option:selected").val();
        var by = $("#BirthdayYear option:selected").val();
        var l = $("#inputLocation option:selected").val();

        //check selection!!
        if (u.length == 0 || p.length == 0) {
            alert("Enter username and password");
        }
        else {
            //Make post request
            $.ajax({
                url: "/MWAuthorization/CreateAccount", //'@Url.Action("CreateAccount", "MWAuthorization")',
                method: 'Get',
                dataType: "html",
                contentType: 'application/json, charset=utf-8',
                data: {
                    username: u,
                    password: p,
                    gender: g,
                    birthDay: bd,
                    birthMonth: bm,
                    birthYear: by,
                    location: l
                },
                success: function (data) {
                    var direct = data.substr(1, data.length - 2);
                    if (direct == "user name already exist!")
                        alert(direct);
                    else
                        window.location.href = direct;
                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });
        }
    });
}

function changeActPointer() {
    $(".dot").each(function () {
        if ($(this).hasClass("dot-active")) {
            $(this).removeClass("dot-active");
            return false;
        }
    });
}

function loginSetup() {
    $('#forgotLogin').live('click', function () {
        window.open('@Url.Action("Index","ForgetPassword")');
    });

    $('#createLogin').live('click', function () {
        $('#myModal').modal('toggle');
        $('#createMyWardrobe').modal('toggle');
    });

    $("#myModal").on('hidden.bs.modal', function () {
            $('.login-incorrect-tips').hide();
    });

    $('.carousel').carousel({
        interval: false
    })

    $("#arrow_up").click(function () {
        if ($("div.active").children().hasClass("item2")) {

            $("#Lmore").css("visibility", "visible");
            $("#arrow_up").css("visibility", "hidden");
        }
        if ($("div.active").children().hasClass("item4")) {
            $("#arrow_up").css("visibility", "visible");
            $("#arrow_down").css("visibility", "visible");
        }
        $('.dot').removeClass('dot-active');
        var number = parseInt($("div .active").children().attr("data-page-index"));
        $(".dot").eq(number - 1).addClass('dot-active');
    });

    $("#arrow_down").click(function () {
        if ($("div.active").children().hasClass("item3")) {
            //$("#Lmore").css("visibility", "visible");
            $("#arrow_down").css("visibility", "hidden");
        }
        $('.dot').removeClass('dot-active');
        var number = parseInt($("div .active").children().attr("data-page-index"));
        $(".dot").eq(number + 1).addClass('dot-active');
    });

    $("#active-login").click(function () {
        $("#createMyWardrobe").modal("hide");
        $("#myModal").modal("show");
    });

    $('#box').bind('mousewheel', function (e) {
        if (e.originalEvent.wheelDelta / 120 > 0) {
            if ($("div .active").children().hasClass("item1"))
            { }
            else {
                //change active pointer
                $('.dot').removeClass('dot-active');
                var number = parseInt($("div .active").children().attr("data-page-index"));
                if (number == 0)
                    $(".dot").last().addClass('dot-active');
                else
                    $(".dot").eq(number - 1).addClass('dot-active');

                //change page
                $('.carousel').carousel('prev');

                $(function () {

                    if ($("div.active").children().hasClass("item2")) {
                        $("#Lmore").css("visibility", "visible");
                        $("#arrow_up").css("visibility", "hidden");
                        $("#arrow_down").css("visibility", "visible");
                    }
                    if ($("div.active").children().hasClass("item4")) {
                        $("#Lmore").css("visibility", "hidden");
                        $("#arrow_down").css("visibility", "visible");
                    }
                });
            }
        }
        else {
            if ($("div .active").children().hasClass("item4")) {
                $("#Lmore").css("visibility", "hidden");
                $("#arrow_up").css("visibility", "visible");
            }
            else {
                //change active pointer
                $('.dot').removeClass('dot-active');
                var number = parseInt($("div .active").children().attr("data-page-index"));
                if (number == 3)
                    $(".dot").first().addClass('dot-active');
                else
                    $(".dot").eq(number + 1).addClass('dot-active');
                //change page
                $('.carousel').carousel('next');
                $(function () {
                    if ($("div.active").children().hasClass("item1")) {
                        $("#Lmore").css("visibility", "hidden");
                        $("#arrow_up").css("visibility", "visible");
                    }
                    if ($("div.active").children().hasClass("item3")) {
                        //$("#Lmore").css("visibility", "visible");
                        $("#arrow_down").css("visibility", "hidden");
                    }
                });
            }
        }
    });

    for (var index = 1; index <= 4; ++index) {
        $("#pointer" + index).click(function () {
            var s = $(this).attr("id");
            if (s.substr(s.length - 1, 1) == "1") showMoreAndUparrow();
            else hiddenMoreAndUparrow();
        });
    }
    //change pointer shape
    $('#index-pointer').find('li').click(function () {
        $("#index-pointer li").each(function () {
            $(this).find('.dot').removeClass("dot-active");
        });
        $(this).find('.dot').addClass("dot-active");
    });

    //this part is createMyWardrobe jquery and javascript by Ian
    for (var i = 1940; i < 2014; i++) {
        var a = $("#BirthdayYear")[0];
        a.options.add(new Option(i, i));
    }
    for (var i = 1; i <= 12; i++) {
        var a = $("#BirthdayMonth")[0];
        a.options.add(new Option(i, i));
    }
    for (var i = 1; i <= 31; i++) {
        var a = $("#BirthdayDay")[0];
        a.options.add(new Option(i, i));
    }

    $("#BirthdayMonth").change(function () {
        changeDayList();
    });
    $("#BirthdayYear").change(function () {
        changeFebDayList();
    });

    $('#strInput').autocomplete({
        create: function () {
            $(this).css('z-index', 500);
        },
        source: function (request, response) {
            $.ajax({
                url: "/MWHome/AutoComplete",//'@Url.Action("AutoComplete", "MWHome")',
                method: 'Get',
                dataType: "json",
                contentType: 'application/json, charset=utf-8',
                data: {
                    search: $("#strInput").val()
                },
                success: function (data) {

                    response($.map(data, function (item) {
                        return {
                            label: item
                        };
                    }));
                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });
        },
        minLength: 2,
    });

    $("#text_link").click(function () {
        $("#text_link a").toggle();

    });
    $(".search_group >input").keydown(function (e) {
        if (e.keyCode == 13) {
            $("#seearching-btn").click();
        }

    });

    function changeDayList() {

        var day = $("#BirthdayDay")[0].value;
        if ($("#BirthdayMonth")[0].value == "4" || $("#BirthdayMonth")[0].value == "6" || $("#BirthdayMonth")[0].value == "9" || $("#BirthdayMonth")[0].value == "11") {

            $("#BirthdayDay").empty();
            $("#BirthdayDay")[0].options.add(new Option("Day", ""));
            AddDay(30);
            if (day != "31")
                $("#BirthdayDay")[0].value = day;
        }
        if ($("#BirthdayMonth")[0].value == "Mon") {
            $("#BirthdayDay").empty();
            $("#BirthdayDay")[0].options.add(new Option("Day", ""));
            AddDay(31);
            $("#BirthdayDay")[0].value = day;
        }

        if ($("#BirthdayMonth")[0].value == "1" || $("#BirthdayMonth")[0].value == "3" || $("#BirthdayMonth")[0].value == "5" || $("#BirthdayMonth")[0].value == "7" || $("#BirthdayMonth")[0].value == "8" || $("#BirthdayMonth")[0].value == "10" || $("#BirthdayMonth")[0].value == "12") {
            $("#BirthdayDay").empty();
            $("#BirthdayDay")[0].options.add(new Option("Day", ""));
            AddDay(31);
            $("#BirthdayDay")[0].value = day;
        }

        if ($("#BirthdayMonth")[0].value == "2") {
            $("#BirthdayDay").empty();
            $("#BirthdayDay")[0].options.add(new Option("Day", ""));
            AddDay(29);
            if (day != "30" && day !== "31")
                $("#BirthdayDay")[0].value = day;
        }
    }

    function AddDay(i) {
        for (var day = 1; day <= i; day++) {
            $("#BirthdayDay")[0].options.add(new Option(day, day));
        }
    }

    function judgeLeapYear() {
        var y = $("#BirthdayYear")[0].value;
        return y % 100 == 0 ? y % 400 == 0 : y % 4 == 0;
    }

    function changeFebDayList() {
        var day = $("#BirthdayDay")[0].value;
        if ($("#BirthdayMonth")[0].value == "2") {
            if (!judgeLeapYear()) {
                $("#BirthdayDay").empty();
                $("#BirthdayDay")[0].options.add(new Option("Day", ""));
                AddDay(28);
                if (day != "29")
                    $("#BirthdayDay")[0].value = day;
            }
            else {
                $("#BirthdayDay").empty();
                $("#BirthdayDay")[0].options.add(new Option("Day", ""));
                AddDay(29);
                $("#BirthdayDay")[0].value = day;
            }
        }
    }
   
}
function login() {
    $(".login-button").click(function (e) {

        //Prevent the default Get request
        e.preventDefault();
        //Extract data
        var email = $("#login-email").val();
        var pswd = $("#login-password").val();
        var bm = $("#reme").is(':checked');

        if (email.length == 0 || pswd.length == 0) {
            alert("TODO: login as unknown user");
        }
        else {

            $.ajax({
                url: "/MWAuthorization/LoginPost", //'@Url.Action("LoginPost", "MWAuthorization")',
                method: 'Get',
                dataType: 'html',
                contentType: 'application/json, charset=utf-8',
                data: {
                    username: email,
                    password: pswd,
                    rememberMe: bm
                },
                success: function (data) {
                    if (data == "")
                    {
                        $(".login-incorrect-tips").show();
                        $("#login-password").val("");
                    }

                    else {
                        window.location.href = data.substr(1, data.length - 2);
                    }
                },
                error: function (xhr, status, error) {
                    alert("error");
                }

            });
        }
    });

}