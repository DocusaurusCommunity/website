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
import Button from '@site/src/components/Button';
import ColorPreview from '@site/src/components/ColorPreview';
import Card from '@site/src/components/Card';
import CardBody from '@site/src/components/Card/CardBody';
import CardFooter from '@site/src/components/Card/CardFooter';
import CardHeader from '@site/src/components/Card/CardHeader';
import CardImage from '@site/src/components/Card/CardImage';
import Timeline from '@site/src/components/Timeline';
import TimelineItem from '@site/src/components/Timeline/TimelineItem';

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
    Button,
    ColorPreview,
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter,
    CardImage,
    Timeline,
    TimelineItem,
};
