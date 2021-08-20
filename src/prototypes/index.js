Object.defineProperty(Array.prototype, 'first', {
    value() {
        return this.find(Boolean)
    }
});

Array.prototype.diff = function (a) {
    return this.filter(function (i) {
        return a.indexOf(i) < 0;
    });
};

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
