/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useState, useMemo, useEffect} from 'react';
import clsx from 'clsx';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Translate, {translate} from '@docusaurus/Translate';
import {useHistory, useLocation} from '@docusaurus/router';
import {usePluralForm} from '@docusaurus/theme-common';

import Layout from '@theme/Layout';
import {
  sortedPlugins,
  Tags,
  TagList,
  type Plugin,
  type TagType,
  MaintainedType,
  MaintenanceStatusList,
  MaintenanceStatuses,
} from '@site/src/data/plugins';
import PluginDirectoryTagSelect, {
  readSearchTags,
} from './_components/PluginDirectoryTagSelect';
import PluginDirectoryMaintenanceStatusSelect, {
  readMaintenanceStatus
} from './_components/PluginDirectoryMaintenanceStatusSelect';
import PluginDirectoryFilterToggle, {
  type Operator,
  readOperator,
} from './_components/PluginDirectoryFilterToggle';
import PluginDirectoryCard from './_components/PluginDirectoryCard';
import PluginDirectoryTooltip from './_components/PluginDirectoryTooltip';

import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faHeart } from '@fortawesome/free-solid-svg-icons';
const TITLE = translate({message: 'Docusaurus Community Plugin Directory'});
const DESCRIPTION = translate({
  message: 'A community-sourced list of plugins for Docusaurus v2',
});
const SUBMIT_URL = 'https://github.com/homotechsual/docusaurus.community/discussions/3';

type UserState = {
  scrollTopPosition: number;
  focusedElementId: string | undefined;
};

function restoreUserState(userState: UserState | null) {
  const {scrollTopPosition, focusedElementId} = userState ?? {
    scrollTopPosition: 0,
    focusedElementId: undefined,
  };
  // @ts-expect-error: if focusedElementId is undefined it returns null
  document.getElementById(focusedElementId)?.focus();
  window.scrollTo({top: scrollTopPosition});
}

export function prepareUserState(): UserState | undefined {
  if (ExecutionEnvironment.canUseDOM) {
    return {
      scrollTopPosition: window.scrollY,
      focusedElementId: document.activeElement?.id,
    };
  }

  return undefined;
}

const SearchNameQueryKey = 'name';

function readSearchName(search: string) {
  return new URLSearchParams(search).get(SearchNameQueryKey);
}

function filterPlugins(
  plugins: Plugin[],
  selectedTags: TagType[],
  operator: Operator,
  searchName: string | null,
  selectedMaintenanceStatuses: MaintainedType[],
) {
  let filteredPlugins = plugins;
  if (searchName) {
    // eslint-disable-next-line no-param-reassign
    filteredPlugins = filteredPlugins.filter((plugin) =>
      plugin.name.toLowerCase().includes(searchName.toLowerCase())
      || plugin.author?.toLowerCase().includes(searchName.toLowerCase()),
    );
  }
  if (selectedMaintenanceStatuses.length === 0) {
    filteredPlugins = filteredPlugins;
  }
  if (selectedMaintenanceStatuses.length > 0) {
    filteredPlugins = filteredPlugins.filter((plugin) => {
      if (operator === 'AND') {
        return selectedMaintenanceStatuses.every((status) => plugin.maintenanceStatus.includes(status));
      }
      return selectedMaintenanceStatuses.some((status) => plugin.maintenanceStatus.includes(status));
    });
  }
  if (selectedTags.length === 0) {
    filteredPlugins = filteredPlugins;
  }
  if (selectedTags.length > 0) {
    filteredPlugins = plugins.filter((plugin) => {
      if (plugin.tags.length === 0) {
        return false;
      }
      if (operator === 'AND') {
        return selectedTags.every((tag) => plugin.tags.includes(tag));
      }
      return selectedTags.some((tag) => plugin.tags.includes(tag));
    });
  }
  return filteredPlugins;
}

function useFilteredPlugins() {
  const location = useLocation<UserState>();
  const [operator, setOperator] = useState<Operator>('OR');
  // On SSR / first mount (hydration) no tag is selected
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [searchName, setSearchName] = useState<string | null>(null);
  const [selectedMaintenanceStatuses, setSelectedMaintenanceStatuses] = useState<MaintainedType[]>([]);
  // Sync tags from QS to state (delayed on purpose to avoid SSR/Client
  // hydration mismatch)
  useEffect(() => {
    setSelectedTags(readSearchTags(location.search));
    setOperator(readOperator(location.search));
    setSearchName(readSearchName(location.search));
    setSelectedMaintenanceStatuses(readMaintenanceStatus(location.search));
    restoreUserState(location.state);
  }, [location]);

  return useMemo(
    () => filterPlugins(sortedPlugins, selectedTags, operator, searchName, selectedMaintenanceStatuses),
    [selectedTags, operator, searchName, selectedMaintenanceStatuses],
  );
}

function PluginDirectoryHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <h1>{TITLE}</h1>
      <p>{DESCRIPTION}</p>
      <a
        className="button button--primary button--lg"
        href={SUBMIT_URL}
        target="_blank"
        rel="noreferrer">
          <FontAwesomeIcon icon={faPlusSquare} className={styles.buttonIcon}/>
          <Translate id="plugindirectory.header.button">
            Add a plugin
          </Translate>
      </a>
    </section>
  );
}

function usePluginCountPlural() {
  const {selectMessage} = usePluralForm();
  return (pluginCount: number) =>
    selectMessage(
      pluginCount,
      translate(
        {
          id: 'plugindirectory.filters.resultCount',
          description:
            'Pluralized label for the number of plugins found in the directory. Use as many plural forms (separated by "|") as your language supports/needs (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: '1 plugin|{pluginCount} plugins',
        },
        {pluginCount},
      ),
    );
}

