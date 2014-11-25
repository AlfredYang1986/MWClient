
function SPElement(imgUrl, container, manager) {

    this.manager = manager;
    this.selected = false;
    this.cutted = false;
    this.z_index = 1000;

    this.leftValue = 0;
    this.topValue = 0;
    this.widthValue = 0;
    this.heightValue = 0;
    this.test = null;

    this.cropX = 0;
    this.cropY = 0;
    this.imageMarginLeft = 40;
    this.container = container;
    this.element = $(this.draggableImage(container));

    this.imageSrc = imgUrl;
    var objImg = this.element.find('img');
    objImg.attr('src', imgUrl);

    this.imageWidth = 200;
    this.imageHeight = 200 * objImg[0].naturalHeight / objImg[0].naturalWidth;
    this.zoom_in = objImg[0].naturalWidth / this.imageWidth;
    this.zoom_in_y = objImg[0].naturalHeight / this.imageHeight;

    var c = this.element.find('canvas');
    var context = c[0].getContext("2d");
    this.restoreImage(c, context, objImg);

    this.element.draggable({
        padding: 1,
        zIndex: "-1",
        revert: "valid",
        containment: $(container),
    });//.resizable();

    this.cavansLayout(c);
    this.draggable_callback(c);
    this.buttonGroupSetup();
}

SPElement.prototype.restoreImage = function (c, context, objImg) {

    $(c)[0].width = this.imageWidth;
    $(c)[0].height = this.imageHeight;
    context.drawImage(objImg[0], 0, 0, objImg[0].naturalWidth, objImg[0].naturalHeight, 0, 0, this.imageWidth, this.imageHeight);
}

SPElement.prototype.draggableImage = function (container) {
    return $('<div class="imgDiv rotate-div"> \
                <div class="pull-left buttons" style="display: none; margin-top:10px; margin-left:10px;"> \
                    <button class="btn  sp_select SP-function-btn SP-border"></button> \
                    <button class="btn  sp_cut SP-function-btn SP-border" style="display:none;"></button> \
                    <button class="btn  sp_restore SP-function-btn SP-border"></button> \
                    <button class="btn  sp_top SP-function-btn SP-border">T</button> \
                    <button class="btn  sp_delete SP-function-btn SP-border"></button> \
                </div> \
                <br> \
                <div class="pull-left placeholder" style="width:40px"></div> \
                <div class="pull-right divcan SP-border"> \
                    <canvas class="rotate-img"></cancas> \
                    <img style="display: none" /> \
                </div> \
              </div>').appendTo(container);
}

SPElement.prototype.cavansLayout = function (c) {
    var self = this;

    this.element.css({
        "display": "none",
        "float": "left",
    });

    $(c).parents('.divcan').css({
        "position": "absolute",
        "top": "0px",
        "left": self.imageMarginLeft,
        "width": self.imageWidth,
        "height": self.imageHeight,
    });

    $(c).parents('.divcan').resizable({
        stop: function (event, ui) {
            var objImg = ui.element.find('img');

            var zx = self.zoom_in;
            var zy = self.zoom_in_y;

            self.zoom_in = self.imageWidth * zx / ui.size.width;
            self.zoom_in_y = self.imageHeight * zy / ui.size.height;

            self.cropX = self.cropX * zx / self.zoom_in;
            self.cropY = self.cropY * zy / self.zoom_in_y;

            self.imageWidth = ui.size.width;
            self.imageHeight = ui.size.height;
        }
    });
    //$(c).parents('.divcan').resizable();

    $(c).css({
        "position": "relative",
        "width": "100%",
        "height": "100%"
    });
}

SPElement.prototype.draggable_callback = function (c) {
    var self = this;
    this.element.hover(function () {
        self.element.children(".buttons").css("display", "block");
    }, function () {
        self.element.children(".buttons").css("display", "none");
    });
}

