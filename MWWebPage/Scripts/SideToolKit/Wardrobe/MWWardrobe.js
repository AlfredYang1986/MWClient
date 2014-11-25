
function Wardrobe() {

    this.ex = new WardrobeExtend();

    $('#Mw-btn').click(function() {
        $.ajax({
            url: '/MWTag/ListTags',
            method: 'Get',
            dataType: "html",
            contentType: 'application/json, charset=utf-8',
            data: {
                _userId: "0lj4rFDbJa66VRpK", _pageIndex: 1
            },
            success: function (data) {
                $('.carousel-inner').html(data);
                var indicator;
                for (var index = 0; index < $('.mywardrobe').length; index++)
                {
                    $('.carousel-indicators').html('<li data-target="#myCarousel" data-slide-to=' + index + ' data-number=' + $('div .item').length + ' class=""></li>');
                }
                $(".carousel-indicators").find('li').eq(0).addClass("active");
            },

            error: function (xhr, status, error) {
                alert(error);
            }
        });
    });
    var save_status = false;
    $('.cancle-btn').click(function () {
        save_status = false;
        $('.circle textarea').prop("disabled", true);
        $('.circle').find(".circle-shadow").removeClass('circle-shadow');
        $('.circle').find(".delete-btn").hide();
        $('.circle').has('textarea').unbind("click");
        $('.circle input').unbind("focus");
        $('.circle input').unbind("blur");
        $('.circle input').unbind("keydown");
        $('.editBtnGroup').hide();
        $('.Mw-Pane-Default-Btn').show();
    });
    $('.carousel').carousel({
        interval: false
    });
    $('.editTags').click(function () {
        $('.circle textarea').prop("disabled", false);
        $('.Mw-Pane-Default-Btn').hide();
        $('.editBtnGroup').show();
        $('.editBtnGroup').css("color", "#4fbbf9");

        $(".circle textarea").blur(function () {
            var tagName = $(this).val();
            var tagId = $(this).parent().attr("data-tagid");
            //alert($(this).val());
            $.ajax({
                url: '/MWTag/EditTag',
                method: 'Get',
                dataType: "html",
                data: {
                    _tagName: tagName,
                    _tagId: tagId
                },
                success: function (data) {

                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });

        });
        $('.save-btn').click(function () {

            var tags = [];

            for (var index = 0; index < ($('div .active').find('.circle input').length) ; index++)
            {
                var tag = new Object();
                tag["name"] = $('div .active').find('.circle input').eq(index).val();
                tag["id"] = ($('div .active').find('.circle').has('input').eq(index).attr("data-tagid"));

                tags.push(tag);
            }

            $.ajax({
                url: '/MWTag/EditTagSave',
                method: 'Get',
                dataType: "json",
                data: {
                    strJson: JSON.stringify(tags)
                },
                success: function (data) {
                    if (data == false) return alert("Editerror");
                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });
        });
        var delete_status = false;
        $('.circle').has('textarea').click(function () {
            $('.circle').find(".circle-shadow").removeClass('circle-shadow');
            $('.circle').find(".delete-btn").hide();
            if ($(this).children(":first").hasClass('circle-shadow')) {
                $(this).children(":first").removeClass('circle-shadow');
                $(this).find('.delete-btn').hide();
            }
            else {
                $(this).children(":first").addClass('circle-shadow');
                $(this).find('.delete-btn').show();
                $(this).children('textarea').focus();
            }
        });

        $(".delete-btn").click(function () {
            
            alert("do you want to delete this tag");
            var tagId = $(this).parent().attr("data-tagid");
            $.ajax({
                url: '/MWTag/DelTag',
                method: 'Get',
                dataType: "html",
                contentType: 'application/json, charset=utf-8',
                data: {
                    inputTagId: tagId,
                },
                success: function (data) {
                    $('.carousel-inner').html(data);
                    $(".cancle-btn").click();
                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });
        });

        $('.circle input').focus(function () {
            if ($(this).val().length != 0) {
                var text = $(this).val();
                $(this).attr("placeholder", text);
                $(this).val("");
            }
        });

        $('.circle input').keydown(function (e) {

            $('.save-btn').prop("disabled", false);
            if (e.keyCode == 13) {
                if (save_status != true) {
                    $('.save-btn').prop("disabled", true);
                }
                $(this).blur();
                return;
            }
            if (e.keyCode == 27) {
                $(this).blur();
                return;
            }
        });
        $('.circle input').blur(function () {
            if ($(this).val().length == 0) {
                var text = $(this).attr("placeholder");
                $(this).val(text)
            }
            $(this).css('background-color', 'rgba(255,255,255,0.8)');
            if ($('.save-btn').prop("disabled") == false) {
                save_status = true;
            }
        });

    });

    $(".default-tags").click(function () {
        if ($('textarea').prop("readonly") == true) {
            $("#mywardrobe-box").hide();
            $('.Ian-wardrobe-whole').show();
        }
    });

    $('.create-tag').live("click", function () {
        if ($('.editTags').is(":visible"))
        {
            var number = $('.item.active').find('input').length;
            if (number < 10) {
                $.ajax({
                    url: '/MWTag/AddTag',
                    method: 'Get',
                    dataType: "html",
                    contentType: 'application/json, charset=utf-8',
                    data: {
                        _userId: "0lj4rFDbJa66VRpK",
                        _tagName: "newTag",
                        _tagType: "newType",
                        _itemId: 5911,
                        _picId: 11354,
                    },
                    success: function (data) {
                        var newtag = $('<input type="text" name="points" size="8" maxlength="10" value="newTag" placeholder="" onfocus="this.style.textAlign = \'left\'" disabled="disabled" onblur="this.style.textAlign = \'center\'" />');
                        $('.item.active .circle').eq(number + 2).removeClass("no-tags");
                        $('.item.active .circle').eq(number + 2).append("<div></div>");
                        $('.item.active .circle').eq(number + 2).append(newtag);
                       

                        $.ajax({
                            url: '/MWTag/ListTags',
                            method: 'Get',
                            dataType: "html",
                            contentType: 'application/json, charset=utf-8',
                            data: {
                                _userId: "0lj4rFDbJa66VRpK",
                                _pageIndex: 1
                            },
                            success: function (data) {
                                $('.carousel-inner').html(data);
                                $('div .active').children(':first').find(".circle").prev().eq(0).css("marginTop", "7%");
                                $.ajax({
                                    url: '/MWTag/GetTagNumber',
                                    method: 'Get',
                                    dataType: "html",
                                    contentType: 'application/json, charset=utf-8',
                                    data: {
                                        _userId: "0lj4rFDbJa66VRpK"
                                    },
                                    success: function (data) {
                                        $('.carousel-indicators').html(data);
                                        $('.carousel-indicators').children().removeClass('active');
                                        $('.carousel-indicators').children().first().addClass('active');
                                    },
                                    error: function (xhr, status, error) {
                                        alert(error);
                                    }
                                });
                            },

                            error: function (xhr, status, error) {
                                alert(error);
                            }
                        });
                    },
                    error: function (xhr, status, error) {
                        alert(error);
                    }
                });
            }
            else {
                var lastPage = $(".carousel-indicators").children().length
                $.ajax({
                    url: '/MWTag/ListTags',
                    method: 'Get',
                    dataType: "html",
                    contentType: 'application/json, charset=utf-8',
                    data: {
                        _userId: "0lj4rFDbJa66VRpK", _pageIndex: lastPage
                    },
                    success: function (data) {
                        $('.carousel-inner').append(data);
                        $('.carousel-inner').children().removeClass('active');
                        $('.carousel-inner').children().first().addClass('active');
                        $("#myCarousel").carousel(lastPage-1);
                    },
                    error: function (xhr, status, error) {
                        alert(error);
                    }
                });              
            }
        }
    });
    $('#MW-tag-detail').on('hidden.bs.modal', function (e) {
        $('#bottom-tools-border').show();
        //$.ajax({
        //    url: '/MWTag/ListTags',
        //    method: 'Get',
        //    dataType: "html",
        //    contentType: 'application/json, charset=utf-8',
        //    data: {
        //        _userId: "0lj4rFDbJa66VRpK", _pageIndex: 1
        //    },
        //    success: function (data) {
        //        $('.carousel-inner').html(data);
        //        $('div .active').children(':first').find(".circle").eq(0).prev().css("marginTop", "7%");
        //        $.ajax({
        //            url: '/MWTag/GetTagNumber',
        //            method: 'Get',
        //            dataType: "html",
        //            contentType: 'application/json, charset=utf-8',
        //            data: {
        //                _userId: "0lj4rFDbJa66VRpK"
        //            },
        //            success: function (data) {
        //                $('.carousel-indicators').html(data);
        //                $('.carousel-indicators').children().removeClass('active');
        //                $('.carousel-indicators').children().first().addClass('active');
        //            },
        //            error: function (xhr, status, error) {
        //                alert(error);
        //            }
        //        });
        //    },

        //    error: function (xhr, status, error) {
        //        alert(error);
        //    }
        //});
    })
        
        //var number = $('.item.active').length;
       


        //var num = $('div.active').find('textarea').length;
        //if (num < 10) {
        //    var textarea = $('<textarea rows="2" cols="10" maxlength="15" readonly="readonly" >newTag</textarea>');
        //    $('div.active .circle').eq(num + 2).append(textarea);

        //    $('textarea').keydown(function (e) {
        //        if (e.keyCode == 13) {
        //            $(this).blur();
        //        }
        //    });
        //    $('textarea').blur(function () {
        //        if ($.trim($(this).val()).length == 0) {
        //            $(this).val("new tag");
        //        }
        //        $('textarea').prop('readonly', true);
        //    });
        //}
        //else {
        //    alert("full");
        //}
    //start for wardrobe level 2 js
    $(".circle").live("click", function () {
        if (($(this).find("textarea").prop("disabled")) == true) {
            var itemTagNo = 0;
            itemTagNo = $(".circle").find("textarea").length;           
            var itemTag="";
            for (var index = 0; index < itemTagNo; index++)
            {
                itemTag = itemTag+'<li class="slide"> \
                        <img src="' + $(".circle").eq(index).attr("data-picurl") + '" alt="" class="img-circle" width="85" height="85"> \
                        <p  class="home-font cover">' + $(".circle").find("textarea").eq(index).val() + '</p> \
                        </li>';
            }
            $('.MW-carouse-tag .slides').html(itemTag);
            $("#MW-tag-detail").modal("show");
            $("#bottom-tools-border").hide();
            $('.MW-carouse-tag p').click(function () {
                $('.MW-carouse-tag .active').removeClass('active');
                $(this).addClass('active');
            });
            //initial caourse
            var item_start = 0;
                item_start = $(this).attr("data-clickindex");
            if (itemTagNo >= 4) {
                var options_tag = {
                    visible: 4,
                    circular: true,
                    start:item_start,
                    pause: true,
                    btnNext: '.MW-Tag-next',
                    btnPrev: '.MW-Tag-prev',
                };
                $('.MW-carouse-tag').jCarouselLite(options_tag);
                //$('.MW-carouse-tag').trigger('go', item_start);
                $('.MW-carouse-tag p').eq(item_start).addClass("active");
            }
            else {
                var options_tag = {
                    visible: itemTagNo,
                    circular: false,
                    speed: 200,
                    pause: true,
                    btnNext: '.MW-Tag-next',
                    btnPrev: '.MW-Tag-prev',
                };
                $('.MW-carouse-tag').jCarouselLite(options_tag);
            }
            var tagId = $(this).attr("data-tagid");

            $.ajax({
                url: '/MWTag/ListUserItemsByBrand',
                method: 'Get',
                dataType: "html",
                contentType: 'application/json, charset=utf-8',
                data: {
                    _userId: "0lj4rFDbJa66VRpK", _tagId: tagId
                },
                success: function (data) {
                    $("#Sitem-waterfall").html(data);
                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });
        }

    });
    $("#change-info").click(function () {
        if ($(".MW-item-search-detaile").is(":visible")) {
            $(".MW-item-upload-detaile").show();
            $(".MW-item-search-detaile").hide();
        }
        else {
            $(".MW-item-search-detaile").show();
            $(".MW-item-upload-detaile").hide();
        }
    });
    $(".Outfit-btn").click(function () {
        $("#MW-Single-Item").hide();
        $("#MW-Outfit-Item").show();
    });
    $(".SingleItem-btn").click(function () {
        $("#MW-Single-Item").show();
        $("#MW-Outfit-Item").hide();
    });
    $("#MW-outfit-Simg img").click(function () {
        if ($(this).hasClass("MW-outfit-img-active")) {
            $(this).removeClass('MW-outfit-img-active');
        }
        else {
            $('.MW-outfit-img-active').removeClass('MW-outfit-img-active');
            $(this).addClass('MW-outfit-img-active');
        }
    });
    $("#MW-outfit-Bimg img").click(function () {
        if ($(this).hasClass("MW-outfit-img-active")) {
            $(this).removeClass('MW-outfit-img-active');
        }
        else {
            $('.MW-outfit-img-active').removeClass('MW-outfit-img-active');
            $(this).addClass('MW-outfit-img-active');
        }
    });


    var options_item = {
        visible: 3,
        circular: true,
        speed: 200,
        vertical: true,
        pause: true,
        btnNext: '.MW-Simg-next',
        btnPrev: '.MW-Simg-prev'
    };
    $('.MW-carouse-item').jCarouselLite(options_item);


    

}