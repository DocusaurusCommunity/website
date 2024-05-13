"use strict";
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
var react_1 = require("react");
var Note_1 = require("@theme/Admonition/Type/Note");
var Tip_1 = require("@theme/Admonition/Type/Tip");
var Info_1 = require("@theme/Admonition/Type/Info");
var Caution_1 = require("@theme/Admonition/Type/Caution");
var Danger_1 = require("@theme/Admonition/Type/Danger");
var Discord_1 = require("./Type/Discord");
var Security_1 = require("./Type/Security");
var Release_1 = require("./Type/Release");
var Credit_1 = require("./Type/Credit");
var Docu_1 = require("./Type/Docu");
var admonitionTypes = {
    note: Note_1.default,
    tip: Tip_1.default,
    info: Info_1.default,
    caution: Caution_1.default,
    danger: Danger_1.default,
    discord: Discord_1.default,
    security: Security_1.default,
    release: Release_1.default,
    credit: Credit_1.default,
    docu: Docu_1.default,
};
// Undocumented legacy admonition type aliases
// Provide hardcoded/untranslated retrocompatible label
// See also https://github.com/facebook/docusaurus/issues/7767
var admonitionAliases = {
    secondary: function (props) { return <Note_1.default title="secondary" {...props}/>; },
    important: function (props) { return <Info_1.default title="important" {...props}/>; },
    success: function (props) { return <Tip_1.default title="success" {...props}/>; },
    // TODO bad legacy mapping, warning is usually yellow, not red...
    warning: function (props) { return <Danger_1.default title="warning" {...props}/>; },
};
exports.default = __assign(__assign({}, admonitionTypes), admonitionAliases);
