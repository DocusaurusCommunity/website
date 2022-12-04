/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Svg, {type SvgIconProps} from '@site/src/components/Svg';

export default function MaintenanceIcon(
  props: Omit<SvgIconProps, 'children'>,
): JSX.Element {
  return (
    <Svg {...props}>
      <path d="M7 6.252V7H4.25A2.25 2.25 0 0 0 2 9.25v2.25h4.5v-.75a.75.75 0 0 1 1.5 0v.75h8v-.75a.75.75 0 0 1 1.5 0v.75H22V9.25A2.25 2.25 0 0 0 19.75 7H17v-.748a2.25 2.25 0 0 0-2.25-2.25h-5.5A2.25 2.25 0 0 0 7 6.252Zm2.25-.75h5.5a.75.75 0 0 1 .75.75V7h-7v-.748a.75.75 0 0 1 .75-.75ZM22 13h-4.5v1.25a.75.75 0 0 1-1.5 0V13H8v1.25a.75.75 0 0 1-1.5 0V13H2v4.747a2.25 2.25 0 0 0 2.25 2.25h15.5a2.25 2.25 0 0 0 2.25-2.25V13Z"/>
    </Svg>
  );
}
