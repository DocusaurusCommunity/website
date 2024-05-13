"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var clsx_1 = require("clsx");
var styles_module_scss_1 = require("./styles.module.scss");
var Link_1 = require("@docusaurus/Link");
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
