"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var clsx_1 = require("clsx");
var useDocusaurusContext_1 = require("@docusaurus/useDocusaurusContext");
var Layout_1 = require("@theme/Layout");
var HomepageFeatures_1 = require("@site/src/components/HomepageFeatures");
var HomepageDocumentation_1 = require("@site/src/components/HomepageDocumentation");
var HomepageAnalytics_1 = require("@site/src/components/HomepageAnalytics");
var index_module_scss_1 = require("./index.module.scss");
function HomepageHeader() {
    var siteConfig = (0, useDocusaurusContext_1.default)().siteConfig;
    return (<header className={(0, clsx_1.default)('hero hero--primary', index_module_scss_1.default.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>);
}
function Home() {
    var siteConfig = (0, useDocusaurusContext_1.default)().siteConfig;
    return (<Layout_1.default title={"".concat(siteConfig.title)} description={"".concat(siteConfig.tagline)}>
      <HomepageHeader />
      <main>
        <HomepageFeatures_1.default />
        <HomepageDocumentation_1.default />
        <HomepageAnalytics_1.default />
      </main>
    </Layout_1.default>);
}
exports.default = Home;