SPElement.prototype.cuttableCanvas = function (parent, bdraw) {
    var c = $('<canvas class="rotate-img"></cancas>').appendTo(parent.children(".pull-right"));
    $('<img style="display: none" />').attr('src', this.imageSrc).appendTo(parent.children(".pull-right"));
    var objImg = parent.find('img');
    var context = c[0].getContext("2d");

    $(c)[0].width = this.imageWidth;
    $(c)[0].height = this.imageHeight;
    if (bdraw)
        context.drawImage(objImg[0], 0, 0, objImg[0].naturalWidth, objImg[0].naturalHeight,
            0, 0, this.imageWidth, this.imageHeight);

    this.cavansLayout(c);
    this.element.css('display', 'block');
    return c
}

SPElement.prototype.pointInElementRect = function (cx, cy, obj) {
    var reVal = false;
    if (reVal == null) {
        var pos = $(obj).offset();
        var width = $(obj).outerWidth();
        var height = $(obj).outerHeight();

        if (pos.left <= cx && pos.left + width >= cx && pos.top <= cy && pos.top + height >= cy)
            reVal = true;
    }
    return reVal;
}

SPElement.prototype.rightRotation = function (originLeft, originTop) {
    var tmp = $('<div id="rotateRight" class="rotate-temp-right rotate-hide"> \
                    <div class="rotate-transparent-hor"></div> \
                    <canvas id="rotate-right" class="rotate-content-hor" style="float: right"></canvas> \
                </div>').appendTo(this.container);

    var objImg = this.element.find('img');
    var rotateright_left = this.leftValue + this.widthValue + this.cropX;
    var rotateright_width = objImg[0].naturalWidth / this.zoom_in - this.leftValue - this.widthValue;

    $("#rotate-right").css({
        "width": objImg[0].naturalWidth / this.zoom_in - this.leftValue - this.widthValue - this.cropX,
        "height": objImg[0].naturalHeight / this.zoom_in_y,
    });

    $(".rotate-temp-right").css({
        "position": "absolute",
        "top": originTop - this.cropY,
        "height": objImg[0].naturalHeight / this.zoom_in_y,
        "width": 2 * rotateright_width,
        "left": objImg[0].naturalWidth / this.zoom_in - 2 * rotateright_width + originLeft + this.imageMarginLeft,
    });

    var c_r = $(tmp).find('canvas');
    var ctx_r = c_r[0].getContext("2d");

    $(c_r)[0].width = rotateright_width; //objImg[0].naturalWidth / zoom_in - leftValue - widthValue;
    $(c_r)[0].height = objImg[0].naturalHeight / this.zoom_in_y;

    c_r[0].getContext("2d").drawImage(objImg[0], rotateright_left * this.zoom_in, 0, rotateright_width * this.zoom_in, objImg[0].naturalHeight * this.zoom_in_y, 0, 0, rotateright_width, objImg[0].naturalHeight);

    // show the right pane, and ready for animation
    $(".rotate-temp-right").removeClass("rotate-hide").addClass("rotate-show");
    $(".rotate-temp-right").rotate3Di(90, 400, { direction: 'clockwise', complete: this.RightRotateComplete });
}

SPElement.prototype.RightRotateComplete = function () {
    $('#rotateRight').remove();
}

SPElement.prototype.leftRotation = function (originLeft, originTop) {
    var tmp = $('<div id="rotateLeft" class="rotate-temp-left rotate-hide" > \
                    <canvas id="rotate-left" class="rotate-content-hor"></canvas> \
                    <div class="rotate-transparent-hor"></div> \
                </div>').appendTo(this.container);

    var objImg = this.element.find('img');
    var rotateright_left = this.leftValue + this.cropX;

    //left side rotate
    $("#rotate-left").css({
        "width": rotateright_left,
        "height": objImg[0].naturalHeight / this.zoom_in_y
    });

    $(".rotate-temp-left").css({
        "position": "absolute",
        "left": originLeft + this.imageMarginLeft - this.cropX,
        "top": originTop - this.cropY,
        "width": 2 * rotateright_left,
        "height": objImg[0].naturalHeight / this.zoom_in_y
    });

    var c_r = $(tmp).find('canvas');

    // set coordinate
    $(c_r)[0].width = rotateright_left;
    $(c_r)[0].height = objImg[0].naturalHeight / this.zoom_in_y;

    c_r[0].getContext("2d").drawImage(objImg[0], 0, 0, rotateright_left * this.zoom_in, objImg[0].naturalHeight * this.zoom_in, 0, 0, rotateright_left, objImg[0].naturalHeight);

    // show the right pane, and ready for animation
    $(".rotate-temp-left").removeClass("rotate-hide").addClass("rotate-show");

    $(".rotate-temp-left").rotate3Di(-90, 400, { direction: 'clockwise', complete: this.LeftRotateComplete });
}

