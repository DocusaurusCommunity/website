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
var react_1 = require("react");
var clsx_1 = require("clsx");
var Link_1 = require("@docusaurus/Link");
var Translate_1 = require("@docusaurus/Translate");
var IdealImage_1 = require("@theme/IdealImage");
var plugins_1 = require("@site/src/data/plugins");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var Docusaurus_svg_1 = require("@site/src/assets/Docusaurus.svg");
var jsUtils_1 = require("@site/src/utils/jsUtils");
var index_1 = require("../PluginDirectoryTooltip/index");
var styles_module_scss_1 = require("./styles.module.scss");
var TagComp = react_1.default.forwardRef(function (_a, ref) {
    var label = _a.label, color = _a.color, description = _a.description;
    return (<li ref={ref} className={styles_module_scss_1.default.tag} title={description}>
      <span className={styles_module_scss_1.default.textLabel}>{label.toLowerCase()}</span>
      <span className={styles_module_scss_1.default.colorLabel} style={{ backgroundColor: color }}/>
    </li>);
});
function PluginDirectoryCardTag(_a) {
    var tags = _a.tags;
    var tagObjects = tags.map(function (tag) { return (__assign({ tag: tag }, plugins_1.Tags[tag])); });
    // Keep same order for all tags
    var tagObjectsSorted = (0, jsUtils_1.sortBy)(tagObjects, function (tagObject) {
        return plugins_1.TagList.indexOf(tagObject.tag);
    });
    return (<>
      {tagObjectsSorted.map(function (tagObject, index) {
            var id = "plugin_card_tag_".concat(tagObject.tag);
            return (<index_1.default key={index} text={tagObject.description} anchorEl="#__docusaurus" id={id}>
            <TagComp key={index} {...tagObject}/>
          </index_1.default>);
        })}
    </>);
}
function getCardImage(plugin) {
    var _a;
    return ((_a = plugin.preview) !== null && _a !== void 0 ? _a : "https://slorber-api-screenshot.netlify.app/".concat(encodeURIComponent(plugin.website), "/showcase"));
}
var MaintenanceStatusComp = react_1.default.forwardRef(function (_a, ref) {
    var label = _a.label, icon = _a.icon, description = _a.description;
    return (<p className={styles_module_scss_1.default.pluginDirectoryCardMaintenanceStatus}>
      <span className={styles_module_scss_1.default.maintenanceLabel}>Status:</span>
      <span ref={ref} className={styles_module_scss_1.default.maintenanceStatus} title={description}>
        <span className={styles_module_scss_1.default.textLabel}>{label.toLowerCase()}</span>
        <span className={styles_module_scss_1.default.maintenanceStatusIcon}>{icon}</span>
      </span>
    </p>);
});
function PluginDirectoryCardMaintenanceStatus(_a) {
    var maintenanceStatus = _a.maintenanceStatus;
    var maintenanceStatusObject = plugins_1.MaintenanceStatuses[maintenanceStatus];
    return (<MaintenanceStatusComp {...maintenanceStatusObject}/>);
}
;
function PluginDirectoryCard(_a) {
    var plugin = _a.plugin;
    var image = getCardImage(plugin);
    return (<li key={plugin.name} className="card shadow--md">
      <div className={(0, clsx_1.default)('card__image', styles_module_scss_1.default.pluginDirectoryCardImage)}>
        <IdealImage_1.default img={image} alt={plugin.name}/>
      </div>
      <div className="card__body">
        <div className={(0, clsx_1.default)(styles_module_scss_1.default.pluginDirectoryCardHeader)}>
          <h4 className={styles_module_scss_1.default.pluginDirectoryCardTitle}>
            <Link_1.default href={plugin.website} className={styles_module_scss_1.default.pluginDirectoryCardLink}>
              {plugin.name}
            </Link_1.default>
          </h4>
          {plugin.tags.includes('favourite') && (<react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faHeart} className={styles_module_scss_1.default.svgIconFavourite} size="sm"/>)}
          {plugin.tags.includes('docusaurus') && (<Docusaurus_svg_1.default className={styles_module_scss_1.default.svgIconDocusaurus}/>)}
          {plugin.source && (<Link_1.default href={plugin.source} className={(0, clsx_1.default)('button button--secondary button--sm', styles_module_scss_1.default.pluginDirectoryCardSrcBtn)}>
              <Translate_1.default id="plugindirectory.card.sourceLink">source</Translate_1.default>
            </Link_1.default>)}
        </div>
        <p className={styles_module_scss_1.default.pluginDirectoryCardBody}>{plugin.description}</p>
        <p className={styles_module_scss_1.default.pluginDirectoryCardAuthor}><span className={styles_module_scss_1.default.authorLabel}>Author:</span><span className={styles_module_scss_1.default.authorName}>{plugin.author}</span></p>
        <PluginDirectoryCardMaintenanceStatus maintenanceStatus={plugin.maintenanceStatus}/>
      </div>
      <ul className={(0, clsx_1.default)('card__footer', styles_module_scss_1.default.cardFooter)}>
        <PluginDirectoryCardTag tags={plugin.tags}/>
      </ul>
    </li>);
}
exports.default = react_1.default.memo(PluginDirectoryCard);
