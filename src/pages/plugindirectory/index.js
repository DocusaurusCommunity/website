"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareUserState = void 0;
var react_1 = require("react");
var clsx_1 = require("clsx");
var ExecutionEnvironment_1 = require("@docusaurus/ExecutionEnvironment");
var Translate_1 = require("@docusaurus/Translate");
var router_1 = require("@docusaurus/router");
var theme_common_1 = require("@docusaurus/theme-common");
var Layout_1 = require("@theme/Layout");
var plugins_1 = require("@site/src/data/plugins");
var PluginDirectoryTagSelect_1 = require("./_components/PluginDirectoryTagSelect");
var PluginDirectoryMaintenanceStatusSelect_1 = require("./_components/PluginDirectoryMaintenanceStatusSelect");
var PluginDirectoryFilterToggle_1 = require("./_components/PluginDirectoryFilterToggle");
var PluginDirectoryCard_1 = require("./_components/PluginDirectoryCard");
var PluginDirectoryTooltip_1 = require("./_components/PluginDirectoryTooltip");
var styles_module_scss_1 = require("./styles.module.scss");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var Docusaurus_svg_1 = require("@site/src/assets/Docusaurus.svg");
var TITLE = (0, Translate_1.translate)({ message: 'Docusaurus Community Plugin Directory' });
var DESCRIPTION = (0, Translate_1.translate)({
    message: 'A community-sourced list of plugins for Docusaurus v2',
});
var SUBMIT_URL = 'https://github.com/homotechsual/docusaurus.community/discussions/3';
function restoreUserState(userState) {
    var _a;
    var _b = userState !== null && userState !== void 0 ? userState : {
        scrollTopPosition: 0,
        focusedElementId: undefined,
    }, scrollTopPosition = _b.scrollTopPosition, focusedElementId = _b.focusedElementId;
    (_a = document.getElementById(focusedElementId)) === null || _a === void 0 ? void 0 : _a.focus();
    window.scrollTo({ top: scrollTopPosition });
}
function prepareUserState() {
    var _a;
    if (ExecutionEnvironment_1.default.canUseDOM) {
        return {
            scrollTopPosition: window.scrollY,
            focusedElementId: (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.id,
        };
    }
    return undefined;
}
exports.prepareUserState = prepareUserState;
var SearchNameQueryKey = 'name';
function readSearchName(search) {
    return new URLSearchParams(search).get(SearchNameQueryKey);
}
function filterPlugins(plugins, selectedTags, operator, searchName, selectedMaintenanceStatuses) {
    var filteredPlugins = plugins;
    if (searchName) {
        // eslint-disable-next-line no-param-reassign
        filteredPlugins = filteredPlugins.filter(function (plugin) {
            var _a;
            return plugin.name.toLowerCase().includes(searchName.toLowerCase())
                || ((_a = plugin.author) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchName.toLowerCase()));
        });
    }
    if (selectedMaintenanceStatuses.length === 0) {
        filteredPlugins = filteredPlugins;
    }
    if (selectedMaintenanceStatuses.length > 0) {
        filteredPlugins = filteredPlugins.filter(function (plugin) {
            if (operator === 'AND') {
                return selectedMaintenanceStatuses.every(function (status) { return plugin.maintenanceStatus.includes(status); });
            }
            return selectedMaintenanceStatuses.some(function (status) { return plugin.maintenanceStatus.includes(status); });
        });
    }
    if (selectedTags.length === 0) {
        filteredPlugins = filteredPlugins;
    }
    if (selectedTags.length > 0) {
        filteredPlugins = plugins.filter(function (plugin) {
            if (plugin.tags.length === 0) {
                return false;
            }
            if (operator === 'AND') {
                return selectedTags.every(function (tag) { return plugin.tags.includes(tag); });
            }
            return selectedTags.some(function (tag) { return plugin.tags.includes(tag); });
        });
    }
    return filteredPlugins;
}
function useFilteredPlugins() {
    var location = (0, router_1.useLocation)();
    var _a = (0, react_1.useState)('OR'), operator = _a[0], setOperator = _a[1];
    // On SSR / first mount (hydration) no tag is selected
    var _b = (0, react_1.useState)([]), selectedTags = _b[0], setSelectedTags = _b[1];
    var _c = (0, react_1.useState)(null), searchName = _c[0], setSearchName = _c[1];
    var _d = (0, react_1.useState)([]), selectedMaintenanceStatuses = _d[0], setSelectedMaintenanceStatuses = _d[1];
    // Sync tags from QS to state (delayed on purpose to avoid SSR/Client
    // hydration mismatch)
    (0, react_1.useEffect)(function () {
        setSelectedTags((0, PluginDirectoryTagSelect_1.readSearchTags)(location.search));
        setOperator((0, PluginDirectoryFilterToggle_1.readOperator)(location.search));
        setSearchName(readSearchName(location.search));
        setSelectedMaintenanceStatuses((0, PluginDirectoryMaintenanceStatusSelect_1.readMaintenanceStatus)(location.search));
        restoreUserState(location.state);
    }, [location]);
    return (0, react_1.useMemo)(function () { return filterPlugins(plugins_1.sortedPlugins, selectedTags, operator, searchName, selectedMaintenanceStatuses); }, [selectedTags, operator, searchName, selectedMaintenanceStatuses]);
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
    var selectMessage = (0, theme_common_1.usePluralForm)().selectMessage;
    return function (pluginCount) {
        return selectMessage(pluginCount, (0, Translate_1.translate)({
            id: 'plugindirectory.filters.resultCount',
            description: 'Pluralized label for the number of plugins found in the directory. Use as many plural forms (separated by "|") as your language supports/needs (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
            message: '1 plugin|{pluginCount} plugins',
        }, { pluginCount: pluginCount }));
    };
}
function PluginDirectoryFilters() {
    var filteredPlugins = useFilteredPlugins();
    var pluginCountPlural = usePluginCountPlural();
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
        {plugins_1.TagList.map(function (tag, i) {
            var _a = plugins_1.Tags[tag], label = _a.label, description = _a.description, color = _a.color;
            var id = "plugindirectory_checkbox_id_".concat(tag);
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
        {plugins_1.MaintenanceStatusList.map(function (maintenanceStatus, i) {
            var _a = plugins_1.MaintenanceStatuses[maintenanceStatus], label = _a.label, description = _a.description, icon = _a.icon;
            var id = "plugindirectory_checkbox_id_".concat(maintenanceStatus);
            return (<li key={i} className={styles_module_scss_1.default.checkboxListItem}>
              <PluginDirectoryTooltip_1.default id={id} text={description} anchorEl="#__docusaurus">
                <PluginDirectoryMaintenanceStatusSelect_1.default maintenanceStatus={maintenanceStatus} id={id} label={label} icon={icon}/>
              </PluginDirectoryTooltip_1.default>
            </li>);
        })}
      </ul>
    </section>);
}
var favouritePlugins = plugins_1.sortedPlugins.filter(function (plugin) { return plugin.tags.includes('favourite'); });
var otherPlugins = plugins_1.sortedPlugins.filter(function (plugin) { return !plugin.tags.includes('favourite'); });
function SearchBar() {
    var history = (0, router_1.useHistory)();
    var location = (0, router_1.useLocation)();
    var _a = (0, react_1.useState)(null), value = _a[0], setValue = _a[1];
    (0, react_1.useEffect)(function () {
        setValue(readSearchName(location.search));
    }, [location]);
    return (<div className={styles_module_scss_1.default.searchContainer}>
      <input id="searchbar" placeholder={(0, Translate_1.translate)({
            message: 'Search for plugin or author name...',
            id: 'plugindirectory.searchBar.placeholder',
        })} value={value !== null && value !== void 0 ? value : undefined} onInput={function (e) {
            setValue(e.currentTarget.value);
            var newSearch = new URLSearchParams(location.search);
            newSearch.delete(SearchNameQueryKey);
            if (e.currentTarget.value) {
                newSearch.set(SearchNameQueryKey, e.currentTarget.value);
            }
            history.push(__assign(__assign({}, location), { search: newSearch.toString(), state: prepareUserState() }));
            setTimeout(function () {
                var _a;
                (_a = document.getElementById('searchbar')) === null || _a === void 0 ? void 0 : _a.focus();
            }, 0);
        }}/>
    </div>);
}
function PluginDirectoryCards() {
    var filteredPlugins = useFilteredPlugins();
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
                {favouritePlugins.map(function (plugin) { return (<PluginDirectoryCard_1.default key={plugin.id} plugin={plugin}/>); })}
              </ul>
            </div>
          </div>
          <div className="container margin-top--lg">
            <h2 className={styles_module_scss_1.default.pluginDirectoryHeader}>
              <Translate_1.default id="plugindirectory.usersList.allUsers">All plugins</Translate_1.default>
            </h2>
            <ul className={(0, clsx_1.default)('clean-list', styles_module_scss_1.default.pluginDirectoryList)}>
              {otherPlugins.map(function (plugin) { return (<PluginDirectoryCard_1.default key={plugin.id} plugin={plugin}/>); })}
            </ul>
          </div>
        </>) : (<div className="container">
          <div className={(0, clsx_1.default)('margin-bottom--md', styles_module_scss_1.default.pluginDirectoryFavouriteHeader)}>
            <SearchBar />
          </div>
          <ul className={(0, clsx_1.default)('clean-list', styles_module_scss_1.default.pluginDirectoryList)}>
            {filteredPlugins.map(function (plugin) { return (<PluginDirectoryCard_1.default key={plugin.id} plugin={plugin}/>); })}
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