SPElement.prototype.LeftRotateComplete = function () {
    $('#rotateLeft').remove();
}

SPElement.prototype.upRotation = function (originLeft, originTop) {
    var self = this;
    var tmp = $('<div id="totateTop" class="rotate-temp-top rotate-hide"> \
                <canvas id="rotate-top" class="rotate-content-ver"></canvas> \
                <div class="rotate-transparent-var"></div> \
            </div>').appendTo(this.container);

    var objImg = this.element.find('img');

    $("#rotate-top").css({
        //"top": "0px",
        //"left": this.imageMarginLeft,
        "width": this.widthValue,
        "height": this.topValue + this.cropY,
    });

    //top rotate
    $(".rotate-temp-top").css({
        "position": "absolute",
        "left": this.imageMarginLeft + this.leftValue + originLeft,
        "top": originTop - this.cropY,
        "width": this.widthValue,
        "height": (this.topValue + this.cropY) * 2,
    });

    var c_r = $(tmp).find('canvas');

    $(c_r)[0].width = this.widthValue;
    $(c_r)[0].height = this.topValue;

    c_r[0].getContext("2d").drawImage(objImg[0], (this.cropX + this.leftValue) * this.zoom_in, 0, this.widthValue * this.zoom_in, (this.cropY + this.topValue) * this.zoom_in_y, 0, 0, this.widthValue, this.topValue);

    // show the right pane, and ready for animation
    $(".rotate-temp-top").removeClass("rotate-hide").addClass("rotate-show");

    $(".rotate-temp-top").delay(400).transit({
        rotateX: 90,
    }, 400, function () {
        self.TopRotateComplete();
    });
}

SPElement.prototype.TopRotateComplete = function () {
    $('#totateTop').remove();
}

SPElement.prototype.bottomRotation = function (originLeft, originTop) {
    var self = this;
    var tmp = $('<div id="rotateBottom" class="rotate-temp-bottom totate-hide" style="1px solid red"> \
                <div class="rotate-transparent-ver"></div> \
                <canvas id="rotate-bottom" class="rotate-content-ver"></canvas> \
            </div>').appendTo(this.container);

    var objImg = this.element.find('img');

    var rotatebottom_bottom = objImg[0].naturalHeight / this.zoom_in_y - this.heightValue - this.topValue - this.cropY;

    $("#rotate-bottom").css({
        "width": this.widthValue,
        "height": rotatebottom_bottom,
    });

    $(".rotate-temp-bottom").css({
        "left": this.imageMarginLeft + this.leftValue + originLeft,
        "top": objImg[0].naturalHeight / this.zoom_in_y - rotatebottom_bottom * 2 + originTop - this.cropY,
        "width": this.widthValue,
        "height": 2 * rotatebottom_bottom,
    });

    var c_b = $(tmp).find('canvas');

    $(c_b)[0].width = this.widthValue;
    $(c_b)[0].height = rotatebottom_bottom;

    c_b[0].getContext("2d").drawImage(objImg[0], (this.cropX + this.leftValue) * this.zoom_in, (objImg[0].naturalHeight / this.zoom_in_y - rotatebottom_bottom) * this.zoom_in, this.widthValue * this.zoom_in, rotatebottom_bottom * this.zoom_in_y, 0, 0, this.widthValue, rotatebottom_bottom);

    // show the right pane, and ready for animation
    $(".rotate-temp-bottom").removeClass("rotate-hide").addClass("rotate-show");

    $(".rotate-temp-bottom").delay(400).transit({
        rotateX: 90,
    }, 400, function () {
        self.BottomRotateComplete();
    });
}

