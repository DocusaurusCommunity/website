"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareUserState = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const ExecutionEnvironment_1 = __importDefault(require("@docusaurus/ExecutionEnvironment"));
const Translate_1 = __importStar(require("@docusaurus/Translate"));
const router_1 = require("@docusaurus/router");
const theme_common_1 = require("@docusaurus/theme-common");
const Layout_1 = __importDefault(require("@theme/Layout"));
const plugins_1 = require("@site/src/data/plugins");
const PluginDirectoryTagSelect_1 = __importStar(require("./_components/PluginDirectoryTagSelect"));
const PluginDirectoryMaintenanceStatusSelect_1 = __importStar(require("./_components/PluginDirectoryMaintenanceStatusSelect"));
const PluginDirectoryFilterToggle_1 = __importStar(require("./_components/PluginDirectoryFilterToggle"));
const PluginDirectoryCard_1 = __importDefault(require("./_components/PluginDirectoryCard"));
const PluginDirectoryTooltip_1 = __importDefault(require("./_components/PluginDirectoryTooltip"));
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const Docusaurus_svg_1 = __importDefault(require("@site/src/assets/Docusaurus.svg"));
const TITLE = (0, Translate_1.translate)({ message: 'Docusaurus Community Plugin Directory' });
const DESCRIPTION = (0, Translate_1.translate)({
    message: 'A community-sourced list of plugins for Docusaurus v2',
});
const SUBMIT_URL = 'https://github.com/homotechsual/docusaurus.community/discussions/3';
function restoreUserState(userState) {
    const { scrollTopPosition, focusedElementId } = userState ?? {
        scrollTopPosition: 0,
        focusedElementId: undefined,
    };
    document.getElementById(focusedElementId)?.focus();
    window.scrollTo({ top: scrollTopPosition });
}
function prepareUserState() {
    if (ExecutionEnvironment_1.default.canUseDOM) {
        return {
            scrollTopPosition: window.scrollY,
            focusedElementId: document.activeElement?.id,
        };
    }
    return undefined;
}
exports.prepareUserState = prepareUserState;
const SearchNameQueryKey = 'name';
function readSearchName(search) {
    return new URLSearchParams(search).get(SearchNameQueryKey);
}
function filterPlugins(plugins, selectedTags, operator, searchName, selectedMaintenanceStatuses) {
    let filteredPlugins = plugins;
    if (searchName) {
        // eslint-disable-next-line no-param-reassign
        filteredPlugins = filteredPlugins.filter((plugin) => plugin.name.toLowerCase().includes(searchName.toLowerCase())
            || plugin.author?.toLowerCase().includes(searchName.toLowerCase()));
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
    const location = (0, router_1.useLocation)();
    const [operator, setOperator] = (0, react_1.useState)('OR');
    // On SSR / first mount (hydration) no tag is selected
    const [selectedTags, setSelectedTags] = (0, react_1.useState)([]);
    const [searchName, setSearchName] = (0, react_1.useState)(null);
    const [selectedMaintenanceStatuses, setSelectedMaintenanceStatuses] = (0, react_1.useState)([]);
    // Sync tags from QS to state (delayed on purpose to avoid SSR/Client
    // hydration mismatch)
    (0, react_1.useEffect)(() => {
        setSelectedTags((0, PluginDirectoryTagSelect_1.readSearchTags)(location.search));
        setOperator((0, PluginDirectoryFilterToggle_1.readOperator)(location.search));
        setSearchName(readSearchName(location.search));
        setSelectedMaintenanceStatuses((0, PluginDirectoryMaintenanceStatusSelect_1.readMaintenanceStatus)(location.search));
        restoreUserState(location.state);
    }, [location]);
    return (0, react_1.useMemo)(() => filterPlugins(plugins_1.sortedPlugins, selectedTags, operator, searchName, selectedMaintenanceStatuses), [selectedTags, operator, searchName, selectedMaintenanceStatuses]);
}
function PluginDirectoryHeader() {
    return (<section className="margin-top--lg margin-bottom--lg text--center">
      <h1>{TITLE}</h1>
      <p>{DESCRIPTION}</p>
      <a className="button button--primary button--lg" href={SUBMIT_URL} target="_blank" rel="noreferrer">
          <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faPlusSquare} className={styles_module_scss_1.default.buttonIcon}/>
          <Translate_1.default id="plugindirectory.header.button">
            Add a plugin
          </Translate_1.default>
      </a>
    </section>);
}
function usePluginCountPlural() {
    const { selectMessage } = (0, theme_common_1.usePluralForm)();
    return (pluginCount) => selectMessage(pluginCount, (0, Translate_1.translate)({
        id: 'plugindirectory.filters.resultCount',
        description: 'Pluralized label for the number of plugins found in the directory. Use as many plural forms (separated by "|") as your language supports/needs (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
        message: '1 plugin|{pluginCount} plugins',
    }, { pluginCount }));
}
function PluginDirectoryFilters() {
    const filteredPlugins = useFilteredPlugins();
    const pluginCountPlural = usePluginCountPlural();
    return (<section className="container margin-top--l margin-bottom--lg">
      <div className={(0, clsx_1.default)('margin-bottom--sm', styles_module_scss_1.default.filterCheckbox)}>
        <div>
          <h2>
            <Translate_1.default id="plugindirectory.filters.title">Filters</Translate_1.default>
          </h2>
          <span>{pluginCountPlural(filteredPlugins.length)}</span>
        </div>
        <PluginDirectoryFilterToggle_1.default />
      </div>
      <ul className={(0, clsx_1.default)('clean-list', styles_module_scss_1.default.checkboxList)}>
        {plugins_1.TagList.map((tag, i) => {
            const { label, description, color } = plugins_1.Tags[tag];
            const id = `plugindirectory_checkbox_id_${tag}`;
            return (<li key={i} className={styles_module_scss_1.default.checkboxListItem}>
              <PluginDirectoryTooltip_1.default id={id} text={description} anchorEl="#__docusaurus">
                <PluginDirectoryTagSelect_1.default tag={tag} id={id} label={label} icon={tag === 'favourite' ? (<react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faHeart} size="lg" className={styles_module_scss_1.default.svgIconFavourite}/>) : tag === 'docusaurus' ? (<Docusaurus_svg_1.default className={styles_module_scss_1.default.svgIconDocusaurus}/>) : (<span style={{
                        backgroundColor: color,
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        marginLeft: 8,
                    }}/>)}/>
              </PluginDirectoryTooltip_1.default>
            </li>);
        })}
      </ul>
      <ul className={(0, clsx_1.default)('clean-list', styles_module_scss_1.default.checkboxList)}>
        {plugins_1.MaintenanceStatusList.map((maintenanceStatus, i) => {
            const { label, description, icon } = plugins_1.MaintenanceStatuses[maintenanceStatus];
            const id = `plugindirectory_checkbox_id_${maintenanceStatus}`;
            return (<li key={i} className={styles_module_scss_1.default.checkboxListItem}>
              <PluginDirectoryTooltip_1.default id={id} text={description} anchorEl="#__docusaurus">
                <PluginDirectoryMaintenanceStatusSelect_1.default maintenanceStatus={maintenanceStatus} id={id} label={label} icon={icon}/>
              </PluginDirectoryTooltip_1.default>
            </li>);
        })}
      </ul>
    </section>);
}
const favouritePlugins = plugins_1.sortedPlugins.filter((plugin) => plugin.tags.includes('favourite'));
const otherPlugins = plugins_1.sortedPlugins.filter((plugin) => !plugin.tags.includes('favourite'));
function SearchBar() {
    const history = (0, router_1.useHistory)();
    const location = (0, router_1.useLocation)();
    const [value, setValue] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        setValue(readSearchName(location.search));
    }, [location]);
    return (<div className={styles_module_scss_1.default.searchContainer}>
      <input id="searchbar" placeholder={(0, Translate_1.translate)({
            message: 'Search for plugin or author name...',
            id: 'plugindirectory.searchBar.placeholder',
        })} value={value ?? undefined} onInput={(e) => {
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
        }}/>
    </div>);
}
function PluginDirectoryCards() {
    const filteredPlugins = useFilteredPlugins();
    if (filteredPlugins.length === 0) {
        return (<section className="margin-top--lg margin-bottom--xl">
        <div className="container padding-vert--md text--center">
          <h2>
            <Translate_1.default id="plugindirectory.usersList.noResult">No result</Translate_1.default>
          </h2>
          <SearchBar />
        </div>
      </section>);
    }
    return (<section className="margin-top--lg margin-bottom--xl">
      {filteredPlugins.length === plugins_1.sortedPlugins.length ? (<>
          <div className={styles_module_scss_1.default.pluginDirectoryFavourite}>
            <div className="container">
              <div className={(0, clsx_1.default)('margin-bottom--md', styles_module_scss_1.default.pluginDirectoryFavouriteHeader)}>
                <h2>
                  <Translate_1.default id="plugindirectory.favouritesList.title">
                    Our favourite plugins
                  </Translate_1.default>
                </h2>
                <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faHeart} className={styles_module_scss_1.default.svgIconFavourite} size="2xl"/>
                <SearchBar />
              </div>
              <ul className={(0, clsx_1.default)('container', 'clean-list', styles_module_scss_1.default.pluginDirectoryList)}>
                {favouritePlugins.map((plugin) => (<PluginDirectoryCard_1.default key={plugin.id} plugin={plugin}/>))}
              </ul>
            </div>
          </div>
          <div className="container margin-top--lg">
            <h2 className={styles_module_scss_1.default.pluginDirectoryHeader}>
              <Translate_1.default id="plugindirectory.usersList.allUsers">All plugins</Translate_1.default>
            </h2>
            <ul className={(0, clsx_1.default)('clean-list', styles_module_scss_1.default.pluginDirectoryList)}>
              {otherPlugins.map((plugin) => (<PluginDirectoryCard_1.default key={plugin.id} plugin={plugin}/>))}
            </ul>
          </div>
        </>) : (<div className="container">
          <div className={(0, clsx_1.default)('margin-bottom--md', styles_module_scss_1.default.pluginDirectoryFavouriteHeader)}>
            <SearchBar />
          </div>
          <ul className={(0, clsx_1.default)('clean-list', styles_module_scss_1.default.pluginDirectoryList)}>
            {filteredPlugins.map((plugin) => (<PluginDirectoryCard_1.default key={plugin.id} plugin={plugin}/>))}
          </ul>
        </div>)}
    </section>);
}
function PluginDirectory() {
    return (<Layout_1.default title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <PluginDirectoryHeader />
        <PluginDirectoryFilters />
        <PluginDirectoryCards />
      </main>
    </Layout_1.default>);
}
exports.default = PluginDirectory;
