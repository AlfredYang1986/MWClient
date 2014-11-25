function PhotoStream(parent, callback, containt, top) {
    this.current_page = 0;
    this.item_width = 220;
    this.item_extent_height = 44;
    this.item_img_min_height = 140;
    this.item_margin_between = 15;
    this.current_last_pos = [];

    this.parent_element = parent;
    this.item_callback = callback;
    this.display_containt = containt;

    this.margin_left = 0;
    this.margin_top = top;

    this.singleItemCallback = null;
}

PhotoStream.prototype.Reset = function () {
    var window_width = $(this.parent_element).width();
    var col = parseInt(window_width / (this.item_width + this.item_margin_between));
    //$(this.parent_element).css("width", (col * this.item_width + (col - 1) * this.item_margin_between));
    this.margin_left = (window_width - col * (this.item_width + this.item_margin_between)) / 2;
    //$(this.parent_element).css("margin-left", this.margin_left);
    this.current_last_pos = [];
    this.current_last_pos.length = 0;
    for (var index = 0; index < col; ++index)
        this.current_last_pos.push(this.margin_top);
}

PhotoStream.prototype.find_col_insert = function () {
    var col_in = 0;
    for (var index = 0; index < this.current_last_pos.length; ++index) {
        if (this.current_last_pos[col_in] > this.current_last_pos[index])
            col_in = index;
    }
    return col_in;
}

PhotoStream.prototype.next_x_position = function () {
    var t = (this.item_width + this.item_margin_between) * this.find_col_insert() + this.margin_left;
    return t;
}

PhotoStream.prototype.next_y_position = function () {
    return this.current_last_pos[this.find_col_insert()];
}

PhotoStream.prototype.post_insert = function (img_height) {
    var index = this.find_col_insert();
    this.current_last_pos[index] += Math.max(img_height, this.item_img_min_height) + this.item_extent_height;
}

PhotoStream.prototype.layout_one = function (obj) {
    var self = this;
    obj[0].style.position = "absolute";
    obj[0].style.left = this.next_x_position() + "px";
    obj[0].style.top = this.next_y_position() + "px";
    var img = $(obj).find('.search-details').first();
    $(img).css({
        "height": $(this).naturalHeight() * $(this).naturalWidth / this.item_width,
        "width": this.item_width
    })
    var t = img.naturalHeight() * 1.0 * this.item_width / img.naturalWidth();
    this.post_insert(t);
    obj.fadeIn(400);

    $(obj).find('.img').click(function () {
        self.singleItemCallback(img);
    });
}

PhotoStream.prototype.layout_all = function () {
    this.Reset();
    var self = this;
    $(this.display_containt).children('.item').each(function (index, obj) {
        self.layout_one($(obj));
    });
    var x = $(".item_face").eq(0).position();
    var sortByWid = 220 + x.left - 183;
    $('#sort-by').css('left', sortByWid);
}

PhotoStream.prototype.layout_page = function () {
    var self = this;
    $(this.parent_element).find('.' + this.current_page).each(function (index, obj) {
        self.layout_one($(obj));
    });
}

PhotoStream.prototype.append_elements = function (data) {
    $(this.display_containt).append(data);
}

PhotoStream.prototype.replace_elements = function (data) {
    this.Reset();
    $(this.display_containt).html(data);
}

