"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_common_1 = require("@docusaurus/theme-common");
const Types_1 = __importDefault(require("@theme/Admonition/Types"));
function getAdmonitionTypeComponent(type) {
    const component = Types_1.default[type];
    if (component) {
        return component;
    }
    console.warn(`No admonition component found for admonition type "${type}". Using Info as fallback.`);
    return Types_1.default.info;
}
function Admonition(unprocessedProps) {
    const props = (0, theme_common_1.processAdmonitionProps)(unprocessedProps);
    const AdmonitionTypeComponent = getAdmonitionTypeComponent(props.type);
    return <AdmonitionTypeComponent {...props}/>;
}
exports.default = Admonition;
