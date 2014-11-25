
function SPElementManager() {
    this.maxElement = 9;
    this.sp_elements = new Array();
    this.baseZIndex = 1000;
}

SPElementManager.prototype.canAddElement = function () {
    return this.countElements() + 1 !== 9;
}

SPElementManager.prototype.countElements = function () {
    return this.sp_elements.length;
}

SPElementManager.prototype.containsElement = function (obj) {
    var reVal = -1; 
    for (var index = 0; index < this.sp_elements.length; ++index) {
        if (obj === this.sp_elements[index]) {
            reVal = index;
            break;
        }
    }
    return reVal;
}

SPElementManager.prototype.setZIndex = function () {
    for (var index = 0; index < this.sp_elements.length; ++index) {
        this.sp_elements[index].element.css("z-index", this.baseZIndex + index);
    }
}

SPElementManager.prototype.pushElement = function (obj) {
    if (this.countElements() + 1 === 9) {
        alert("maximum 9 !!!!!!!");
        return;
    }
    this.sp_elements.push(obj);
}

SPElementManager.prototype.removeElement = function (obj) {
    this.sp_elements.filter(function (elem) {
        return elem !== obj;
    });
}

SPElementManager.prototype.deleteElement = function (obj) {
    this.removeElement(obj);
    obj.element.remove();
}

SPElementManager.prototype.topElement = function (obj) {
    this.removeElement(obj);
    this.pushElement(obj);
    this.setZIndex();
}