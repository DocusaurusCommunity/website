"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const plugins_1 = require("@site/src/data/plugins");
const Link_1 = __importDefault(require("@docusaurus/Link"));
const FeatureList = [
    {
        title: 'Plugin Directory',
        Svg: require('@site/static/img/undraw_portfolio.svg').default,
        description: (<>
        We've gathered data on {plugins_1.pluginCount} plugins, we need your help to gather data on more! You can add details on your own plugin or help us add details on other plugins.
      </>),
        button: {
            link: '/plugindirectory',
            text: 'View Plugin Directory',
        }
    },
    {
        title: 'Knowledge Sharing',
        Svg: require('@site/static/img/undraw_knowledge.svg').default,
        description: (<>
        We've gathered tutorials, guides, and other resources to help you accelerate your Docusaurus projects and development.
      </>),
        button: {
            link: '/knowledge',
            text: 'View Knowledge',
        }
    },
];
function Feature({ title, Svg, description, button }) {
    return (<div className={(0, clsx_1.default)('col col--6')}>
      <div className="text--center">
        <Svg className={styles_module_scss_1.default.featureSvg} role="img"/>
      </div>
      <div className="text--center padding-horiz--md">
        <h2>{title}</h2>
        <p>{description}</p>
        <Link_1.default to={button.link} className="button button--primary button--lg">{button.text}</Link_1.default>
      </div>
    </div>);
}
function HomepageFeatures() {
    return (<section className={styles_module_scss_1.default.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (<Feature key={idx} {...props}/>))}
        </div>
      </div>
    </section>);
}
exports.default = HomepageFeatures;
