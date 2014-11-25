var SideToolKits = new Array("Pf", "Sp", "Mw");
function SideToolKitsSetup() {

    // for side tool kit show&hide
    $.each(SideToolKits, function () {
        var elem = new String(this);
        var bClick = false;

        $('#' + elem + '-btn').hover(function () {
            $('#' + elem + '-tip').css({ "opacity": "1" });
        }, function () {
            var opened_pane = null;

            $.each(SideToolKits, function () {
                var inner = new String(this);
                if ($('#' + inner + '-Pane').hasClass("SideToolKitActive")) {
                    opened_pane = $('#' + inner + '-Pane');
                }
            });

            if (opened_pane == null || !opened_pane.is($('#' + elem + '-Pane')))
                $('#' + elem + '-tip').css({ "opacity": "0" });
               
        });

        $('#' + elem + '-btn').click(function () {
            var opened_pane = null;
            var opened_tip = null;
            var opened_button = null;
            var dy = 0;

            if (bClick) return;

            bClick = true;

            $.each(SideToolKits, function () {
                var inner = new String(this);
                if ($('#' + inner + '-Pane').hasClass("SideToolKitActive")) {
                    opened_pane = $('#' + inner + '-Pane');
                    opened_tip = $('#' + inner + '-tip');
                    opened_button = $('#' + inner + '-btn');
                }
            });

            if (opened_pane) {
                opened_pane.removeClass("SideToolKitActive");
                opened_pane.animate({
                    height: 'hide',
                }, 900, function () {
                    if (opened_pane.is($('#' + elem + '-Pane'))) {  
                        bClick = false;
                    }
                });
                dy = 900;
                opened_tip.css({ "opacity": "0" });
                opened_button.css({ "background-color": "#33353c" });
            }

            if (opened_pane == null || !opened_pane.is($('#' + elem + '-Pane'))) {
                $('#' + elem + '-Pane').addClass("SideToolKitActive");
                $('#' + elem + '-tip').css({ "opacity": "1" });
                $('#' + elem + '-Pane').delay(dy).animate({
                    height: 'show',
                }, 900, function () {
                    bClick = false;
                });
                $('#' + elem + '-btn').css({ "background-color": "#4fbbf9" });
            }
        });
    });

    // for side mene that conflict for z-index
    $('#menu-background').click(function (event) {
        var opened_pane = getOpenedPaneString();
        if (opened_pane == null) return;
        var des_elem = pointInElementRect(event.clientX, event.clientY, $('#' + opened_pane + '-Pane-Top-Button'));
        if (des_elem)
            $(des_elem).click();
    });

    var hover_elem = null;
    $('#menu-background').mousemove(function (event) {
        var opened_pane = getOpenedPaneString();
        if (opened_pane == null) return;
        var des_elem = pointInElementRect(event.clientX, event.clientY, $('#' + opened_pane + '-Pane-Top-Button'));
        if (des_elem) {
            $(hover_elem).removeClass("topButtonHover");
            $(des_elem).addClass("topButtonHover");
        }
        else {
            $(hover_elem).removeClass("topButtonHover");
        }
        hover_elem = des_elem;
    });
}

function getOpenedPaneString() {
    var opened_pane = null;
    $.each(SideToolKits, function () {
        var inner = new String(this);
        if ($('#' + inner + '-Pane').hasClass("SideToolKitActive"))
            opened_pane = inner;
    });

    return opened_pane;
}

function pointInElementRect(cx, cy, group) {
    var reVal = null
    $(group).children().each(function () {
        if (reVal == null) {
            var pos = $(this).offset();
            var width = $(this).outerWidth();
            var height = $(this).outerHeight();

            if (pos.left <= cx && pos.left + width >= cx && pos.top <= cy && pos.top + height >= cy)
                reVal = $(this);
        }
    });

    return reVal;
}