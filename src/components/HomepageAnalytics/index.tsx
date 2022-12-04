import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
export default function HomepageAnalytics(): JSX.Element {
    return (
      <section className={styles.analytics}>
        <div className="container">
          <div className="row text--center">
            <p className={clsx("text--center", styles.analyticsText)}>We use the <Link to="https://plausible.io" target="_blank">Plausible Analytics</Link> system to track engagement on the site. In the interests of transparency and being good web citizens the analytics information we gather can be viewed publicly.</p>
            <p className={clsx("text--center", styles.analyticsButton)}>
              <Link className={clsx('button button--primary button--lg')} to="https://plausible.io/docusaurus.community/">Analytics Information for Docusaurus.community</Link>
            </p>
          </div>
        </div>
      </section>
    );
  }

