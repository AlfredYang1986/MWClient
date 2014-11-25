function scenarioSwitch() {
    $('.scenario-switch').click(function () {
        $('.scenario-searchAdd').toggle();
        if ($('.scenario-searchAdd').is(":visible"))
            $('#strInput').css("paddingLeft", "150px");
        else
            $('#strInput').css("paddingLeft", "5px");
    });
}