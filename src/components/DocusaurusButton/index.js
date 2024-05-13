"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var clsx_1 = require("clsx");
var styles_module_scss_1 = require("./styles.module.scss");
var Link_1 = require("@docusaurus/Link");
var Docusaurus_svg_1 = require("@site/src/assets/Docusaurus.svg");
function DocusaurusButton(props) {
    return (<div className={(0, clsx_1.default)(styles_module_scss_1.default.docusaurusButton, 'text--center')}>
            <p className="text--center">
                <Link_1.default className={(0, clsx_1.default)(styles_module_scss_1.default.docusaurusButtonButton, 'button button--secondary button--lg')} to={props.to}>
                    <span className={styles_module_scss_1.default.docusaurusButtonIcon}><Docusaurus_svg_1.default /></span>
                    <span className={styles_module_scss_1.default.docusaurusButtonText}>{props.label}</span>
                </Link_1.default>
            </p>
        </div>);
}
exports.default = DocusaurusButton;
