import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import type {Props} from '@theme/Admonition/Type/Tip';
import AdmonitionLayout from '@theme/Admonition/Layout';
import IconDocu from '/img/Docusaurus.svg';


const infimaClassName = 'alert alert--docu';

const defaultProps = {
  icon: <IconDocu />,
  title: (
    <Translate
      id="theme.admonition.docu"
      description="The default label used for the Docu admonition (:::docu)">
      docu
    </Translate>
  ),
};

export default function AdmonitionTypeDocu(props: Props): JSX.Element {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={clsx(infimaClassName, props.className)}>
      {props.children}
    </AdmonitionLayout>
  );
}
