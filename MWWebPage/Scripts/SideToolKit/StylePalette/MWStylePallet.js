
function StylePalette() {

    this.sp_elem_manager = new SPElementManager();

    var self = this;

    $('#The-SP-button-list').click(function () {

        $('.The-style-palette-list').show();
        $('#The-style-palette-addfromwardrobe').hide();

        $('#The-SP-button-list').hide();
        $('#The-SP-button-AFW').hide();
        $('#The-SP-button-recommend').hide();
        $('#The-SP-button-image').show();
    });
    $('#The-SP-button-image').click(function () {
        $('#The-SP-button-image').hide();
        $('#The-SP-button-list').show();
        $('#The-SP-button-AFW').show();
        $('#The-SP-button-recommend').show();

        $('.The-style-palette-list').hide();
        $('#The-style-palette-addfromwardrobe').show();
    });
    $("#test").click(function () {
        var outfitPic = [];
        var cropX = [];
        var cropY = [];
        var cropW = [];
        var cropH = [];
        var x = [];
        var y = [];
        var id = [];

        $.ajax({
            url: '/MWMyWardrobe/ListOutfitItems',
            method: 'Get',
            dataType: "html",
            contentType: 'application/json, charset=utf-8',
            data: {
                _userId: "0lj4rFDbJa66VRpK", _outfitId: 1
            },
            success: function (data) {

                var obj = jQuery.parseJSON(data);
                var index = 0;
                $.each(obj, function (i, n) {
                    outfitPic[index] = n.picUrl;
                    cropX[index] = n.cropX;
                    cropY[index] = n.cropY;
                    cropW[index] = n.cropWidth;
                    cropH[index] = n.cropHeight;
                    x[index] = n.picX;
                    y[index] = n.picY;
                    id[index] = n.seaId;
                    index = index + 1;
                });
                self.loadOutfitImg(outfitPic, cropX[1], cropY[1], cropW[1], cropH[1], x[1], y[1], id[1]);
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });
    });

    $('#The-SP-button-AFW').click(function () {
    });

    $('#The-SP-button-recommend').click(function () {
        //$(".The-style-palette-recommend").toggle(1000);
        $("#recommend-info").modal('show');
        $(".modal-backdrop.in").css({
            "filter": "alpha(opacity=50)",
            "opacity": ".5"
        });
    });

    //List Image
    $("#accordion").accordion({
        collapsible: true
    });

    //Recommend
    $("#va-accordion").vaccordion({
        visibleSlices: 3
    });

    $(".SP-list-hover").live({
        mouseover: function () {
            $(this).addClass("SP-list-hover-bg");
        },
        mouseout: function () {
            $(this).removeClass("SP-list-hover-bg");
        }
    });
    var item = [];
    var items = [];

    $("#The-style-palette-shot").click(function () {

        var Total_image = $('#The-style-palette-addfromwardrobe').find('.imgDiv').length;
        if (Total_image != 0) {
            for (var index = 0; index < Total_image; index++) {
                item[0] = $(".sp_" + index).attr("data-itemid");
                item[1] = $(".sp_" + index).find("img").attr("src");
                item[2] = parseInt($('.sp_' + index).css('left').replace(/[^0-9]/ig, ""));
                item[3] = parseInt($('.sp_' + index).css('top').replace(/[^0-9]/ig, ""));
                item[4] = 0;
                item[5] = $(".sp_" + index).attr("data-cropx");
                item[6] = $(".sp_" + index).attr("data-cropy");
                item[7] = parseInt($('.sp_0').css('width').replace(/[^0-9]/ig, ""));
                item[8] = parseInt($('.sp_0').css('height').replace(/[^0-9]/ig, ""));
                item[9] = 0;
                item[10] = 0;
                items[index] = item.join('#');
            }
            var str = items.join('*');
            $.ajax({
                url: '/MWMyWardrobe/AddOutfit',
                method: 'Get',
                dataType: "html",
                contentType: 'application/json, charset=utf-8',
                data: {
                    _userId: "0lj4rFDbJa66VRpK", _outfitName: "test", _items: str, _itemCounts: Total_image
                },
                success: function (data) {
                    alert(data);
                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });
        }

    });

    $(".list-collect").live("click", function () {

        $("#AddToWardrobe-modal").modal("show");
        var itemId = $(this).parents(".sp-list").attr("data-itemid");
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
    });

    $('#Add-from-PC').click(function () {
        alert("asd");
    });
}

StylePalette.prototype.getImgURL = function (node) {

    var imgURL = "";
    try {
        var file = null;
        if (node.files && node.files[0]) {
            file = node.files[0];
        } else if (node.files && node.files.item(0)) {
            file = node.files.item(0);
        }

        try {

            imgURL = file.getAsDataURL();

        } catch (e) {

            imgURL = window.URL.createObjectURL(file);

        }
    } catch (e) {

        if (node.files && node.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                imgURL = e.target.result;
            };
            reader.readAsDataURL(node.files[0]);
        }
    }

    this.loadImage(imgURL);

    return imgURL;
}

StylePalette.prototype.loadImage = function (url) {

    var self = this;

    var text = "<img src='" + url + "' width='100' height='100' alt='load_image' style='display:none'/>";
    $('.mark').append(text);

    $('.mark').children().last().load(function () {
        var d = new SPElement(url, $("#The-style-palette-addfromwardrobe", app.sk.stylepaltte.sp_elem_manager));
        $(d).fadeIn();
        $('.mark').children().remove();
    });
}

StylePalette.prototype.loadOutfitImg = function (url, cropx, cropy, w, h, x, y, Id) {

    var self = this;

    for (var index = 0; index < url.length; index++) {
        var text = "<img src='" + url[index] + "' width='100' height='100' alt='load_image' style='display:none'/>";
        $('.mark').append(text);
    }
    var index = 0;
    $('.mark').children().load(function () {
        var d = new SPElement(item.find('.search-details').attr('src'), gallery_to, app.sk.stylepaltte.sp_elem_manager);

        $(d).css({
            "left": 50,
            "top": 100 + 74,
        });
        $(d).fadeIn();
        index = index + 1;
    });
}