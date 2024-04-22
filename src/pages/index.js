"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const useDocusaurusContext_1 = __importDefault(require("@docusaurus/useDocusaurusContext"));
const Layout_1 = __importDefault(require("@theme/Layout"));
const HomepageFeatures_1 = __importDefault(require("@site/src/components/HomepageFeatures"));
const HomepageDocumentation_1 = __importDefault(require("@site/src/components/HomepageDocumentation"));
const HomepageAnalytics_1 = __importDefault(require("@site/src/components/HomepageAnalytics"));
const index_module_scss_1 = __importDefault(require("./index.module.scss"));
function HomepageHeader() {
    const { siteConfig } = (0, useDocusaurusContext_1.default)();
    return (<header className={(0, clsx_1.default)('hero hero--primary', index_module_scss_1.default.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>);
}
function Home() {
    const { siteConfig } = (0, useDocusaurusContext_1.default)();
    return (<Layout_1.default title={`${siteConfig.title}`} description={`${siteConfig.tagline}`}>
      <HomepageHeader />
      <main>
        <HomepageFeatures_1.default />
        <HomepageDocumentation_1.default />
        <HomepageAnalytics_1.default />
      </main>
    </Layout_1.default>);
}
exports.default = Home;
