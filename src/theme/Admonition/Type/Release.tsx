import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import type {Props} from '@theme/Admonition/Type/Tip';
import AdmonitionLayout from '@theme/Admonition/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/free-solid-svg-icons';

const infimaClassName = 'alert alert--release';

const defaultProps = {
  icon: <FontAwesomeIcon icon={faRocket} />,
  title: (
    <Translate
      id="theme.admonition.release"
      description="The default label used for the Release admonition (:::release)">
      release
    </Translate>
  ),
};

export default function AdmonitionTypeRelease(props: Props): JSX.Element {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={clsx(infimaClassName, props.className)}>
      {props.children}
    </AdmonitionLayout>
  );
}
