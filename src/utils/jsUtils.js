"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleListItem = exports.sortBy = void 0;
// Inspired by https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_sortby-and-_orderby
function sortBy(array, getter) {
    const sortedArray = [...array];
    sortedArray.sort((a, b) => 
    // eslint-disable-next-line no-nested-ternary
    getter(a) > getter(b) ? 1 : getter(b) > getter(a) ? -1 : 0);
    return sortedArray;
}
exports.sortBy = sortBy;
function toggleListItem(list, item) {
    const itemIndex = list.indexOf(item);
    if (itemIndex === -1) {
        return list.concat(item);
    }
    const newList = [...list];
    newList.splice(itemIndex, 1);
    return newList;
}
exports.toggleListItem = toggleListItem;
