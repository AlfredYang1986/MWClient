
function BackgroundDrawer() {
    this.expend = false;
    this.expendSubMenu = false;
}

BackgroundDrawer.prototype.createGradient = function (context) {

    var gradient = context.createLinearGradient(0, 0, 0, 63);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(0.2, "white");
    gradient.addColorStop(0.8, "#FBFBFB");
    gradient.addColorStop(1, "#F1F1EF");

    return gradient;
}

BackgroundDrawer.prototype.drawTopRect = function (context, gradient, x, y, w, h) {
    // left
    context.beginPath();
    context.fillStyle = gradient;
    context.fillRect(x, y, w, h);
    context.closePath();
}

BackgroundDrawer.prototype.drawMiddleCurve = function (context, y) {

    context.save();
    context.beginPath();
    context.moveTo(220, 0);
    context.quadraticCurveTo(320, y-5, 490, y - 12);
    context.lineTo(740+25, y - 12);
    context.quadraticCurveTo(910+25, y-5, 1010+25, 0);

    context.strokeStyle = "white";
    context.stroke();
    context.fillStyle = "#FDFDFD";
    context.fill();
    context.closePath();
    context.restore();
}

BackgroundDrawer.prototype.drawFinalExpend = function () {

    var c = document.getElementById("menu-background");
    var context = c.getContext("2d");
    context.clearRect(0, 0, c.width, c.height);
    var gradient = this.createGradient(context);

    this.drawTopRect(context, gradient, 0, 0, 300, 63);
    this.drawTopRect(context, gradient, 900, 0, 400, 63);
    this.drawMiddleCurve(context, 162);

    context.beginPath();
    context.moveTo(266.7, 62);
    context.quadraticCurveTo(366, 162-5, 490, 150);
    context.lineTo(740+25, 150);
    context.quadraticCurveTo(866+25, 163-5, 964+25, 62);
    context.lineWidth = 2;
    context.strokeStyle = "#E5E6E1";
    context.stroke();
    context.closePath();
}

BackgroundDrawer.prototype.drawExpend = function () {

    // midsubmenu
    var c = document.getElementById("menu-background");
    var context = c.getContext("2d");
    context.clearRect(0, 0, c.width, c.height);
    //add linearFradient to the left and right part
    var gradient = this.createGradient(context);

    this.drawTopRect(context, gradient, 0, 0, 300, 63);
    this.drawTopRect(context, gradient, 900, 0, 400, 63);
    this.drawMiddleCurve(context, 142);

    //draw the line for mid curve
    context.beginPath();
    context.moveTo(275, 62);
    context.quadraticCurveTo(375, 142-5, 490, 130);
    context.lineTo(740+25, 130);
    context.quadraticCurveTo(866+25, 142-5, 955+25, 62);
    context.lineWidth = 2;
    context.strokeStyle = "#E5E6E1";
    context.stroke();
    context.closePath();
}

BackgroundDrawer.prototype.drawMidMenu = function () {

    var c = document.getElementById("menu-background");
    var context = c.getContext("2d");
    context.clearRect(0, 0, c.width, c.height);
    //add linearFradient to the left and right part
    var gradient = this.createGradient(context);

    this.drawTopRect(context, gradient, 0, 0, 300, 63);
    this.drawTopRect(context, gradient, 900, 0, 400, 63);
    this.drawMiddleCurve(context, 122);

    //draw the line for mid curve
    context.beginPath();
    context.moveTo(287, 62);
    context.quadraticCurveTo(385, 122-5, 490, 110);
    context.lineTo(740+25, 110);
    context.quadraticCurveTo(845+25, 122-5, 943+25, 62);
    context.lineWidth = 2;
    context.strokeStyle = "#E5E6E1";
    context.stroke();
    context.closePath();

}

BackgroundDrawer.prototype.drawBroadcast= function () {

    var startColor = "#f0f0f0";
    var startColorPosition = 0;
    var endColor = "#ffffff";
    var endColorPosition = 100;
    var width = 98;
    var height = 30;

    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');

    var lingrad = ctx.createLinearGradient(0, 0, 0, height);
    lingrad.addColorStop(startColorPosition / 100, startColor);
    lingrad.addColorStop(endColorPosition / 100, endColor);

    ctx.fillStyle = lingrad;
    ctx.fillRect(0, 0, width, height);


    var el = document.getElementById("block-cover");
    el.style["background-image"] = 'url(' + canvas.toDataURL() + ')';
    el.style["background-size"] = "100% 100%";
}
