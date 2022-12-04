/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Svg, {type SvgIconProps} from '@site/src/components/Svg';

export default function FavoriteIcon(
  props: Omit<SvgIconProps, 'children'>,
): JSX.Element {
  return (
    <Svg {...props}>
      <path d="m12.82 5.58-.82.822-.824-.824a5.375 5.375 0 1 0-7.601 7.602l7.895 7.895a.75.75 0 0 0 1.06 0l7.902-7.897a5.376 5.376 0 0 0-.001-7.599 5.38 5.38 0 0 0-7.611 0Z"/>
    </Svg>
  );
}
