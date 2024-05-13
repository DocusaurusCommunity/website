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
exports.readOperator = exports.OperatorQueryKey = void 0;
var react_1 = require("react");
var clsx_1 = require("clsx");
var router_1 = require("@docusaurus/router");
var index_1 = require("../../index");
var styles_module_scss_1 = require("./styles.module.scss");
exports.OperatorQueryKey = 'operator';
function readOperator(search) {
    var _a;
    return ((_a = new URLSearchParams(search).get(exports.OperatorQueryKey)) !== null && _a !== void 0 ? _a : 'OR');
}
exports.readOperator = readOperator;
function PluginDirectoryFilterToggle() {
    var id = 'plugindirectory_filter_toggle';
    var location = (0, router_1.useLocation)();
    var history = (0, router_1.useHistory)();
    var _a = (0, react_1.useState)(false), operator = _a[0], setOperator = _a[1];
    (0, react_1.useEffect)(function () {
        setOperator(readOperator(location.search) === 'AND');
    }, [location]);
    var toggleOperator = (0, react_1.useCallback)(function () {
        setOperator(function (o) { return !o; });
        var searchParams = new URLSearchParams(location.search);
        searchParams.delete(exports.OperatorQueryKey);
        if (!operator) {
            searchParams.append(exports.OperatorQueryKey, 'AND');
        }
        history.push(__assign(__assign({}, location), { search: searchParams.toString(), state: (0, index_1.prepareUserState)() }));
    }, [operator, location, history]);
    return (<div>
      <input type="checkbox" id={id} className="screen-reader-only" aria-label="Toggle between or and and for the tags you selected" onChange={toggleOperator} onKeyDown={function (e) {
            if (e.key === 'Enter') {
                toggleOperator();
            }
        }} checked={operator}/>
      <label htmlFor={id} className={(0, clsx_1.default)(styles_module_scss_1.default.checkboxLabel, 'shadow--md')}>
        {/* eslint-disable @docusaurus/no-untranslated-text */}
        <span className={styles_module_scss_1.default.checkboxLabelOr}>OR</span>
        <span className={styles_module_scss_1.default.checkboxLabelAnd}>AND</span>
        {/* eslint-enable @docusaurus/no-untranslated-text */}
      </label>
    </div>);
}
exports.default = PluginDirectoryFilterToggle;
