"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const Link_1 = __importDefault(require("@docusaurus/Link"));
function FocusButton() {
    return (<section className={styles_module_scss_1.default.focusButton}>
            <div className="container">
                <div className="row text--center">
                <p className={(0, clsx_1.default)("text--center", styles_module_scss_1.default.focusButtonText)}>Our community-curated knowledge base is an eclectic collection of in-depth knowledge on Docusaurus customisations. It's a fantastic companion to the Docusaurus documentation.</p>
                <p className={(0, clsx_1.default)("text--center", styles_module_scss_1.default.focusButtonButton)}>
                    <Link_1.default className={(0, clsx_1.default)('button button--secondary button--lg')} to="https://docusaurus.io/docs">Check out the Docusaurus documentation</Link_1.default>
                </p>
                </div>
            </div>
        </section>);
}
exports.default = FocusButton;
