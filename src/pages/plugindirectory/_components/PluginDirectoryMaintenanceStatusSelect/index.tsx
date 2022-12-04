/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useCallback,
  useState,
  useEffect,
  type ComponentProps,
  type ReactNode,
  type ReactElement,
} from 'react';
import {useHistory, useLocation} from '@docusaurus/router';
import {toggleListItem} from '@site/src/utils/jsUtils';

import {prepareUserState} from '../../index';
import styles from './styles.module.scss';
import { MaintainedType } from '@site/src/data/plugins';

interface Props extends ComponentProps<'input'> {
  icon: ReactElement<ComponentProps<'svg'>>;
  label: ReactNode;
  maintenanceStatus: MaintainedType;
}

const MaintainedQueryStringKey = 'maintained';

export function readMaintenanceStatus(search: string): MaintainedType[] {
  return new URLSearchParams(search).getAll(MaintainedQueryStringKey) as MaintainedType[];
}

function replaceMaintenanceStatus(search: string, maintenanceStatus: MaintainedType[]) {
  const searchParams = new URLSearchParams(search);
  searchParams.delete(MaintainedQueryStringKey);
  maintenanceStatus.forEach((status) => searchParams.append(MaintainedQueryStringKey, status));
  return searchParams.toString();
}

function PluginDirectoryMaintenanceStatusSelect(
  {id, icon, label, maintenanceStatus, ...rest}: Props,
  ref: React.ForwardedRef<HTMLLabelElement>,
) {
  const location = useLocation();
  const history = useHistory();
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    const statuses = readMaintenanceStatus(location.search);
    setSelected(statuses.includes(maintenanceStatus));
  }, [maintenanceStatus, location]);
  const toggleTag = useCallback(() => {
    const statuses = readMaintenanceStatus(location.search);
    const maintained = toggleListItem(statuses, maintenanceStatus);
    const newSearch = replaceMaintenanceStatus(location.search, maintained);
    history.push({
      ...location,
      search: newSearch,
      state: prepareUserState(),
    });
  }, [maintenanceStatus, location, history]);
  return (
    <>
      <input
        type="checkbox"
        id={id}
        className="screen-reader-only"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            toggleTag();
          }
        }}
        onFocus={(e) => {
          if (e.relatedTarget) {
            e.target.nextElementSibling?.dispatchEvent(
              new KeyboardEvent('focus'),
            );
          }
        }}
        onBlur={(e) => {
          e.target.nextElementSibling?.dispatchEvent(new KeyboardEvent('blur'));
        }}
        onChange={toggleTag}
        checked={selected}
        {...rest}
      />
      <label ref={ref} htmlFor={id} className={styles.checkboxLabel}>
        {label}
        {icon}
      </label>
    </>
  );
}

export default React.forwardRef(PluginDirectoryMaintenanceStatusSelect);
