import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import type {Props} from '@theme/Admonition/Type/Tip';
import AdmonitionLayout from '@theme/Admonition/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

const infimaClassName = 'alert alert--discord';

const defaultProps = {
  icon: <FontAwesomeIcon icon={faDiscord} />,
  title: (
    <Translate
      id="theme.admonition.discord"
      description="The default label used for the Discord admonition (:::discord)">
      discord
    </Translate>
  ),
};

export default function AdmonitionTypeDiscord(props: Props): JSX.Element {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={clsx(infimaClassName, props.className)}>
      {props.children}
    </AdmonitionLayout>
  );
}
