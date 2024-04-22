"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const Link_1 = __importDefault(require("@docusaurus/Link"));
const Docusaurus_svg_1 = __importDefault(require("@site/src/assets/Docusaurus.svg"));
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
