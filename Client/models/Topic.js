"use strict";
var Topic = (function () {
    function Topic() {
    }
    Object.defineProperty(Topic.prototype, "tags", {
        get: function () {
            return [
                {
                    name: '1080p'
                },
                {
                    name: '欧美'
                },
                {
                    name: '无码'
                },
                {
                    name: '人妻'
                }
            ];
        },
        enumerable: true,
        configurable: true
    });
    return Topic;
}());
exports.Topic = Topic;
var Torrent = (function () {
    function Torrent() {
    }
    return Torrent;
}());
exports.Torrent = Torrent;
var Promotion = (function () {
    function Promotion() {
    }
    return Promotion;
}());
exports.Promotion = Promotion;
var Category = (function () {
    function Category() {
    }
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=Topic.js.map