"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Note_1 = __importDefault(require("@theme/Admonition/Type/Note"));
const Tip_1 = __importDefault(require("@theme/Admonition/Type/Tip"));
const Info_1 = __importDefault(require("@theme/Admonition/Type/Info"));
const Caution_1 = __importDefault(require("@theme/Admonition/Type/Caution"));
const Danger_1 = __importDefault(require("@theme/Admonition/Type/Danger"));
const Discord_1 = __importDefault(require("./Type/Discord"));
const Security_1 = __importDefault(require("./Type/Security"));
const Release_1 = __importDefault(require("./Type/Release"));
const Credit_1 = __importDefault(require("./Type/Credit"));
const admonitionTypes = {
    note: Note_1.default,
    tip: Tip_1.default,
    info: Info_1.default,
    caution: Caution_1.default,
    danger: Danger_1.default,
    discord: Discord_1.default,
    security: Security_1.default,
    release: Release_1.default,
    credit: Credit_1.default,
};
// Undocumented legacy admonition type aliases
// Provide hardcoded/untranslated retrocompatible label
// See also https://github.com/facebook/docusaurus/issues/7767
const admonitionAliases = {
    secondary: (props) => <Note_1.default title="secondary" {...props}/>,
    important: (props) => <Info_1.default title="important" {...props}/>,
    success: (props) => <Tip_1.default title="success" {...props}/>,
    // TODO bad legacy mapping, warning is usually yellow, not red...
    warning: (props) => <Danger_1.default title="warning" {...props}/>,
};
exports.default = {
    ...admonitionTypes,
    ...admonitionAliases,
};
