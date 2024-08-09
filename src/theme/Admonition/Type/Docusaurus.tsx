import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import type {Props} from '@theme/Admonition/Type/Tip';
import AdmonitionLayout from '@theme/Admonition/Layout';
import IconDocusaurus from '@site/src/assets/Docusaurus.svg';


const infimaClassName = 'alert alert--docusaurus';

const defaultProps = {
  icon: <IconDocusaurus />,
  title: (
    <Translate
      id="theme.admonition.docusaurus"
      description="The default label used for the Docusaurus admonition (:::docusaurus)">
      docusaurus
    </Translate>
  ),
};

export default function AdmonitionTypeDocusaurus(props: Props): JSX.Element {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={clsx(infimaClassName, props.className)}>
      {props.children}
    </AdmonitionLayout>
  );
}
