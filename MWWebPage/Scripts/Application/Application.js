
function Application() {
    this.hm = null; // home menu entry
    this.ps = null; // photo stream
    this.sl = null; // search logic
    this.bd = null; // background drawer
    this.sk = null; // SideToolKitEntry
}

Application.prototype.setHomeMenuEntry = function (value) {
    this.hm = value;
}

Application.prototype.getHomeMenuEntry = function () {
    return this.hm;
}

Application.prototype.setPhotoStream = function (value) {
    this.ps = value;
}

Application.prototype.getPhotoStream = function () {
    return this.ps;
}

Application.prototype.setSearchLogic = function (value) {
    this.sl = value;
}

Application.prototype.getSearchLogic = function () {
    return this.sl;
}

Application.prototype.setBackgroundDrawer = function (value) {
    this.bd = value;
}

Application.prototype.getBackgroundDrawer = function () {
    return this.bd;
}

Application.prototype.setSideToolKit = function (value) {
    this.sk = value;
}

Application.prototype.getSideToolKit = function () {
    return this.sk;
}

Application.prototype.initialize = function () {
    scenarioSwitch();
    bottomToolsSet();
    app.getSearchLogic().sort();
    gotoTop();
    app.getBackgroundDrawer().drawBroadcast();

    var showArray = new Array("Conditions", "Categories", "Brands", "Tags", "Color", "Budget","Gender");
    app.getHomeMenuEntry().defaultShow(showArray);
    app.getPhotoStream().searchSuccess();
}

Application.prototype.autoComplete = function (elem, data_url, bc) {
    elem.autocomplete({
        create: function () {
            $(this).css('z-index', 500);
        },
        source: function (request, response) {
            $.ajax({
                url: data_url,
                method: 'Get',
                dataType: "json",
                contentType: 'application/json, charset=utf-8',
                data: {
                    search: elem.val()
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
        minLength: bc,
    });
}

Application.prototype.bindFuncToElem = function (elem, event_name, func) {
    
    elem.bind(event_name, func);
}

//image move
function galleryDragAndDrop(mainContainer, gallery_from, gallery_to, drag_item) {
    $(drag_item).draggable({
        zIndex: "600",
        revert: "invalid",
        containment: mainContainer,
        helper: "clone",
        //helper: "original",
        cursor: "move",
        drag: function (event, ui) {
            $(ui.helper.prevObject).addClass("darg_box_current");
        },
        stop: function (event, ui) {
            $(ui.helper.prevObject).removeClass("darg_box_current");
        }
    });

    $(gallery_to).droppable({
        accept: drag_item,
        activeClass: "ui-state-highlight",
        drop: function (event, ui) {
            acceptDragItemInGallery(ui.draggable, gallery_to);

            var brand = ui.draggable.find(".brand").attr('data-sort');
            var price = ui.draggable.find(".price").attr('data-sort');
            var img = ui.draggable.find(".search-details").attr('src');
            var category = ui.draggable.attr('data-cat');
            var purchase = ui.draggable.find(".purchase a").attr('href');
            var itemId = ui.draggable.attr('data-source');
            var source = ui.draggable.find('.source').children("span").text();
            price = parseFloat(price).toFixed(2);
            price = "$" + price;
            purchase = "'" + purchase + "'";

            var text = '<div class="sp-list" style="height:110px;width100%;  margin-top:20px; margin-left:auto; margin-right:auto;" data-itemid="' + itemId + '"> \
                    <img src="' + img + '" style="height: 100%; width: 90px; margin-left: 20px; float: left; ">\
                    <div style="height: 95%; width: 100%; border: 1px solid #D6D6D6; border-radius: 8px; margin-left: 20px; float: left;" class="sp-list-info"> \
                        <div style=" background-color: #EEECED; height: 25px; font-size: 12px;  ">  <p style="margin-left: 8%; float:left; width:52%; overflow:hidden;">' + category + '</p>    <p style="width:40%; float: left; overflow:hidden;">color</p></div> \
                        <div style=" background-color: #F7F7F7; height: 25px; font-size: 12px; "> <p style="margin-left: 8%; float: left; width:72%; overflow:hidden;">' + brand + '</p> <p style="float: left; width: 20%;; overflow:hidden;">' + price + '</p></div> \
                        <div style=" background-color: #EEECED; height: 25px; font-size: 12px; "> <span style="margin-left: 8%;">'+source+'</span></div> \
                        <div  style="background-color: #F7F7F7; border-radius: 5px; height: 25px; float: left; width: 50%; text-align: center; font-size: 12px; line-height:25px; cursor:pointer" class="SP-list-hover list-collect" >COLLECT</div> \
                        <div style="background-color: #F7F7F7; border-radius: 5px; height: 25px; float: left; width: 50%; text-align: center; font-size: 12px;line-height: 25px; cursor: pointer; " class="SP-list-hover" onclick="window.open('+ purchase + ')"> PURCHASE </div> \
                    </div> \
                    </div>'
            $("#SP-list").append(text);
            var InfoWidth = $("#SP-list").width() - 152;
            $('.sp-list-info').width(InfoWidth);
            $('.imgDiv').last().attr('data-itemID', itemId);

        }
    });

    function acceptDragItemInGallery(item, gallery_to) {

        var man = app.sk.stylepaltte.sp_elem_manager;
        if (man.canAddElement()) {
            var g = new SPElement(item.find('.search-details').attr('src'), gallery_to, man);
            g.element.fadeIn();
        }
    }
}