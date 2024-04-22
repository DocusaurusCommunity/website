"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const Translate_1 = __importDefault(require("@docusaurus/Translate"));
const Layout_1 = __importDefault(require("@theme/Admonition/Layout"));
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const infimaClassName = 'alert alert--credit';
const defaultProps = {
    icon: <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faThumbsUp}/>,
    title: (<Translate_1.default id="theme.admonition.credit" description="The default label used for the Credit admonition (:::credit)">
      credit
    </Translate_1.default>),
};
function AdmonitionTypeCredit(props) {
    return (<Layout_1.default {...defaultProps} {...props} className={(0, clsx_1.default)(infimaClassName, props.className)}>
      {props.children}
    </Layout_1.default>);
}
exports.default = AdmonitionTypeCredit;
