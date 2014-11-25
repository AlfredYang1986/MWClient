/**
 * Home Menu Entry to encpsule menu functions
 * Created by Alfred Yang
 * 20/07/2014
 */
function HomeMenuEntry(cat_array, brand_array, brand_index_array) {
    var subCategory = false;
    //CategoryHandler(cat_array, subCategory);
    //this.bh = new BrandHandler(brand_array, brand_index_array);
    //this.bh.initBrands();
    this.bh = new HomeIndexHandler(brand_array, brand_index_array, $('#Brands'), 'brand');
    this.ca = new HomeIndexHandler(cat_array, brand_index_array, $('#Categories'), 'category');
}

HomeMenuEntry.prototype.defaultShow = function (showArray) {

    var self = this;

    $.each(showArray, function () {
        var element = new String(this);

        $("#Menu" + this).click(function () {
            var bClick = $(this).hasClass("active-link");

            $.each(showArray, function () {
                $("#" + this).css("display", "none");
                $("#Menu" + this).removeClass("active-link");
            });
            if (!bClick) {
                //if (element == "Categories") {
                //    self.drawMidBackgroundLevel(1);
                //    if (($("#" + element).find(".open").length) > 0)
                //        self.drawMidBackgroundLevel(2);
                //}
                //else
                    self.drawMidBackgroundLevel(2);

                $("#" + element).css("display", "block");
                $("#Menu" + element).addClass("active-link");
                //var func_Inner = window[element + "_Inner"];
                var func_Inner = self[element + "_Inner"];
                func_Inner();
            } else {
                self.drawMidBackgroundLevel(0);
            }
        });
    });
}

HomeMenuEntry.prototype.drawMidBackgroundLevel = function (state) {
    switch (state) {
        case 0:
            app.bd.drawMidMenu();
            break;
        case 1:
            app.bd.drawExpend();
            break;
        case 2:
            app.bd.drawFinalExpend();
            break;
    }
}

HomeMenuEntry.prototype.Conditions_Inner  = function () {}

HomeMenuEntry.prototype.Categories_Inner = function () { }

HomeMenuEntry.prototype.Brands_Inner = function () { }

HomeMenuEntry.prototype.Tags_Inner = function () { }

HomeMenuEntry.prototype.Color_Inner = function () {

    $(".cat-color").click(function () {
        //var user_select = app.sl.ConditionInputSearch_fake(false, null, null, $("#strInput").val());

        var current_color = $(this).attr('data-catname');
        $(".colorbox b").each(function (index, obj) {
            if ($(obj).attr('data-catname') != current_color)
                $(obj).attr('data-selected', 'False');
            else
                if ($(obj).attr('data-selected') == 'True')
                    $(obj).attr('data-selected', 'False');
                else
                    $(obj).attr('data-selected', 'True');
        });
      
        var search_args = app.sl.ConditionInputSearch(false, null, null, $("#strInput").val(),null);
        var sortInfo = $("#sort").attr("data-sortinfo");
        app.ps.advance_search(search_args);
        $("#block-cover").css({
            "display": "none",
        });
    });
}

HomeMenuEntry.prototype.Budget_Inner = function () {

    $("#slider").editRangeSlider();
    var self = this;
    function _bugget_handle() {
        
        var min = $('input[name="sliderleft"]').val();
        var max = $('input[name="sliderright"]').val();
        var price = [min,max]; 
        //self.GetPrice(price);
        var search_args = app.sl.ConditionInputSearch(false, null, null, $("#strInput").val(), price);

        app.ps.advance_search(search_args);
        $("#block-cover").css({
            "display": "none",
        });
    }

    $(".ui-rangeSlider-leftHandle").mouseup(function (event) {
        _bugget_handle();
    });
    $(".ui-rangeSlider-rightHandle").mouseup(function (event) {
        _bugget_handle();
    });
    $(".ui-rangeSlider-bar").mouseup(function () {
        _bugget_handle();
    });

    $(".ui-editRangeSlider-inputValue").change(function () {
        _bugget_handle();
    });
}
HomeMenuEntry.prototype.GetPrice = function (price) {
    var min = $('input[name="sliderleft"]').val();
    var max = $('input[name="sliderright"]').val();
    price = [min, max];
}
