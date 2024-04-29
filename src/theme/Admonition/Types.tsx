import React from 'react';
import AdmonitionTypeNote from '@theme/Admonition/Type/Note';
import AdmonitionTypeTip from '@theme/Admonition/Type/Tip';
import AdmonitionTypeInfo from '@theme/Admonition/Type/Info';
import AdmonitionTypeCaution from '@theme/Admonition/Type/Caution';
import AdmonitionTypeDanger from '@theme/Admonition/Type/Danger';
import AdmonitionTypeDiscord from './Type/Discord';
import AdmonitionTypeSecurity from './Type/Security';
import AdmonitionTypeRelease from './Type/Release';
import AdmonitionTypeCredit from './Type/Credit';
import AdmonitionTypeDocu from './Type/Docu';
import type AdmonitionTypes from '@theme/Admonition/Types';
import type {Props} from '@theme/Admonition';

const admonitionTypes: typeof AdmonitionTypes = {
  note: AdmonitionTypeNote,
  tip: AdmonitionTypeTip,
  info: AdmonitionTypeInfo,
  caution: AdmonitionTypeCaution,
  danger: AdmonitionTypeDanger,
  discord: AdmonitionTypeDiscord,
  security: AdmonitionTypeSecurity,
  release: AdmonitionTypeRelease,
  credit: AdmonitionTypeCredit,
  docu: AdmonitionTypeDocu,
};

// Undocumented legacy admonition type aliases
// Provide hardcoded/untranslated retrocompatible label
// See also https://github.com/facebook/docusaurus/issues/7767
const admonitionAliases: typeof AdmonitionTypes = {
  secondary: (props: Props) => <AdmonitionTypeNote title="secondary" {...props} />,
  important: (props: Props) => <AdmonitionTypeInfo title="important" {...props} />,
  success: (props: Props) => <AdmonitionTypeTip title="success" {...props} />,
  // TODO bad legacy mapping, warning is usually yellow, not red...
  warning: (props: Props) => <AdmonitionTypeDanger title="warning" {...props} />,
};

export default {
  ...admonitionTypes,
  ...admonitionAliases,
};
