import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import type {Props} from '@theme/Admonition/Type/Tip';
import AdmonitionLayout from '@theme/Admonition/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const infimaClassName = 'alert alert--credit';

const defaultProps = {
  icon: <FontAwesomeIcon icon={faThumbsUp} />,
  title: (
    <Translate
      id="theme.admonition.credit"
      description="The default label used for the Credit admonition (:::credit)">
      credit
    </Translate>
  ),
};

export default function AdmonitionTypeCredit(props: Props): JSX.Element {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={clsx(infimaClassName, props.className)}>
      {props.children}
    </AdmonitionLayout>
  );
}
