"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MDXComponents_1 = __importDefault(require("@theme-original/MDXComponents"));
const Tabs_1 = __importDefault(require("@theme/Tabs"));
const TabItem_1 = __importDefault(require("@theme/TabItem"));
const DocusaurusButton_1 = __importDefault(require("@site/src/components/DocusaurusButton"));
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const fontawesome_svg_core_1 = require("@fortawesome/fontawesome-svg-core");
const free_brands_svg_icons_1 = require("@fortawesome/free-brands-svg-icons");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const react_1 = require("@iconify/react");
fontawesome_svg_core_1.library.add(free_brands_svg_icons_1.fab, free_solid_svg_icons_1.fas);
exports.default = {
    ...MDXComponents_1.default,
    Tabs: Tabs_1.default,
    TabItem: TabItem_1.default,
    DocusaurusButton: DocusaurusButton_1.default,
    FAIcon: react_fontawesome_1.FontAwesomeIcon,
    IIcon: react_1.Icon,
};
