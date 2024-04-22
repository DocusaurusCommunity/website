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
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
function Svg(props) {
    const { svgClass, colorAttr, children, color = 'inherit', size = 'medium', viewBox = '0 0 24 24', ...rest } = props;
    return (<svg viewBox={viewBox} color={colorAttr} aria-hidden className={(0, clsx_1.default)(styles_module_scss_1.default.svgIcon, styles_module_scss_1.default[color], styles_module_scss_1.default[size], svgClass)} {...rest}>
      {children}
    </svg>);
}
exports.default = Svg;
