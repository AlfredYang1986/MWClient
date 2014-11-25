function SearchLogic() {
    this.specialSearch = true;
}

SearchLogic.prototype.sort = function () {
    var sortName = "";
    var sortMethod = "";
    $(".dropdown-menu .sort").click(function () {
        $("#sort").text($(this).html());
        $("#sort").attr("data-sortinfo", $(this).attr("data-sort"));
    })
}

SearchLogic.prototype.addPrice = function (search_object, max, min) {
    var tmp = new Object();
    tmp['maxPrice'] = max;
    tmp['minPrice'] = min;
    search_object['price'] = tmp;
}

SearchLogic.prototype.addNotCondition = function (search_object, source, val) {
    if (source != null) {
        var tmp = new Object();
        tmp["type"] = source;
        tmp["val"] = val;
        if ("notConditions" in search_object) search_object["notConditions"].push(tmp);
        else search_object["notConditions"] = [tmp];
    }
}

SearchLogic.prototype.addCondition = function (search_object, source, val) {
    if (source != null) {
        var tmp = new Object();
        tmp["type"] = source;
        tmp["val"] = val;
        if ("conditions" in search_object) search_object["conditions"].push(tmp);
        else search_object["conditions"] = [tmp];
    }
}

SearchLogic.prototype.addSearchInput = function (search_object, input) {
    if (input != null && input != "") search_object['input'] = input;
    else search_object['input'] = "null";
}

SearchLogic.prototype.addSort = function (search_object) {
    var strSort = $('#sort').attr('data-sortinfo');
    var s = strSort.split(' ');
    search_object['sortName'] = s[0];
    search_object['sortMethod'] = s[1];
}

SearchLogic.prototype.addSence = function (search_object) {
    var sence = $("#Scene").attr("data-scene");
    search_object['sence'] = sence;
}

SearchLogic.prototype.ConditionInputSearch = function (bInitial, source, val, input, price) {
    var self = this;
    var search_object = new Object();

    if (bInitial) {
        //$('#MenuClear').click();
        ClearConditions_2(input);
    } else {
        $(".cat[data-selected='True']").each(function (index, obj) {
            self.addCondition(search_object, $(obj).attr('data-source'), $(obj).attr('data-catname'));
        });
        $(".colorbox b[data-selected='True']").each(function (index, obj) {
            self.addCondition(search_object, $(obj).attr('data-source'), $(obj).attr('data-catname'));
        })
    }
    this.addCondition(search_object, source, val);
    //this.addNotCondition(search_object, source, val);

    this.addSearchInput(search_object, input);
    if (price == null)
        this.addPrice(search_object, 10000, 0);
    else
        this.addPrice(search_object, price[1], price[0]);

    this.addSort(search_object);

    this.addSence(search_object);
    //search_object['Page'] = app.ps.current_page;
    search_object['discount'] = false;

    //return JSON.stringify(search_object);
    return search_object;
}

SearchLogic.prototype.discountSearch = function () {
    var search_object = new Object();
    search_object['discount'] = true;
    //search_object['Page'] = app.ps.current_page;

    //return JSON.stringify(search_object);
    return search_object;
}