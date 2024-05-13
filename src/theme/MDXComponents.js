"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var MDXComponents_1 = require("@theme-original/MDXComponents");
var Tabs_1 = require("@theme/Tabs");
var TabItem_1 = require("@theme/TabItem");
var DocusaurusButton_1 = require("@site/src/components/DocusaurusButton");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var fontawesome_svg_core_1 = require("@fortawesome/fontawesome-svg-core");
var free_brands_svg_icons_1 = require("@fortawesome/free-brands-svg-icons");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var react_1 = require("@iconify/react");
var ImageOnClick_1 = require("@site/src/components/ImageOnClick");
var Columns_1 = require("@site/src/components/Columns");
var Column_1 = require("@site/src/components/Column");
fontawesome_svg_core_1.library.add(free_brands_svg_icons_1.fab, free_solid_svg_icons_1.fas);
exports.default = __assign(__assign({}, MDXComponents_1.default), { Tabs: Tabs_1.default, TabItem: TabItem_1.default, DocusaurusButton: DocusaurusButton_1.default, FAIcon: react_fontawesome_1.FontAwesomeIcon, IIcon: react_1.Icon, ImageOnClick: ImageOnClick_1.default, Columns: Columns_1.default, Column: Column_1.default });
