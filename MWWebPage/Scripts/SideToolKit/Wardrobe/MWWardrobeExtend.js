
function WardrobeExtend() {
    this.totalNumberOfTag = 0;
    this.tagId;
    this.WS_itemNum = 0;
    this.Tname = "";

    this.WS_FirstAjaxCall();
    this.WS_ClickTag();
    this.WS_ChangeLeftImg();
    this.WS_ItemXbuttonHover();
    this.WS_itemDeleteTag();
    this.WS_changeSortBy();
    this.WS_itemSetCover();
    this.WS_clickOutfit();
    this.WS_clickSingleItem();
    this.Wardrobe_showAllItems();
    this.AddToWardrobePopup();
    this.AllItemSelect();
    this.ReturnLikeCount_Waterfall();
}

WardrobeExtend.prototype.wardrobe_second = function (index) {

    if ($('.W-second-Tul').children().length > 4) {
        $('.W-second-scroll').jCarouselLite({
            visible: 4,
            speed: 100,
            pause: true,
            start: index,
            btnPrev: function () {
                return $(this).parent().siblings().find('#W-second-LB');
            },
            btnNext: function () {
                return $(this).parent().siblings().find('#W-second-RB');
            },
            beforeStart: function () {
            },
            afterEnd: function () {
            }
        });
    }
}

WardrobeExtend.prototype.WS_FirstAjaxCall = function () {
    var self = this;
    $(".circle").live("click", function () {
        // albert change
        //if (($(this).find("textarea").prop("disabled")) == true) {
        //    $("#W-second-modal").modal("show");
        //    $(".modal-backdrop.in").css({
        //        "filter": "alpha(opacity=50)",
        //        "opacity": ".5"
        //    });
        //        self.showWStags();
        //        var pagenumber = parseInt($(".carousel-indicators").find(".active").attr("data-slide-to"));
        //        var clickIndex = pagenumber * 10 + parseInt($(this).attr("data-clickindex"));
        //        var scrollindex;               
        //        if (totalNumberOfTag - clickIndex >= 4) {
        //            scrollindex = clickIndex+1;
        //        }
        //        else {
        //            scrollindex = totalNumberOfTag - 3;
        //        }
        //        window.setTimeout(function () {
        //            self.wardrobe_second(scrollindex);
        //        }, 150);
        //    self.WS_FstShowTags(clickIndex+1);
        //    var DimgSrc = $(this).attr("data-picUrl");
        //    $("#WS-left-img").attr("src", DimgSrc);
        //    var WS_tagName = $(this).find("input").val();
        //    tagId = $(this).attr("data-tagid");
        //    $.ajax({
        //        url: '/MWTag/ListUserItemsByCategory',
        //        method: 'Get',
        //        dataType: "html",
        //        contentType: 'application/json, charset=utf-8',
        //        data: {
        //            _userId: "0lj4rFDbJa66VRpK", _tagId: tagId
        //        },
        //        success: function (data) {
        //            $("#W-second-items").html(data);
        //            $("#WS-itemTags").html(WS_tagName);
        //            $('#WS-itemTags').attr("data-tagId", tagId);
        //            self.showDefaultPicInfo(DimgSrc)
        //        },
        //        error: function (xhr, status, error) {
        //            alert(error);
        //        }
        //    });    
        //}        
    });
}

WardrobeExtend.prototype.showWStags = function () {
    var showTagString = "";
    totalNumberOfTag = $('.circle').children("input").length;
    showTagString += "<div class='W-second-scroll'><ul class='W-second-Tul'>"
    showTagString += "<li class='W-second-TLi' data-tagId='All'><div class='W-second-TLi-div'><img src='...' alt='' class='img-circle'/><p class='text-center'><span>All</span></p></div></li>";
    for (var i = 0; i < $('.circle').children("input").length; i++) {
        var tagid = $('.circle').children("input").eq(i).parent().attr("data-tagid");
        var imgSrc = $('.circle').children("input").eq(i).parent().attr("data-picUrl");
        var tagName = $('.circle').children("input").eq(i).val();
        showTagString += "<li class='W-second-TLi' data-tagId='";
        showTagString += tagid;
        showTagString += "'><div class='W-second-TLi-div'><img src='";
        showTagString += imgSrc;
        showTagString += "' alt='...' class='img-circle' /><p class='text-center'><span>"
        showTagString += tagName;
        showTagString += "</span></p></div></li>";
    }
    showTagString += "</ul></div>"
    $("#recreate-WS-scroll").html(showTagString);
    $(".W-second-TLi").each(function () {
        $(this).children().css("cursor", "pointer");
    });
}