PhotoStream.prototype.search = function (search_args, bAppend) {

    if (bAppend) this.current_page++;
    else this.current_page = 0;

    search_args['currentPage'] = this.current_page;

    var self = this;
    var sd = { "searchArgs": JSON.stringify(search_args) };

    $.ajax({
        url: '/MWHome/Search',//'@Url.Action("Search", "MWHome")',
        type: 'POST',
        dataType: 'html',
        contentType: 'application/json, charset=utf-8',
        data: JSON.stringify(sd),
        cache: false,
        beforeSend: function () {
            Loading();
        },
        complete: function () {
            hiddenLoading();
        },
        success: function (data) {
            if (bAppend) self.append_elements(data);
            else self.replace_elements(data);
            self.searchSuccess();
            $('#sort-by').show();           
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });

    app.sl.specialSearch = false;
}

PhotoStream.prototype.advance_search = function (search_args) {

    this.current_page = 0;
    search_args['currentPage'] = this.current_page;

    var self = this;
    var sd = { "searchArgs": JSON.stringify(search_args) };
    $.ajax({
        //url: '/MWHome/SearchWithSelect',
        url: '/MWHome/Search',
        type: 'POST',
        dateType: 'html',
        contentType: 'application/json, charset=utf-8',
        data: JSON.stringify(sd),
        cache: false,
        beforeSend: function () {
            Loading();
        },
        complete: function () {
            hiddenLoading();
        },
        success: function (data) {
            self.replace_elements(data);
            self.searchSuccess();         
            $('#sort-by').show();
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });

    app.sl.specialSearch = false;
}

PhotoStream.prototype.searchSuccess = function () {

    var self = this;

    var imageTotal = $(this.display_containt).find('.waterfall_img_' + this.current_page).length;
    var imageCount = 0;
    $(this.display_containt).find('.waterfall_img_' + this.current_page).each(function (index, obj) {
        //if (self.current_page == 0)
        //    self.Reset();

        var img = $(this);
        img.load(function () {
            $(this).css({
                "height": $(this).naturalHeight() * $(this).naturalWidth / self.item_width,
                "width": self.item_width
            });
            self.layout_one($(this).parents('.item'));
            var x = $('#searchResults').children().eq(0).position();
            var sortByLeft = 220 + x.left - 183;
            $('#sort-by').css('left', sortByLeft);
        }).error(function () {
            $(this).parents(".item").remove();
        });
 
    });
    this.item_callback(this);
}

function main_item_callback(callbackOwner) {
    

    $(".item_t").mouseover(function () {
        $(this).css('box-shadow', '0 1px 5px rgba(35,25,25,0.5)');  
    }).mouseout(function () {
        $(this).css('box-shadow', '0 1px 3px rgba(34,25,25,0.2)');
    });
    $(".item_b").mouseover(function () {
        $(this).prev().css('box-shadow', '0 1px 5px rgba(35,25,25,0.5)');
    }).mouseout(function () {
        $(this).prev().css('box-shadow', '0 1px 3px rgba(34,25,25,0.2)');
    });

    $(".item_c").mouseover(function () {
        $(this).css('box-shadow', '0 1px 5px rgba(35,25,25,0.5)');
    }).mouseout(function () {
        $(this).css('box-shadow', '0 1px 3px rgba(34,25,25,0.2)');
    });

    function Like_Button(itemId, itemclass, elem) {
        var likecount =$(itemclass).children("em").html();
        $.ajax({
            url: '/MWHome/UpdataLikeCount',
            method: 'Get',
            dataType: "json",
            contentType: 'application/json, charset=utf-8',
            data: {
                itemID: itemId
            },
            success: function (data) {
                if(data === "True") 
                    //$(elem).parents
                $(itemclass).children("em").html(++likecount);
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });
    }

    $(".like_btn").click(function (event) {
        
        var elem = $(this);
        var itemId = $(this).parents('.item').attr("data-source");
        Like_Button(itemId, ".items_likes", elem)
        event.stopPropagation();
    });

    $(".WS-like-btn").click(function (event) {
        event.stopPropagation();
        var elem = $(this);
        var itemId = $("#WS-like-button").attr("data-itemId");
        Like_Button(itemId, "#WS-like-button", elem)
    });

    $("#W-Third-likeBtn").click(function (event) {
        event.stopPropagation();
        var elem = $(this);
        var itemId = $("#W-Third-SingleImg").attr("data-itemId");
        //Like_Button(itemId, "#W-Third-centerInfo", elem)
        Like_Button(itemId, "#W-Third-likeBtn", elem)
    });

    // Drag and Drop
    galleryDragAndDrop("#page-wrapper", "#searchResults", "#The-style-palette-addfromwardrobe", "." + "item");

    function item_click(tmp) {
        var singleItemImg = $(tmp).attr("src")
        var singleItemBrand = $(tmp).parents(".item_t").siblings(".item_b").find(".brand").text();
        var singleItemTitle = $(tmp).parents(".item_face").attr("data-cat");
        var singleItemPrice = $(tmp).parents(".item_t").siblings(".item_b").find(".price").text();
        var signleItemLike = $(tmp).parents(".item_face").attr("data-like");
        var signleItemId = $(tmp).parents(".item_face").attr("data-source");
        var singleItemSource = $(tmp).parents(".item_face").attr("data-sourceName");
        var purchaseLink = $(tmp).parents(".item_t").siblings(".item_c").find(".purchase").children('a').attr("href");
        $("#Wardrobe-third-modal").modal("show");
        $(".modal-backdrop.in").css({
            "filter": "alpha(opacity=50)",
            "opacity": ".5"
        });
        $(tmp).parents(".item_face").attr("data-click", "True");
        $("#W-Third-leftTop-title").text(singleItemTitle);
        $("#W-Third-leftTop-brand").text(singleItemBrand);
        $("#W-Third-leftTop-price").text(singleItemPrice);
        $("#W-Third-SingleImg").attr("src", singleItemImg);
        $("#W-Third-like").text(signleItemLike);
        $("#W-Third-SingleImg").attr("data-itemId", signleItemId);
        $('#W-Third-srcBtn').text(singleItemSource);
        $("#W-Third-buyBtn").attr("href", purchaseLink);
        $("#bottom-tools-border").hide();
    }
    $("#Wardrobe-third-modal").on('hidden.bs.modal', function () {
        $("#bottom-tools-border").show();
    });
    $(".hanger").click(function (event) {
        $("#AddToWardrobe-modal").modal("show");
        var itemId = $(this).parents(".item ").attr("data-source");
        $.ajax({
            url: '/MWTag/ListAllTags',
            method: 'Get',
            dataType: "html",
            contentType: 'application/json, charset=utf-8',
            data: {
                _userId: "0lj4rFDbJa66VRpK",
            },
            success: function (data) {
                $("#AddToW-tag").html(data);
                $("#AddToW-tag").attr("data-ItemId", itemId);
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });
        event.stopPropagation();
    });

    callbackOwner.singleItemCallback = item_click;
}