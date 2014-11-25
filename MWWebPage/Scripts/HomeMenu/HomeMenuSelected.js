$('#MenuConditions').click(function () {
    var selectedArry = [];
    var txt="";
    $(".cat[data-selected='True']").each(function (index, obj) {
        selectedArry.push($(obj).attr('data-catname'));
    });
    $(".colorbox").children('[data-selected=True]').each(function (index, obj) {

        selectedArry.push($(obj).attr('data-catname'));
    });

    for (var index = 0; index < selectedArry.length; index++) {
        txt = txt + '<span style="margin-left:10px">' + selectedArry[index] +
             '<i class="glyphicon glyphicon-remove remove-conditions" style="font-size:6px; cursor:pointer; margin-left:5px" data-condition=' + selectedArry[index] + '></i></span>'
     
    }
    $(".condition-select").html(txt);


    $(".remove-conditions").click(function () {
        var removeCondition = $(this).attr('data-condition');
        // Matching conditions by name only, currently not differentiating conditions 
        // from different tabs
        $(".cat[data-selected='True']").each(function (index, obj) {
            if (($(obj).attr("data-catname")) == removeCondition)
            {
                $(obj).removeClass("category-Selected");
                $(obj).removeClass("category-link-active");
                $(obj).attr('data-selected', 'False');
                $(obj).removeClass("Ian-li-changeColor");
                if($(obj).children("a").hasClass("Ian-li-changeColor"))
                    $(obj).children("a").removeClass("Ian-li-changeColor")
            }
        });
        $(".colorbox").children('[data-selected=True]').each(function (index, obj) {
            if (($(obj).attr("data-catname")) == removeCondition)
                $(obj).attr('data-selected', 'False');
        });

        $(this).parent().remove();

        //var searchConditon = $("#strInput").val();
        //$(".cat[data-selected='True']").each(function (index, obj) {

        //    searchConditon += " " + $(obj).attr('data-catname');
        //});
        //$(".colorbox").children('[data-selected=True]').each(function (index, obj) {
        //    searchConditon += " " + $(obj).attr('data-catname');
                
        //});
        //_current_page = 0;
        var sortInfo = $("#sort").attr("data-sortinfo");
        var min = $('input[name="sliderleft"]').val();
        var max = $('input[name="sliderright"]').val();
        var price = [min, max];
        //var price = app.hm.GetPrice();
        var search_args = app.sl.ConditionInputSearch(false, null, null, $("#strInput").val(), price);
        
        app.ps.search(search_args, false);
    });
});

$('#MenuClear').click(function () {
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
    $('#strInput').val("");
    var sortInfo = $("#sort").attr("data-sortinfo");
    var search_args = app.sl.ConditionInputSearch(true, null, null, $("#strInput").val());

    app.ps.search(search_args, false);
});