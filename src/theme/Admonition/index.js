"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var theme_common_1 = require("@docusaurus/theme-common");
var Types_1 = require("@theme/Admonition/Types");
function getAdmonitionTypeComponent(type) {
    var component = Types_1.default[type];
    if (component) {
        return component;
    }
    console.warn("No admonition component found for admonition type \"".concat(type, "\". Using Info as fallback."));
    return Types_1.default.info;
}
function Admonition(unprocessedProps) {
    var props = (0, theme_common_1.processAdmonitionProps)(unprocessedProps);
    var AdmonitionTypeComponent = getAdmonitionTypeComponent(props.type);
    return <AdmonitionTypeComponent {...props}/>;
}
exports.default = Admonition;