function PluginDirectoryFilters() {
  const filteredPlugins = useFilteredPlugins();
  const pluginCountPlural = usePluginCountPlural();
  return (
    <section className="container margin-top--l margin-bottom--lg">
      <div className={clsx('margin-bottom--sm', styles.filterCheckbox)}>
        <div>
          <h2>
            <Translate id="plugindirectory.filters.title">Filters</Translate>
          </h2>
          <span>{pluginCountPlural(filteredPlugins.length)}</span>
        </div>
        <PluginDirectoryFilterToggle />
      </div>
      <ul className={clsx('clean-list', styles.checkboxList)}>
        {TagList.map((tag, i) => {
          const {label, description, color} = Tags[tag];
          const id = `plugindirectory_checkbox_id_${tag}`;

          return (
            <li key={i} className={styles.checkboxListItem}>
              <PluginDirectoryTooltip
                id={id}
                text={description}
                anchorEl="#__docusaurus">
                <PluginDirectoryTagSelect
                  tag={tag}
                  id={id}
                  label={label}
                  icon={
                    tag === 'favourite' ? (
                      <FontAwesomeIcon icon={faHeart} size="lg" className={styles.svgIconFavourite} />
                    ) : (
                      <span
                        style={{
                          backgroundColor: color,
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          marginLeft: 8,
                        }}
                      />
                    )
                  }
                />
              </PluginDirectoryTooltip>
            </li>
          );
        })}
      </ul>
      <ul className={clsx('clean-list', styles.checkboxList)}>
        {MaintenanceStatusList.map((maintenanceStatus, i) => {
          const {label, description, icon} = MaintenanceStatuses[maintenanceStatus];
          const id = `plugindirectory_checkbox_id_${maintenanceStatus}`;
          return (
            <li key={i} className={styles.checkboxListItem}>
              <PluginDirectoryTooltip
                id={id}
                text={description}
                anchorEl="#__docusaurus">
                <PluginDirectoryMaintenanceStatusSelect
                  maintenanceStatus={maintenanceStatus}
                  id={id}
                  label={label}
                  icon={icon}
                />
              </PluginDirectoryTooltip>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const favouritePlugins = sortedPlugins.filter(
  (plugin) => plugin.tags.includes('favourite'),
);
const otherPlugins = sortedPlugins.filter(
  (plugin) => !plugin.tags.includes('favourite'),
);

function SearchBar() {
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = useState<string | null>(null);
  useEffect(() => {
    setValue(readSearchName(location.search));
  }, [location]);
  return (
    <div className={styles.searchContainer}>
      <input
        id="searchbar"
        placeholder={translate({
          message: 'Search for plugin or author name...',
          id: 'plugindirectory.searchBar.placeholder',
        })}
        value={value ?? undefined}
        onInput={(e) => {
          setValue(e.currentTarget.value);
          const newSearch = new URLSearchParams(location.search);
          newSearch.delete(SearchNameQueryKey);
          if (e.currentTarget.value) {
            newSearch.set(SearchNameQueryKey, e.currentTarget.value);
          }
          history.push({
            ...location,
            search: newSearch.toString(),
            state: prepareUserState(),
          });
          setTimeout(() => {
            document.getElementById('searchbar')?.focus();
          }, 0);
        }}
      />
    </div>
  );
}

function PluginDirectoryCards() {
  const filteredPlugins = useFilteredPlugins();

  if (filteredPlugins.length === 0) {
    return (
      <section className="margin-top--lg margin-bottom--xl">
        <div className="container padding-vert--md text--center">
          <h2>
            <Translate id="plugindirectory.usersList.noResult">No result</Translate>
          </h2>
          <SearchBar />
        </div>
      </section>
    );
  }

  return (
    <section className="margin-top--lg margin-bottom--xl">
      {filteredPlugins.length === sortedPlugins.length ? (
        <>
          <div className={styles.pluginDirectoryFavourite}>
            <div className="container">
              <div
                className={clsx(
                  'margin-bottom--md',
                  styles.pluginDirectoryFavouriteHeader,
                )}>
                <h2>
                  <Translate id="plugindirectory.favouritesList.title">
                    Our favourite plugins
                  </Translate>
                </h2>
                <FontAwesomeIcon icon={faHeart} className={styles.svgIconFavourite} size="2xl" />
                <SearchBar />
              </div>
              <ul
                className={clsx(
                  'container',
                  'clean-list',
                  styles.pluginDirectoryList,
                )}>
                {favouritePlugins.map((plugin) => (
                  <PluginDirectoryCard key={plugin.id} plugin={plugin} />
                ))}
              </ul>
            </div>
          </div>
          <div className="container margin-top--lg">
            <h2 className={styles.pluginDirectoryHeader}>
              <Translate id="plugindirectory.usersList.allUsers">All plugins</Translate>
            </h2>
            <ul className={clsx('clean-list', styles.pluginDirectoryList)}>
              {otherPlugins.map((plugin) => (
                <PluginDirectoryCard key={plugin.id} plugin={plugin} />
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="container">
          <div
            className={clsx(
              'margin-bottom--md',
              styles.pluginDirectoryFavouriteHeader,
            )}>
            <SearchBar />
          </div>
          <ul className={clsx('clean-list', styles.pluginDirectoryList)}>
            {filteredPlugins.map((plugin) => (
              <PluginDirectoryCard key={plugin.id} plugin={plugin} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default function PluginDirectory(): JSX.Element {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <PluginDirectoryHeader />
        <PluginDirectoryFilters />
        <PluginDirectoryCards />
      </main>
    </Layout>
  );
}
