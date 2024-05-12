/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import MDXComponents from '@theme-original/MDXComponents';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocusaurusButton from '@site/src/components/DocusaurusButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Icon as IconifyIcon } from '@iconify/react';
import ImageOnClick from '@site/src/components/ImageOnClick';
import Columns from '@site/src/components/Columns';
import Column from '@site/src/components/Column';

library.add(fab, fas);

export default {
    ...MDXComponents,
    Tabs,
    TabItem,
    DocusaurusButton,
    FAIcon: FontAwesomeIcon,
    IIcon: IconifyIcon,
    ImageOnClick,
    Columns,
    Column,

};
