import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import type {Props} from '@theme/Admonition/Type/Info';
import AdmonitionLayout from '@theme/Admonition/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const infimaClassName = 'alert alert--info';

const defaultProps = {
  icon: <FontAwesomeIcon icon={faInfoCircle} />,
  title: (
    <Translate
      id="theme.admonition.info"
      description="The default label used for the Info admonition (:::info)">
      info
    </Translate>
  ),
};

export default function AdmonitionTypeInfo(props: Props): JSX.Element {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={clsx(infimaClassName, props.className)}>
      {props.children}
    </AdmonitionLayout>
  );
}
