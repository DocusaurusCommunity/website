"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const Link_1 = __importDefault(require("@docusaurus/Link"));
function HomepageAnalytics() {
    return (<section className={styles_module_scss_1.default.analytics}>
        <div className="container">
          <div className="row text--center">
            <p className={(0, clsx_1.default)("text--center", styles_module_scss_1.default.analyticsText)}>We use the <Link_1.default to="https://plausible.io" target="_blank">Plausible Analytics</Link_1.default> system to track engagement on the site. In the interests of transparency and being good web citizens the analytics information we gather can be viewed publicly.</p>
            <p className={(0, clsx_1.default)("text--center", styles_module_scss_1.default.analyticsButton)}>
              <Link_1.default className={(0, clsx_1.default)('button button--primary button--lg')} to="https://plausible.io/docusaurus.community/">Analytics Information for Docusaurus.community</Link_1.default>
            </p>
          </div>
        </div>
      </section>);
}
exports.default = HomepageAnalytics;
