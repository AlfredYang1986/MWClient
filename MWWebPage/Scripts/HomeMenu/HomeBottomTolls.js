function bottomToolsSet() {

    var scroll_timer;
    $(window).scroll(function () {
        $("#bottom-tools-border").fadeIn();
        window.clearTimeout(scroll_timer);
        scroll_timer = window.setTimeout(function () {
            $("#bottom-tools-border").fadeOut(500);
        }, 3000);
    });
    //Click event to scroll to top
    $('#home-goTop').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
    //if ($(window).scrollTop() < 1) {
    //    $("#bottom-tools-border").hide();
    //}
    $('#feedBack-btn').click(function () {
        $('#feed-back').fadeToggle("slow");
    });
    //$('#bottom-tools-border').mouseover(function () {
    //    $(".bottom-tools").show();
    //}).mouseout(function() {
    //    $(".bottom-tools").hide();
    //});

}