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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSearchTags = void 0;
var react_1 = require("react");
var router_1 = require("@docusaurus/router");
var jsUtils_1 = require("@site/src/utils/jsUtils");
var index_1 = require("../../index");
var styles_module_scss_1 = require("./styles.module.scss");
var TagQueryStringKey = 'tags';
function readSearchTags(search) {
    return new URLSearchParams(search).getAll(TagQueryStringKey);
}
exports.readSearchTags = readSearchTags;
function replaceSearchTags(search, newTags) {
    var searchParams = new URLSearchParams(search);
    searchParams.delete(TagQueryStringKey);
    newTags.forEach(function (tag) { return searchParams.append(TagQueryStringKey, tag); });
    return searchParams.toString();
}
function PluginDirectoryTagSelect(_a, ref) {
    var id = _a.id, icon = _a.icon, label = _a.label, tag = _a.tag, rest = __rest(_a, ["id", "icon", "label", "tag"]);
    var location = (0, router_1.useLocation)();
    var history = (0, router_1.useHistory)();
    var _b = (0, react_1.useState)(false), selected = _b[0], setSelected = _b[1];
    (0, react_1.useEffect)(function () {
        var tags = readSearchTags(location.search);
        setSelected(tags.includes(tag));
    }, [tag, location]);
    var toggleTag = (0, react_1.useCallback)(function () {
        var tags = readSearchTags(location.search);
        var newTags = (0, jsUtils_1.toggleListItem)(tags, tag);
        var newSearch = replaceSearchTags(location.search, newTags);
        history.push(__assign(__assign({}, location), { search: newSearch, state: (0, index_1.prepareUserState)() }));
    }, [tag, location, history]);
    return (<>
      <input type="checkbox" id={id} className="screen-reader-only" onKeyDown={function (e) {
            if (e.key === 'Enter') {
                toggleTag();
            }
        }} onFocus={function (e) {
            var _a;
            if (e.relatedTarget) {
                (_a = e.target.nextElementSibling) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new KeyboardEvent('focus'));
            }
        }} onBlur={function (e) {
            var _a;
            (_a = e.target.nextElementSibling) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new KeyboardEvent('blur'));
        }} onChange={toggleTag} checked={selected} {...rest}/>
      <label ref={ref} htmlFor={id} className={styles_module_scss_1.default.checkboxLabel}>
        {label}
        {icon}
      </label>
    </>);
}
exports.default = react_1.default.forwardRef(PluginDirectoryTagSelect);