WardrobeExtend.prototype.WS_ClickTag = function () {
    var self = this;
    $(".W-second-TLi").live('click', function () {
        var showLeftImg = '<img id="WS-left-img" src="" alt="..." />';
        $("#WS-left-img-div").html(showLeftImg);
        var picUrl=$(this).find("img").attr("src");
        $("#WS-left-img").attr("src", picUrl);
        $(this).find("p").addClass("WS-changeTheBackgroundColor");
        $(this).find("img").css("visibility", "visible");
        $(this).siblings().find("img").css("visibility", "hidden");
        $(this).siblings().find("p").removeClass("WS-changeTheBackgroundColor");
        Tname = $(this).find("p").text();
        tagId = $(this).attr("data-tagId");
        $("#W-second-left-img-info").show();
        if ($(this).attr("data-tagId") == "All") {
            self.Wardrobe_showAllSingleItems();
        }
        else {
            $.ajax({
                url: '/MWTag/ListUserItemsByCategory',
                method: 'Get',
                dataType: "html",
                contentType: 'application/json, charset=utf-8',
                data: {
                    _userId: "0lj4rFDbJa66VRpK", _tagId: tagId
                },
                success: function (data) {
                    $("#W-second-items").html(data);
                    $('#WS-itemTags').attr("data-tagId", tagId);
                    $('#WS-itemTags').text(Tname);
                    $('#W-second-items-sortby option').eq(0).prop("selected", true);
                    self.showDefaultPicInfo(picUrl)
                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });
        }        
    });
}

WardrobeExtend.prototype.WS_FstShowTags = function (index) {
    var showLeftImg = '<img id="WS-left-img" src="" alt="..." />';
    $("#WS-left-img-div").html(showLeftImg);
    $("#W-second-left-img-info").show();
    $(".W-second-TLi").find("p").remove("WS-changeTheBackgroundColor");
    $(".W-second-TLi").eq(index).find("p").addClass("WS-changeTheBackgroundColor");
    $(".W-second-TLi").eq(index).find("img").css("visibility", "visible");
}

WardrobeExtend.prototype.WS_ChangeLeftImg = function (index) {
    $(".W-second-eachItem-img>img").live('click', function () {
        var imgSrc = $(this).attr("src");
        var imgBrand = $(this).attr("data-brand");
        var imgTitle = $(this).attr("data-title");
        var imgPrice = $(this).attr("data-price");
        var imgLike = $(this).attr("data-like");
        var imgItemId = $(this).attr("data-itemId")
        $("#WS-left-img").attr("src", imgSrc);
        $("#W-second-left-img-brand").html(imgBrand);
        $("#WS-price").html(imgPrice);
        $("#WS-Left-Title").html(imgTitle);
        //$(".WS-bold").html(imgLike)

        $("#WS-like-button").attr("data-itemId", imgItemId);
      
        $.ajax({
            url: '/MWTag/LikedCount',
            method: 'Get',
            dataType: "json",
            contentType: 'application/json, charset=utf-8',
            data: {
                _itemId: imgItemId
            },
            success: function (data) {
                $(".WS-bold").html(data);
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });
    });
}

WardrobeExtend.prototype.WS_ItemXbuttonHover = function () {
    $(".W-second-eachItem").live('mouseover', function () {
        $(this).find("button").css("visibility", "visible");
    });
    $(".W-second-eachItem").live('mouseout', function () {
        $(this).find("button").css("visibility", "hidden");
    });
}

WardrobeExtend.prototype.WS_Item_Ajax_Call = function (url, tid, Tname, optionIndex) {
    $.ajax({
        url: url,
        method: 'Get',
        dataType: "html",
        contentType: 'application/json, charset=utf-8',
        data: {
            _userId: "0lj4rFDbJa66VRpK", _tagId: tid
        },
        success: function (data) {
            $("#W-second-items").html(data);
            $('#WS-itemTags').attr("data-tagId", tid);
            $('#WS-itemTags').text(Tname);
            $('#W-second-items-sortby option').eq(optionIndex).prop("selected", true);
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });
}

WardrobeExtend.prototype.WS_itemDeleteTag = function () {
    $(".WS-deleteItemTag-btn").live('click', function () {
        var itemID = $(this).siblings("div").children("img").attr("data-itemId");
        var tagID = $('#WS-itemTags').attr("data-tagId");
        var numberOfSortItems = parseInt($(this).parents(".W-second-sortItem").siblings("span").text());
        var DeleteWholeDiv = $(this).parents(".W-second-showItems");
        var DeleteImg = $(this).parent();
        var changeThenumber = $(this).parents(".W-second-sortItem").siblings("span");
        $.ajax({
            url: '/MWTag/DelItemTag',
            method: 'Get',
            dataType: "html",
            contentType: 'application/json, charset=utf-8',
            data: {
                _userId: "0lj4rFDbJa66VRpK",
                _itemId: itemID,
                _tagId: tagID,
            },
            success: function (data) {             
                if (numberOfSortItems == 1) {
                    DeleteWholeDiv.remove();
                }
                else {
                    changeThenumber.text(numberOfSortItems - 1);
                    DeleteImg.remove();
                }
                var numberOfAllItems = parseInt($("#WS-itemNum").text());
                $("#WS-itemNum").text(numberOfAllItems - 1);
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });
    });
    $(".WS-deleteOutfitTag-btn").live('click', function () {
        var outfitID = $(this).siblings("img").attr("data-outfitId");
        var tagID = $('#WS-itemTags').attr("data-tagId");
        var numberOfSortItems = parseInt($(this).parents(".W-second-sortItem").siblings("span").text());
        var DeleteWholeDiv = $(this).parents(".W-second-showItems");
        var DeleteImg = $(this).parent();
        var changeThenumber = $(this).parents(".W-second-sortItem").siblings("span");
        $.ajax({
            url: '/MWTag/DelOutfitTag',
            method: 'Get',
            dataType: "html",
            contentType: 'application/json, charset=utf-8',
            data: {
                _userId: "0lj4rFDbJa66VRpK", _outfitId: outfitID, _tagId: tagID,
            },
            success: function (data) {
                if (numberOfSortItems == 1) {
                    DeleteWholeDiv.remove();
                }
                else {
                    changeThenumber.text(numberOfSortItems - 1);
                    DeleteImg.remove();
                }
                var numberOfAllItems = parseInt($("#WS-itemNum").text());
                $("#WS-itemNum").text(numberOfAllItems - 1);
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });
    });
}

WardrobeExtend.prototype.WS_itemSetCover = function () {
    $(".WS-SetCover-btn").live('click', function () {
        var setcoverSrc = $(this).siblings("div").children("img").attr("src");
        var changeTheTagUrl = $(".WS-changeTheBackgroundColor").siblings("img");
        tagId = $("#WS-itemTags").attr("data-tagid");
        $.ajax({
            url: '/MWTag/SetCover',
            method: 'Get',
            dataType: "html",
            contentType: 'application/json, charset=utf-8',
            data: {
                _coverUrl: setcoverSrc, _tagId: tagId,
            },
            success: function (data) {
                $("#WS-left-img").attr("src", setcoverSrc);
                changeTheTagUrl.attr("src", setcoverSrc);
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });       
    });
}

WardrobeExtend.prototype.WS_changeSortBy = function () {
    var self = this;
    $("#W-second-items-sortby").live("change",function () {
        tagId = $("#WS-itemTags").attr("data-tagId");
        Tname = $("#WS-itemTags").text();
        if ($('#W-second-items-sortby').val() == "Category") {
            self.WS_Item_Ajax_Call('/MWTag/ListUserItemsByCategory',tagId,Tname,0);
        }
        if ($('#W-second-items-sortby').val() == "Brand") {
            self.WS_Item_Ajax_Call('/MWTag/ListUserItemsByBrand',tagId, Tname,1);
        }
        if ($('#W-second-items-sortby').val() == "Time") {
            self.WS_Item_Ajax_Call('/MWTag/ListUserItemsByTime', tagId, Tname, 2);
        }
    });
}

WardrobeExtend.prototype.WS_clickOutfit = function () {
    $("#WS-Outfit-btn").live("click", function () {

        $("#W-second-left").hide();
        $("#W-second-right").hide();
        $("#W-second-outfit-left").show();
    });
}

WardrobeExtend.prototype.WS_clickSingleItem = function () {
    var self = this;
    $("#WS-SingleItem-btn").live("click", function () {
        $("#W-second-left").show();
        $("#W-second-right").show();
        $("#W-second-outfit-left").hide();
        var showLeftImg = '<img id="WS-left-img" src="" alt="..." />';
        $("#WS-left-img-div").html(showLeftImg);
        var imgsrc = "";
        if ($("#WS-itemTags").attr("data-tagId") == "All") {
            self.Wardrobe_showAllSingleItems();
        }
        else {
            $(".W-second-TLi").each(function () {
                if ($(this).find("p").hasClass("WS-changeTheBackgroundColor")) {
                    imgsrc = $(this).find("img").attr("src");
                }
            });
            $("#WS-left-img").attr("src", imgsrc);
            tagId = $("#WS-itemTags").attr("data-tagId");
            Tname = $("#WS-itemTags").text();
            $("#W-second-left-img-info").show();
            if ($("#W-second-items-tag").attr("data-itemType") == "outfit") {
                self.WS_Item_Ajax_Call('/MWTag/ListUserItemsByTime', tagId, Tname, 2);
            }
        }        
    });
}

WardrobeExtend.prototype.Wardrobe_showAllItems = function () {
    var self = this;
    $("#allTag").live('click', function () {
        $("#W-second-modal").modal("show");
        $(".modal-backdrop.in").css({
            "filter": "alpha(opacity=50)",
            "opacity": ".5"
        });
        self.showWStags();
        window.setTimeout(function () {
            self.wardrobe_second(0);
        }, 150);
        self.WS_FstShowTags(0);
        self.Wardrobe_showAllSingleItems();
    });
}

WardrobeExtend.prototype.Wardrobe_showAllOutfits = function () {
    var self = this;
    $.ajax({
        url: '/MWMyWardrobe/ListAllUserOutfits',
        method: 'Get',
        dataType: "html",
        contentType: 'application/json, charset=utf-8',
        data: {
            _userId: "0lj4rFDbJa66VRpK",
        },
        success: function (data) {
            $("#W-second-items").html(data);
            $("#WS-left-img-div").html(self.singleItemInOutfit());
            $("#W-second-left-img-info").hide();
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });
}

WardrobeExtend.prototype.Wardrobe_showAllSingleItems = function () {
    $.ajax({
        url: '/MWMyWardrobe/ListAllUserItems',
        method: 'Get',
        dataType: "html",
        contentType: 'application/json, charset=utf-8',
        data: {
            _userId: "0lj4rFDbJa66VRpK",
        },
        success: function (data) {
            $("#W-second-items").html(data);
            $("#W-second-left-img-info").show();
            var imgsrc = $(".W-All-eachItem").eq(0).children("img").attr("src");
            var imgBrand = $(".W-All-eachItem").eq(0).attr("data-brand");
            var imgTitle = $(".W-All-eachItem").eq(0).attr("data-title");
            var imgItemId = $(".W-All-eachItem").eq(0).attr("data-itemid");
            var imgLikecount = $(".W-All-eachItem").eq(0).attr("data-likecount");
            var imgPrice = Number($(".W-All-eachItem").eq(0).attr("data-price"));
            $("#WS-Left-Title").text(imgTitle);
            $("#W-second-left-img-brand").text(imgBrand);
            $("#WS-price").text(imgPrice.toFixed(2));
            $("#WS-left-img").attr("src", imgsrc);
            $("#WS-like-button").attr("data-itemId", imgItemId);
            $(".WS-bold").text(imgLikecount);
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });
}

WardrobeExtend.prototype.AddToWardrobePopup = function () {

    $("#AddtoWardrobeBtn").live('click', function () {
        var tagId = $("#selectedTag").val();
        var itemId = $("#AddToW-tag").attr("data-ItemId");
        $.ajax({
            url: '/MWMyWardrobe/AddItem',
            method: 'Get',
            dataType: "html",
            contentType: 'application/json, charset=utf-8',
            data: {
                _userId: "0lj4rFDbJa66VRpK", _tagId: tagId, _itemId: itemId,
            },
            success: function (data) {
                $("#AddToWardrobe-modal").modal("hide");
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });
    });
}

WardrobeExtend.prototype.AllItemSelect = function () {
    $(".W-All-eachItem").live('click', function () {
        if ($(this).hasClass("W-All-eachItem-selected")) {
            $(this).removeClass("W-All-eachItem-selected");
        }
        else
            $(this).addClass("W-All-eachItem-selected");
        var imgsrc = $(this).children("img").attr("src");
        var imgBrand = $(this).attr("data-brand");
        var imgTitle = $(this).attr("data-title");
        var imgPrice = Number($(this).attr("data-price"));
        var imgItemId = $(this).attr("data-itemId")
        $("#WS-left-img").attr("src", imgsrc);
        $("#WS-Left-Title").text(imgTitle);
        $("#W-second-left-img-brand").text(imgBrand);
        $("#WS-price").text(imgPrice.toFixed(2));
        $("#WS-like-button").attr("data-itemId", imgItemId);

        $.ajax({
            url: '/MWTag/LikedCount',
            method: 'Get',
            dataType: "json",
            contentType: 'application/json, charset=utf-8',
            data: {
                _itemId: imgItemId
            },
            success: function (data) {
                $(".WS-bold").html(data);
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });
    });
    $(".W-All-eachOutfit").live('click', function () {
        if ($(this).hasClass("W-All-eachItem-selected")) {
            $(this).removeClass("W-All-eachItem-selected");
        }
        else
            $(this).addClass("W-All-eachItem-selected");
    });
    
    $("#W-deleteItemBtn").live('click', function () {
        var itemIds = [];
        var itemcount = $("#W-All-AllItems").find(".W-All-eachItem-selected").length;
        for (var i = 0; i < itemcount; i++) {
            itemIds[i] = $('.W-All-eachItem-selected').eq(i).attr("data-itemID");
        }
        var itemId = itemIds.join('#');        
        var AllNumber = $("#W-All-items-tag").children("span");
        if (itemcount > 0) {
            $.ajax({
                url: '/MWMyWardrobe/DelItemsSave',
                method: 'Get',
                dataType: "html",
                contentType: 'application/json, charset=utf-8',
                data: {
                    _userId: "0lj4rFDbJa66VRpK", _itemsCount: itemcount, _itemIds: itemId,
                },
                success: function (data) {
                    $(".W-All-eachItem-selected").remove();
                    AllNumber.text(AllNumber.text() - itemcount);
                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });
        } 
    });
    $("#W-MoveToBtn").live('click', function () {        
        var itemcount = $("#W-All-AllItems").find(".W-All-eachItem-selected").length;
        if (itemcount > 0) {
            $("#MoveToTags-modal").modal("show");
            $.ajax({
                url: '/MWTag/ListAllTags',
                method: 'Get',
                dataType: "html",
                contentType: 'application/json, charset=utf-8',
                data: {
                    _userId: "0lj4rFDbJa66VRpK",
                },
                success: function (data) {
                    $("#MoveTo-tag").html(data);
                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });
        }
    });
    $("#MoveToTagsBtn").live('click', function () {
        var itemIds = [];
        var preTagIds=[];
        var itemcount = $("#W-All-AllItems").find(".W-All-eachItem-selected").length;
        for (var i = 0; i < itemcount; i++) {
            itemIds[i] = $('.W-All-eachItem-selected').eq(i).attr("data-itemID");
            preTagIds[i] = $('.W-All-eachItem-selected').eq(i).attr("data-tagID");
        }
        var itemId = itemIds.join('#');
        var preTagId = preTagIds.join('#');
        var tagId = $("#selectedTag").val();
        $.ajax({
            url: '/MWMyWardrobe/MoveItemsTo',
            method: 'Get',
            dataType: "html",
            contentType: 'application/json, charset=utf-8',
            data: {
                _userId: "0lj4rFDbJa66VRpK", _itemsCount: itemcount, _itemIds: itemId, _tagId: tagId, _preTagIds: preTagId
            },
            success: function (data) {
                alert("Success!");
                $("#MoveToTags-modal").modal("hide");
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });
    });
}

WardrobeExtend.prototype.singleItemInOutfit = function () {
    var singleItemInOutfit = "";
    for (var i = 0; i < 9; i++) {
        singleItemInOutfit += "<div class='outfitSingleItem-div'><img class='outfitSingleItem' src='...' alt='singleItem'/></div>"
    }
    return singleItemInOutfit;
}

WardrobeExtend.prototype.showDefaultPicInfo = function (picUrl) {
    $.ajax({
        url: '/MWTag/DefaultTagItem',
        method: 'Get',
        dataType: "text",
        contentType: 'application/json, charset=utf-8',
        data: {
            _picUrl: picUrl,
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data);
            $.each(obj, function(i, n)
            {
                $("#WS-like-button").attr("data-itemid", n.searchable_ItemId);
                $("#WS-Left-Title").text(n.title);
                $("#W-second-left-img-brand").text(n.brand);
                $("#WS-price").text((n.price).toFixed(2));
                $(".WS-bold").text(n.LikeCount);
            });
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });
}

WardrobeExtend.prototype.ReturnLikeCount_Waterfall = function () {
    $('#Wardrobe-third-modal').on('hidden.bs.modal', function (e) {
        $(".item_face[data-click='True']").find(".bold").text($("#W-Third-likeBtn").children("em").html());
        $(".item_face[data-click='True']").attr("data-click", "False");
    });
}