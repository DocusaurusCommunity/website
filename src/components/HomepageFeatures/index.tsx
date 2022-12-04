import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { pluginCount } from '@site/src/data/plugins';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  button: {
    link: string;
    text: string;
  }
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Plugin Directory',
    Svg: require('@site/static/img/undraw_portfolio.svg').default,
    description: (
      <>
        We've gathered data on {pluginCount} plugins, we need your help to gather data on more! You can add details on your own plugin or help us add details on other plugins.
      </>
    ),
    button: {
      link: '/plugindirectory',
      text: 'View Plugin Directory',
    }
  },
  {
    title: 'Knowledge Sharing',
    Svg: require('@site/static/img/undraw_knowledge.svg').default,
    description: (
      <>
        We've gathered tutorials, guides, and other resources to help you accelerate your Docusaurus projects and development.
      </>
    ),
    button: {
      link: '/knowledge',
      text: 'View Knowledge',
    }
  },
];

function Feature({title, Svg, description, button}: FeatureItem) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h2>{title}</h2>
        <p>{description}</p>
        <Link to={button.link} className="button button--primary button--lg">{button.text}</Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
