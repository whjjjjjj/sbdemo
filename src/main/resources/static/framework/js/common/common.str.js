String.prototype.endWith = function (str) {
    if (str == null || str == '' || this.length == 0 || str.length > this.length) {
        return false;
    }

    var thisLen = this.length, strLen = str.length;
    return this.lastIndexOf(str) == thisLen - strLen;
};

String.prototype.startWith = function (str) {
    if (str == null || str == '' || this.length == 0 || str.length > this.length) {
        return false;
    }

    return this.lastIndexOf(str) == 0;
};