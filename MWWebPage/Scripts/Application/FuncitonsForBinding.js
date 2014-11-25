
function SaveProfile() {
    //client validation
    var nick = $("#nick_name").val();
    var gender = $("#gender_option option:selected").val();
    var birthDay = $("#profile_PD option:selected").val();

    var birthMon = $("#profile_PM option:selected").val();
    var birthYear = $("#profile_PY option:selected").val();
    var loc = $("#location").val();
    var occ = $("#occupation").val();
    var nat = $("#nationality").val();

    var profile = {
        BirthDay: birthDay,
        BirthMonth: birthMon,
        BirthYear: birthYear,
        Gender: gender,
        NickName: nick,
        occupation: occ,
        nationality: nat,
        location: loc
    }
    $.ajax({
        url: '/MWHome/UpdateProfile',//'@Url.Action("UpdateProfile", "MWHome")',
        method: 'Get',
        dataType: "html",
        contentType: 'application/json, charset=utf-8',
        data: profile,
        success: function (data) {
            $('#Pf-Pane').load(data);
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });
}

function SearchWithInput() {
    //var user_input = app.sl.ConditionInputSearch_fake(true, null, null, $("#strInput").val());

    var search_args = app.sl.ConditionInputSearch(true, null, null, $("#strInput").val(),null);
    app.getPhotoStream().search(search_args, false);

    $("#block-cover").css({
        "display": "none",
    });
}

function NextTag() {
    $('.circle input').prop("disabled", true);
    $('.circle input').prev().removeClass('circle-shadow');
    $('.circle').has('input').unbind("click");
    $('.circle input').unbind("focus");
    $('.circle input').unbind("blur");
    $('.circle input').unbind("keydown");
    $('.editBtnGroup').hide();
    $('.Mw-Pane-Default-Btn').show();
    var pageIndex = $(".carousel-indicators").children(".active").attr("data-slide-to")+2;
    var totalPage = $('.carousel-indicators').children().length;
    if (totalPage == 1) {
        return false;
    }
    if (pageIndex <=totalPage) {
 
        $.ajax({
            url: '@Url.Action("ListTags", "MWTag")',
            method: 'Get',
            dataType: "html",
            contentType: 'application/json, charset=utf-8',
            data: {
                _userId: "0lj4rFDbJa66VRpK", _pageIndex: pageIndex
            },
            success: function (data) {
                $('.carousel-inner').append(data);
                $('.carousel-inner').children().removeClass('active');
                $('.carousel-inner').children().first().addClass('active');
                $("#myCarousel").carousel('next');
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });
    }
}

function PrevTag() {
    $('.circle input').prop("disabled", true);
    $('.circle input').prev().removeClass('circle-shadow');
    $('.circle').has('input').unbind("click");
    $('.circle input').unbind("focus");
    $('.circle input').unbind("blur");
    $('.circle input').unbind("keydown");
    $('.editBtnGroup').hide();
    $('.Mw-Pane-Default-Btn').show();
}
 
function CatSearch() {
    var selectType = $(this).attr('data-source');
    var selectName = $(this).attr('data-catname');

    if ($(this).attr('data-selected') == 'True') {
        $(this).attr('data-selected', 'False');
        $(this).removeClass('category-Selected');
    } else {
        $(this).attr('data-selected', 'True');
        $(this).addClass('category-Selected');
    }
    if (selectType == "brand") {
        if ($(this).find("a").hasClass("Ian-li-changeColor"))
            $(this).find("a").addClass("Ian-li-changeColor");
        else
            $(this).find("a").removeClass("Ian-li-changeColor")
    } else {
        if ($(this).hasClass("Ian-li-changeColor"))
            $(this).removeClass("Ian-li-changeColor");
        else
            $(this).addClass("Ian-li-changeColor");
    }

    $(".cat[data-source=" + selectType + "]").each(function (index, obj) {
        if ($(obj).attr('data-catname') != selectName) {
            if ($(obj).attr('data-selected') == 'True') {
                $(obj).attr('data-selected', 'False');
                $(obj).removeClass('category-Selected');
                if (selectType == "brand")
                    $(obj).find("a").removeClass("Ian-li-changeColor");
                else
                    $(obj).removeClass("Ian-li-changeColor")
            }
        }
    });
          
    $("#block-cover").css({
        "display": "none",
    });

    var search_args = app.getSearchLogic().ConditionInputSearch(false, null, null, $("#strInput").val());
    app.getPhotoStream().advance_search(search_args);
}

function ClearConditions_2(input) {
    $(".condition-select").html("");
    $(".cat[data-selected='True']").each(function (index, obj) {
        $(obj).attr('data-selected', 'False');
        $(obj).removeClass('category-Selected');
        $(obj).removeClass('category-link-active');
        if ($(obj).children("a").hasClass("Ian-li-changeColor")) {
            $(obj).children("a").removeClass("Ian-li-changeColor");
        }
    });
    $(".colorbox").children('[data-selected=True]').each(function (index, obj) {
        $(obj).attr('data-selected', 'False');
    });
    $("#Ian-BIndexLi li").find("a").css("color", "#555555");
    $('#strInput').val(input);
}

function ClearConditions() {

    ClearConditions_2("");
    var search_args = app.getSearchLogic().discountSearch();
    app.getPhotoStream().search(search_args, false);
}

function SortSearchResult() {

    if ($(this).attr('data-selected') == 'True') {
        $(this).attr('data-selected', 'False');
        $(this).removeClass('category-Selected');
    } else {
        $(this).attr('data-selected', 'True');
        $(this).addClass('category-Selected');
    }
    var sortInfo = $(this).attr("data-sort");       
    var search_args = app.getSearchLogic().ConditionInputSearch(false, null, null, $("#strInput").val());
    app.getPhotoStream().search(search_args, false);
}

function NewestResult() {

    if ($("#block-cover").is(":hidden"))
        $("#block-cover").show();

    else {
        $("#block-cover").animate({ "right": "97px" }, 400);
    }
}

function DiscountResult() {

    if ($("#block-cover").is(":hidden"))
        $("#block-cover").show();

    else {
        $("#block-cover").animate({ "right": "0px" }, 400);
    }
}

function ShiftSearchResultLeft() {

    var width = 0;
    if ($("#Sp-Pane").css('display') == 'block') {
        width = $(".The-style-palette-list").width() - 100;
    }
    else if ($("#Mw-Pane").css('display') == 'block') {
        width = $(".The-style-palette-list").width() - 100;
    }

    $("#searchResults").css('margin-left', "-" +"33%");
    $(this).css('display', 'none');
    $("#shift_right").css('display', 'inline');
}

function ShiftSearchResultRight() {

    $("#searchResults").css('margin-left', "0px");

    $("#shift").css('left', '0px');
    $(this).css('display', 'none');
    $("#shift_left").css('display', 'inline');
}