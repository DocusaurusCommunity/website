"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleListItem = exports.sortBy = void 0;
// Inspired by https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_sortby-and-_orderby
function sortBy(array, getter) {
    var sortedArray = __spreadArray([], array, true);
    sortedArray.sort(function (a, b) {
        // eslint-disable-next-line no-nested-ternary
        return getter(a) > getter(b) ? 1 : getter(b) > getter(a) ? -1 : 0;
    });
    return sortedArray;
}
exports.sortBy = sortBy;
function toggleListItem(list, item) {
    var itemIndex = list.indexOf(item);
    if (itemIndex === -1) {
        return list.concat(item);
    }
    var newList = __spreadArray([], list, true);
    newList.splice(itemIndex, 1);
    return newList;
}
exports.toggleListItem = toggleListItem;