SPElement.prototype.BottomRotateComplete = function () {
    $('#totateBottom').remove();
}

SPElement.prototype.buttonGroupSetup = function () {
    var self = this;

    this.element.find(".sp_select").click(function () {
        if (self.selected)
            return;

        self.test = $.Jcrop(self.element.find('canvas'), {
            onChange: function (c) {
                self.leftValue = c.x;
                self.topValue = c.y;
                self.widthValue = c.w;
                self.heightValue = c.h;

                self.selected = true;
            },
            onRelease: function (c) {
                self.cuttableCanvas(self.element, true);
                self.test.destroy();
            }
        });
        $('.sp_cut').show();
        $('.sp_select').hide();
    });
    
    this.element.find(".sp_cut").click(function () {
        // albert
        //if ($('div .jcrop-holder').children(":first").css("left") != null) {

        //    var crop_x = parseInt($('div .jcrop-holder').parent().attr("data-cropx")) + parseInt($('div .jcrop-holder').children(":first").css("left").replace(/[^0-9]/ig, ""));
        //    var crop_y = parseInt($('div .jcrop-holder').parent().attr("data-cropy")) + parseInt($('div .jcrop-holder').children(":first").css("top").replace(/[^0-9]/ig, ""));
        //    $('div .jcrop-holder').parent().attr("data-cropx", crop_x);
        //    $('div .jcrop-holder').parent().attr("data-cropy", crop_y);
        //    //alert($('div .jcrop-holder').parent().attr("data-cropx"));
        //    //alert($('div .jcrop-holder').children(":first").css("left").replace(/[^0-9]/ig, ""));
        //}
        //------albert end
        $('.sp_cut').hide();
        $('.sp_select').show();
        if (!self.selected) {
            alert("selected first");
            return;
        }
        var d = self.element;
        var originLeft = $(d).position().left;
        var originTop = $(d).position().top;

        self.cuttableCanvas(self.element, false);
        self.test.destroy();

        var objImg = $(d).find('img');
        var c = $(d).find(".rotate-img");
        var context = c[0].getContext("2d");

        self.imageWidth = self.widthValue;
        self.imageHeight = self.heightValue;

        self.rightRotation(originLeft, originTop);
        self.leftRotation(originLeft, originTop);
        self.upRotation(originLeft, originTop);
        self.bottomRotation(originLeft, originTop);

        //center image
        $(c).parents('.divcan').css({
            "width": self.imageWidth,
            "height": self.imageHeight,
        });

        $(d).css({
            "left": self.leftValue + $(d).position().left,
            "top": self.topValue + $(d).position().top,
            "width": self.widthValue + self.imageMarginLeft,
            "height": self.heightValue,
        });

        self.leftValue += self.cropX;
        self.topValue += self.cropY;
        $(c)[0].width = self.imageWidth;
        $(c)[0].height = self.imageHeight;
        context.drawImage(objImg[0], self.leftValue * self.zoom_in, self.topValue * self.zoom_in, self.widthValue * self.zoom_in, self.heightValue * self.zoom_in, 0, 0, self.imageWidth, self.imageHeight);
        self.draggable_callback(c);
        self.selected = false;
        self.cutted = true;
        self.cropX = self.leftValue;
        self.cropY = self.topValue;
    });
    
    this.element.find(".sp_restore").click(function () {
        if (self.cutted) {
            var objImg = self.element.find('img');
            var c = self.element.find('canvas');
            var context = c[0].getContext("2d");
            self.restoreImage(c, context, objImg);
            self.cutted = false;
        }
    });
    
    this.element.find(".sp_top").click(function () {
        self.manager.topElement(self);
    });
    
    this.element.find(".sp_delete").click(function () {
        self.manager.deleteElement(self);
    });
}