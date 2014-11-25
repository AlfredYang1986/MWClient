function Loading() {
    //$("body").showLoading();
    $('#LoadingModal').modal("show");
    $(".modal-backdrop.in").css({
        "filter": "alpha(opacity=30)",
        "opacity": ".3"
    });
}

function hiddenLoading(){
    //$("body").hideLoading()
    $('#LoadingModal').modal("hide");
}