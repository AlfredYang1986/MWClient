
function HomeHandlerSticks(name, callback, container, data_source) {
    this.element = this.initSticks(name, container, data_source);
    var self = this;
    $(this.element).click(function () {
        callback(container, self.element);
    });
    this.element.find('a').hover(function () {
        $(this).css('cursor', 'pointer');
    }, function () {
        $(this).css('cursor', 'default');
    });
}

HomeHandlerSticks.prototype.initSticks = function (name, container, data_source) {
    return $("<li class='Ian-li cat' data-source=" + data_source + " data-selected='False' data-catname=" + name + "> \
                <a href='#'>" + name + "</a> \
            </li>").appendTo(container);
}

HomeHandlerSticks.prototype.getStickWidth = function () {
    return $(this).css('width');
}

function HomeIndexSticks(name, callback, container) {
    this.element = this.initSticks(name, container);
    var self = this;
    $(this.element).click(function () {
        callback(container, self.element);
    });
    this.element.find('a').hover(function () {
        $(this).css('cursor', 'pointer');
    }, function () {
        $(this).css('cursor', 'default');
    });
}

HomeIndexSticks.prototype.initSticks = function (name, container) {
    return $("<li class='changeLiPadding'><a href='#'>" + name + "</a></li>").appendTo(container);
}

function HomeIndexHandler(listName, indexArray, container, data_source) {
    this.data_source = data_source;

    this.viewport = this.initViewPort(container);
    this.indexvp = this.initIndexViewPort(container);

    this.initHandler(listName);
    this.initIndex(indexArray);

    this.first_show_pos = 0;
    this.last_show_pos = 0;
}

HomeIndexHandler.prototype.leftArraw = function (container) {
    var self = this;
    var lb =   $("<button class='Ian-LeftBotton'> \
                    <i class='glyphicon glyphicon-chevron-left'></i> \
                </button>").appendTo(container);

    $(lb).click(function () {
        self.leftButtonClick(self.viewport);
    });
    return lb;
}

HomeIndexHandler.prototype.leftButtonClick = function (sender) {
    $(sender).animate({
        marginLeft: "-=150",
    }, 100, function () {
        // Animation complete.
    });
}

HomeIndexHandler.prototype.rightArraw = function (container) {
    var self = this;
    var rb = $("<button class='Ian-RightBotton'> \
                <i class='glyphicon glyphicon-chevron-right'></i> \
              </button>").appendTo(container);

    $(rb).click(function () {
        self.rightButtonClick(self.viewport);
    });
    return rb;
}

HomeIndexHandler.prototype.rightButtonClick = function (sender) {
    $(sender).animate({
        marginLeft: "+=150",
    }, 100, function () {
        // Animation complete.
    });
}

HomeIndexHandler.prototype.canScrollLeft = function (container) {
    return parseInt($(container).css('magin-left')) != 0;
}

HomeIndexHandler.prototype.canScrollRight = function (container) {
    return parseInt($(container).css('magin-left')) != 0;
}

HomeIndexHandler.prototype.initViewPort = function (container) {
    var outer = $("<div class='Ian-scrollcon'></div>").appendTo(container);
    var left = this.leftArraw(outer);
    var vp = $("<div class='Ian-Cont center-block'> \
                    <div class='Ian-ScrCont'> \
                        <div class='Ian-brandList'> \
                            <ul class='list-inline home-handler' style='margin-left: 0px'> \
                            </ul> \
                        </div> \
                    </div> \
                </div>").appendTo(outer);
    var right = this.rightArraw(outer);

    var self = this;
    $(outer).mouseover(function () {
        left.css("visibility", "visible");
        right.css("visibility", "visible");
    }).mouseout(function () {
        left.css("visibility", "hidden");
        right.css("visibility", "hidden");
    });

    return $(vp).find('.home-handler').first();
}

HomeIndexHandler.prototype.initIndexViewPort = function (container) {
    var outer = $("<div class='Ian-brandIndex'> \
                    <label class='Ian-brandIndexLabel'>A-Z</label> \
                    <ul class='Ian-BIndexUl home-handler'> \
                    </ul> \
                </div>").appendTo(container);
    return $(outer).find('.home-handler').first();
}

HomeIndexHandler.prototype.initHandler = function (listName) {
    var self = this;
    $.each(listName.sort(), function (index, obj) {
        new HomeHandlerSticks(obj, self.itemCallback, self.viewport, self.data_source);
    });
}

HomeIndexHandler.prototype.initIndex = function (indexArray) {
    var self = this;
    $.each(indexArray, function (index, obj) {
        new HomeIndexSticks(obj, self.indexCallback, self.indexvp);
    });
}

HomeIndexHandler.prototype.itemCallback = function (container, sender) {
    $(container).find('a').each(function (index, elem) {
        $(elem).removeClass("Ian-li-changeColor");
    });
    $(sender).find("a").addClass("Ian-li-changeColor");
}

HomeIndexHandler.prototype.indexCallback = function (container, sender) {
    $(container).find('a').each(function (index, elem) {
        $(elem).removeClass("Ian-li-changeColor");
    });
    $(sender).find("a").addClass("Ian-li-changeColor");
}