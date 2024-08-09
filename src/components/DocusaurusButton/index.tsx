import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import DocusaurusLogo from '@site/src/assets/Docusaurus.svg'

type Props = {
    to: string;
    label: string;
};

export default function DocusaurusButton(props: Props): JSX.Element {
    return (
        <div className={clsx(styles.docusaurusButton, 'text--center')}>
            <p className="text--center">
                <Link className={clsx(styles.docusaurusButtonButton, 'button button--secondary button--lg')} to={props.to}>
                    <span className={styles.docusaurusButtonIcon}><DocusaurusLogo /></span>
                    <span className={styles.docusaurusButtonText}>{props.label}</span>
                </Link>
            </p>
        </div>
    );
}
