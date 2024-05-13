"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var clsx_1 = require("clsx");
var styles_module_scss_1 = require("./styles.module.scss");
var plugins_1 = require("@site/src/data/plugins");
var Link_1 = require("@docusaurus/Link");
var FeatureList = [
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
function Feature(_a) {
    var title = _a.title, Svg = _a.Svg, description = _a.description, button = _a.button;
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
          {FeatureList.map(function (props, idx) { return (<Feature key={idx} {...props}/>); })}
        </div>
      </div>
    </section>);
}
exports.default = HomepageFeatures;
