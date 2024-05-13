"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var clsx_1 = require("clsx");
var Translate_1 = require("@docusaurus/Translate");
var Layout_1 = require("@theme/Admonition/Layout");
var Docusaurus_svg_1 = require("/img/Docusaurus.svg");
var infimaClassName = 'alert alert--docu';
var defaultProps = {
    icon: <Docusaurus_svg_1.default />,
    title: (<Translate_1.default id="theme.admonition.docu" description="The default label used for the Docu admonition (:::docu)">
      docu
    </Translate_1.default>),
};
function AdmonitionTypeDocu(props) {
    return (<Layout_1.default {...defaultProps} {...props} className={(0, clsx_1.default)(infimaClassName, props.className)}>
      {props.children}
    </Layout_1.default>);
}
exports.default = AdmonitionTypeDocu;
